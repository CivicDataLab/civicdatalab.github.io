import React from 'react';
import Layout from '../components/Layout/Layout';
import EventComponent from '../components/EventComponent';
import Seo from '../components/Seo/Seo';
import { GlobalStyle } from '../theme/theme';

 const EventPage = () => {
  return (
    <Layout>
      <GlobalStyle />
      <Seo title="Event" />
      <EventComponent />
   </Layout>
  )
 }

 export default EventPage;