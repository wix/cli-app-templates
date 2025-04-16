import { spawn, SpawnOptions } from "node:child_process";
import { mkdir, rm } from "node:fs";
import { promisify } from "node:util";
import path from 'node:path';

const mkdirAsync = promisify(mkdir);
const rmAsync = promisify(rm);

const CACHE_DIR = '.cache';

const templateDir = (template: string) => path.join(CACHE_DIR, template);

const kebabToCamelCase = (str: string) =>
    str.replace(/-./g, match => match[1].toUpperCase());

const runCommand = (command: string, args: string[], options?: SpawnOptions) =>
    new Promise<string>((resolve, reject) => {
        const process = spawn(command, args, { stdio: ['pipe', 'pipe', 'pipe'], ...options });
        let outputHistory: string[] = [];

        const captureOutput = (stream: NodeJS.ReadableStream) => {
            stream.setEncoding('utf8');
            stream.on('data', (chunk) => {
                const lines = chunk.toString().split('\n').filter(Boolean);
                outputHistory = [...outputHistory, ...lines];
            });
        }

        if (process.stdout) {
            captureOutput(process.stdout);
        }

        if (process.stderr) {
            captureOutput(process.stderr);
        }

        process.on('error', reject);
        process.on('close', (code) => {
            const output = outputHistory.join('\n');
            code === 0 ? resolve(output) : reject(new Error(output));
        });
    });

export const createApp = async (template: string) => {
    await mkdirAsync(CACHE_DIR, { recursive: true });
    try {
        await runCommand('yarn',
            [
                'create',
                '@wix/app',
                `--app-name ${kebabToCamelCase(template)}`,
                `--template-path ./../../${template}/template`,
                '--skip-install',
                '--skip-git'
            ], { 'cwd': CACHE_DIR, }
        )
    } catch (e) {
        console.error(e);
        throw new Error(`Failed to create app from template "${template}".\n${e}`);
    }
}

export const installDependencies = async (template: string) =>
    await runCommand('yarn', ['install', '--silent', '--prefer-offline'], { 'cwd': templateDir(template) })

export const buildApp = async (template: string) =>
    await runCommand('yarn', ['build'], { 'cwd': templateDir(template) })

export const clearCache = () => rmAsync(CACHE_DIR, { recursive: true, force: true });

