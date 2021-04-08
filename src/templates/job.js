import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../components/Layout';
import Perk from '../components/Perk';
import ApplicationProcess from '../components/ApplicationProcess';

const JobContainer = styled.div`
  padding-top: 50px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    'description'
    'roles'
    'about';

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'roles description description'
      'about about about';
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    grid-template-areas:
      'roles description description'
      'roles about about';
  }
`;

const DescriptionContainer = styled.div`
  grid-area: description;
  background-color: #0000001a;
  font-size: 18px;
  padding: 48px 32px;
  line-height: 28px;

  h2 {
    font-size: 20px;
    text-transform: uppercase;
    margin-top: 32px;
  }

  p {
    line-height: 28px;
  }

  a {
    color: #208da7;
    margin-right: 16px;
    font-size: inherit;
  }

  @media (min-width: 1440px) {
    padding-right: 144px;

    h2 {
      font-size: 18px;
      margin-top: 48px;
    }
  }
`;

const AboutContainer = styled.div`
  grid-area: about;
  font-size: 18px;
  padding: 0 32px;
  line-height: 28px;

  & > div {
    margin: 40px 0;
  }

  h2 {
    font-size: 22px;
    text-transform: uppercase;
  }

  p {
    line-height: 28px;
  }

  ul {
    padding-left: 14px;
  }

  li {
    font-weight: 600;
    margin-bottom: 12px;
  }

  @media (min-width: 1024px) {
    p {
      max-width: 600px;
    }
  }

  @media (min-width: 1440px) {
    font-size: 18px;
    padding-right: 72px;

    & > div {
      margin: 60px 0;
    }

    h2 {
      font-size: 18px;
    }
  }
`;

const RolesContainer = styled.div`
  grid-area: roles;
  font-size: 18px;
  padding: 0 32px;

  h2 {
    font-size: 22px;
  }

  p {
    line-height: 28px;
  }

  @media (min-width: 1440px) {
    padding: 0 72px;
    font-size: 18px;

    h2 {
      font-size: 18px;
    }
  }
`;

const Header = styled.div`
  font-size: 18px;
  padding: 0 32px;

  h1 {
    font-family: Bungee;
    font-size: 2em;
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 8px solid black;
  }

  p {
    line-height: 28px;
    margin: 0;
  }

  @media (min-width: 1024px) {
    h1 {
      font-size: 60px;
      border: none;
      padding: 0;
    }

    p {
      display: none;
    }
  }

  @media (min-width: 1440px) {
    padding: 0 72px;
  }
`;

const PerksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1440px) {
    margin-top: 100px;
  }
`;

const ApplicationProcessContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 1440px) {
    margin-top: 100px;
  }
`;

const RecentWork = styled.ul`
  li {
    font-weight: 400;
  }

  a {
    color: #208da7;
  }
`;

const perks = [
  {
    title: 'Wellness 40,000 / yr',
    description:
      'Gym membership or yoga therapy, Learn to play a music instrument, Photography lessons, Anything for your well being',
    logo: ''
  },
  {
    title: 'Personal Growth & Development 50,000 / yr',
    description: 'Online courses, Hardware or software licenses, Summer schools, Events & conferences',
    logo: ''
  },
  {
    title: 'Home Office Setup 25,000 / yr',
    description:
      'Since you work remotely, we want to make sure your home office is comfortable. You can expense up to INR 25,000 annually to set up your home office. This includes internet services, other tech infrastructure, etc.',
    logo: ''
  },
  {
    title: 'Coworking Space Stipend',
    description:
      'CivicDataLab encourages usage of coworking spaces. Please make sure you’re using a true coworking space that’s meant solely for working, not a club or social space.',
    logo: ''
  }
];

const applicationProcess = [
  {
    logo: '',
    description:
      'Please be descriptive in the letter you write. Honest and jargon-free letters are ones that we really look forward to reading. If we like your profile, then we’ll share a link to a form. This helps us know you better. Just one ask, be honest when you share your thought'
  },
  {
    logo: '',
    description:
      'We will review your application and setup a quick phone call. The phone call acts as a good way to introduce yourself and for us to let you know a bit more about our work. This call will be followed up with an assignment.'
  },
  {
    logo: '',
    description:
      'After you’ve spent some time on it, we’ll arrange a working session with a member from our team so both of you can directly collaborate and exchange ideas around the task.'
  },
  {
    logo: '',
    description:
      'We’ll then arrange a final discussion with other members of the team where we discuss CDL, our experiences and the journey we’ve been a part of. This is the time when you share your concerns, share your ideas, and just be part of a casual conversation.'
  },
  {
    logo: '',
    description:
      'Once this is done, and if we still sound excited to get you on-board, we will extend an offer within 3 days. We ideally like to close this process within 2 weeks from the date of our first conversation.'
  }
];

const Job = ({ data }) => {
  const job = data.markdownRemark;

  console.log(job.frontmatter.expectations);

  return (
    <Layout>
      <Header>
        <h1>{job.frontmatter.title}</h1>
        <p>CivicDataLab works across sectors to increase access to information.</p>
      </Header>
      <JobContainer>
        <DescriptionContainer>
          <p>{job.frontmatter.description}</p>
          <h2>Apply</h2>
          <div>
            <a href={job.frontmatter.angellist} target="_blank" rel="noreferrer">
              AngelList
            </a>
            <a href="mailto:careers@civicdatalab.in">Email</a>
          </div>
        </DescriptionContainer>
        <RolesContainer>
          <h2>Roles of a {job.frontmatter.title}</h2>
          {job.frontmatter.roles.map((role) => (
            <p key={role}>{role}</p>
          ))}
        </RolesContainer>
        <AboutContainer>
          <div>
            <h2>About us</h2>
            <p>
              As a team we’re moderately federated and our work is defined by the sectors we operate in. Public Finance,
              Law & Justice and Urban Local governance are a few sectors where we’re actively engaging with our
              collaborators. The outputs, outcomes and future opportunities are always as per the needs, requirements,
              partnerships and opportunities available at a sector level.
            </p>
            <p>
              This structure also helps us find, share and validate our ideas across sectors. A good example here is the
              Open Budgets India platform, which we created to curate all important public finance data at one place.
              Our learnings here help us in creating the Justice Hub, which is a collaborative data platform for
              curating legal datasets.
            </p>
          </div>
          <div>
            <h2>Our expectations</h2>
            {job.frontmatter.expectations.map((expection) => (
              <div key={expection}>
                <p style={{ fontWeight: '600' }}>{expection.split(' - ')[0]}</p>
                <p>{expection.split(' - ')[1]}</p>
              </div>
            ))}
          </div>
          <div>
            <h2>Good to have</h2>
            <ul>
              {job.frontmatter.goodtohave.map((good) => (
                <li key={good}>{good}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Our most recent work</h2>
            <RecentWork>
              <li>
                Developing{' '}
                <a href="https://zombietracker.in" target="_blank" rel="noreferrer noopener">
                  a case-law tracker
                </a>{' '}
                with{' '}
                <a href="https://internetfreedom.in/" target="_blank" rel="noreferrer noopener">
                  Internet Freedom Foundation
                </a>{' '}
                to track cases registered under the now unconstitutional section 66A of the Information Technology Act.
              </li>
              <li>
                Tracking the implementation of the POCSO act by studying the case-laws from three different states.
              </li>
              <li>
                Building the{' '}
                <a href="https://justicehub.in/" target="_blank" rel="noreferrer noopener">
                  JusticeHub
                </a>{' '}
                - To enable communities to discover, share, create and harness open data on justice.
              </li>
              <li>
                Creating an OSS-Landscape report chronicling the journey of the Open Source Movement in India and
                developing a strategic roadmap for its adoption in India.
              </li>
              <li>
                We are co-creating{' '}
                <a href="https://openbudgetsindia.org/" target="_blank" rel="noreferrer noopener">
                  Open Budgets India Initiative
                </a>
                , to make India’s public budget and spending data more open, usable and easy to comprehend. It has some
                key open-source data analytics tools like Union Budget Explorer, Assam Budget Explorer and more.
              </li>
              <li>
                We have also worked on a crowdsourced disaster management platform{' '}
                <a href="https://petabencana.id/" target="_blank" rel="noreferrer noopener">
                  PetaBencana
                </a>{' '}
                and are currently re-building a city level open data platform OpenCity to enable more data led
                conversations in cities.
              </li>
            </RecentWork>
          </div>
          <div>
            <h2>Application Process</h2>
            <ApplicationProcessContainer>
              {applicationProcess.map((process) => (
                <ApplicationProcess key={process.description} description={process.description} />
              ))}
            </ApplicationProcessContainer>
          </div>
          <div>
            <h2>Perks</h2>
            <PerksContainer>
              {perks.map((perk) => (
                <Perk key={perk.title} title={perk.title} description={perk.description} />
              ))}
            </PerksContainer>
          </div>
        </AboutContainer>
      </JobContainer>
    </Layout>
  );
};

export default Job;

export const pageQuery = graphql`
  query JobQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        description
        roles
        goodtohave
        expectations
        angellist
      }
    }
  }
`;
