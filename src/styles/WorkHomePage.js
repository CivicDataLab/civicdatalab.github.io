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
    margin-top: 17px;
  }

  .container-work-section {
    padding-left: 20px;
    padding-top: 40px;
  }

  .first-text-block {
    text-align: left;
    font-size: 17px;
    line-height: 20px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    margin-right: 40px;
    margin-top: 40px;
    padding-left: 0px;
  }

  .circle {
    height: 159px;
    width: 159px;
    background-color: #ffffff;
    border-radius: 50%;
    margin-left: 77px;
    margin-bottom: 25px;
  }

  .below-text {
    background-color: black;
    text-align: left;
    font: normal normal medium;
    font-size: 17px;
    line-height: 31px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    margin-left: 68px;
    margin-right: 75px;
    width: 181px;
  }
  p {
    padding-left: 22px;
    padding-right: 21px;
    padding-top: 4px;
    padding-bottom: 5px;
    display: flex;
    justify-content: center;
  }

  .content-circle {
    margin-top: 25px;
    margin-bottom: 50px;
  }

  @media (min-width: 1440px) {
    .work-part {
      font-size: 120px;
      line-height: 120px;
      padding-left: 73px;
    }
    .sub-text {
      font-size: 120px;
      line-height: 120px;
      padding-left: 73px;
    }
    .container-team-section {
      display: flex;
    }

    .circle {
      width: 18vw;
      height: 18vw;
      margin-left: 44px;
    }

    .first-text-block {
      font-size: 30px;
      line-height: 37px;
      width: 615px;
      margin-left: 87px;
    }
    .work-home-page{
      width: 94px;
      margin-left: 89px;
    }
    .container-work-section{
      display: flex;
    }
    .circle-wraper{
      display: flex;
    }
  }
    @media (min-width: 1200px) and (max-width: 1440px) {
      .work-part {
        font-size: 100px;
        line-height: 100px;
        
      }

      .sub-text {
        font-size: 100px;
        line-height: 120px;
        
      }
      .first-text-block {
        font-size: 30px;
        line-height: 37px;
        width: 615px;
      
      }

      .container-work-section{
        display: flex;
      }

    
  }
`;

export default WorkHomePage;
