import styled from 'styled-components';

const MainContainer = styled.div`
  max-width: 1640px;
  width: 100%;
  margin: auto;
  padding: 0 16px;
  box-sizing: border-box;

  @media (min-width: 1280px) {
    padding: 0 46px;
  }

  @media (min-width: 1440px) {
    padding: 0 72px;
  }

  @media (min-width: 1920px) {
    padding: 0;
  }
`;

export default MainContainer;
