// import React from 'react';
// import { graphql, useStaticQuery } from 'gatsby';
// import Img from 'gatsby-image';

// const MemberImage = ({ imagePath }) => {
//   const data = useStaticQuery(graphql`
//     query {
//       file(relativePath: { eq: "${imagePath}" }) {
//         childImageSharp {
//           fixed(width: 272, height: 408) {
//             ...GatsbyImageSharpFixed
//           }
//         }
//       }
//     }
//   `);

//   return <Img fixed={data.file.childImageSharp.fixed} />;
// };

// export default MemberImage;
