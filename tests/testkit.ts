import { spawn, SpawnOptions } from "node:child_process";
import { mkdir, rm } from "node:fs";
import { promisify } from "node:util";
import { tmpdir } from 'node:os';
import path from 'node:path';
import { C } from "vitest/dist/chunks/reporters.d.CfRkRKN2";

const mkdirAsync = promisify(mkdir);
const rmAsync = promisify(rm);

const CACHE_DIR = '.cache';

const templateDir = (template: string) => path.join(CACHE_DIR, template);

const kebabToCamelCase = (str: string) =>
    str.replace(/-./g, match => match[1].toUpperCase());

const silentSpawn = (command: string, args: string[], options?: SpawnOptions) =>
    new Promise<void>((resolve, reject) => {
        const process = spawn(command, args, { stdio: 'ignore', ...options });

        process.on('error', reject);
        process.on('close', (code) => {
            code === 0 ? resolve() : reject(new Error(`CLI exited with code ${code} `));
        });
    });

export const createApp = async (template: string) => {
    await mkdirAsync(CACHE_DIR, { recursive: true });
    await silentSpawn('yarn',
        [
            'create',
            '@wix/app',
            `--app-name ${kebabToCamelCase(template)}`,
            `--template-path ./../../${template}/template`,
            '--skip-install',
            '--skip-git'
        ], { 'cwd': CACHE_DIR, }
    )
}

export const installDependencies = async (template: string) =>
    await silentSpawn('yarn', ['install', '--silent', '--prefer-offline'], { 'cwd': templateDir(template) })

export const buildApp = async (template: string) =>
    await silentSpawn('yarn', ['build'], { 'cwd': templateDir(template) })

export const clearCache = () => rmAsync(CACHE_DIR, { recursive: true, force: true });

