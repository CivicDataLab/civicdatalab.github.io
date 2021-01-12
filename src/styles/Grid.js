import styled from 'styled-components';

// General purpose grid

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.itemWidth
      ? `repeat(auto-fill, minmax(min(${props.itemWidth}px, 100%), 1fr))`
      : `repeat(auto-fill, minmax(min(360px, 100%), 1fr));`};
`;

export default Grid;
