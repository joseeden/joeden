// docusaurus.config.ts
import { themes } from "prism-react-renderer";
import { GlobExcludeDefault } from "@docusaurus/utils";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Eden Jose",
  tagline: "Engineer by day, runner by night.",
  favicon: 'img/logo/fourth/favicon.ico',
  url: 'https://github.com',
  baseUrl: "/joeden/",
  organizationName: 'joseeden',
  projectName: 'joeden',
  deploymentBranch: "master",
  onBrokenLinks: "throw", /* throw | warn | ignore */
  onBrokenMarkdownLinks: "throw", /* throw | warn | ignore */

  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    localeConfigs: {
      en: { label: "English" },
      es: { label: "Español" },
    },
  },

  plugins: [
    require.resolve("./plugins/homepage-writings.cjs"),
    "docusaurus-plugin-sass",
    "@datalayer/jupyter-docusaurus-plugin",
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
    [
      'docusaurus-pushfeedback',{
          project: 'u6oa4o2opy',
          buttonPosition: 'bottom-right',
          buttonStyle: 'dark',
          modalTitle: 'Share your thoughts'
      }
    ],
    function streamPolyfill() {
      return {
        name: "stream-polyfill",
        configureWebpack() {
          return {
            resolve: {
              fallback: {
                stream: require.resolve("stream-browserify"),
              },
            },
          };
        },
      };
    },    
  ],

  // customFields: {
  //   webpack: {
  //     resolve: {
  //       fallback: {
  //         "process": require.resolve("process/browser")
  //       }
  //     }
  //   }
  // },

  presets: [
    [
      "@docusaurus/preset-classic",
        {
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            sidebarItemsGenerator: async ({ defaultSidebarItemsGenerator, ...args }) => {
              const categoriesMetadata = { ...args.categoriesMetadata };

              // Use folder paths so repeated category labels have unique i18n keys.
              for (const doc of args.docs) {
                const segments = doc.sourceDirName.split('/');
                for (let depth = 1; depth <= segments.length; depth++) {
                  const directory = segments.slice(0, depth).join('/');
                  if (directory === '.') continue;
                  categoriesMetadata[directory] = {
                    ...categoriesMetadata[directory],
                    key: categoriesMetadata[directory]?.key ?? directory,
                  };
                }
              }

              return defaultSidebarItemsGenerator({ ...args, categoriesMetadata });
            },
            showLastUpdateTime: true,
            exclude: ['**/library/**'],
          },
          blog: {
            path: 'writings',
            routeBasePath: 'writings',
            postsPerPage: 'ALL',
            include: ['*/**/*.{md,mdx}'], // Only publish posts inside folders.
            exclude: [...GlobExcludeDefault, '2017-08-26-welcome/**'],
            showReadingTime: true,
            onUntruncatedBlogPosts: "ignore",    /* 'ignore' | 'log' | 'warn' | 'throw' */
          },
          theme: {
            customCss: [
              require.resolve("./src/css/custom.scss"),
              // Add new css files here as needed
            ],
          },
          // debug: true,
          // docs: false,
        } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // image: "img/logo/fourth/favicon.ico",
    image: "img/about/winnie.jpeg",
    algolia: {
      appId: '1ZR3DE355U',
      apiKey: '4bdd1224a13d70e9e345de6c9ecbd1f3',
      indexName: 'joseedenio',
      contextualSearch: true,
      searchParameters: {},
      searchPagePath: 'search',
    },
    metadata: [
      { name: "og:title", content: "Home | Eden Jose" },
      { name: "og:description", content: "Engineer by day, runner by night." },
      { name: "og:image", content: "https://joseeden.github.io/joeden/img/about/winnie.jpeg" },      
      { name: "og:url", content: "https://joseeden.github.io/joeden/" },
      {
        name: "description",
        content: "I am an engineer who loves to learn things and solve technical challenges.",
      },
      {
        name: "keywords",
        content: "fullstack,frontend,backend,developer,engineer,go,golang,javascript,graphql,grpc,rest,react,reactjs,kubernetes,devops,cloud,cloud-native,cka,ckad,open-source,gophers,linux,python,ansible,devsecops,cybersecurity",
      },
    ],
    stylesheets: [
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
    ],
    scripts: [
      {
        src: './js/sidebar-accordion.js',
        defer: true,
      },
      {
        src: './js/image-zoom.js',
        defer: true,
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
        // { to: "/about", label: "About", position: "left" },
        { to: "/", label: "About", position: "left" },
        { to: "/projects", label: "Projects", position: "left" },
        { to: "/writings", label: "Writings", position: "left" },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        // { to: "/RUNNING", label: "Running", position: "left" },
        // { to: "/", label: "Gallery", position: "left" },
        // { to: "/", label: "Arts", position: "left" },  
        // { to: "https://merria.co", label: "Merria", position: "left" },
        // { to: "https://www.merriadigital.com", label: "Merria Digital", position: "left" },
        // { to: "https://www.velarae.co/", label: "Velarae", position: "left" },
        {
          type: 'localeDropdown',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
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
      copyright: `Copyright © ${new Date().getFullYear()} Eden Jose`,
    },
    prism: {
      theme: themes.github,
      darkTheme: themes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

module.exports = config;
