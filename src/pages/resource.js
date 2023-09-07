import React from 'react';
import styled from 'styled-components';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import MainContainer from '../styles/MainContainer';
import ImageEventItem from '../components/ImageEventItem';
import Seo from '../components/Seo/Seo';
import useFixedScroll from '../hooks/useFixedScroll';
import StandardGrid from '../styles/StandardGrid';
import { SocialLinks } from '../components/Contact';
import Select from 'react-select';
import blogImg from '../images/icons/blog.svg';
import guideImg from '../images/icons/guidebook.svg';
import publishedImg from '../images/icons/publishedpaper.svg';
import reportImg from '../images/icons/report.svg';
import workingImg from '../images/icons/workingpaper.svg';

export const TitleContainer = styled.div`
  padding: 0;
  font-size: 16px;
  margin-bottom: 10px;
  margin-top: 40px;

  h1,
  h3 {
    text-align: left;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 10px solid black;
  }

  @media (min-width: 1024px) {
    h1 {
      border-bottom: none;
      margin-top: 16px;
    }
  }

  @media (min-width: 1280px) {
    grid-column: 1/4;
    padding-left: 0;
    padding-right: 0;

    h1 {
      padding-bottom: 0;
    }
  }
`;

export const EventsContent = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  grid-template-columns: 1fr;

  @media (min-width: 1024px) {
    padding: 0;
  }

  @media (min-width: 1280px) {
    grid-column: 4/13;
  }
`;

export const EventsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 12px;
  margin-top: 16px;
  padding: 0;

  @media (min-width: 1024px) {
    grid-gap: 24px;
    grid-template-columns: 1fr 1fr;
    margin-top: 20px;
    margin-bottom: 150px;
  }

  @media (min-width: 2000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const HeroText = styled.h1`
  font-family: 'Bungee', cursive;
  font-size: 32px;
  line-height: 32px;
  color: ${(props) => (props.light ? 'white' : 'black')};
  text-transform: uppercase;
  margin: 0;
  text-align: left;
  width: min-content;

  @media (min-width: 1024px) {
    font-size: 50px;
    line-height: 60px;
  }
`;

const SearchOption = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 670px) {
    flex-direction: column;
  }

  .react-select {
    &__menu {
      margin-top: 1px;
      z-index:999;
    }
    &__control {
      width: 300px;
      @media(max-width:720px){
        width: 100%;
      }
  }
`;

const Resources = ({ data }) => {
  const nodes = data.allMarkdownRemark.nodes;

  const [allResources, setAllResources] = React.useState([]);

  const processNodes = () => {
    nodes.forEach((node) => {
      const sector = node.frontmatter.sector;
      const resources = node.frontmatter.resources;

      if (resources) {
        const resourcesWithSector = resources.map((resource) => ({
          ...resource,
          sector: sector
        }));
        setAllResources((prevResources) => [...prevResources, ...resourcesWithSector]);
      }
    });
  };

  React.useEffect(() => {
    processNodes();
  }, [nodes]);

  const leftContainerRef = React.useRef(null);
  const rightContainerRef = React.useRef(null);

  const categories = [
    { value: 'All', label: 'All' },
    { value: 'Working Paper', label: 'Working Paper' },
    { value: 'Reports', label: 'Reports' },
    { value: 'Blog', label: 'Blog' },
    { value: 'Published Papers', label: 'Published Papers' },
    { value: 'Guidebook ', label: 'Guidebook ' }
  ];

  const sectors = [
    { value: 'All', label: 'All' },
    { value: 'Digital Public Goods', label: 'Digital Public Goods' },
    { value: 'Law & Justice', label: 'Law & Justice' },
    { value: 'Public Finance', label: 'Public Finance' },
    { value: 'Urban Development', label: 'Urban Development' },
    { value: 'Open Contracting', label: 'Open Contracting' }
  ];

  const [TypeFilter, setTypeFilter] = React.useState(null);

  const handleFilterChange = (TypeFilter) => {
    setTypeFilter(TypeFilter);
  };

  const [sectorFilter, setSectorFilter] = React.useState(null);

  const handleSectorChange = (sectorFilter) => {
    setSectorFilter(sectorFilter);
  };

  const filteredResources = allResources.filter((resource) => {
    const filterByType = !TypeFilter || TypeFilter.value === 'All' || resource.type === TypeFilter.value;
    const filterBySector = !sectorFilter || sectorFilter.value === 'All' || resource.sector === sectorFilter.value;
    return filterByType && filterBySector;
  });

  useFixedScroll(leftContainerRef, rightContainerRef);

  const imgIcon = {
    'Working Paper': workingImg,
    Reports: reportImg,
    Blog: blogImg,
    'Published Papers': publishedImg,
    Guidebook: guideImg
  };

  return (
    <Layout>
      <Seo title="Our Event" />
      <MainContainer>
        <StandardGrid>
          <TitleContainer ref={leftContainerRef}>
            <HeroText>Our Resources</HeroText>
            <SocialLinks />
          </TitleContainer>
          <EventsContent ref={rightContainerRef}>
            <SearchOption>
              <Select
                classNamePrefix="react-select"
                placeholder="Select a type..."
                options={categories}
                onChange={handleFilterChange}
              />
              <Select
                classNamePrefix="react-select"
                placeholder="Select a sector..."
                options={sectors}
                onChange={handleSectorChange}
              />
            </SearchOption>
            <EventsContainer>
              {filteredResources.length > 0 ? (
                filteredResources.map((res,index) => (
                  <ImageEventItem
                    key={`resource-${index}`}
                    boldText
                    iconImg={imgIcon[res.type]}
                    url={res.link}
                    text={res.title}
                    eventName={res.sector}
                    openInNewTab
                  />
                ))
              ) : (
                <div>
                  Currently there are no resources available for the selected filters. Please choose a different sector
                  and type combination to explore available resources.
                </div>
              )}
            </EventsContainer>
          </EventsContent>
        </StandardGrid>
      </MainContainer>
    </Layout>
  );
};

export default Resources;

export const pageQuery = graphql`
  query ResourceCompQuery {
    allMarkdownRemark(filter: { frontmatter: { type: { eq: "project" } } }, sort: { fields: frontmatter___name }) {
      nodes {
        id

        fields {
          slug
        }
        frontmatter {
          name
          resources {
            title
            link
            type
          }
          sector
        }
      }
    }
  }
`;
