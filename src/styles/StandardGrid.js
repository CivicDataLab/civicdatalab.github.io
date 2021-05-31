import styled from 'styled-components';

const StandardGrid = styled.div`
  display: grid;
  row-gap: 30px;

  @media (min-width: 1280px) {
    grid-template-columns: repeat(12, 1fr);
    column-gap: 25px;
  }

  @media (min-width: 1440px) {
    column-gap: 30px;
    row-gap: 36px;
  }

  @media (min-width: 1920px) {
    column-gap: 45px;
    row-gap: 54px;
  }
`;

export default StandardGrid;
