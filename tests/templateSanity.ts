
import { describe, expect, it } from 'vitest';
import { buildApp, checkTypes, createApp, installDependencies } from './testkit';

export const templateSanity = (template: string) => {
  describe(`${template} sanity`, () => {
    let cwd: string;

    it("should successfully create a template", async () => {
      cwd = await createApp(template);
      expect(cwd).toBeDefined();
    });

    it("should successfully install all dependencies", async () => {
      await expect(installDependencies(cwd)).resolves.not.toThrow();
    }, 100_000);

    it("should successfully run typescheck", async () => {
      await expect(checkTypes(cwd)).resolves.not.toThrow();
    });

    it("should build the app successfully", async () => {
      await expect(buildApp(cwd)).resolves.not.toThrow();
    })
  });
}

