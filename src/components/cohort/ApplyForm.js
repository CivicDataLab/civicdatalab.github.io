import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

// An option ending in ": please specify" opens a text box; the answer is saved
// as e.g. "Other: <what they typed>" or "Another language: <what they typed>".
const SPECIFY = ': please specify';
const isSpecify = (opt) => opt.endsWith(SPECIFY);
const NUMBER_WORDS = ['', 'one', 'two', 'three', 'four', 'five'];

// A blank required question is marked in red and summed up once above the buttons,
// instead of repeating a message under every question.
export const REQUIRED = 'required';

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
  // Selected options of a field, as a list for both single and multi choice.
  const chosen = (f) => (f.multi ? answers[f.name] || [] : [value(f.name)].filter(Boolean));
  const resolve = (f, opt) =>
    isSpecify(opt) ? `${opt.slice(0, -SPECIFY.length)}: ${value(`${f.name}_other`).trim()}` : opt;

  // Multi choice: an `exclusive` option ("No major barriers") clears the rest, and vice versa.
  const toggle = (f, opt) => {
    const cur = chosen(f);
    const solo = f.exclusive || [];
    let next;
    if (cur.includes(opt)) next = cur.filter((o) => o !== opt);
    else if (solo.includes(opt)) next = [opt];
    else next = [...cur.filter((o) => !solo.includes(o)), opt];
    set(f.name, next);
  };

  const set = (name, v) => {
    setAnswers((a) => ({ ...a, [name]: v }));
    setErrors((e) => ({ ...e, [name]: undefined }));
  };

  const validate = (fields) => {
    const e = {};
    fields.forEach((f) => {
      const v = f.options ? '' : value(f.name);
      if (f.checks) {
        if (f.checks.some(([n]) => !answers[n])) e[f.name] = 'Please tick every box to continue.';
      } else if (f.options) {
        const picked = chosen(f);
        if (!picked.length) {
          if (!f.optional) e[f.name] = REQUIRED;
        } else if (picked.some(isSpecify) && !value(`${f.name}_other`).trim()) {
          e[f.name] = 'Please specify.';
        } else if (f.mustAgree && picked[0] !== f.options[0]) {
          e[f.name] = f.mustAgree;
        }
      } else if (!v.trim()) {
        if (!f.optional) e[f.name] = REQUIRED;
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
      data[column] = f.options
        ? chosen(f)
            .map((opt) => resolve(f, opt))
            .join('; ')
        : value(f.name).trim();
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

  const errorFor = (name) =>
    errors[name] && errors[name] !== REQUIRED && <ErrorText id={`apply-${name}-error`}>{errors[name]}</ErrorText>;
  const blanks = SECTIONS[step].fields.filter((f) => errors[f.name] === REQUIRED).length;

  const renderField = (f, n) => {
    const err = !!errors[f.name];
    const describedBy = !err ? undefined : errors[f.name] === REQUIRED ? 'apply-blanks' : `apply-${f.name}-error`;
    const label = `Q${n}. ${f.label}`;

    if (f.options || f.checks) {
      return (
        <Fieldset key={f.name} invalid={err} aria-describedby={describedBy}>
          <Legend>
            {label} <Req optional={f.optional} />
          </Legend>
          {f.multi && <Hint>{f.max ? `Choose up to ${NUMBER_WORDS[f.max]}.` : 'Select all that apply.'}</Hint>}
          {f.hint && <Hint>{f.hint}</Hint>}
          {f.options &&
            f.options.map((opt, i) => {
              const picked = chosen(f);
              const on = picked.includes(opt);
              const full = f.max && picked.length >= f.max && !on && !(f.exclusive || []).includes(opt);
              return (
                <Option key={opt} selected={on} style={full ? { opacity: 0.5 } : undefined}>
                  <input
                    type={f.multi ? 'checkbox' : 'radio'}
                    id={`apply-${f.name}-${i}`}
                    name={f.name}
                    checked={on}
                    disabled={full}
                    onChange={() => (f.multi ? toggle(f, opt) : set(f.name, opt))}
                  />
                  {isSpecify(opt) ? opt.slice(0, -SPECIFY.length) : opt}
                </Option>
              );
            })}
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
          {f.options && chosen(f).some(isSpecify) && (
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
          {label} <Req optional={f.optional} />
        </FieldLabel>
        {f.hint && <Hint>{f.hint}</Hint>}
        <TextInput
          as={f.words || f.paragraph ? 'textarea' : 'input'}
          rows={f.words || f.paragraph ? 4 : undefined}
          id={`apply-${f.name}`}
          type={f.words || f.paragraph ? undefined : f.type || 'text'}
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
      <Intro>{intro}</Intro>
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

        {blanks > 0 && (
          <ErrorText id="apply-blanks" role="alert" style={{ marginBottom: 12 }}>
            {blanks === 1 ? 'One required question is' : `${blanks} required questions are`} still blank. They are
            marked in red.
          </ErrorText>
        )}
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

const Req = ({ optional }) =>
  optional ? (
    <span style={{ color: MUTED, fontWeight: 400 }}>(optional)</span>
  ) : (
    <span aria-hidden="true" style={{ color: CORAL_DARK }}>
      *
    </span>
  );

const Intro = styled.div`
  margin: 0 0 24px;
  color: ${MUTED};
  p { margin: 0 0 12px; }
`;

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
