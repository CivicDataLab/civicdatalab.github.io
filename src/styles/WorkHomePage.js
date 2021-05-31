import styled from 'styled-components';

const WorkHomePage = styled.div`
  color: white;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 40px 20px;

  .sub-text {
    width: 100%;
  }

  hr {
    border: 8px solid #FFF;
    border-radius: 12px;
    width: 58px;
    margin-left: 0px;
    margin-top: 18px;
  }

  .content {
    margin-bottom: 20px;
  }

  .first-text-block {
    text-align: left;
    font-size: 18px;
    line-height: 1.4em;
    font-family: Montserrat;
    margin-top: 16px;
    padding-left: 0px;
  }

  .circle-wrapper {
    display: grid;
    margin-top: 80px;
  }

  .circle {
    height: 159px;
    width: 159px;
    background-color: #ffffff;
    border-radius: 50%;
    margin-bottom: 14px;
    box-shadow: 0px 10px 30px #A2CAFD3C;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .below-text {
    text-align: left;
    font-weight: 500;
    font-size: 18px;
    line-height: 31px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #ffffff;
    width: 100%;
    text-decoration: none;
  }

  p {
    padding-left: 22px;
    padding-right: 21px;
    padding-top: 4px;
    padding-bottom: 5px;
    display: flex;
    justify-content: center;
    margin: 0;
  }

  .content-circle {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 10px;
    color: white;
    text-decoration: none;

    &:hover {
      .circle {
        box-shadow: 0px 10px 60px #A2CAFD3C;
      }
    }
  }

  #first-circle {
    margin-bottom: 40px;
  }

  @media (min-width: 550px) {
    .circle-wrapper {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 900px) {
    padding-top: 40px;
    padding-bottom: 40px;
    max-width: 100%;
    .container-work-section {
      display: flex;
    }
    .circle-wrapper {
      justify-items: start;
      width: 50%;
    }
    .content {ase64
      tracedSVG
      srcWebp
      srcSetWebp
      originalImg
      originalName
      font-size: 18px;
      line-height: 25px;
      width: 50%;
    }

    .circle-wrapper {
      grid-template-columns: 360px 360px;
    }
    .circle {
      margin-bottom: 24px;
      width: 240px;
      height: 240px;

      img {
        width: 240px;
        height: 240px;
      }
    }
  }

  @media(min-width: 1280px) {
    flex-direction: row;
    padding: 100px 0px;

    .first-text-block {
      width: 60%;
    }
  }

  @media (min-width: 1440px) {
    padding: 180px 0px;
    margin-bottom: 80px;

    .sub-text {
      font-size: 60px;
      line-height: 60px;
    }

    .circle {
      width: 260px;
      height: 260px;
    }

    .below-text {
      font-size: 20px;
    }

    .first-text-block {
      font-size: 18px;
      line-height: 27px;
      width: 40%;
    }
    .work-home-page {
      width: 94px;
      margin-top: 40px;
      margin-bottom: 40px;
    }
  }
`;

export default WorkHomePage;
