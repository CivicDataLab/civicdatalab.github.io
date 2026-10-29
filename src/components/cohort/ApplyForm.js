import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { OTHER } from './questions';
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

const PHONE_RE = /^\+?[\d\s()-]{8,}$/;

const countWords = (text) => text.trim().split(/\s+/).filter(Boolean).length;

// Id of the element to focus when `name` has an error.
const focusId = (fields, name) => {
  const field = fields.find((f) => f.name === name);
  if (field && field.options) return `apply-${name}-0`;
  if (field && field.checks) return `apply-${field.checks[0][0]}`;
  return `apply-${name}`;
};

// `sections` come from ./questions; answers are saved to the Sheet behind `scriptUrl`.
export default function ApplyForm({ sections: SECTIONS, scriptUrl, heading, intro, thanks }) {
  const FIELDS = SECTIONS.flatMap((s) => s.fields);
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
      if (!scriptUrl) throw new Error('Form not connected yet');
      const res = await fetch(scriptUrl, { method: 'POST', body: new URLSearchParams(data) });
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
      const el = document.getElementById(focusId(FIELDS, first.name));
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
          {thanks}
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
      <Heading>{heading}</Heading>
      <Muted>{intro}</Muted>
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
