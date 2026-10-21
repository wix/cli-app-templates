// @ts-check

/**
 * Removes private npm registry resolution URLs from yarn.lock
 *
 * Converts entries like:
 *   resolution: "@pkg/name@npm:1.0.0::__archiveUrl=https://private.registry.com/..."
 * To:
 *   resolution: "@pkg/name@npm:1.0.0"
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const yarnLockPath = fileURLToPath(new URL('../yarn.lock', import.meta.url));
const privateResolutionPattern = /::__archiveUrl=[^"]+/g;

const content = readFileSync(yarnLockPath, 'utf8');
const cleanedContent = content.replaceAll(privateResolutionPattern, '');

if (content !== cleanedContent) {
  writeFileSync(yarnLockPath, cleanedContent);
}
