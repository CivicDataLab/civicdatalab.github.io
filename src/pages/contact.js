import React from 'react';
import Contact from '../components/Contact';
import Layout from '../components/Layout/Layout';
import Seo from '../components/Seo/Seo';

const ContactPage = () => {
  return (
    <Layout>
      <Seo title="Contact" />
      <Contact />
    </Layout>
  );
};

export default ContactPage;
