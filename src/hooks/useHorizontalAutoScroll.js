import { useEffect } from 'react';

export default function useHorizontalAutoScroll(scrollContainerRef) {
  useEffect(() => {
    let scrollInterval;
    let scrollWidth = 0;
    if (scrollContainerRef.current) {
      scrollInterval = setInterval(() => {
        if (scrollWidth >= scrollContainerRef.current.scrollWidth) {
          scrollWidth = 0;
          scrollContainerRef.current.scrollTo(0, 0);
        } else {
          scrollWidth = scrollWidth + 1;
          scrollContainerRef.current.scrollTo(scrollWidth, 0);
        }
      }, 20);

      scrollContainerRef.current.onmouseover = () => {
        clearInterval(scrollInterval);
      };

      scrollContainerRef.current.onmouseout = () => {
        scrollInterval = setInterval(() => {
          if (scrollWidth >= scrollContainerRef.current.scrollWidth) {
            scrollWidth = 0;
            scrollContainerRef.current.scrollTo(0, 0);
          } else {
            scrollWidth = scrollWidth + 1;
            scrollContainerRef.current.scrollTo(scrollWidth, 0);
          }
        }, 20);
      };
    }

    return () => {
      clearInterval(scrollInterval);
    };
  }, [scrollContainerRef]);
}
