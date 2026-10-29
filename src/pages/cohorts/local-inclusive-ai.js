import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../../components/Seo/Seo';
import FitCheck from '../../components/cohort/FitCheck';
import { DEADLINE } from '../../components/cohort/config';
import background from '../../images/cohort/background.webp';
import bubbleBody from '../../images/cohort/bubble-body.webp';
import bubbleTail from '../../images/cohort/bubble-tail.webp';
import cdlLogo from '../../images/cohort/cdl-logo.webp';
import tech4devLogo from '../../images/cohort/tech4dev-logo.webp';
import peopleArt from '../../images/cohort/people.webp';
import flagsArt from '../../images/cohort/flags.webp';
import hillsArt from '../../images/cohort/hills.webp';

const C = {
  blue: '#4A74A0',
  coral: '#E8705F',
  coralDark: '#D85C4B',
  navy: '#0B3865',
  muted: '#4B5B6E',
  bg: '#EEF0F3'
};

const stats = [
  ['6–8', 'NGOs in the cohort'],
  ['5 months', 'core programme, then light-touch support'],
  ['3 focus sectors', 'health, agriculture, public services'],
  ['Hybrid', 'two-day in-person kick-off, virtual mentorship and clinics, in-person closing showcase'],
  ['₹1 lakh', 'subsidised investment, inclusive of taxes'],
  ['7 Nov', 'applications close, 11:59 PM IST']
];

const helps = [
  'Adapt or integrate your solution to local languages and community needs',
  'Strengthen human oversight and feedback loops',
  'Test its effectiveness with intended users, building a practical pathway to sustained adoption and scale'
];

const focusAreas = [
  'Localisation',
  'Community Testing & Evaluation',
  'Human Oversight & Ground Truthing',
  'Feedback & Continuous Improvement',
  'Adoption & Scale'
];

const journey = [
  [
    'Assess and define',
    'Begin by assessing your existing solution, data, language resources, technical infrastructure and organisational readiness. During the two-day kick-off, identify priority users and workflows, pinpoint a focused localisation opportunity, and establish clear metrics to measure success.'
  ],
  [
    'Design, build and integrate',
    'Develop an implementation roadmap and shortlist 2–3 language models suited to your use case, and use human evaluation to select the best fit based on cost, performance and deployment needs. During months 2–4, advance your localisation journey through tailored language modules and AI evaluation support, complemented by expert mentorship, technical clinics, and peer learning.'
  ],
  [
    'Test, learn, and improve',
    'Learn to test your solution with beneficiaries and frontline teams, using voice-based interactions where relevant to enable community participation in feedback and evaluation. Assess language and dialect fit, accuracy, usability, safety and workflow fit, then use community feedback, human review and documented edge cases to improve the solution.'
  ],
  [
    'Showcase and plan adoption',
    'Demonstrate the adapted solution and document what you have learned. Develop a plan for piloting with 50–100 end users, alongside a five-month roadmap for ownership, maintenance, monitoring, costs and expansion.'
  ],
  [
    'Continue implementation',
    'Three light-touch group check-ins will help participants sustain implementation progress, address emerging challenges, and explore opportunities to scale their solutions.'
  ]
];

const leaveWith = [
  'A baseline readiness assessment and a focused localisation roadmap',
  'A local-language prototype integrated into your existing solution',
  'A testing and benchmarking plan, with evidence on language performance, accuracy, usability, safety and workflow fit',
  'A clear pathway to pilot with 50–100 end users, informed by initial user testing',
  'An internal owner and a five-month technical, maintenance, cost and sustainability roadmap',
  'Reusable documentation, implementation patterns and appropriate open-source resources'
];

const invest = [
  'Your travel (flights or trains) to Delhi for the in-person workshop',
  'A Tech Lead or Product Owner to lead implementation'
];

const receive = [
  'Technical mentorship and implementation support',
  'Technical clinics, tailored language modules and AI evaluation support',
  'Peer learning across the cohort',
  'Accommodation and food at the Delhi workshop',
  'An in-person closing showcase',
  'Three light-touch check-ins after the programme'
];

const criteria = [
  'An AI application in production or active development, or a credible AI pilot, with a clear opportunity to improve localisation',
  'An active programme and access to beneficiaries or frontline teams for user research, testing and evaluation',
  'A meaningful localisation need involving language, dialect, contextual content, voice interaction or human escalation',
  'A Tech Lead or Product Owner who can lead implementation, supported by a backup counterpart and organisational leadership',
  'The capacity to allocate staff time, maintain the adapted solution and act on user feedback',
  'Willingness to share appropriate code, documentation, benchmarks and learning as open-source resources'
];

// Computed in the browser so the static build never shows a stale count.
const useDeadlineLabel = () => {
  const [label, setLabel] = useState('');
  useEffect(() => {
    const ms = DEADLINE - Date.now();
    const days = Math.ceil(ms / 86400000);
    if (ms <= 0) setLabel('Applications closed');
    else if (days <= 1) setLabel('Last day to apply');
    else setLabel(`${days} days left to apply`);
  }, []);
  return label;
};

// Reveals journey steps as they scroll into view. Kept in state, not classList,
// because React re-renders would wipe classes added by hand.
const useReveal = () => {
  const [shown, setShown] = useState([]);
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]');
    const show = (el) => setShown((s) => [...s, el.dataset.reveal]);
    if (!('IntersectionObserver' in window)) {
      els.forEach(show);
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.3 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return shown;
};

const CohortPage = () => {
  const deadlineLabel = useDeadlineLabel();
  const closed = deadlineLabel === 'Applications closed';
  const shown = useReveal();

  return (
    <Page>
      <PageStyle />
      <Seo
        title="Local & Inclusive AI Cohort"
        description="Call for applications: CivicDataLab with Gram Vaani, for Tech4Dev. Enabling NGOs to extend local language AI solutions to last-mile users."
      />
      <Helmet>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&display=swap"
        />
      </Helmet>

      <TopBar>
        <span>
          <TopBarCredit>CivicDataLab with Gram Vaani, for Tech4Dev · </TopBarCredit>
          {deadlineLabel}
        </span>
        {!closed && <Button href="#apply">Apply now</Button>}
      </TopBar>

      <Hero>
        <HeroBubble>
          <Logos>
            <img src={cdlLogo} alt="CivicDataLab" />
            <img src={tech4devLogo} alt="Project Tech4Dev" />
            {/* Placeholder until the Gram Vaani logo file arrives. */}
            <LogoText>Gram Vaani</LogoText>
          </Logos>
          <Eyebrow>Call For Applications: Local &amp; Inclusive AI Cohort</Eyebrow>
          <h1>
            You’ve built the AI. Now make it work in the <em>real world</em>
          </h1>
          <Sub>Enabling NGOs to Extend Local Language AI Solutions to Last-Mile Users</Sub>
          <HeroActions>
            {!closed && <Button href="#apply">Apply now</Button>}
            <Button href="#fit" ghost>
              Check if we’re a fit
            </Button>
          </HeroActions>
        </HeroBubble>
        <People src={peopleArt} alt="" />
      </Hero>

      <Section>
        <Stats>
          {stats.map(([big, small]) => (
            <Stat key={big}>
              <strong>{big}</strong>
              <span>{small}</span>
            </Stat>
          ))}
        </Stats>
      </Section>

      <Section narrow>
        <Lead>
          Does your NGO already have an AI solution or is building one, but face challenges in making it useful,
          trusted and widely adopted by communities and frontline teams?
        </Lead>
        <p>The Local and Inclusive AI Cohort will help you</p>
        <Ticks>
          {helps.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </Ticks>

        <h2>About the cohort</h2>
        <p>
          Through the Local &amp; Inclusive AI cohort, CivicDataLab, along with Gram Vaani as knowledge partner, will
          support 6-8 NGOs working in domains like health, agriculture and public services. The programme combines
          technical mentorship, exploration of the open-source multilingual ecosystem, community testing, and peer
          learning across five months, followed by light-touch implementation support post completion.
        </p>
        <p>
          The focus is on improving an existing AI application or a credible pilot. Participating NGOs will own
          implementation, supported by mentors who help them make practical design, integration and evaluation
          choices.
        </p>
        <h3>Cohort focus areas</h3>
        <Chips>
          {focusAreas.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </Chips>
      </Section>

      <Section narrow>
        <JourneyHead>
          <h2>Programme structure</h2>
          <img src={flagsArt} alt="" />
        </JourneyHead>
        <Journey>
          {journey.map(([title, body], i) => (
            <Step key={title} data-reveal={i} className={shown.includes(String(i)) ? 'in' : ''}>
              <Flag aria-hidden="true">{i + 1}</Flag>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </Step>
          ))}
        </Journey>

        <h2>Programme approach</h2>
        <p>
          The programme follows a learn, build, test, iterate and share approach. CivicDataLab will lead cohort
          management, readiness assessment, technical mentorship and participatory evaluation exercises. Gram Vaani
          will contribute expertise in voice-first design, community engagement, contextualisation, human oversight
          and feedback processes.
        </p>
        <p>
          Participants will work on their own products throughout the cohort. Support will include co-design
          sessions, implementation rubrics, technical troubleshooting, demonstrations and peer learning, tailored to
          each NGO’s use case and starting point.
        </p>
        <h3>What you will leave with</h3>
        <Ticks>
          {leaveWith.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </Ticks>
        <Note>
          Success will be assessed against each NGO’s agreed use case, including user value, technical performance,
          field adoption, internal capacity and sustainability. The end-of-cohort goal is pilot readiness; reaching
          50–100 users is not a guaranteed programme outcome.
        </Note>
      </Section>

      <Band>
        <BandInner>
          <h2>The investment</h2>
          <p>
            This subsidised fee covers technical mentorship, implementation support and peer learning at
            substantially below the full programme cost.
          </p>
          <Cards>
            <Card>
              <h3>What you invest</h3>
              <Price>
                ₹1 lakh <span>per organisation, inclusive of taxes</span>
              </Price>
              <Ticks>
                {invest.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </Ticks>
              <Button href="#fit">Check if we’re a fit</Button>
            </Card>
            <Card>
              <h3>What you receive</h3>
              <Ticks>
                {receive.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </Ticks>
              {!closed && <Button href="#apply">Apply now</Button>}
            </Card>
          </Cards>
        </BandInner>
      </Band>

      <Section narrow>
        <h2>Who should apply</h2>
        <p>
          We invite applications from NGOs working in health, agriculture, and public services that can demonstrate
          the following:
        </p>
        <Ticks>
          {criteria.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </Ticks>
        <Note>
          Applications will be assessed for AI maturity, the value and feasibility of the proposed localisation, data
          and language readiness, team bandwidth, access to users and capacity to sustain implementation. Operational
          budget and technology investment will also inform the assessment.
        </Note>
      </Section>

      <Section id="fit">
        <FitCheck />
      </Section>

      <Section id="apply" narrow>
        <h2>Apply</h2>
        {closed ? (
          <p>Applications for this cohort have closed. Thank you for your interest.</p>
        ) : (
          <p>The application form opens here soon.</p>
        )}
        <p>
          Not sure yet? <a href="#fit">Check if we’re a fit</a> first.
        </p>
      </Section>

      <Hills src={hillsArt} alt="" />
      <Footer>
        <a href="/">civicdatalab.in</a>
      </Footer>
    </Page>
  );
};

export default CohortPage;

const PageStyle = createGlobalStyle`
  html { scroll-behavior: smooth; }
  body { margin: 0; background: #F4F5F7 url(${background}) top center / 100% auto repeat-y; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`;

const Page = styled.div`
  font-family: 'Inter', system-ui, sans-serif;
  color: ${C.navy};
  font-size: 1rem;
  line-height: 1.6;
  * { box-sizing: border-box; }
  h1, h2, h3 { line-height: 1.2; margin: 0 0 0.75rem; }
  h2 { font-size: 2rem; font-weight: 700; margin-top: 2.5rem; }
  h3 { font-size: 1.25rem; font-weight: 600; margin-top: 1.5rem; }
  p { margin: 0 0 1rem; color: ${C.muted}; }
  a { color: ${C.blue}; }
  section { scroll-margin-top: 80px; }
`;

const TopBar = styled.header`
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 16px;
  background: rgba(238, 240, 243, 0.95);
  backdrop-filter: blur(6px);
  font-size: 0.9rem;
  @media (min-width: 768px) { padding: 12px 32px; }
`;

const TopBarCredit = styled.span`
  @media (max-width: 640px) { display: none; }
`;

const Button = styled.a`
  display: inline-block;
  padding: 10px 22px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  background: ${(p) => (p.ghost ? 'transparent' : C.coral)};
  color: #fff !important;
  border: 2px solid ${(p) => (p.ghost ? '#fff' : C.coral)};
  transition: background 0.15s;
  &:hover { background: ${(p) => (p.ghost ? 'rgba(255,255,255,0.15)' : C.coralDark)}; }
  &:focus-visible { outline: 3px solid ${C.navy}; outline-offset: 2px; }
`;

const Hero = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
`;

// The bubble art is 9-sliced so its brush edges and corners survive any box size;
// the tail is a separate piece hung off the bottom edge.
const bubble = (corner, tailW) => `
  position: relative;
  border: 0 solid transparent;
  border-image: url(${bubbleBody}) 130 fill / ${corner} stretch;
  &::after {
    content: '';
    position: absolute;
    top: calc(100% - ${tailW * 0.25}px);
    left: max(18%, ${corner} + 12px);
    width: ${tailW}px;
    height: ${tailW * 1.33}px;
    background: url(${bubbleTail}) top / contain no-repeat;
  }
`;

const HeroBubble = styled.div`
  ${bubble('90px', 150)}
  color: #fff;
  text-align: center;
  padding: 28px 20px 48px;
  margin-bottom: 150px;
  h1 { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 500; letter-spacing: -0.02em; margin: 0.5rem 0 1rem; }
  em { color: ${C.coral}; font-weight: 800; font-style: italic; }
`;

const Logos = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  background: #fff;
  padding: 12px 22px;
  border-radius: 14px;
  margin-bottom: 16px;
  img { height: 48px; width: auto; }
`;

const LogoText = styled.span`
  color: ${C.navy};
  font-weight: 700;
`;

const Eyebrow = styled.p`
  color: #fff !important;
  font-size: 1.1rem;
`;

const Sub = styled.p`
  color: #fff !important;
  font-weight: 600;
  font-size: 1.15rem;
  max-width: 560px;
  margin: 0 auto 1.5rem !important;
`;

const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

const People = styled.img`
  display: block;
  width: 100%;
  max-width: 640px;
  height: auto;
  margin: 0 auto 24px;
`;

const Hills = styled.img`
  display: block;
  width: 100%;
  max-width: 560px;
  height: auto;
  margin: 24px 0 0 auto;
`;

const JourneyHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  h2 { margin-bottom: 0; }
  img { width: 140px; height: auto; flex: none; }
`;

const Section = styled.section`
  max-width: ${(p) => (p.narrow ? '760px' : '1100px')};
  margin: 0 auto;
  padding: 32px 16px;
`;

const Stats = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 96px 24px;
  margin-bottom: 80px;
  @media (min-width: 560px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, 1fr); }
`;

const Stat = styled.li`
  ${bubble('48px', 72)}
  color: #fff;
  padding: 28px 24px 32px;
  text-align: center;
  strong { display: block; font-size: 2.25rem; font-weight: 800; line-height: 1.1; }
  span { display: block; margin-top: 6px; font-size: 0.95rem; opacity: 0.9; }
`;

const Lead = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${C.navy} !important;
`;

const Ticks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem;
  li { position: relative; padding-left: 28px; margin-bottom: 10px; }
  li::before {
    content: '';
    position: absolute;
    left: 4px;
    top: 0.55em;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: ${C.coral};
  }
`;

const Chips = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  li { background: #fff; border: 1px solid #D5DCE4; border-radius: 999px; padding: 8px 16px; font-weight: 500; }
`;

const Note = styled.p`
  font-size: 0.9rem;
  border-left: 3px solid ${C.blue};
  padding-left: 12px;
`;

const Journey = styled.ol`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: 21px;
    top: 10px;
    bottom: 10px;
    border-left: 4px dashed #5BC0BE;
  }
`;

const Step = styled.li`
  position: relative;
  display: flex;
  gap: 20px;
  margin-bottom: 28px;
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.5s, transform 0.5s;
  &.in { opacity: 1; transform: none; }
  h3 { margin-top: 6px; }
  @media (prefers-reduced-motion: reduce) { opacity: 1; transform: none; transition: none; }
`;

const Flag = styled.span`
  flex: none;
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: ${C.coral};
  color: #fff;
  font-weight: 800;
  font-size: 1.1rem;
  position: relative;
`;

const Band = styled.div`
  background: ${C.blue};
  color: #fff;
  margin: 32px 0;
  h2 { margin-top: 0; }
  > div > p { color: #E6EDF5; }
`;

const BandInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 56px 16px;
`;

const Cards = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 24px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  color: ${C.navy};
  border-radius: 24px;
  padding: 28px;
  h3 { margin-top: 0; }
  ${Button} { margin-top: auto; align-self: center; }
`;

const Price = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${C.navy} !important;
  line-height: 1.1;
  span { display: block; font-size: 0.95rem; font-weight: 500; color: ${C.muted}; }
`;

const Footer = styled.footer`
  background: ${C.navy};
  text-align: center;
  padding: 20px 16px;
  a { color: #fff; }
`;
