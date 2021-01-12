const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const memberTemplate = path.resolve('./src/templates/member.js');
const jobTemplate = path.resolve('./src/templates/job.js');

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
  const memberResults = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { template: { eq: "member" } } }) {
        edges {
          node {
            fields {
              slug
            }
            id
          }
        }
      }
    }
  `);

  const jobResults = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { template: { eq: "job" } } }) {
        edges {
          node {
            fields {
              slug
            }
            id
          }
        }
      }
    }
  `);

  const members = memberResults.data.allMarkdownRemark.edges;
  const jobs = jobResults.data.allMarkdownRemark.edges;

  members.forEach((member) => {
    createPage({
      path: member.node.fields.slug,
      component: memberTemplate,
      context: {
        id: member.node.id
      }
    });
  });

  jobs.forEach((job) => {
    createPage({
      path: job.node.fields.slug,
      component: jobTemplate,
      context: {
        id: job.node.id
      }
    });
  });
};
