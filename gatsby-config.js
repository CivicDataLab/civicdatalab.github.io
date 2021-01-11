const path = require('path');

module.exports = {
  siteMetadata: {
    title: `CivicDataLab`,
    summary: '',
    description: '',
    siteUrl: 'https://civicdatalab.in',
    social: {
      twitter: '',
      github: '',
      linkedin: ''
    }
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: path.join(__dirname, 'assets', 'images')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'icons',
        path: path.join(__dirname, 'assets', 'icons')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'content')
      }
    },
    'gatsby-background-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet'
  ]
};
