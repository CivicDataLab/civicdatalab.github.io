import styled from 'styled-components';

const TeamHomePage = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 30px;
  padding-top: 47px;
  hr {
    border: 8px solid #000000;
    opacity: 1;
    width: 58px;
    margin-left: 0px;
    margin-top: 17px;
  }

  p {
    text-align: left;
    font-size: 17px;
    line-height: 20px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
    margin-top: 25px;
  }

  .meet-the-team {
    text-align: left;
    font-size: 15px;
    line-height: 33px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #0da3b7;
    opacity: 1;
    text-decoration: none;
  }
  .container-team-section {
    padding-right: 41px;
  }
  @media (min-width: 1440px) {
    .container-team-section {
      display: flex;
    }
    .content {
      flex: 70%;
    }
    .section-heading {
      font-size: 120px;
      line-height: 120px;
      padding-left: 73px;
      margin-top: 161px;
    }
    .lower-content-section {
      margin-top: 89px;
    }

    p {
      font-size: 30px;
      line-height: 37px;
      width: 62%;
    }

    .meet-the-team {
      line-height: 78px;
      font-size: 35px;
    }
  }
  @media (min-width: 1200px) and (max-width: 1440px) {
    .container-team-section {
      display: flex;
    }

    .content{
      display: grid;
    }
    .lower-content-section {
      flex: 50%;
    }
    .section-heading {
      font-size: 50px;
      line-height: 50px;
    }
    .section-heading {
      font-size: 100px;
      line-height: 100px;

      margin-top: 63px;
    }
    p {
      font-size: 25px;
      line-height: 37px;
      width: 62%;
    }
    .meet-the-team {
      line-height: 70px;
      font-size: 30px;
    }

  }

  @media (min-width: 700px) and (max-width: 1200px) {
    .container-team-section {
      display: flex;
    }
    .content {
      flex: 50%;
    }

    .section-heading {
      font-size: 71px;
      line-height: 65px;

      margin-top: 63px;
    }
    p {
      font-size: 23px;
      line-height: 35px;
      width: 62%;
    }
    .meet-the-team {
      line-height: 65px;
      font-size: 30px;
    }
  }
`;

export default TeamHomePage;
