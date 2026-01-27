// @ts-check
import { defineConfig } from 'astro/config';
import wix from '@wix/astro';
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  integrations: [wix(), react()],
  image: { domains: ["static.wixstatic.com"] },
  devToolbar: { enabled: false },
  security: {
    checkOrigin: false,
  }
});
