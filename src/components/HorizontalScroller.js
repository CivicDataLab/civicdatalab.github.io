import React, { useState, useRef } from 'react';

const HorizontalScroller = (props) => {
  const { children, ...otherProps } = props;
  const divRef = useRef();

  const [isScrolling, setIsScrolling] = useState(false);
  const [clientX, setClientX] = useState(0);
  const [scrollX, setScrollX] = useState(0);

  const onMouseDown = (event) => {
    setIsScrolling(true);
    setClientX(event.clientX);
  };

  const onMouseUp = (event) => {
    setIsScrolling(false);
  };

  const onMouseMove = (event) => {
    if (isScrolling) {
      const updatedScroll = scrollX + event.clientX - clientX;
      divRef.current.scrollLeft = updatedScroll;
      setScrollX(updatedScroll);
      setClientX(event.clientX);
    }
  };

  return (
    <div {...otherProps} ref={divRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove}>
      {children}
    </div>
  );
};

export default HorizontalScroller;
