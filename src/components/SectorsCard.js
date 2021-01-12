import React from 'react';
import SectorsCardStyle from '../styles/SectorsCard';
import { Link } from "gatsby";

const SectorsCard = (props) => {
  return (
    <>
      <SectorsCardStyle>
        <div className={'card'}>
          {/* <img src="img_avatar.png" alt="Avatar" style="width:100%"> */}
          <div className={'container'}>
            <h4 className={'sector-name'}>public finance</h4>
            <hr></hr>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            
          </div>
          <div className={"read-more-wrapper"}>
          <Link to="#" className={"read-more"}>Read more &gt;&gt;</Link>
          </div>
        </div>
      </SectorsCardStyle>
    </>
  );
};

export default SectorsCard;
