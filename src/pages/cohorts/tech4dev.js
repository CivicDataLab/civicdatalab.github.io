import React, { useEffect, useRef, useState } from 'react';
import FitCheck from '../../components/cohort/FitCheck';
import ApplyForm from '../../components/cohort/ApplyForm';
import { TECH4DEV } from '../../components/cohort/config';
import { TECH4DEV_SECTIONS } from '../../components/cohort/questions';
import {
  deadlineText,
  useDeadlineLabel,
  useReveal,
  CohortHead,
  Page,
  TopBar,
  TopBarCredit,
  Button,
  Hero,
  HeroBubble,
  Logos,
  Eyebrow,
  Sub,
  HeroActions,
  PeopleArt,
  JourneyHead,
  JourneyAxis,
  Section,
  StatsBand,
  QuoteBand,
  Ticks,
  Chips,
  CardGrid,
  Note,
  Trail,
  TrailStep,
  PilotEnd,
  useScrollProgress,
  Flag,
  Band,
  BandInner,
  Cards,
  Card,
  Price,
  CtaBand,
  Consent,
  Footer
} from '../../components/cohort/layout';
import cdlLogo from '../../images/cohort/cdl-logo.webp';
import tech4devLogo from '../../images/cohort/tech4dev-logo.webp';
import peopleArt from '../../images/cohort/people.webp';
import flagsArt from '../../images/cohort/flags.webp';
import hillsArt from '../../images/cohort/hills.webp';
import chatLeft from '../../images/cohort/chat-left.webp';
import chatRight from '../../images/cohort/chat-right.webp';

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

const consent = (
  <Consent>
    By submitting this form, you consent to CivicDataLab, Gram Vaani and Tech4Dev collecting and using the information
    you provide to assess your application for the Local &amp; Inclusive AI Cohort and to contact you about it,
    including if you are selected. To withdraw your consent at any time, to exercise your rights under the Digital
    Personal Data Protection Act, 2023, or to make a complaint, please email us at{' '}
    <a href="mailto:dpg@civicdatalab.in">dpg@civicdatalab.in</a>.
  </Consent>
);

const CohortPage = () => {
  const deadlineLabel = useDeadlineLabel(TECH4DEV.deadline);
  const closed = deadlineLabel === 'Applications closed';
  const shown = useReveal();
  const trailRef = useRef(null);
  useScrollProgress(trailRef);
  const [fitOpen, setFitOpen] = useState(false);
  useEffect(() => {
    if (window.location.hash === '#fit') setFitOpen(true);
  }, []);

  return (
    <Page>
      <CohortHead
        title="Local & Inclusive AI Cohort"
        description="Call for applications: CivicDataLab with Gram Vaani, for Tech4Dev. Enabling NGOs to extend local language AI solutions to last-mile users."
      />

      <TopBar>
        <span>
          <TopBarCredit>CivicDataLab with Gram Vaani, for Tech4Dev · </TopBarCredit>
          {deadlineLabel}
        </span>
        {!closed && <Button href="#apply">Apply now</Button>}
      </TopBar>

      <Hero>
        <HeroBubble art="flat">
          <Logos>
            <img src={cdlLogo} alt="CivicDataLab" style={{ height: 64 }} />
            <img src={tech4devLogo} alt="Project Tech4Dev" />
          </Logos>
          <Eyebrow>Call For Applications: Local &amp; Inclusive AI Cohort</Eyebrow>
          <h1>
            You’ve built the AI. Now make it work in the <em>real world</em>
          </h1>
          <Sub>Enabling NGOs to Extend Local Language AI Solutions to Last-Mile Users</Sub>
          <HeroActions>
            {!closed && <Button href="#apply">Apply now</Button>}
            <Button href="#fit" ghost onClick={() => setFitOpen(true)}>
              Check if we’re a fit
            </Button>
          </HeroActions>
        </HeroBubble>
        <PeopleArt src={peopleArt} left={chatLeft} right={chatRight} />
      </Hero>

      <StatsBand>
        {stats.map(([big, small]) => (
          <li key={big}>
            <strong>{big}</strong>
            <span>{small}</span>
          </li>
        ))}
      </StatsBand>

      <QuoteBand>
        Does your NGO already have an AI solution or is building one, but face challenges in making it useful, trusted
        and widely adopted by communities and frontline teams?
      </QuoteBand>

      <Section narrow>
        <p>The Local &amp; Inclusive AI Cohort will help you</p>
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
          implementation, supported by mentors who help them make practical design, integration and evaluation choices.
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
        <JourneyAxis>
          <span>15 November</span>
          <span className="dash">–</span>
          <span>31 March</span>
        </JourneyAxis>
        <Trail ref={trailRef}>
          {['base', 'fill'].map((layer) => (
            <svg key={layer} className={`trail ${layer}`} viewBox="0 0 46 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M23 0 C 9 6, 9 16, 23 25 S 37 44, 23 50 S 9 68, 23 75 S 37 94, 23 100" />
            </svg>
          ))}
          {journey.map(([title, body], i) => (
            <TrailStep id={`step-${i}`} key={title} data-reveal={i} className={shown.includes(String(i)) ? 'in' : ''}>
              <Flag aria-hidden="true">{i + 1}</Flag>
              <div>
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
            </TrailStep>
          ))}
        </Trail>
        <PilotEnd>
          <img src={flagsArt} alt="" />
          Pilot-ready
        </PilotEnd>
      </Section>

      <Section narrow>
        <h2 style={{ marginTop: 0 }}>Programme approach</h2>
        <p>
          The programme follows a learn, build, test, iterate and share approach. CivicDataLab will lead cohort
          management, readiness assessment, technical mentorship and participatory evaluation exercises. Gram Vaani will
          contribute expertise in voice-first design, community engagement, contextualisation, human oversight and
          feedback processes.
        </p>
        <p>
          Participants will work on their own products throughout the cohort. Support will include co-design sessions,
          implementation rubrics, technical troubleshooting, demonstrations and peer learning, tailored to each NGO’s
          use case and starting point.
        </p>
      </Section>

      {/* horizontal cards (tick beside text) at text width */}
      <Section narrow style={{ paddingTop: 16, paddingBottom: 0 }}>
        <h2 style={{ marginTop: 0 }}>What you will leave with</h2>
        <CardGrid check>
          {leaveWith.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </CardGrid>
      </Section>

      <Section narrow style={{ paddingTop: 0 }}>
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
            This subsidised fee covers technical mentorship, implementation support and peer learning at substantially
            below the full programme cost.
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
              <Button href="#fit" onClick={() => setFitOpen(true)}>
                Check if we’re a fit
              </Button>
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
          We invite applications from NGOs working in health, agriculture, and public services that can demonstrate the
          following:
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

      <Section id="fit" narrow>
        <Card style={{ alignItems: 'center', textAlign: 'center' }}>
          {!fitOpen && (
            <>
              <h3 style={{ marginTop: 0 }}>Are we a fit? Check in a minute</h3>
              <p>We&apos;ll save your answers and your email so we can follow up.</p>
            </>
          )}
          <Button
            as="button"
            type="button"
            style={{ border: 0 }}
            aria-expanded={fitOpen}
            aria-controls="fit-panel"
            onClick={() => setFitOpen((open) => !open)}
          >
            {fitOpen ? 'Hide the fit check' : 'Check if we’re a fit'}
          </Button>
        </Card>
        {fitOpen && (
          <div id="fit-panel" style={{ marginTop: 16 }}>
            {consent}
            <FitCheck scriptUrl={TECH4DEV.scriptUrl} />
          </div>
        )}
      </Section>

      <Section id="apply" narrow>
        <h2>Apply</h2>
        {closed ? (
          <p>Applications for this cohort have closed. Thank you for your interest.</p>
        ) : (
          <>
            {consent}
            <ApplyForm
              sections={TECH4DEV_SECTIONS}
              scriptUrl={TECH4DEV.scriptUrl}
              heading="NGO screening questionnaire"
              intro={
                <>
                  This screening form takes approximately 5–7 minutes. All questions are required. Rough answers are
                  fine where exact figures aren't available. Responses are used for screening only and do not guarantee
                  a cohort seat. For queries, write to <a href="mailto:dpg@civicdatalab.in">dpg@civicdatalab.in</a>.
                </>
              }
              thanks={
                <>
                  <p>
                    <strong>Thank you for your interest in the Local and Inclusive AI Cohort.</strong>
                  </p>
                  <p>
                    We will review your responses and contact you if further information is needed or to discuss next
                    steps.
                  </p>
                </>
              }
            />
          </>
        )}
      </Section>

      <CtaBand>
        <div>
          <h2>From AI pilot to implementation. What’s your next move?</h2>
          <p>
            If your organisation is ready to make its existing AI solution more accessible and useful in the field, we
            invite you to apply.
          </p>
          {!closed && (
            <p>
              <Button href="#apply">Apply now</Button>
            </p>
          )}
          <p style={{ marginBottom: 0 }}>
            Applications close: {deadlineText(TECH4DEV.deadline)}
            <br />
            For queries, reach out to: <a href="mailto:dpg@civicdatalab.in">dpg@civicdatalab.in</a>
          </p>
        </div>
        <img src={hillsArt} alt="" />
      </CtaBand>
      <Footer>
        <a href="/">civicdatalab.in</a>
      </Footer>
    </Page>
  );
};

export default CohortPage;
