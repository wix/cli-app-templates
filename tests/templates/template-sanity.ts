import { describe, expect, it } from 'vitest';
import {
  buildApp,
  checkFormat,
  checkTypes,
  createApp,
  installDependencies,
} from '../infra/testkit';

export const templateSanity = (template: string) => {
  describe(`${template} sanity`, () => {
    let cwd: string;

    it('should successfully create a template', async () => {
      cwd = await createApp(template);
      expect(cwd).toBeDefined();
    }, 20_000);

    it('should successfully install all dependencies', async () => {
      await expect(installDependencies(cwd)).resolves.not.toThrow();
    }, 100_000);

    it('should successfully run format check', async () => {
      await expect(checkFormat(cwd)).resolves.not.toThrow();
    });

    it('should successfully run typescheck', async () => {
      await expect(checkTypes(cwd)).resolves.not.toThrow();
    }, 15_000);

    it('should build the app successfully', async () => {
      await expect(buildApp(cwd)).resolves.not.toThrow();
    }, 60_000);
  });
};
