import styled from 'styled-components';

const MainGrid = styled.div`
  padding-top: 40px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'left'
    'bottom'
    'right';

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'left right right'
      'left bottom bottom';
  }
`;

export default MainGrid;
