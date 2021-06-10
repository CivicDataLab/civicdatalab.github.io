import React from 'react';
import Layout from '../components/Layout/Layout';
import NotFoundComponent from '../components/NotFoundComponent';
import Seo from '../components/Seo/Seo';

const NotFound = () => {
  return (
    <Layout>
      <Seo title="Not found" />
      <NotFoundComponent />
    </Layout>
  );
};

export default NotFound;
