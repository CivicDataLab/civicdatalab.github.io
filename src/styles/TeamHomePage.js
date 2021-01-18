import styled from 'styled-components';

const TeamHomePage = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 20px;
  padding-right: 30px;
  padding-top: 47px;
  margin-bottom: 24px;
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
  width: 50%;
}

    .lower-content-section {
      flex: 50%;
    }

    .section-heading {
      font-size: 70px;
      line-height: 67px;

      margin-top: 63px;
    }
    p {
      font-size: 17px;
      line-height: 25px;
      width: 62%;
    }
    .meet-the-team {
      line-height: 70px;
      font-size: 20px;
    }

  }

  @media (min-width: 700px) and (max-width: 1200px) {
    .container-team-section {
      // display: flex;
    }
    .content {
      flex: 50%;
    }

    .section-heading {
      font-size: 50px;
      line-height: 50px;

      margin-top: 63px;
    }
    p {
      font-size: 17px;
      line-height: 27px;
    
    }
    .meet-the-team {
      
      font-size: 16x;
    }
    @media (min-width: 900px){
      .container-team-section{
        display: flex;
        padding-right: 0;
      }
    }
  }
`;

export default TeamHomePage;
