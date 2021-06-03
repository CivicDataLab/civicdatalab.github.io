import styled from 'styled-components';

const TeamHomePage = styled.div`
  padding: 48px 0;

  hr {
    border: 8px solid #000000;
    border-radius: 12px;
    width: 58px;
    margin-left: 0px;
    margin-top: 18px;
  }

  p {
    text-align: left;
    font-size: 18px;
    line-height: 1.4em;
    font-family: Montserrat;
    color: #000000;
    margin-top: 25px;
  }

  .meet-the-team {
    text-align: left;
    font-size: 18px;
    line-height: 33px;
    font-weight: 500;
    color: #0da3b7;
    text-decoration: none;
  }

  @media (min-width: 900px) {
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
      width: 80%;
    }
    .meet-the-team {
      line-height: 70px;
      font-size: 20px;
    }

    .upper-content-section {
      grid-column: 1/4;
    }

    .lower-content-section {
      grid-column: 4/12;
    }
  }

  @media (min-width: 1440px) {
    .content {
      flex: 70%;
    }
    .section-heading {
      font-size: 60px;
      line-height: 60px;
      margin-top: 150px;
    }
    hr {
      margin-top: 40px;
      margin-bottom: 40px;
    }
    .lower-content-section {
      margin-top: 80px;
    }

    p {
      font-size: 18px;
      line-height: 27px;
    }

    .meet-the-team {
      line-height: 78px;
    }
  }
`;

export default TeamHomePage;
