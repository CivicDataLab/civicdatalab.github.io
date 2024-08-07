import React from 'react';
import styled from 'styled-components';
import { getCoverImageUrlFromMediumPost } from '../utils/helpers';
import useMediumFeed from '../hooks/useMediumFeed';
import HeroText from '../styles/HeroText';
import MainContainer from '../styles/MainContainer';

const Container = styled.div`
  margin-bottom: 40px;
  margin-inline: auto;

  .section-heading {
    margin-bottom: 20px;
  }

  @media (min-width: 1280px) {
    .section-heading {
      font-size: 70px;
      line-height: 67px;
    }
  }

  @media (min-width: 1440px) {
    .section-heading {
      font-size: 60px;
      line-height: 60px;
    }
  }
`

const BlogStripContainer = styled.div`
  display: grid;

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

const BlogStrip = () => {
  const [blogPosts] = useMediumFeed('civicdatalab');
  return (
    <Container>
       <MainContainer>
        <HeroText className={'section-heading'}>Latest Blogs</HeroText>
       </MainContainer>
      <BlogStripContainer>
        {blogPosts?.slice(0, 4).map((post) => (
          <BlogPreview
          key={post.guid}
          title={post.title}
          author={post['author']}
          imageUrl={getCoverImageUrlFromMediumPost(post['content'])}
          postUrl={post.link}
          />
          ))}
      </BlogStripContainer>
    </Container>
  );
};

export default BlogStrip;
