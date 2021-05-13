import styled from 'styled-components';

const WorkHomePage = styled.div`
  background: rgba(178, 201, 229, 0.27);
  display: flex;
  box-sizing: border-box;
  padding: 0 20px;

  .sub-text {
    width: 100%;
  }

  hr {
    border: 8px solid #000000;
    opacity: 1;
    width: 58px;
    margin-left: 0px;
    margin-top: 18px;
  }

  .container-work-section {
    padding: 40px 0px;
    width: 100%;
  }

  .content {
    margin-bottom: 20px;
  }

  .first-text-block {
    text-align: left;
    font-size: 18px;
    line-height: 1.4em;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    margin-top: 16px;
    padding-left: 0px;
  }

  .circle-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 40px;
  }

  .circle {
    height: 159px;
    width: 159px;
    background-color: #ffffff;
    border-radius: 50%;
    margin-bottom: 30px;

    img {
      width: inherit;
      height: inherit;
      border-radius: inherit;
    }
  }

  .below-text {
    background-color: black;
    text-align: left;
    font: normal normal medium;
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
  }

  @media (min-width: 550px) {
    .circle-wrapper {
      flex-direction: row;
      justify-content: space-around;
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
      justify-content: space-between;
      width: 50%;
    }
    .content {
      width: 50%;
    }
  }

  @media (min-width: 1280px) {
    padding: 40px 52px;
    .work-part {
      font-size: 70px;
      line-height: 70px;
    }
    .sub-text {
      font-size: 70px;
      line-height: 70px;
    }
    .first-text-block {
      font-size: 18px;
      line-height: 25px;
      width: 50%;
    }
    .circle {
      margin-bottom: 60px;
      width: 250px;
      height: 250px;
    }
  }

  @media (min-width: 1440px) {
    padding: 100px 72px;
    .work-part {
      font-size: 60px;
      line-height: 60px;
    }
    .sub-text {
      font-size: 60px;
      line-height: 60px;
    }
    .container-work-section {
      display: flex;
      justify-content: space-between;
    }

    .circle {
      width: 280px;
      height: 280px;
    }

    .first-text-block {
      font-size: 18px;
      line-height: 27px;
      width: 75%;
    }
    .work-home-page {
      width: 94px;
    }
    .circle-wraper {
      width: 50%;
    }
  }

  @media (min-width: 1920px) {
    .circle {
      width: 360px;
      height: 360px;
    }
  }
`;

export default WorkHomePage;