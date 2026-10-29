import React, { useState } from 'react';
import styled from 'styled-components';
import ApplyForm from '../../components/cohort/ApplyForm';
import { UNDP } from '../../components/cohort/config';
import { UNDP_SECTIONS } from '../../components/cohort/questions';
import {
  C,
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
  People,
  JourneyHead,
  Section,
  Stats,
  Stat,
  bubble,
  Lead,
  Ticks,
  Note,
  Journey,
  Step,
  Flag,
  Band,
  BandInner,
  Cards,
  Card,
  Price,
  Footer
} from '../../components/cohort/layout';
import cdlLogo from '../../images/cohort/cdl-logo.webp';
import undpLogo from '../../images/cohort/undp-logo.webp';
import heroArt from '../../images/cohort/undp-hero.webp';
import flagsArt from '../../images/cohort/flags.webp';
import coralCard from '../../images/cohort/coral-card.webp';
import whiteBubbleBody from '../../images/cohort/bubble-white-body.webp';
import whiteBubbleTail from '../../images/cohort/bubble-white-tail.webp';
import grainTile from '../../images/cohort/grain-tile.webp';

const stats = [
  ['~100', 'CSO representatives across cohorts'],
  ['Free of cost', 'participation fee'],
  ['Mostly virtual', 'one in-person cohort in Delhi/NCR for about 30'],
  ['4 skill areas', 'documentation, data, outreach, workflow'],
  ['Free tools', 'open-source or freely accessible']
];

// ponytail: placeholder line icons; swap for the CDL icon set when the files arrive.
const icon = (paths) => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {paths}
  </svg>
);

const tools = [
  [
    icon(<path d="M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6" />),
    'AI for proposals, documentation and reports',
    'Use AI-enabled assistants to support drafting, structuring and reviewing proposals, organisational documentation and reports, while checking outputs and protecting sensitive information.'
  ],
  [
    icon(<path d="M4 20h16M7 16v-5M12 16V6M17 16v-8" />),
    'Data analysis and visualisation',
    'Explore tools for analysing programme data, identifying patterns and presenting findings clearly for reporting and evidence-based advocacy.'
  ],
  [
    icon(<path d="M4 10v4h3l6 4V6l-6 4zM17 9a4 4 0 0 1 0 6" />),
    'Communication, outreach and storytelling',
    'Use digital platforms to communicate organisational work, strengthen outreach and develop stories grounded in evidence.'
  ],
  [
    icon(<path d="M9 6h11M9 12h11M9 18h11M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2" />),
    'Workflow management and collaboration',
    'Explore tools that support task coordination, team collaboration and everyday digital productivity.'
  ]
];

const journey = [
  [
    'Understand your starting point',
    'A baseline assessment will explore current digital infrastructure, access to devices and connectivity, tool use, AI awareness and organisational practices. The findings will inform training content and grouping by digital readiness, so that participants can learn at an appropriate pace.'
  ],
  [
    'Build practical skills',
    'Participants will learn through four connected modules, using demonstrations, guided exercises and CSO-relevant examples.'
  ],
  [
    'Practise with support',
    'Training will include live sessions, hands-on tasks, demonstrations, recorded modules and practical resources. Approximately 30 participants will join a two-day workshop in Delhi/NCR; remaining participants will be reached through virtual cohorts. Cohort allocation and the confirmed session schedule will be shared with selected applicants. Mentoring clinics, troubleshooting support and peer exchange will help participants apply tools to their own organisational tasks. The proposed approach includes a helpdesk, a discussion forum and peer champions who can support continued learning within and across organisations.'
  ]
];

const priorities = [
  'Organisations working in education, skill development, women’s economic empowerment and livelihoods, particularly those led by or serving marginalised communities, including tribal populations',
  'Organisations working in underserved regions and supporting communities with limited access to digital tools and resources',
  'Organisations seeking to use AI and digital technologies to strengthen their work, expand their reach and improve their impact',
  'Organisations with multi-state operations or the potential to scale their work'
];

const expectations = [
  'Organisations should nominate a representative whose work relates to one or more of the learning areas and who can apply and share the learning internally.',
  'Complete the baseline assessment and share relevant learning needs and access requirements',
  'Attend the sessions assigned to your cohort and complete the hands-on exercises',
  'Bring an organisational task or workflow to explore, using appropriate non-sensitive or de-identified material',
  'Participate in peer learning, provide feedback and complete the end-line assessment',
  'If allocated to the Delhi/NCR cohort, attend the two-day workshop and arrange travel at your own or your organisation’s cost'
];

const outcomes = [
  'Improve organisational efficiency by using digital and AI tools to reduce efforts on routine tasks',
  'Select appropriate AI and digital tools for common CSO tasks and understand their benefits, limitations and costs',
  'Use tools to support documentation, proposal writing, reporting, data analysis, visualisation, communication and collaboration',
  'Apply privacy, consent, bias awareness and human review to decisions about AI and digital tool use',
  'Identify practical opportunities to improve organisational workflows and share learning with colleagues',
  'Assess their progress and identify priorities for continued learning and adoption'
];

const deadlineText = UNDP.deadline
  ? UNDP.deadline.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      hour: 'numeric',
      minute: '2-digit',
      timeZone: 'Asia/Kolkata'
    }) + ' IST'
  : '';

// Opens the phone's share sheet; on desktop, copies the link instead.
const ShareButton = () => {
  const [copied, setCopied] = useState(false);
  const share = async () => {
    const url = window.location.href.split('#')[0];
    if (navigator.share) {
      try {
        await navigator.share({ title: 'AI & Digital Tools for CSOs: call for applications', url });
      } catch (e) {
        // closing the share sheet rejects; nothing to do
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (e) {
      window.prompt('Copy this link:', url);
    }
  };
  return (
    <Button as="button" type="button" outline onClick={share} aria-live="polite">
      {copied ? 'Link copied' : 'Share with another CSO'}
    </Button>
  );
};

const UndpCohortPage = () => {
  const deadlineLabel = useDeadlineLabel(UNDP.deadline);
  const closed = deadlineLabel === 'Applications closed';
  const shown = useReveal();

  return (
    <Page>
      <CohortHead
        title="AI & Digital Tools for CSOs"
        description="Call for applications: CivicDataLab with UNDP India. AI and digital skills for the organisations closest to communities."
        background={`#fafafa url(${grainTile}) 0 0 / 600px repeat`}
      />

      <TopBar>
        <span>
          <TopBarCredit>CivicDataLab with UNDP India · </TopBarCredit>
          {deadlineLabel || 'Applications open'}
        </span>
        {!closed && <Button href="#apply">Apply now</Button>}
      </TopBar>

      <Hero>
        <HeroBubble>
          <Logos>
            <img src={cdlLogo} alt="CivicDataLab" />
            <img src={undpLogo} alt="UNDP" style={{ height: 72 }} />
          </Logos>
          <Eyebrow>Call for Applications: AI &amp; Digital Tools for CSOs</Eyebrow>
          <h1>
            AI &amp; digital skills for the organisations <em>closest to communities</em>
          </h1>
          <Sub>Building practical skills for stronger programmes and evidence based advocacy</Sub>
          <HeroActions>
            {!closed && <Button href="#apply">Apply now</Button>}
            <Button href="#how" ghost>
              See how it works
            </Button>
          </HeroActions>
        </HeroBubble>
        <People src={heroArt} alt="" style={{ maxWidth: 420 }} />
      </Hero>

      <Section>
        <CenteredStats>
          {stats.map(([big, small]) => (
            <WhiteStat key={big}>
              <strong>{big}</strong>
              <span>{small}</span>
            </WhiteStat>
          ))}
        </CenteredStats>
      </Section>

      <Section narrow>
        <h2>Every CSO carries a long to-do list</h2>
        <Lead>
          A proposal due on Friday. Programme data nobody has had time to chart. A story from the community that
          deserves to be heard.
        </Lead>
        <p>
          Behind each of them is a small team doing the work of many. This programme is for the people who carry all
          of it.
        </p>
        <p>
          CivicDataLab, along with UNDP India, invites applications from civil society organisations for a
          capacity-building programme on AI and digital tools. The programme will equip approximately 100 CSO
          representatives with practical skills they can apply to their day-to-day work and their organisation’s
          contribution to the Sustainable Development Goals.
        </p>
        <p>
          The programme will help CSOs choose and use AI and digital tools for common organisational tasks, understand
          their limitations and apply appropriate human judgement. Learning will connect to real CSO workflows and
          development priorities, with responsible use, privacy, informed consent and bias awareness integrated
          throughout.
        </p>
        <p>Training will primarily use open-source, free-to-use or freely accessible tools.</p>
      </Section>

      <Section>
        <h2 style={{ textAlign: 'center' }}>Four tools for the work you already do</h2>
        <Tools>
          {tools.map(([svg, title, body]) => (
            <li key={title}>
              <ToolIcon>{svg}</ToolIcon>
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </Tools>
        <Note style={{ maxWidth: 728, margin: '24px auto 0' }}>
          The programme will also help participants recognise common risks associated with AI use, including
          inaccurate or misleading outputs, bias, data privacy concerns and the use of sensitive community
          information.
        </Note>
      </Section>

      <Section id="how" narrow>
        <JourneyHead>
          <h2>A path you walk with others</h2>
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
      </Section>

      <Band>
        <BandInner>
          <Cards>
            <CoralCard>
              <h3>Participation fee</h3>
              <Price>Free of cost</Price>
              <p>
                Participants will have access to practical learning materials, toolkits and guides developed for the
                programme. Materials will be designed for varying levels of digital literacy; specific accessibility
                and regional-language support will be confirmed with the final delivery plan.
              </p>
            </CoralCard>
            <Card>
              <h3>In-person workshop</h3>
              <p>
                Selected 30 organisations will participate in one in-person two-day workshop for immersive training.
                Participants will have to make their own travel arrangements (flights/trains) for the in-person
                workshop in Delhi. The workshop venue, accommodation, training materials, lunch and tea/coffee breaks
                are arranged under the programme. Dates will be announced at a later stage.
              </p>
              {!closed && <Button href="#apply">Apply now</Button>}
            </Card>
          </Cards>
        </BandInner>
      </Band>

      <Section narrow>
        <h2>Who should apply</h2>
        <p>
          Applications are invited from CSOs in India seeking to strengthen the practical use of AI and digital tools
          in their organisational work. The programme will accommodate participants with different levels of digital
          literacy, with learning pathways informed by the baseline assessment.
        </p>
        <p>
          <strong>Who it is for:</strong> CSO representatives in India, particularly from organisations working in
          education, skill development, women’s economic empowerment and livelihoods, with a focus on marginalised
          communities, including tribal populations.
        </p>
        <h3>Selection will prioritise</h3>
        <Ticks>
          {priorities.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </Ticks>
        <Note>
          The selection process will seek diversity across geography, thematic focus, organisational size and
          representation of marginalised communities. Women-led organisations are encouraged to apply.
        </Note>

        <h2>Expectations from participants</h2>
        <Ticks>
          {expectations.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </Ticks>

        <h2>Expected learning outcomes</h2>
        <p>By the end of the training, participants are expected to be better able to:</p>
        <Ticks>
          {outcomes.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </Ticks>

        <h2>How applications will be assessed</h2>
        <p>
          Applications and baseline findings will inform an assessment of programme fit, digital readiness, learning
          needs and opportunities to apply the training in organisational practice. Shortlisting will balance the
          stated priorities with diversity and inclusion across the cohort. Final selection criteria and the
          participant list will be approved by UNDP.
        </p>
        <Note>Programme led by UNDP India. Delivery partner: CivicDataLab.</Note>
      </Section>

      {UNDP_SECTIONS.length > 0 && (
        <Section narrow>
          <h2>What the form asks, before you open it</h2>
          <p>
            Read the questions now and gather your answers with your team. Starred questions are required. Your
            responses will help CivicDataLab and UNDP India shape the programme.
          </p>
          {UNDP_SECTIONS.map((s, i) => (
            <details key={s.title}>
              <summary>
                Section {i + 1}: {s.title}
              </summary>
              <ol>
                {s.fields.map((f) => (
                  <li key={f.name}>
                    {f.label}
                    {f.optional ? ' (optional)' : ' *'}
                  </li>
                ))}
              </ol>
            </details>
          ))}
        </Section>
      )}

      <Section id="apply" narrow>
        <h2>Ready to apply</h2>
        <p>
          We invite organisations interested in using AI and digital tools responsibly to strengthen their everyday
          work and contribution to inclusive development to apply.
        </p>
        {deadlineText && (
          <p>
            <strong>Applications close: {deadlineText}</strong>
          </p>
        )}
        <p>
          For queries or access requirements, please reach out to{' '}
          <a href="mailto:dpg@civicdatalab.in">dpg@civicdatalab.in</a>.
        </p>
        <HeroActions style={{ justifyContent: 'flex-start', marginBottom: 32 }}>
          <ShareButton />
        </HeroActions>
        {closed && <p>Applications for this programme have closed. Thank you for your interest.</p>}
        {!closed &&
          (UNDP_SECTIONS.length > 0 ? (
            <ApplyForm
              sections={UNDP_SECTIONS}
              scriptUrl={UNDP.scriptUrl}
              heading="Baseline assessment questionnaire"
              intro={
                <>
                  <p>
                    This form takes approximately 10 minutes. No prior AI experience is required. Brief answers and
                    estimates are welcome. Starred questions are mandatory. Submission does not guarantee selection.
                  </p>
                  <p>
                    <strong>How your information will be used.</strong> CDL, working with UNDP India, will use your
                    responses to understand training needs, plan the programme and contact you about participation.
                    Responses may be shared with UNDP India. Findings will be reported in aggregate or without
                    identifying your organisation.
                  </p>
                  <p>
                    Participation is voluntary. Please do not include confidential information or personal details of
                    the people you serve. Publication of case studies will follow the consent preferences recorded
                    below. Personal quotations, photographs or other identifying information will require separate
                    consent.
                  </p>
                  <p>
                    For queries or assistance, contact <a href="mailto:dpg@civicdatalab.in">dpg@civicdatalab.in</a>.
                  </p>
                </>
              }
              thanks={
                <>
                  <p>
                    <strong>Thank you for sharing your organisation’s needs and experience.</strong>
                  </p>
                  <p>
                    Your responses will help CivicDataLab and UNDP India shape the programme. We may contact you for
                    further information or to discuss next steps.
                  </p>
                  <p>
                    For queries, write to <a href="mailto:dpg@civicdatalab.in">dpg@civicdatalab.in</a>.
                  </p>
                </>
              }
            />
          ) : (
            <Note>The application form will appear here once the questions are final.</Note>
          ))}
      </Section>

      <Footer>
        <a href="/">civicdatalab.in</a>
      </Footer>
    </Page>
  );
};

export default UndpCohortPage;

const WhiteStat = styled(Stat)`
  ${bubble('48px', 72, { body: whiteBubbleBody, tail: whiteBubbleTail })}
  color: ${C.navy};
  /* follows the brush outline (tail included) so the white bubble reads on a light page */
  filter: drop-shadow(0 6px 14px rgba(11, 56, 101, 0.12));
  span { opacity: 1; color: ${C.muted}; }
`;

// Five bubbles: flex so the short last row sits centred.
const CenteredStats = styled(Stats)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  > li { flex: 0 1 320px; }
`;

const CoralCard = styled(Card)`
  background: none;
  border-radius: 0;
  border: 0 solid transparent;
  border-image: url(${coralCard}) 120 fill / 40px stretch;
  p { color: ${C.navy} !important; }
`;

const Tools = styled.ul`
  list-style: none;
  padding: 0;
  margin: 24px 0 0;
  display: grid;
  gap: 20px;
  @media (min-width: 720px) { grid-template-columns: repeat(2, 1fr); }
  li { background: #fff; border-radius: 20px; padding: 24px; box-shadow: 0 4px 24px rgba(11, 56, 101, 0.06); }
  h3 { margin-top: 12px; }
  p { margin: 0; }
`;

const ToolIcon = styled.span`
  display: inline-grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #fde8e4;
  color: ${C.coralDark};
`;
