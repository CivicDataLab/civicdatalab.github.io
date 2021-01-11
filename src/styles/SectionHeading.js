import styled from 'styled-components';

const SectionHeading = styled.h1`
  font-family: 'Bungee';
  font-size: 32px;
  width: 100px;
  color: ${(props) => (props.light ? 'white' : 'black')};
  text-transform: uppercase;
  margin: 0;

  @media (min-width: 1280px) {
    font-size: 60px;
    width: auto;
  }
  @media (min-width: 1600px) {
    font-size: 120px;
  }
  ${(props) => props.addCSS}
`;

export default SectionHeading;
