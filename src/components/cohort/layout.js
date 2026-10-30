import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../Seo/Seo';
import background from '../../images/cohort/background.webp';
import brushBody from '../../images/cohort/bubble-body.webp';
import heroBubble from '../../images/cohort/hero-bubble.webp';
import bandTexture from '../../images/cohort/band-texture.webp';

// Shared layout for the cohort landing pages under /cohorts/.

export const C = {
  blue: '#4A74A0',
  block: '#47729C',
  coral: '#E8705F',
  coralCard: '#E57568',
  coralDark: '#D85C4B',
  navy: '#0B3865',
  muted: '#4B5B6E',
  bg: '#EEF0F3'
};

// Computed in the browser so the static build never shows a stale count.
export const useDeadlineLabel = (deadline) => {
  const [label, setLabel] = useState('');
  useEffect(() => {
    if (!deadline) return;
    const ms = deadline - Date.now();
    const days = Math.ceil(ms / 86400000);
    if (ms <= 0) setLabel('Applications closed');
    else if (days <= 1) setLabel('Last day to apply');
    else setLabel(`${days} days left to apply`);
  }, [deadline]);
  return label;
};

// e.g. "30 November, 11:59 pm IST", for showing a deadline in the page text.
export const deadlineText = (deadline) =>
  deadline
    ? deadline.toLocaleString('en-IN', {
        day: 'numeric',
        month: 'long',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
      }) + ' IST'
    : '';

// Reveals journey steps as they scroll into view. Kept in state, not classList,
// because React re-renders would wipe classes added by hand.
export const useReveal = () => {
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

// Page-level styles, SEO tags and the Inter font.
// `background` overrides the page background (CSS `background` value).
export const CohortHead = ({ title, description, background: bg }) => (
  <>
    <PageStyle bg={bg} />
    <Seo title={title} description={description} />
    <Helmet>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,500;0,600;0,700;0,800;1,800&display=swap"
      />
    </Helmet>
  </>
);

export const PageStyle = createGlobalStyle`
  html { scroll-behavior: smooth; }
  body { margin: 0; background: ${(p) => p.bg || `#F4F5F7 url(${background}) top center / 100% auto repeat-y`}; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`;

export const Page = styled.div`
  font-family: 'Inter', system-ui, sans-serif;
  color: ${C.navy};
  font-size: 17px;
  line-height: 1.6;
  @media (min-width: 768px) { font-size: 18px; }
  * { box-sizing: border-box; }
  h1, h2, h3 { line-height: 1.2; margin: 0 0 0.75rem; }
  /* one heading size per level across the page, forms included */
  h2 { font-size: 2rem; font-weight: 700; margin-top: 2.5rem; }
  h3 { font-size: 1.3rem; font-weight: 600; margin-top: 1.5rem; }
  p { margin: 0 0 1rem; color: ${C.muted}; }
  a { color: ${C.blue}; }
  section { scroll-margin-top: 80px; }
`;

export const TopBar = styled.header`
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

export const TopBarCredit = styled.span`
  @media (max-width: 640px) { display: none; }
`;

export const Button = styled.a`
  display: inline-block;
  padding: 10px 22px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  white-space: nowrap;
  font: inherit;
  font-weight: 700;
  cursor: pointer;
  /* ghost: white outline for blue backgrounds; outline: navy outline for light ones */
  background: ${(p) => (p.ghost || p.outline ? 'transparent' : C.coral)};
  color: ${(p) => (p.outline ? C.navy : '#fff')} !important;
  border: 2px solid ${(p) => (p.ghost ? '#fff' : p.outline ? C.navy : C.coral)};
  transition: background 0.15s;
  &:hover {
    background: ${(p) => (p.ghost ? 'rgba(255,255,255,0.15)' : p.outline ? '#e6ebf1' : C.coralDark)};
  }
  &:focus-visible { outline: 3px solid ${C.navy}; outline-offset: 2px; }
`;

export const Hero = styled.div`
  max-width: ${(p) => (p.wide ? '1200px' : '960px')};
  margin: 0 auto;
  padding: 0 16px;
`;

// The designer's speech bubble, 9-sliced so its brush edges survive any box size.
// The bottom-left slice holds the whole tail, so the tail is never stretched.
// Slices are in pixels of hero-bubble.webp (1200 × 907); `s` scales them on screen.
const heroSlice = (s) => `
  border-image-width: ${170 * s}px ${170 * s}px ${370 * s}px ${430 * s}px;
  /* the tail hangs ${250 * s}px below the body */
  padding-bottom: ${250 * s + 36}px;
`;

export const HeroBubble = styled.div`
  border: 0 solid transparent;
  border-image-source: url(${heroBubble});
  border-image-slice: 170 170 370 430 fill;
  ${heroSlice(0.3)}
  color: #fff;
  text-align: center;
  padding-top: 32px;
  padding-left: 20px;
  padding-right: 20px;
  @media (min-width: 768px) { ${heroSlice(0.5)} }
  h1 { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 500; letter-spacing: -0.02em; margin: 0.5rem 0 1rem; }
  em { color: ${C.coral}; font-weight: 800; font-style: italic; }
`;

// A brush-edged box with no tail.
export const brushBox = (corner) => `
  border: 0 solid transparent;
  border-image: url(${brushBody}) 130 fill / ${corner} stretch;
`;

export const Logos = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  background: #fff;
  padding: 14px 24px;
  border-radius: 14px;
  margin-bottom: 16px;
  img { height: 48px; width: auto; }
`;

export const Eyebrow = styled.p`
  color: #fff !important;
  font-size: 1.1rem;
`;

export const Sub = styled.p`
  color: #fff !important;
  font-weight: 600;
  font-size: 1.15rem;
  max-width: 560px;
  margin: 0 auto 1.5rem !important;
`;

export const HeroActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
`;

export const People = styled.img`
  display: block;
  width: 100%;
  max-width: 640px;
  height: auto;
  margin: 0 auto 24px;
`;

// Hero illustration tucked under the bubble's tail, with two small chat bubbles beside it.
export const PeopleArt = ({ src, bubble }) => (
  <PeopleWrap>
    <img src={bubble} alt="" className="chat left" />
    <img src={src} alt="" className="people" />
    <img src={bubble} alt="" className="chat right" />
  </PeopleWrap>
);

const PeopleWrap = styled.div`
  position: relative;
  max-width: 720px;
  margin: -24px auto 24px;
  .people {
    display: block;
    width: 100%;
    height: auto;
    /* the line art is a pale blue; deepen it so it holds up next to the bubble */
    filter: brightness(0.62) saturate(1.4) contrast(1.15);
  }
  .chat { position: absolute; width: 13%; max-width: 88px; top: 6%; }
  .left { left: 0; transform: scaleX(-1); }
  .right { right: 0; top: 2%; }
`;

// Full-width dark textured band of key numbers.
export const StatsBand = styled.ul`
  list-style: none;
  margin: 0 0 32px;
  padding: 40px max(16px, calc((100% - 1000px) / 2));
  background: ${C.navy} url(${bandTexture}) center / cover;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px 20px;
  text-align: center;
  @media (min-width: 900px) {
    grid-template-columns: repeat(${(p) => p.cols || 3}, 1fr);
    padding-top: 56px;
    padding-bottom: 56px;
  }
  strong { display: block; font-size: clamp(1.6rem, 4vw, 2.4rem); font-weight: 800; line-height: 1.1; }
  span { display: block; margin-top: 6px; font-size: 0.9rem; color: #d5e0ec; }
`;

// Large pull-quote on a full-width blue block.
export const QuoteBand = styled.blockquote`
  margin: 32px 0;
  padding: 56px max(16px, calc((100% - 860px) / 2));
  background: ${C.block};
  color: #fff;
  font-size: clamp(1.5rem, 3.6vw, 2.25rem);
  font-weight: 700;
  line-height: 1.3;
  letter-spacing: -0.01em;
`;

// Closing call to action: a brush-edged blue block with an illustration on its right end.
export const CtaBand = styled.div`
  position: relative;
  margin-top: 48px;
  padding: 0 16px;
  @media (min-width: 900px) { padding-bottom: 64px; }
  > div {
    ${brushBox('48px')}
    max-width: 1100px;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    padding: 48px 24px;
    @media (min-width: 900px) { padding: 64px 96px; }
  }
  h2 { margin-top: 0; }
  p { color: #fff; }
  a:not([href^='#']) { color: #fff; }
  /* the art is cut flat on its right and bottom edges, so it sits on the page edge and the footer */
  > img {
    display: block;
    width: 60%;
    max-width: 280px;
    height: auto;
    margin: -16px -16px 0 auto;
    @media (min-width: 900px) { position: absolute; right: 0; bottom: 0; width: 320px; max-width: none; margin: 0; }
  }
`;

// Data-protection consent line shown above each form.
export const Consent = styled.p`
  max-width: 760px;
  margin: 0 auto 16px !important;
  font-size: 0.9rem;
`;

export const JourneyHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  h2 { margin-bottom: 0; }
  img { width: 140px; height: auto; flex: none; display: block; }
`;

export const Section = styled.section`
  max-width: ${(p) => (p.narrow ? '760px' : '1100px')};
  margin: 0 auto;
  padding: 32px 16px;
`;

export const Lead = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${C.navy} !important;
`;

export const Ticks = styled.ul`
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

export const Chips = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  li {
    background: ${C.coralCard};
    color: #fff;
    border-radius: 999px;
    padding: 8px 16px;
    font-weight: 600;
  }
`;

// Small cards in a grid that lift when hovered.
export const CardGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 16px 0 24px;
  display: grid;
  gap: 16px;
  @media (min-width: 560px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, 1fr); }
  li {
    background: #fff;
    border-radius: 16px;
    padding: 20px;
    line-height: 1.45;
    box-shadow: 0 2px 10px rgba(11, 56, 101, 0.06);
    border-top: 4px solid ${C.coral};
    transition: transform 0.2s, box-shadow 0.2s;
  }
  li:hover { transform: translateY(-6px) scale(1.02); box-shadow: 0 14px 30px rgba(11, 56, 101, 0.16); }
  @media (prefers-reduced-motion: reduce) { li { transition: none; } li:hover { transform: none; } }
`;

export const Note = styled.p`
  font-size: 0.9rem;
  border-left: 3px solid ${C.blue};
  padding-left: 12px;
`;

export const Journey = styled.ol`
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
    border-left: 4px dashed #5bc0be;
  }
  /* across: a horizontal path on desktop, ending at the pilot-ready flag */
  ${(p) =>
    p.across &&
    `@media (min-width: 900px) {
      display: grid;
      grid-template-columns: repeat(${p.across}, 1fr);
      gap: 24px;
      padding-right: 120px;
      &::before { left: 0; right: 40px; top: 21px; bottom: auto; border-left: 0; border-top: 4px dashed #5BC0BE; }
      > li { flex-direction: column; gap: 12px; margin-bottom: 0; }
      h3 { font-size: 1.1rem; }
      p { font-size: 0.9rem; }
    }`}
`;

export const Step = styled.li`
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

// Start and end dates above the horizontal path; one line on mobile.
export const JourneyAxis = styled.p`
  display: flex;
  gap: 8px;
  font-weight: 700;
  color: ${C.navy} !important;
  margin: 1rem 0 0 !important;
  @media (min-width: 900px) { justify-content: space-between; padding-right: 120px; .dash { display: none; } }
`;

// Holds the path and its end flag; leaves room above for the flag on desktop.
export const JourneyTrack = styled.div`
  position: relative;
  @media (min-width: 900px) { margin-top: 24px; }
`;

// The flags illustration at the end of the desktop path.
export const JourneyEnd = styled.div`
  display: none;
  @media (min-width: 900px) {
    display: block;
    position: absolute;
    right: 0;
    top: -96px;
    width: 120px;
    text-align: center;
    font-size: 0.85rem;
    font-weight: 700;
    img { width: 100%; height: auto; display: block; }
  }
`;

// Hides the small flags next to the heading where the desktop path shows its own.
export const MobileOnly = styled.span`
  @media (min-width: 900px) { display: none; }
`;

export const Flag = styled.span`
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

export const Band = styled.div`
  background: ${C.blue};
  color: #fff;
  margin: 32px 0;
  h2 { margin-top: 0; }
  > div > p { color: #e6edf5; }
`;

export const BandInner = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 56px 16px;
`;

export const Cards = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  margin-top: 24px;
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  color: ${C.navy};
  border-radius: 24px;
  padding: 28px;
  h3 { margin-top: 0; }
  ${Button} { margin-top: auto; align-self: center; }
`;

export const Price = styled.p`
  font-size: 2.5rem;
  font-weight: 800;
  color: ${C.navy} !important;
  line-height: 1.1;
  span { display: block; font-size: 0.95rem; font-weight: 500; color: ${C.muted}; }
`;

export const Footer = styled.footer`
  background: ${C.navy};
  text-align: center;
  padding: 20px 16px;
  a { color: #fff; }
`;
