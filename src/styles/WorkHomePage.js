import styled from 'styled-components';
const WorkHomePage = styled.div`
  background: rgba(178, 201, 229, 0.27);
  display: flex;

  .sub-text {
    width: 100%;
    opacity: 1;
  }

  hr {
    border: 8px solid #000000;
    opacity: 1;
    width: 58px;
    margin-left: 0px;
    margin-top: 18px;
  }

  .container-work-section {
    padding: 40px 20px 50px;
  }

  .content {
    margin-bottom: 20px;
  }

  .first-text-block {
    text-align: left;
    font-size: 18px;
    line-height: 20px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    margin-right: 40px;
    margin-top: 16px;
    padding-left: 0px;
  }

  .circle-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 18px;
  }

  .circle {
    height: 159px;
    width: 159px;
    background-color: #ffffff;
    border-radius: 50%;
    // margin-left: 77px;
    // margin-bottom: 25px;
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
    opacity: 1;
    // margin-left: 68px;
    // margin-right: 75px;
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
    // margin-top: 25px;
    // margin-bottom: 50px;
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

    .content-circle {
      margin-left: 44px;
    }
  }

  @media (min-width: 900px) {
    padding-top: 40px;
    padding-bottom: 40px;
    .container-work-section {
      display: flex;
    }
    .circle-wrapper {
      // column-gap: 18px;
      justify-content: space-between;
      width: 50%;
    }
    .content {
      width: 50%;
    }
  }

  @media (min-width: 1440px) {
    padding-top: 100px;
    padding-bottom: 100px;
    .work-part {
      font-size: 60px;
      line-height: 60px;
   
    }
    .sub-text {
      font-size: 60px;
      line-height: 60px;
   
    }
    .container-team-section {
      display: flex;
    }

    .circle {
      width: 300px;
      height: 300px;
      margin-bottom: 12px;
    }

    .first-text-block {
      font-size: 18px;
      line-height: 27px;
      width: 615px;
      
    }
    .work-home-page {
      width: 94px;
     
    }
    .container-work-section {
      display: flex;
      padding: 40px 73px 50px;
    }
    .circle-wraper {
      display: flex;
    }
  }
  @media (min-width: 1200px) and (max-width: 1440px) {
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
      width: 615px;
    }

    .container-work-section {
      display: flex;
    }
  }
`;

export default WorkHomePage;
