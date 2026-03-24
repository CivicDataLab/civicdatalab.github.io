import { useEffect } from 'react';

export default function useFixedScroll(leftRef, rightRef) {
  useEffect(() => {
    function scrollHandler() {
      if (window.innerWidth >= 1280) {
        const rightBottom = rightRef.current.getBoundingClientRect().bottom;
        if (rightBottom <= window.innerHeight) {
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
