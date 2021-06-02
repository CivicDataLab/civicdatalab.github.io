import React from 'react';
import styled from 'styled-components';
import { getCoverImageUrlFromMediumPost } from '../utils/helpers';
import useMediumFeed from '../hooks/useMediumFeed';

const BlogStripContainer = styled.div`
  display: grid;
  margin: 40px auto;

  @media (min-width: 1280px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const BlogPreviewContainer = styled.a`
  color: white;
  padding: 20px;
  background-image: ${(props) => (props.imageUrl ? `url(${props.imageUrl})` : '')};
  background-size: cover;
  background-repeat: no-repeat;
  box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.65);
  text-decoration: none;
  transition: 0.5s;

  &:hover {
    box-shadow: inset 0 0 0 2000px rgba(0, 0, 0, 0.45);
  }
`;

const BlogPreview = ({ title, author, imageUrl, postUrl }) => {
  return (
    <BlogPreviewContainer href={postUrl} target="_blank" rel="noreferrer noopener" imageUrl={imageUrl}>
      <h2>{title}</h2>
      <p>by {author}</p>
    </BlogPreviewContainer>
  );
};

const BlogStrip = ({ sectorName }) => {
  const [blogPosts] = useMediumFeed('civicdatalab');

  return (
    <BlogStripContainer>
      {blogPosts
        .filter((post) => post.categories.indexOf(sectorName) > -1)
        ?.slice(0, 4)
        .map((post) => (
          <BlogPreview
            key={post.guid}
            title={post.title}
            author={post['dc:creator']}
            imageUrl={getCoverImageUrlFromMediumPost(post['content:encoded'])}
            postUrl={post.link}
          />
        ))}
    </BlogStripContainer>
  );
};

export default BlogStrip;
