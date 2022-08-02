const path = require('path');
const { createFilePath } = require(`gatsby-source-filesystem`);
const memberTemplate = path.resolve('./src/templates/member.js');
const jobTemplate = path.resolve('./src/templates/job.js');
const sectorTemplate = path.resolve('./src/templates/sector.js');
const projectTemplate = path.resolve('./src/templates/project.js');
const eventTemplate = path.resolve('./src/templates/event.js');
const eventdetailTemplate = path.resolve('./src/templates/eventdetail.js');

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
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/team/" } }) {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const sectorResults = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "sector" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
      }
    }
  `);

  const projectResults = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "project" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
      }
    }
  `);

  const eventResults = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "eventtype" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
      }
    }
  `);

  const eventdetailResults = await graphql(`
    query {
      allMarkdownRemark(filter: { frontmatter: { type: { eq: "eventdetail" } } }) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              name
            }
          }
        }
      }
    }
  `);

  const members = memberResults.data.allMarkdownRemark.edges;
  const sectors = sectorResults.data.allMarkdownRemark.edges;
  const projects = projectResults.data.allMarkdownRemark.edges;
  const events = eventResults.data.allMarkdownRemark.edges;
  const eventdetails = eventdetailResults.data.allMarkdownRemark.edges;

  members.forEach((member) => {
    createPage({
      path: member.node.fields.slug,
      component: memberTemplate,
      context: {
        id: member.node.id
      }
    });
  });

  sectors.forEach((sector) => {
    createPage({
      path: sector.node.fields.slug,
      component: sectorTemplate,
      context: {
        id: sector.node.id,
        nameRegex: `/${sector.node.frontmatter.name}/`
      }
    });
  });

  projects.forEach((project) => {
    createPage({
      path: project.node.fields.slug,
      component: projectTemplate,
      context: {
        id: project.node.id,
        nameRegex: `/${project.node.frontmatter.name}/`
      }
    });
  });

  events.forEach((event) => {
    createPage({
      path: event.node.fields.slug,
      component: eventTemplate,
      context: {
        id: event.node.id,
        nameRegex: `/${event.node.frontmatter.name}/`
      }
    });
  });

  eventdetails.forEach((eventdetail) => {
    createPage({
      path: eventdetail.node.fields.slug,
      component: eventdetailTemplate,
      context: {
        id: eventdetail.node.id,
        nameRegex: `/${eventdetail.node.frontmatter.name}/`
      }
    });
  });
};
