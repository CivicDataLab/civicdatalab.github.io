import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../../theme/theme';
import styled from 'styled-components';
import Footer from './Footer';
import Navbar from './Navbar';

export const Main = styled.main`
  padding-top: 100px;

  @media (min-width: 1024px) {
    padding-top: 120px;
  }
`;

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
