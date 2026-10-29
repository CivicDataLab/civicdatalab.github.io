import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { SCRIPT_URL } from './config';

const NAVY = '#0B3865';
const MUTED = '#4B5B6E';
const BLUE = '#4A74A0';
const CORAL = '#E8705F';
const CORAL_DARK = '#D85C4B';
const BORDER = '#D5DCE4';
const LIGHT_BLUE = '#EAF0F7';
const ERROR = '#B3261E';
const OTHER = 'Other: please specify';

const QUESTIONS = [
  {
    name: 'solution_stage',
    legend: 'Where is your AI solution today?',
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
    name: 'domain',
    legend: 'Which domain does your proposed AI use case address?',
    options: ['Health', 'Agriculture', 'Public services', 'More than one', OTHER]
  },
  {
    name: 'testing',
    legend: 'Can you organise testing with beneficiaries or frontline teams during the cohort?',
    note: 'The programme aims to build readiness for a pilot with 50–100 users.',
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
    legend: 'Can you assign a Tech Lead or Product Owner with approximately 50% availability over six months?',
    options: [
      'Yes, a lead and backup are identified, and availability is confirmed',
      'A lead is identified; backup or availability needs confirmation',
      'We can assign a lead before the cohort begins',
      'We cannot commit this staff time'
    ]
  }
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const focusRing = `
  outline: 3px solid ${BLUE};
  outline-offset: 2px;
`;

const Card = styled.div`
  max-width: 760px;
  margin: 0 auto;
  padding: 32px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(11, 56, 101, 0.08);
  color: ${NAVY};
  font-family: inherit;
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Heading = styled.h2`
  margin: 0 0 8px;
  font-size: 1.6rem;
  line-height: 1.25;
  color: ${NAVY};
`;

const Muted = styled.p`
  margin: 0 0 24px;
  color: ${MUTED};
  font-size: ${(p) => (p.small ? '0.875rem' : '1rem')};
`;

const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0 0 28px;
  min-width: 0;
`;

const Legend = styled.legend`
  padding: 0;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1.4;
`;

const Option = styled.label`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 8px;
  padding: 12px 14px;
  border: 1px solid ${(p) => (p.selected ? BLUE : BORDER)};
  border-radius: 10px;
  background: ${(p) => (p.selected ? LIGHT_BLUE : '#fff')};
  cursor: pointer;
  line-height: 1.4;
  &:focus-within {
    ${focusRing}
  }
  input {
    margin: 3px 0 0;
    flex-shrink: 0;
    accent-color: ${BLUE};
  }
`;

const TextInput = styled.input`
  display: block;
  width: 100%;
  box-sizing: border-box;
  padding: 12px 14px;
  border: 1px solid ${(p) => (p.invalid ? ERROR : BORDER)};
  border-radius: 10px;
  font: inherit;
  color: ${NAVY};
  &:focus {
    ${focusRing}
  }
`;

const FieldLabel = styled.label`
  display: block;
  margin: 8px 0 6px;
  font-weight: 700;
`;

const Error = styled.p`
  margin: 6px 0 0;
  color: ${ERROR};
  font-size: 0.9rem;
`;

const Button = styled.button`
  display: inline-block;
  padding: 12px 28px;
  border: 0;
  border-radius: 999px;
  background: ${CORAL};
  color: #fff;
  font: inherit;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    background: ${CORAL_DARK};
  }
  &:focus-visible {
    ${focusRing}
  }
  &:disabled {
    opacity: 0.7;
    cursor: wait;
  }
`;

const TextButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: ${BLUE};
  font: inherit;
  font-size: 0.875rem;
  text-decoration: underline;
  cursor: pointer;
  &:focus-visible {
    ${focusRing}
  }
`;

const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

const Result = styled.div`
  padding: 20px;
  border-radius: 10px;
  background: ${LIGHT_BLUE};
  &:focus {
    ${focusRing}
  }
  p {
    margin: 0 0 16px;
  }
`;

export default function FitCheck() {
  const [answers, setAnswers] = useState({ email: '', domain_other: '', website: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | saving | done
  const [saveError, setSaveError] = useState('');
  const resultRef = useRef(null);

  useEffect(() => {
    if (status === 'done' && resultRef.current) resultRef.current.focus();
  }, [status]);

  const set = (name, value) => {
    setAnswers((a) => ({ ...a, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = () => {
    const e = {};
    QUESTIONS.forEach((q) => {
      if (!answers[q.name]) e[q.name] = 'Please choose an option.';
    });
    if (answers.domain === OTHER && !answers.domain_other.trim()) {
      e.domain_other = 'Please specify the domain.';
    }
    if (!EMAIL_RE.test(answers.email.trim())) e.email = 'Please enter a valid email address.';
    return e;
  };

  const save = async () => {
    setStatus('saving');
    const data = {
      form: 'short',
      website: answers.website,
      email: answers.email.trim(),
      domain_other: answers.domain === OTHER ? answers.domain_other.trim() : ''
    };
    QUESTIONS.forEach((q) => {
      data[q.name] = answers[q.name];
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
    setStatus('done');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const e = validate();
    setErrors(e);
    const order = [...QUESTIONS.map((q) => q.name), 'domain_other', 'email'];
    const first = order.find((name) => e[name]);
    if (first) {
      const id = first === 'domain_other' || first === 'email' ? `fit-${first}` : `fit-${first}-0`;
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.focus({ preventScroll: true });
      }
      return;
    }
    save();
  };

  return (
    <Card>
      <Heading>Are we a fit? Check in a minute</Heading>
      <Muted>We'll save your answers and your email so we can follow up.</Muted>
      <form onSubmit={handleSubmit} noValidate>
        {QUESTIONS.map((q) => (
          <Fieldset key={q.name} aria-describedby={errors[q.name] ? `fit-${q.name}-error` : undefined}>
            <Legend>{q.legend}</Legend>
            {q.options.map((opt, i) => (
              <Option key={opt} selected={answers[q.name] === opt}>
                <input
                  type="radio"
                  id={`fit-${q.name}-${i}`}
                  name={q.name}
                  value={opt}
                  checked={answers[q.name] === opt}
                  onChange={() => set(q.name, opt)}
                />
                {opt}
              </Option>
            ))}
            {q.name === 'domain' && answers.domain === OTHER && (
              <>
                <FieldLabel htmlFor="fit-domain_other">Please specify</FieldLabel>
                <TextInput
                  id="fit-domain_other"
                  type="text"
                  required
                  value={answers.domain_other}
                  invalid={!!errors.domain_other}
                  aria-invalid={!!errors.domain_other}
                  aria-describedby={errors.domain_other ? 'fit-domain_other-error' : undefined}
                  onChange={(ev) => set('domain_other', ev.target.value)}
                />
                {errors.domain_other && <Error id="fit-domain_other-error">{errors.domain_other}</Error>}
              </>
            )}
            {q.note && (
              <Muted small style={{ margin: '4px 0 0' }}>
                {q.note}
              </Muted>
            )}
            {errors[q.name] && <Error id={`fit-${q.name}-error`}>{errors[q.name]}</Error>}
          </Fieldset>
        ))}

        <FieldLabel htmlFor="fit-email">Your email</FieldLabel>
        <TextInput
          id="fit-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={answers.email}
          invalid={!!errors.email}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'fit-email-error' : undefined}
          onChange={(ev) => set('email', ev.target.value)}
        />
        {errors.email && <Error id="fit-email-error">{errors.email}</Error>}

        <Honeypot
          type="text"
          name="website"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          value={answers.website}
          onChange={(ev) => set('website', ev.target.value)}
        />

        <div style={{ marginTop: 24 }}>
          {status === 'done' ? (
            <Result ref={resultRef} tabIndex={-1} aria-live="polite">
              <p>
                <strong>Possible fit.</strong> Confirm the open items with your team, then apply.
              </p>
              <Button as="a" href="#apply">
                Apply now
              </Button>
              {saveError && (
                <Muted small style={{ margin: '16px 0 0' }}>
                  We couldn't save your answers ({saveError}). You can still apply below.{' '}
                  <TextButton type="button" onClick={save}>
                    Try saving again
                  </TextButton>
                </Muted>
              )}
            </Result>
          ) : (
            <Button type="submit" disabled={status === 'saving'}>
              {status === 'saving' ? 'Saving…' : 'Show my result'}
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
}
