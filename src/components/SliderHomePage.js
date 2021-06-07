import React from 'react';
import SliderHomePageStyle from '../styles/SliderHomePage';

const SliderHomePage = (props) => {
  return (
    <SliderHomePageStyle dark={props.dark}>
      <div className="circle-container">
        <div>
          <h3 className="heading-scroll-section">{props.project || 'HEADER COMES HERE'}</h3>

          <hr className="line-scroll-section"></hr>
        </div>

        <span className="circle-scroll-section"></span>
      </div>

      <a href={props.link} target="_blank" rel="noreferrer noopener" className="content-scroll-section">
        {props.title || 'Lorem ipsum dolor sit amet'}
      </a>
    </SliderHomePageStyle>
  );
};

export default SliderHomePage;
