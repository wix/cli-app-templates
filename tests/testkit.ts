import { execa, Options } from 'execa';
import path from "node:path";
import { appendFile } from "node:fs/promises";
import { fileURLToPath } from 'node:url';
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
    const dirname = path.dirname(fileURLToPath(import.meta.url));
    const templatePath = path.join(dirname, `../${template}/template`);
    await runCommand('yarn',
      [
        'create',
        '@wix/new',
        'app',
        '--app-name',
        kebabToCamelCase(template),
        '--template-path',
        templatePath,
        '--skip-git',
        '--skip-install',
      ], { cwd, }
    )
    return path.join(cwd, template);
  } catch (e) {
    console.error(e);
    throw new Error(`Failed to create app from template "${template}".\n${e}`);
  }
}

export const installDependencies = async (cwd: string) => {
  await appendFile(path.join(cwd, '.yarnrc.yml'), `
approvedGitRepositories: []
enableScripts: false
enableTelemetry: false
enableGlobalCache: true
checksumBehavior: throw

npmMinimalAgeGate: '14d'
npmPreapprovedPackages: ['@wix/*']
`);
  await runCommand('yarn', ['install', '--silent'], { cwd, env: { YARN_ENABLE_IMMUTABLE_INSTALLS: 'false' } })
}

export const checkTypes = async (cwd: string) => {
  await runCommand('yarn', ['astro', 'sync'], { cwd })
  await runCommand('yarn', ['tsc', '--noEmit'], { cwd })
}

export const buildApp = async (cwd: string) =>
  await runCommand('yarn', ['build'], { cwd })
