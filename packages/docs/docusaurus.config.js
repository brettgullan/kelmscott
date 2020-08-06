module.exports = {
  title: 'Kelmscott',
  tagline: 'Developer tools for digital content publishing.',
  url: 'https://kelmscott.digital',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'favicon.ico',
  organizationName: 'brettgullan', // Usually your GitHub org/user name.
  projectName: 'kelmscott', // Usually your repo name.
  themeConfig: {
    colorMode: {
      disableSwitch: true,
    },
    prism: {
      // theme: require('prism-react-renderer/themes/github'),
    },
    navbar: {
      title: 'Kelmscott',
      logo: {
        alt: 'Kelmscott logo',
        src: 'kelmscott-logo-flat.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        {
          href: 'https://github.com/brettgullan/kelmscott',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Caster',
              to: 'docs/caster/index',
            },
            {
              label: 'Forme',
              to: 'docs/forme/index',
            },
          ],
        },
        /*
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/docusaurus',
            },
            {
              label: 'Discord',
              href: 'https://discordapp.com/invite/docusaurus',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/docusaurus',
            },
          ],
        },
        */
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/brettgullan/kelmscott',
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/search?q=%40kelmscott',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Brett Gullan.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'about',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/brettgullan/kelmscott/blob/master/packages/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themes: ['@docusaurus/theme-live-codeblock'],
}
