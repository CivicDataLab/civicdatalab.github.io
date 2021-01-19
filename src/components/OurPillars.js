import React from 'react';
import HeroText from '../styles/HeroText';
import OurPillarsStyle from "../styles/OurPillars";
const OurPillars= (props) => {
    return(
        <OurPillarsStyle>
        <div className={'pillars-container'}>
            <div className={"image-container"}>
                <p><HeroText>Data</HeroText></p>
                <div className={"image-placeholder"}></div>

            </div>
            <div className={"image-container"}>
                <p><HeroText>Tech</HeroText></p>
                <div className={"image-placeholder"}></div>

            </div>
            <div className={"image-container"}>
                <p><HeroText>Design</HeroText></p>
                <div className={"image-placeholder"}></div>

            </div>
            <div className={"image-container"}>
                <p><HeroText>Social Science</HeroText></p>
                <div className={"image-placeholder"}></div>

            </div>
        </div>
        </OurPillarsStyle>
    )
}

export default OurPillars;