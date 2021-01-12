import React from 'react';
import SliderHomePageStyle from '../styles/SliderHomePage';

const SliderHomePage = (props) => {
  return (
    <SliderHomePageStyle dark={props.dark}>
      <div className={'circle-container'}>
        <div>
          <p className={'heading-scroll-section'}>HEADER COMES HERE </p>

          <hr className={'line-scroll-section'}></hr>
        </div>

        <span className={'circle-scroll-section'}></span>
      </div>

      <p className={'content-scroll-section'}>Lorem ipsum dolor sit amet</p>
    </SliderHomePageStyle>
  );
};

export default SliderHomePage;
