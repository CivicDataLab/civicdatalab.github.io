import React from 'react';
import HeroText from '../styles/HeroText';

const CONSTANTS = {
  DELETING_SPEED: 100,
  TYPING_SPEED: 75
};

const TypeWriter = ({ messages }) => {
  const [state, setState] = React.useState({
    text: '',
    message: '',
    isDeleting: false,
    loopNum: 0,
    typingSpeed: CONSTANTS.TYPING_SPEED
  });

  React.useEffect(() => {
    let timer = '';
    const handleType = () => {
      setState((currentState) => ({
        ...currentState,
        text: getCurrentText(currentState),
        typingSpeed: getTypingSpeed(currentState)
      }));
      timer = setTimeout(handleType, state.typingSpeed);
    };
    handleType();
    return () => clearTimeout(timer);
  }, [state.isDeleting, state.typingSpeed]);

  React.useEffect(() => {
    if (!state.isDeleting && state.text === state.message) {
      setTimeout(() => {
        setState((currentState) => ({
          ...currentState,
          isDeleting: true
        }));
      }, 500);
    } else if (state.isDeleting && state.text === '') {
      setState((currentState) => ({
        ...currentState,
        isDeleting: false,
        loopNum: currentState.loopNum + 1,
        message: getMessage(currentState, messages)
      }));
    }
  }, [state.text, state.message, state.isDeleting, messages]);

  const getCurrentText = (currentState) => {
    return currentState.isDeleting
      ? currentState.message.substring(0, currentState.text.length - 1)
      : currentState.message.substring(0, currentState.text.length + 1);
  };

  const getMessage = (currentState, data) => {
    return data[Number(currentState.loopNum) % Number(data.length)];
  };

  const getTypingSpeed = (currentState) => {
    return currentState.isDeleting ? CONSTANTS.TYPING_SPEED : CONSTANTS.DELETING_SPEED;
  };

  return (
    <HeroText>
      <span>
        We work to strengthen the course of civic engagements using <br />{' '}
      </span>
      <span className="animated-text">{state.text}</span>
      {/* <span id="cursor" /> */}
    </HeroText>
  );
};

export default TypeWriter;
