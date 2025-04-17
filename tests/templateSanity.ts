
import { describe, expect, it } from 'vitest';
import { buildApp, createApp, installDependencies } from './testkit';

export const templateSanity = (template: string) => {
    describe(`${template} sanity`, () => {
        let cwd: string;

        it("should successfully create a template", async () => {
            cwd = await createApp(template);
            expect(cwd).toBeDefined();
        }, 60_000);

        it("should successfully install all dependencies", async () => {
            await expect(installDependencies(cwd)).resolves.not.toThrow();
        }, 60_000);

        it("should build the app successfully", async () => {
            await expect(buildApp(cwd)).resolves.not.toThrow();
        }, 60_000)
    });
}

