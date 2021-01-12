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
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum
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
