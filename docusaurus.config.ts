// docusaurus.config.ts
import { themes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Eden Jose",
  tagline: "Engineer by day, runner by night.",
  favicon: 'img/logo/fourth/favicon.ico',
  url: 'https://github.com',
  baseUrl: "/joeden/",
  organizationName: 'joseeden',     // Github organization/username
  projectName: 'joeden',            // Reponame
  deploymentBranch: "master",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  plugins: [

    "docusaurus-plugin-sass",

    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 85,
        max: 2000,
        min: 500,
        steps: 4,
        disableInDev: false,
      },
    ],
    
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        // docs: false,
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          showLastUpdateTime: true,          
        },        
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: [require.resolve("./src/css/custom.scss")],
          
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo/fourth/favicon.ico",
    metadata: [
      {
        name: "description",
        content: "I am an engineer who loves to learn things and solve technical challenges.",
      },
      {
        name: "keywords",
        content: "fullstack,frontend,backend,developer,engineer,go,golang,javascript,graphql,grpc,rest,react,reactjs,kubernetes,devops,cloud,cloud-native,cka,ckad,open-source,gophers,linux,python,ansible,devsecops,cybersecurity",
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      hideOnScroll: false,
      title: "EDEN",
      logo: {
        alt: "Eden Logo",
        src: "img/logo/fourth/favicon-32x32.png",
        // srcDark: "img/favicon-32x32-dark-mode.png",
      },
      items: [
        { to: "/about", label: "About", position: "left" },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },        
        { to: "/blog", label: "Blog", position: "left" },
        { to: "/", label: "Running", position: "left" },
        // { to: "/", label: "Gallery", position: "left" },
        // { to: "/", label: "Arts", position: "left" },
        { to: "https://merria.co", label: "Shop", position: "left" },
        // {
        //   href: 'https://github.com/joseeden',
        //   label: 'GitHub',
        //   position: 'right',
        // },        
      ],
    },
    footer: {
      // style: "dark",
      // links: [
      //   {
      //     title: "Blog feed",
      //     items: [
      //       {
      //         label: "RSS",
      //         to: "pathname:///blog/rss.xml",
      //       },
      //       {
      //         label: "Atom",
      //         to: "pathname:///blog/atom.xml",
      //       },
      //       {
      //         label: "JSON",
      //         to: "pathname:///blog/feed.json",
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} Eden Jose`
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
