import { DocsThemeConfig } from 'nextra-theme-docs';

const config: DocsThemeConfig = {
  logo: <span style={{ fontWeight: 700 }}>Docs Hub</span>,
  project: {
    link: 'https://github.com/rushhiii/docs-hub',
  },
  docsRepositoryBase: 'https://github.com/rushhiii/docs-hub/blob/main',
  sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
  darkMode: true,
  search: {
    placeholder: 'Search docs...',
  },
  primaryHue: 210,
  footer: {
    text: 'Docs Hub – Centralized Documentation Engine',
  },
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Docs Hub',
    };
  },
};

export default config;
