// Architectural Decision: Enable reading from external directories (submodules in /content)
const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
});

module.exports = withNextra({
  experimental: {
    externalDir: true, // Allow Next.js to read from /content submodules
  },
});
