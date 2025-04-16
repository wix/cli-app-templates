import { execa, Options } from 'execa';
import path from "node:path";
import { temporaryDirectory } from 'tempy';

const kebabToCamelCase = (str: string) =>
    str.replace(/-./g, match => match[1].toUpperCase());

const runCommand = async (command: string, args: string[], options?: Options) => {
    try {
        const { stdout } = await execa(command, args, { stdio: 'pipe', ...options });
        return stdout;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error((error as any).stderr || error.message);
        }
        throw error;
    }
};

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
    await runCommand('yarn', ['install', '--silent', '--immutable'], { cwd })

export const buildApp = async (cwd: string) =>
    await runCommand('yarn', ['build'], { cwd })
