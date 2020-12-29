const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  if (node.internal.type === 'MarkdownRemark') {
    const { createNodeField } = actions;
    const slug = createFilePath({ node, getNode });
    createNodeField({
      node,
      name: 'slug',
      value: slug
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  const members = result.data.allMarkdownRemark.nodes;

  members.forEach((member) => {
    console.log(member.id);
    createPage({
      path: member.fields.slug,
      component: path.resolve('./src/templates/member.js'),
      context: {
        id: member.id
      }
    });
  });
};
