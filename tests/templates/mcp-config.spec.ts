import { describe, expect, it } from 'vitest';
import { renderTemplateFile } from '../infra/render-template';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = fileURLToPath(new URL('../..', import.meta.url));
const templateNames = [
  'blank',
  'mixpanel-analytics',
  'site-popup',
  'custom-products-catalog',
  'chart-widget',
  'inventory-countdown',
];
const templateFiles = ['.mcp.json.ejs', '.cursor/mcp.json.ejs', '.vscode/mcp.json.ejs'];
const serverArgs = ['-y', '@wix/mcp-remote', 'https://mcp.wix.com/sse'];
const ideCases = [
  ['ClaudeCode', '.mcp.json', 'mcpServers'],
  ['Cursor', '.cursor/mcp.json', 'mcpServers'],
  ['VsCode', '.vscode/mcp.json', 'servers'],
] as const;

const renderMcpFiles = async (template: string, ideForMcpType?: string) => {
  const templateRoot = path.join(repoRoot, template, 'template');
  const rendered = await Promise.all(
    templateFiles.map((file) => renderTemplateFile(templateRoot, file, { ideForMcpType })),
  );
  return new Map(rendered.flatMap((file) => (file ? [[file.path, file.content] as const] : [])));
};

describe.each(templateNames)('%s MCP config templates', (template) => {
  it.each(ideCases)(
    'renders the Wix MCP server for %s at %s',
    async (ide, expectedPath, serverKey) => {
      const files = await renderMcpFiles(template, ide);

      expect([...files.keys()]).toEqual([expectedPath]);
      const config = JSON.parse(files.get(expectedPath)!);
      expect(Object.keys(config[serverKey])).toEqual(['wix-mcp-remote']);
      expect(config[serverKey]['wix-mcp-remote'].command).toBe('npx');
      expect(config[serverKey]['wix-mcp-remote'].args).toEqual(serverArgs);
    },
  );

  it('does not render an MCP config when no IDE is selected', async () => {
    expect(await renderMcpFiles(template)).toEqual(new Map());
  });
});
