
import { describe, it, expect, beforeAll } from 'vitest';
import { clearCache, createApp, installDependencies, buildApp } from './testkit';

const templates = ['chart-widget', 'custom-products-catalog', 'inventory-countdown', 'mixpanel-analytics', 'shipping-rates', 'site-popup']

describe.each(templates)("\"%s\" sanity", (template) => {
    beforeAll(async () => {
        await clearCache();
    });

    it("should successfully create a template", async () => {
        await expect(createApp(template)).resolves.not.toThrow();
    });

    it("should successfully install all dependencies", async () => {
        await expect(installDependencies(template)).resolves.not.toThrow();
    }, 60_000);

    it("should build the app successfully", async () => {
        await expect(buildApp(template)).resolves.not.toThrow();
    }, 20_000)
});

