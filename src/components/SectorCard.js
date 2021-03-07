import React from 'react';
import SectorsCardStyle from '../styles/SectorsCard';
import { Link } from 'gatsby';
import Image from 'gatsby-image';

const SectorCard = ({ name, description, link, color, image, about }) => {
  return (
    <SectorsCardStyle>
      <div className={'card'}>
        <Image fluid={image} />
        <div className={'container'}>
          <h4 style={{ color: color }} className={'sector-name'}>
            {name}
          </h4>
          <hr></hr>
          <p>{description}</p>
        </div>
        <div className={'read-more-wrapper'}>
          <Link to={link} className={'read-more'}>
            {about ? 'Find them here ' : 'Read more '}
            &gt;&gt;
          </Link>
        </div>
      </div>
    </SectorsCardStyle>
  );
};

export default SectorCard;
