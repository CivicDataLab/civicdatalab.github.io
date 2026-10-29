import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SCRIPT_URL } from './config';
import {
  EMAIL_RE,
  BLUE,
  CORAL_DARK,
  MUTED,
  NAVY,
  Card,
  Heading,
  Muted,
  Fieldset,
  Legend,
  Option,
  TextInput,
  FieldLabel,
  ErrorText,
  Button,
  TextButton,
  Honeypot,
  Result
} from './ui';

const OTHER = 'Other: please specify';
const PHONE_RE = /^\+?[\d\s()-]{8,}$/;

// Field kinds: `options` = single choice, `checks` = required checkboxes
// ([name, text, short column label]), `words` = paragraph with a suggested
// word limit, otherwise a one-line input. The Sheet's column headers are the
// numbered questions ("Q1. Your full name"), in this order.
const SECTIONS = [
  {
    title: 'Your details & organisation',
    fields: [
      { name: 'full_name', label: 'Your full name', autoComplete: 'name' },
      { name: 'role', label: 'Your role in the organisation', autoComplete: 'organization-title' },
      { name: 'email', label: 'Email address', type: 'email', autoComplete: 'email' },
      { name: 'phone', label: 'Phone number with country code', type: 'tel', autoComplete: 'tel' },
      { name: 'organisation', label: 'Organisation name', autoComplete: 'organization' },
      { name: 'registration_type', label: 'Registration type', options: ['Trust', 'Society', 'Section 8 company', OTHER] },
      { name: 'geography', label: 'Which states or districts do you currently work in?' },
      {
        name: 'annual_budget',
        label: 'What was your annual operating budget in the latest audited financial year?',
        options: [
          'Below ₹50 lakh',
          '₹50 lakh to below ₹1 crore',
          '₹1 crore to below ₹5 crore',
          '₹5 crore or above',
          'Audited figures are not yet available'
        ]
      },
      {
        name: 'domain',
        label: 'Which domain does your proposed AI use case address?',
        options: ['Health', 'Agriculture', 'Public services', 'More than one', OTHER]
      },
      {
        name: 'programmes',
        label: 'Briefly describe your programmes and whom they serve.',
        hint: 'Include your approximate annual reach among beneficiaries or frontline teams.',
        words: 50
      }
    ]
  },
  {
    title: 'Your AI / tech solution & language need',
    intro:
      'The cohort supports existing AI solutions and active development or pilots. It does not fund new solutions from the idea stage.',
    fields: [
      {
        name: 'solution_stage',
        label: 'What stage is your AI solution at?',
        options: [
          'Deployed and regularly used by intended users',
          'Being piloted with intended users',
          'Working prototype, not yet tested with intended users',
          'Under active development, with no working prototype yet',
          'Idea or planning stage only',
          'We do not currently have an AI solution'
        ]
      },
      {
        name: 'solution_description',
        label: 'Briefly describe your AI solution.',
        hint: 'What does it do, who uses it, and which platform and languages does it support? Add a demo link if available.',
        words: 75
      },
      { name: 'languages', label: 'Which languages or dialects do your users primarily speak?' },
      {
        name: 'language_gaps',
        label: 'What language or interface gaps have you identified?',
        hint: 'Consider local languages, dialects, voice access and ease of use.',
        options: [
          'Clear gaps, supported by user feedback or usage data',
          'Gaps observed by our team, but not yet tested with users',
          'Unsure—we need help assessing this',
          'No significant gaps identified'
        ]
      },
      {
        name: 'main_improvement',
        label: 'What is the main improvement you want to make through this cohort?',
        hint: 'Consider language or voice access, accuracy, trust, adoption, workflow fit or feedback. Share one example of the challenge.',
        words: 50
      }
    ]
  },
  {
    title: 'Field access, team & sustainability',
    fields: [
      {
        name: 'testing',
        label: 'Can you organise testing with beneficiaries or frontline teams during the cohort?',
        hint: 'The programme aims to build readiness for a pilot with 50–100 users.',
        options: [
          'Yes, through our existing field or community network',
          'Yes, through a partner organisation',
          'Likely, but arrangements need confirmation',
          'We would need support to organise this',
          'No, not currently'
        ]
      },
      {
        name: 'tech_lead',
        label: 'Can you assign a Tech Lead or Product Owner with approximately 50% availability over six months?',
        options: [
          'Yes, a lead and backup are identified, and availability is confirmed',
          'A lead is identified; backup or availability needs confirmation',
          'We can assign a lead before the cohort begins',
          'We cannot commit this staff time'
        ]
      },
      {
        name: 'leadership_approval',
        label:
          'Has leadership approved participation, including staff time, the ₹1 lakh programme fee and travel to Delhi for the kick-off?',
        options: [
          'Yes, approval is confirmed',
          'Leadership is supportive; formal approval is pending',
          'Not yet discussed internally',
          'We cannot commit at this stage'
        ]
      },
      {
        name: 'maintenance',
        label: 'What arrangements exist for maintaining the solution after the cohort?',
        options: [
          'An owner and maintenance budget or plan are in place',
          'An owner is identified; the maintenance plan needs work',
          'We have an initial plan but no confirmed owner',
          'We need support to develop these arrangements'
        ]
      }
    ]
  },
  {
    title: 'Consent',
    fields: [
      {
        name: 'declaration',
        label: 'Declaration and acknowledgment',
        checks: [
          [
            'declaration_accurate',
            'I confirm that the information provided is accurate to the best of my knowledge and that I am authorised to submit it on behalf of my organisation.',
            'Information is accurate and I am authorised'
          ],
          [
            'declaration_no_guarantee',
            'I understand that submitting this form does not guarantee selection, funding or any other commitment from the programme partners.',
            'Submission does not guarantee selection'
          ]
        ]
      },
      {
        name: 'consent',
        label: 'Consent to review your application',
        checks: [
          [
            'consent_review',
            'I consent to CivicDataLab, Gram Vaani and Tech4Dev accessing, reviewing and using the information submitted in this form to assess our application and contact us about the cohort.',
            'I consent'
          ]
        ]
      }
    ]
  }
];

const FIELDS = SECTIONS.flatMap((s) => s.fields);

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

// Id of the element to focus when `name` has an error.
const focusId = (name) => {
  const field = FIELDS.find((f) => f.name === name);
  if (field && field.options) return `apply-${name}-0`;
  if (field && field.checks) return `apply-${field.checks[0][0]}`;
  return `apply-${name}`;
};

export default function ApplyForm() {
  const [answers, setAnswers] = useState({ website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | saving | done
  const [saveError, setSaveError] = useState('');
  const [step, setStep] = useState(0);
  const doneRef = useRef(null);
  const stepRef = useRef(null);
  const progressRef = useRef(null);
  const moved = useRef(false);

  useEffect(() => {
    if (status === 'done' && doneRef.current) doneRef.current.focus();
  }, [status]);

  // On each step change, bring the progress bar into view and move focus to the step title.
  useEffect(() => {
    if (!moved.current || !stepRef.current) return;
    progressRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    stepRef.current.focus({ preventScroll: true });
  }, [step]);

  const last = step === SECTIONS.length - 1;
  const go = (to) => {
    moved.current = true;
    setStep(to);
  };

  const value = (name) => answers[name] || '';

  const set = (name, v) => {
    setAnswers((a) => ({ ...a, [name]: v }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = (fields) => {
    const e = {};
    fields.forEach((f) => {
      const v = value(f.name);
      if (f.checks) {
        if (f.checks.some(([n]) => !answers[n])) e[f.name] = 'Please tick every box to continue.';
      } else if (f.options) {
        if (!v) e[f.name] = 'Please choose an option.';
        else if (v === OTHER && !value(`${f.name}_other`).trim()) e[f.name] = 'Please specify.';
      } else if (!v.trim()) {
        e[f.name] = 'This question is required.';
      } else if (f.type === 'email' && !EMAIL_RE.test(v.trim())) {
        e[f.name] = 'Please enter a valid email address.';
      } else if (f.type === 'tel' && !PHONE_RE.test(v.trim())) {
        e[f.name] = 'Please enter a phone number with country code, e.g. +91 98765 43210.';
      }
    });
    return e;
  };

  const save = async () => {
    setStatus('saving');
    const data = { form: 'long', website: answers.website };
    FIELDS.forEach((f, i) => {
      const column = `Q${i + 1}. ${f.label}`;
      if (f.checks) {
        f.checks.forEach(([n, , short]) => {
          data[`${column}: ${short}`] = answers[n] ? 'Yes' : '';
        });
        return;
      }
      // "Other" is saved as "Other: <what they typed>" in the same column.
      data[column] =
        value(f.name) === OTHER ? `Other: ${value(`${f.name}_other`).trim()}` : value(f.name).trim();
    });
    let error = '';
    try {
      if (!SCRIPT_URL) throw new Error('Form not connected yet');
      const res = await fetch(SCRIPT_URL, { method: 'POST', body: new URLSearchParams(data) });
      const json = await res.json();
      if (!json.ok) error = json.error || 'Unknown error';
    } catch (err) {
      error = err.message || 'Network error';
    }
    setSaveError(error);
    // On failure the form stays filled in so nothing typed is lost.
    setStatus(error ? 'idle' : 'done');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fields = SECTIONS[step].fields;
    const e = validate(fields);
    setErrors(e);
    const first = fields.find((f) => e[f.name]);
    if (first) {
      const el = document.getElementById(focusId(first.name));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
      return;
    }
    if (last) save();
    else go(step + 1);
  };

  if (status === 'done') {
    return (
      <Card>
        <Result ref={doneRef} tabIndex={-1} aria-live="polite">
          <p>
            <strong>Thank you for your interest in the Local and Inclusive AI Cohort.</strong>
          </p>
          <p>
            We will review your responses and contact you if further information is needed or to discuss next
            steps.
          </p>
        </Result>
      </Card>
    );
  }

  const errorFor = (name) => errors[name] && <ErrorText id={`apply-${name}-error`}>{errors[name]}</ErrorText>;

  const renderField = (f, n) => {
    const err = !!errors[f.name];
    const describedBy = err ? `apply-${f.name}-error` : undefined;
    const label = `Q${n}. ${f.label}`;

    if (f.options || f.checks) {
      return (
        <Fieldset key={f.name} aria-describedby={describedBy}>
          <Legend>
            {label} <Req />
          </Legend>
          {f.hint && <Hint>{f.hint}</Hint>}
          {f.options &&
            f.options.map((opt, i) => (
              <Option key={opt} selected={value(f.name) === opt}>
                <input
                  type="radio"
                  id={`apply-${f.name}-${i}`}
                  name={f.name}
                  checked={value(f.name) === opt}
                  onChange={() => set(f.name, opt)}
                />
                {opt}
              </Option>
            ))}
          {f.checks &&
            f.checks.map(([name, text]) => (
              <Option key={name} selected={!!answers[name]}>
                <input
                  type="checkbox"
                  id={`apply-${name}`}
                  checked={!!answers[name]}
                  onChange={(ev) => {
                    set(name, ev.target.checked);
                    setErrors((e) => ({ ...e, [f.name]: undefined }));
                  }}
                />
                {text}
              </Option>
            ))}
          {value(f.name) === OTHER && (
            <TextInput
              aria-label={`${f.label}: please specify`}
              placeholder="Please specify"
              style={{ marginTop: 8 }}
              value={value(`${f.name}_other`)}
              onChange={(ev) => {
                set(`${f.name}_other`, ev.target.value);
                setErrors((e) => ({ ...e, [f.name]: undefined }));
              }}
            />
          )}
          {errorFor(f.name)}
        </Fieldset>
      );
    }

    const words = f.words && countWords(value(f.name));
    return (
      <Field key={f.name}>
        <FieldLabel htmlFor={`apply-${f.name}`}>
          {label} <Req />
        </FieldLabel>
        {f.hint && <Hint>{f.hint}</Hint>}
        <TextInput
          as={f.words ? 'textarea' : 'input'}
          rows={f.words ? 4 : undefined}
          id={`apply-${f.name}`}
          type={f.words ? undefined : f.type || 'text'}
          autoComplete={f.autoComplete}
          value={value(f.name)}
          invalid={err}
          aria-invalid={err}
          aria-describedby={describedBy}
          onChange={(ev) => set(f.name, ev.target.value)}
        />
        {f.words && (
          <WordCount over={words > f.words}>
            {words} / {f.words} words suggested
          </WordCount>
        )}
        {errorFor(f.name)}
      </Field>
    );
  };

  const section = SECTIONS[step];
  const firstQ = SECTIONS.slice(0, step).reduce((sum, sec) => sum + sec.fields.length, 1);
  return (
    <Card>
      <Heading>NGO screening questionnaire</Heading>
      <Muted>
        This screening form takes approximately 5–7 minutes. All questions are required. Rough answers are fine where
        exact figures aren't available. Responses are used for screening only and do not guarantee a cohort seat.
        For queries, write to <a href="mailto:dpg@civicdatalab.in">dpg@civicdatalab.in</a>.
      </Muted>
      <Progress ref={progressRef}>
        <span>
          Step {step + 1} of {SECTIONS.length}
        </span>
        <Bar role="progressbar" aria-valuemin={1} aria-valuemax={SECTIONS.length} aria-valuenow={step + 1}>
          <i style={{ width: `${((step + 1) / SECTIONS.length) * 100}%` }} />
        </Bar>
      </Progress>
      <form onSubmit={handleSubmit} noValidate>
        <section>
          <SectionTitle ref={stepRef} tabIndex={-1}>
            {section.title}
          </SectionTitle>
          {section.intro && <Muted>{section.intro}</Muted>}
          {section.fields.map((f, i) => renderField(f, firstQ + i))}
        </section>

        <Honeypot
          type="text"
          name="website"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          value={answers.website}
          onChange={(ev) => set('website', ev.target.value)}
        />

        <Nav>
          {step > 0 && (
            <BackButton type="button" onClick={() => go(step - 1)} disabled={status === 'saving'}>
              Back
            </BackButton>
          )}
          <Button type="submit" disabled={status === 'saving'}>
            {!last ? 'Next' : status === 'saving' ? 'Submitting…' : 'Submit application'}
          </Button>
        </Nav>
        {saveError && (
          <ErrorText role="alert">
            We couldn't submit your application ({saveError}). Your answers are still here.{' '}
            <TextButton type="button" onClick={save}>
              Try again
            </TextButton>
          </ErrorText>
        )}
      </form>
    </Card>
  );
}

const Req = () => (
  <span aria-hidden="true" style={{ color: CORAL_DARK }}>
    *
  </span>
);

const SectionTitle = styled.h3`
  margin: 0 0 16px;
  font-size: 1.3rem;
  color: ${NAVY};
  &:focus { outline: none; }
`;

const Progress = styled.div`
  margin: 0 0 24px;
  scroll-margin-top: 96px;
  span { display: block; margin-bottom: 8px; font-size: 0.9rem; font-weight: 600; color: ${MUTED}; }
`;

const Bar = styled.div`
  height: 6px;
  border-radius: 999px;
  background: #e3e8ee;
  overflow: hidden;
  i { display: block; height: 100%; background: ${BLUE}; transition: width 0.3s; }
`;

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 8px;
  button:last-child { margin-left: auto; }
`;

const BackButton = styled(Button)`
  background: transparent;
  color: ${NAVY};
  box-shadow: inset 0 0 0 2px ${NAVY};
  &:hover { background: #eef2f6; }
`;

const Field = styled.div`
  margin-bottom: 28px;
  label { font-size: 1.05rem; line-height: 1.4; }
  textarea { resize: vertical; }
`;

const Hint = styled.p`
  margin: -4px 0 10px;
  color: ${MUTED};
  font-size: 0.9rem;
`;

const WordCount = styled.p`
  margin: 6px 0 0;
  font-size: 0.85rem;
  color: ${(p) => (p.over ? CORAL_DARK : MUTED)};
`;
