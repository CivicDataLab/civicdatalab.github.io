import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';

const MemberTemplate = ({ data }) => {
  const member = data.markdownRemark;
  return (
    <Layout>
      <div>
        <p>Name: {member.frontmatter.name}</p>
        <p>Role: {member.frontmatter.role}</p>
      </div>
    </Layout>
  );
};

export default MemberTemplate;

export const pageQuery = graphql`
  query TeamMemberQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        name
        role
      }
    }
  }
`;
