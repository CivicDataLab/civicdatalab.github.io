import React, { useEffect, useRef, useState } from 'react';
import {
  EMAIL_RE,
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

import { OTHER } from './questions';

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



export default function FitCheck({ scriptUrl }) {
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
    // The Sheet's column headers are the question texts.
    const data = { form: 'short', website: answers.website };
    QUESTIONS.forEach((q) => {
      // "Other" is saved as "Other: <what they typed>" in the same column.
      data[q.legend] =
        q.name === 'domain' && answers.domain === OTHER ? `Other: ${answers.domain_other.trim()}` : answers[q.name];
    });
    data['Your email'] = answers.email.trim();
    let error = '';
    try {
      if (!scriptUrl) throw new Error('Form not connected yet');
      const res = await fetch(scriptUrl, { method: 'POST', body: new URLSearchParams(data) });
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
                {errors.domain_other && <ErrorText id="fit-domain_other-error">{errors.domain_other}</ErrorText>}
              </>
            )}
            {q.note && (
              <Muted small style={{ margin: '4px 0 0' }}>
                {q.note}
              </Muted>
            )}
            {errors[q.name] && <ErrorText id={`fit-${q.name}-error`}>{errors[q.name]}</ErrorText>}
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
        {errors.email && <ErrorText id="fit-email-error">{errors.email}</ErrorText>}

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
