import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// ESM Entrypoint for "type": "module"
const esmContent = `import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

export default app;
`;

// CommonJS fallback
const cjsContent = `const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(__dirname));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
module.exports = app;
`;

fs.writeFileSync(path.join(distDir, 'index.js'), esmContent);
fs.writeFileSync(path.join(distDir, 'server.js'), esmContent);
fs.writeFileSync(path.join(distDir, 'app.js'), esmContent);
fs.writeFileSync(path.join(distDir, 'index.cjs'), cjsContent);
fs.writeFileSync(path.join(distDir, 'server.cjs'), cjsContent);

console.log('✅ Generated Vercel ESM & CommonJS entrypoints (index.js, server.js, app.js) in apps/web/dist successfully!');
