import styled from 'styled-components';

const SectorsCard = styled.div`
  .card {
    padding: 0;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.29);
    transition: 0.3s;
    height: 100%;
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .gatsby-image-wrapper {
    height: 180px;
  }

  .container {
    box-sizing: border-box;
    padding: 18px 20px;
  }
  h4 {
    text-align: left;
    font-size: 24px;
    line-height: 34px;
    font-family: 'Bungee', cursive;
    letter-spacing: 0px;
    color: #096c90;
    opacity: 1;
    text-transform: uppercase;
    margin-bottom: 0px;
  }

  hr {
    border: 4px solid #000000;
    opacity: 1;
    width: 60px;
    margin-left: 0px;
  }
  p {
    text-align: left;
    font-size: 18px;
    line-height: 20px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #585050;
    opacity: 1;
  }
  .read-more {
    text-align: left;
    font: normal normal medium;
    font-size: 16px;
    line-height: 45px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #168cd6;
    opacity: 1;
    text-decoration: none;
    display: flex;
    justify-content: flex-end;
    padding-right: 23px;
  }
  @media (min-width: 1200px) {
    .gatsby-image-wrapper {
      height: 300px;
    }
    .container-sectors {
      padding-left: 20px;
      padding-right: 19px;
      display: flex;
      justify-content: space-between;
    }
    .read-more-wrapper {
      padding-right: 29px;
    }
    .container {
      padding-left: 29px;
      padding-right: 29px;
    }
  }
  @media (min-width: 1440px) {
    h4 {
      font-size: 32px;
      line-height: 56px;
    }
    hr {
      width: 98px;
    }
    p {
      font-size: 18px;
      line-height: 27px;
    }
    .read-more {
      font-size: 20px;
      line-height: 78px;
      marging-right: 18px;
    }
  }
`;

export default SectorsCard;
