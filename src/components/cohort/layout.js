import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import styled, { createGlobalStyle } from 'styled-components';
import Seo from '../Seo/Seo';
import background from '../../images/cohort/background.webp';
import bubbleBody from '../../images/cohort/bubble-body.webp';
import bubbleTail from '../../images/cohort/bubble-tail.webp';

// Shared layout for the cohort landing pages under /cohorts/.

export const C = {
  blue: '#4A74A0',
  coral: '#E8705F',
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
export const CohortHead = ({ title, description }) => (
  <>
    <PageStyle />
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
  body { margin: 0; background: #F4F5F7 url(${background}) top center / 100% auto repeat-y; }
  @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
`;

export const Page = styled.div`
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
  max-width: 960px;
  margin: 0 auto;
  padding: 0 16px;
`;

// The bubble art is 9-sliced so its brush edges and corners survive any box size;
// the tail is a separate piece hung off the bottom edge.
export const bubble = (corner, tailW, art = { body: bubbleBody, tail: bubbleTail }) => `
  position: relative;
  border: 0 solid transparent;
  border-image: url(${art.body}) 130 fill / ${corner} stretch;
  &::after {
    content: '';
    position: absolute;
    top: calc(100% - ${tailW * 0.25}px);
    left: max(18%, ${corner} + 12px);
    width: ${tailW}px;
    height: ${tailW * 1.33}px;
    background: url(${art.tail}) top / contain no-repeat;
  }
`;

export const HeroBubble = styled.div`
  ${bubble('90px', 150)}
  color: #fff;
  text-align: center;
  padding: 28px 20px 48px;
  margin-bottom: 150px;
  h1 { font-size: clamp(2rem, 6vw, 3.5rem); font-weight: 500; letter-spacing: -0.02em; margin: 0.5rem 0 1rem; }
  em { color: ${C.coral}; font-weight: 800; font-style: italic; }
`;

export const Logos = styled.div`
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

export const Hills = styled.img`
  display: block;
  width: 100%;
  max-width: 560px;
  height: auto;
  margin: 24px 0 0 auto;
`;

export const JourneyHead = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  h2 { margin-bottom: 0; }
  img { width: 140px; height: auto; flex: none; }
`;

export const Section = styled.section`
  max-width: ${(p) => (p.narrow ? '760px' : '1100px')};
  margin: 0 auto;
  padding: 32px 16px;
`;

export const Stats = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 96px 24px;
  margin-bottom: 80px;
  @media (min-width: 560px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 900px) { grid-template-columns: repeat(3, 1fr); }
`;

export const Stat = styled.li`
  ${bubble('48px', 72)}
  color: #fff;
  padding: 28px 24px 32px;
  text-align: center;
  strong { display: block; font-size: 2.25rem; font-weight: 800; line-height: 1.1; }
  span { display: block; margin-top: 6px; font-size: 0.95rem; opacity: 0.9; }
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
  li { background: #fff; border: 1px solid #D5DCE4; border-radius: 999px; padding: 8px 16px; font-weight: 500; }
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
    border-left: 4px dashed #5BC0BE;
  }
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
  > div > p { color: #E6EDF5; }
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
