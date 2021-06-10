const path = require('path');

module.exports = {
  siteMetadata: {
    title: `CivicDataLab`,
    summary: '',
    description:
      'A research lab working on the intersection use data, tech, design and social science to strengthen the course of civic engagements in India.',
    siteUrl: 'https://civicdatalab.in',
    image: '/cdl_logo.png',
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
        path: path.join(__dirname, 'src', 'images')
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: path.join(__dirname, 'content')
      }
    },
    {
      resolve: 'gatsby-plugin-plausible',
      options: {
        domain: 'civicdatalab.in'
      }
    },
    'gatsby-background-image',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap'
  ]
};
