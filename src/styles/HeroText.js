import styled from 'styled-components';

const HeroText = styled.h1`
  font-family: 'Bungee', cursive;
  font-size: 120px;
  color: ${(props) => (props.light ? 'white' : 'black')};
  text-transform: uppercase;
  margin: 0;
`;

export default HeroText;
