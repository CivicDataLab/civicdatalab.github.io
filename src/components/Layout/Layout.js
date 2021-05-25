import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../../theme/theme';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
