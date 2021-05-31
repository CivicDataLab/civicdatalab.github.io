import styled from 'styled-components';

const TeamHomePage = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 20px;
  // .container-team-section {
  //   display: flex;
  //   flex-direction: column;
  //   padding: 48px 20px;
  // }

  hr {
    border: 8px solid #000000;
    opacity: 1;
    width: 58px;
    margin-left: 0px;
    margin-top: 18px;
  }

  p {
    text-align: left;
    font-size: 18px;
    line-height: 1.4em;
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

  @media (min-width: 900px) {
    flex-direction: row;

    .content {
      flex: 50%;
    }
    .lower-content-section {
      flex: 50%;
    }
    .section-heading {
      font-size: 32px;
      line-height: 32px;
    }
    p {
      font-size: 18px;
      line-height: 27px;
    }
    .meet-the-team {
      font-size: 16x;
    }
    @media (min-width: 900px) {
      .container-team-section {
        display: flex;
        padding-right: 0;
      }
    }
  }

  @media (min-width: 1280px) {
    padding: 40px 0px;

    .section-heading {
      font-size: 70px;
      line-height: 67px;
      margin-top: 63px;
    }
    p {
      font-size: 18px;
      line-height: 25px;
      width: 62%;
    }
    .meet-the-team {
      line-height: 70px;
      font-size: 20px;
    }
  }

  @media (min-width: 1440px) {

    .content {
      flex: 70%;
    }
    .section-heading {
      font-size: 60px;
      line-height: 60px;
      margin-top: 161px;
    }
    .lower-content-section {
      margin-top: 89px;
    }

    p {
      font-size: 18px;
      line-height: 27px;
      width: 50%;
    }

    .meet-the-team {
      line-height: 78px;
      font-size: 22px;
    }
  }
`;

export default TeamHomePage;
