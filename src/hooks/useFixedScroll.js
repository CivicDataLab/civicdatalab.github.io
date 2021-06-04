import { useEffect } from 'react';

export default function useFixedScroll(leftRef, rightRef, additionalHeight = 50) {
  useEffect(() => {
    function scrollHandler() {
      if (window.innerWidth >= 1280) {
        if (rightRef && window.scrollY > rightRef.current.scrollHeight / 2 + additionalHeight) {
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
  }, [leftRef, rightRef, additionalHeight]);
}
