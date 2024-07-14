module.exports = {
  siteMetadata: {
    title: `Gershan Lombard`,
    description: `Gershan Lombard's Offerings`,
    author: `@mattbloem`,
    siteUrl: "http://localhost:8000/",
    getform_url: "https://getform.io/f/7a6695a7-c8e3-442c-bc2f-d46d3b9a535e",
  },

  mapping: {
    "MarkdownRemark.frontmatter.author": `AuthorsJson.name`,
  },

  plugins: [
    `gatsby-plugin-decap-cms`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-image`,
    `gatsby-plugin-theme-ui`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
           resolve: `gatsby-remark-relative-images`,
           options: {
             // [Optional] The root of "media_folder" in your config.yml
             // Defaults to "static"
             staticFolderName: 'static',
             // [Optional] Include the following fields, use dot notation for nested fields
             // All fields are included by default
             include: ['featured', 'bg_image', 'image'],
             // [Optional] Exclude the following fields, use dot notation for nested fields
             // No fields are excluded by default
             exclude: ['featured.skip'],
           },
         },
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1920
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/media`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data/`,
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `Merienda`,
          `sans-serif\:300`, `400`, `500`, `600`, `700`,
          `Arsenal ital`,
          `sans-serif\:300`, `300i`, `400`, `400i`, `500`, `600`, `700`, `900`,
          `Merriweather`,
          `Open Sans`,
          `Pacifico`,
          `Museo`,
          `Courier`,
        ],

        display: 'swap',
      },
    },

    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/data/settings/logo.png`, // This path is relative to the root of the site.
      },
    },

    {
        resolve: "gatsby-plugin-anchor-links",
        options: {
          offset: -100
        }
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-json`,



    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
