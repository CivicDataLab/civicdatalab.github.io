import { createGlobalStyle } from 'styled-components';

export const theme = {
  palette: {
    primaryTextColor: 'black',
    secondaryTextColor: 'white',
    primaryBackground: '#477AB5'
  },
  typography: {
    fontSize: '18px'
  }
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Montserrat', sans-serif;
    font-size: 18px;
    padding: 0;
    margin: 0;
  }
`;
