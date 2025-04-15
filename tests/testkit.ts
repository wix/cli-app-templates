import { spawn, SpawnOptions } from "child_process";
import { mkdir, rm } from "fs";
import { promisify } from "util";

const mkdirAsync = promisify(mkdir);
const rmAsync = promisify(rm);

const CACHE_DIR = '.cache';

const kebabToCamelCase = (str: string) =>
    str.replace(/-./g, match => match[1].toUpperCase());

const silentSpawn = (command: string, args: string[], options?: SpawnOptions) =>
    new Promise<void>((resolve, reject) => {
        const proc = spawn(command, args, { stdio: 'ignore', ...options });

        proc.on('error', reject);
        proc.on('close', (code) => {
            code === 0 ? resolve() : reject(new Error(`CLI exited with code ${code} `));
        });
    });

export const createApp = async (template: string) => {
    await mkdirAsync(CACHE_DIR);
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
    await silentSpawn('yarn', ['install', '--silent', '--prefer-offline'], { 'cwd': `${CACHE_DIR}/${template}` })

export const buildApp = async (template: string) =>
    await silentSpawn('yarn', ['build'], { 'cwd': `${CACHE_DIR}/${template}` })

export const clearCache = () => rmAsync(CACHE_DIR, { recursive: true, force: true });

