import styled from 'styled-components';

const SectorsCard = styled.div`
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
  .card:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }

  .container {
    padding: 17px 20px;
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
    border: 8px solid #000000;
    opacity: 1;
    width: 59px;
    margin-left: 0px;
  }
  p {
    text-align: left;
    font-size: 17px;
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
  @media (min-width: 768px){
    min-width: 30%;
    width: 45%;
  }
  @media (min-width: 1200px) {
    width: 30%;
    .container-sectors {
      padding-left: 20px;
      padding-right: 19px;
      display: flex;
      justify-content: space-between;
    }
    .card{
      padding-left: 29px;
      padding-right: 29px;
      padding-top:20px;
    }
    .read-more{
      padding-right: 0px;
    }

    .container{
      padding: 0px 0px 0px 0px;
    }
    p{
      width: 23vw;
      // padding-right: 26px;
    }
}
  @media (min-width: 1440px) {
    width: 32%;
    h4 {
      font-size: 32px;
      line-height: 56px;
    }
    hr {
      width: 98px;
      
    }
    p {
      font-size: 30px;
      line-height: 37px;
     
    }
    .container {
      // padding: 29px 40px;
    }
    .read-more {
      font-size: 20px;
      line-height: 78px;
      marging-right: 30px;
      
    }

  }
  @media(min-width: 1700px){
    h4{
      font-size: 40px;
    }
    p{
      font-size: 25px;
    }
    .read-more{
      font-size: 28px;
    }
  }
`;

export default SectorsCard;
