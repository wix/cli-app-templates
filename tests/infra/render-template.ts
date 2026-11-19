import { readFile } from 'node:fs/promises';
import path from 'node:path';
import ejs from 'ejs';
import fm from 'front-matter';

export const renderTemplateFile = async (
  templateRoot: string,
  relativePath: string,
  data: { ideForMcpType?: string },
) => {
  const raw = await readFile(path.join(templateRoot, relativePath), 'utf8');
  const { attributes, body } = fm<{ to?: string; skip_if?: boolean }>(ejs.render(raw, data));
  if (attributes.skip_if === true) {
    return undefined;
  }
  return { path: attributes.to ?? relativePath, content: body };
};
