import { useEffect } from 'react';

export default function useFixedScroll(leftRef, rightRef) {
  useEffect(() => {
    function scrollHandler() {
      if (window.innerWidth >= 1280) {
        if (rightRef && window.scrollY > rightRef.current.scrollHeight / 2 + 50) {
          leftRef.current.style.position = 'static';
        } else {
          leftRef.current.style.position = 'fixed';
        }
      }
    }

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, [leftRef, rightRef]);
}
