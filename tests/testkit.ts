import { spawn, SpawnOptions } from "node:child_process";
import path from "node:path";
import { temporaryDirectory } from 'tempy';

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
    try {
        const cwd = temporaryDirectory();
        const templatePath = path.join(__dirname, `../${template}/template`);
        await runCommand('yarn',
            [
                'create',
                '@wix/app',
                `--app-name ${kebabToCamelCase(template)}`,
                `--template-path ${templatePath}`,
                '--skip-install',
                '--skip-git'
            ], { cwd, }
        )
        return path.join(cwd, template);
    } catch (e) {
        console.error(e);
        throw new Error(`Failed to create app from template "${template}".\n${e}`);
    }
}

export const installDependencies = async (cwd: string) =>
    await runCommand('yarn', ['install', '--silent', '--prefer-offline'], { cwd })

export const buildApp = async (cwd: string) =>
    await runCommand('yarn', ['build'], { cwd })
