import styled from 'styled-components';

const Button = styled.button`
  color: ${(props) => (props.light ? 'black' : 'white')};
  background-color: ${(props) => (props.light ? 'white' : 'black')};
  font-size: 2em;
  padding: 12px 24px;
  border-radius: 45px;
  border: none;
`;

export default Button;
