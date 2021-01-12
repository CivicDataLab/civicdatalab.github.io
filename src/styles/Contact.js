import styled from 'styled-components';
const Contact = styled.div`
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

  .container-contact-section {
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

  .mail-text-block {
    text-align: left;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #000000;
    opacity: 1;
  }

  input {
    background: #ffffff padding-box;
    border: 1px solid #707070;
    opacity: 1;
    // width: 16vw;
    height: 32px;
    min-width: 303px;
    margin-bottom: 21px;
  }

  .write-input-type {
    height: 125px;
  }
  input::-webkit-input-placeholder {
    /* WebKit browsers */
    padding-left: 11px;
    text-align: left;
    font-size: 17px;
    line-height: 20px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #cbbfbf;
    opacity: 1;
  }
  .send-button {
    background-color: black;
    color: white;
    font-size: 20px;
    line-height: 26px;
    font-family: Montserrat;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    height: 32px;
    width: 90px;
    border-radius: 36px;
  }

  .send-button-container {
    display: flex;
    justify-content: flex-end;
    padding-right: 18px;
  }

  @media (min-width: 1440px) {
    .main-part {
     
      font-size: 120px;
      line-height: 120px;

    }

    .sub-text{
      font-size: 120px;
      line-height: 120px;
    }
    .contact-page-line{
      width: 94px;
      margin-left:0px;
    }
  }
`;

export default Contact;
