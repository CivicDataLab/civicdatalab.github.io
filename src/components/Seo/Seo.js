import React from 'react';
import { Helmet } from 'react-helmet';
import { useStaticQuery, graphql } from 'gatsby';

const Seo = ({ description, meta, title, lang = 'en' }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            image
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata?.description;
  const defaultTitle = site.siteMetadata?.title;

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={title}
      titleTemplate={title === 'CivicDataLab' ? `%s | Data, Tech, Design, Social Science` : `%s | ${defaultTitle}`}
      meta={[
        { name: 'description', content: metaDescription },
        {
          property: 'og:title',
          content:
            title === 'CivicDataLab'
              ? 'CivicDataLab | Data, Tech, Design, Social Science'
              : `${title} | ${defaultTitle}`
        },
        { property: 'og:description', content: metaDescription },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: site.siteMetadata.siteUrl },
        { property: 'og:image', content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}` },
        { property: 'twitter:card', content: 'summary_large_image' },
        { property: 'twitter:url', content: site.siteMetadata.siteUrl },
        { name: 'twitter:description', content: metaDescription },
        {
          property: 'twitter:title',
          content:
            title === 'CivicDataLab'
              ? 'CivicDataLab | Data, Tech, Design, Social Science'
              : `${title} | ${defaultTitle}`
        },
        { property: 'twitter:image', content: `${site.siteMetadata.siteUrl}${site.siteMetadata.image}` }
      ].concat(meta ? meta : {})}
    />
  );
};

export default Seo;
