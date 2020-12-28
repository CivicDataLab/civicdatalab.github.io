import styled from 'styled-components';

// General purpose grid

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(50%, 100%), 1fr));
`;

export default Grid;
