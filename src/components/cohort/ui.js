import styled from 'styled-components';

// Shared look for the cohort forms (eligibility check and application).
export const NAVY = '#0B3865';
export const MUTED = '#4B5B6E';
export const BLUE = '#4A74A0';
export const CORAL = '#E8705F';
export const CORAL_DARK = '#D85C4B';
export const BORDER = '#D5DCE4';
export const LIGHT_BLUE = '#EAF0F7';
export const ERROR = '#B3261E';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const focusRing = `
  outline: 3px solid ${BLUE};
  outline-offset: 2px;
`;

export const Card = styled.div`
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

export const Heading = styled.h2`
  /* !important: the page's h2 spacing would otherwise push the card's title down */
  margin: 0 0 8px !important;
  font-size: 2rem;
  line-height: 1.25;
  color: ${NAVY};
`;

export const Muted = styled.p`
  margin: 0 0 24px;
  color: ${MUTED};
  font-size: ${(p) => (p.small ? '0.875em' : '1em')};
`;

export const Fieldset = styled.fieldset`
  border: 0;
  padding: 0;
  margin: 0 0 28px;
  min-width: 0;
  /* a required question left blank is marked by a red bar rather than a message under it */
  ${(p) => p.invalid && `border-left: 3px solid ${ERROR}; padding-left: 12px;`}
`;

export const Legend = styled.legend`
  padding: 0;
  margin-bottom: 12px;
  font-weight: 700;
  font-size: 1.05em;
  line-height: 1.4;
`;

export const Option = styled.label`
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

export const TextInput = styled.input`
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

export const FieldLabel = styled.label`
  display: block;
  margin: 8px 0 6px;
  font-weight: 700;
`;

export const ErrorText = styled.p`
  margin: 6px 0 0;
  /* !important: the page's paragraph colour would otherwise turn errors grey */
  color: ${ERROR} !important;
  font-size: 0.9em;
`;

export const Button = styled.button`
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

export const TextButton = styled.button`
  padding: 0;
  border: 0;
  background: none;
  color: ${BLUE};
  font: inherit;
  font-size: 0.875em;
  text-decoration: underline;
  cursor: pointer;
  &:focus-visible {
    ${focusRing}
  }
`;

export const Honeypot = styled.input`
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
`;

export const Result = styled.div`
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
