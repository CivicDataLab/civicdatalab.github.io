import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from '../theme/theme';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Navbar />
      <main>{children}</main>
    </ThemeProvider>
  );
};

export default Layout;
