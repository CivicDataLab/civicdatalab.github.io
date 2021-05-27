import styled from 'styled-components';
const Contact = styled.div`
  .sub-text {
    width: 100%;
    opacity: 1;
    color: black;
  }

  hr {
    border: 8px solid #000000;
    opacity: 1;
    width: 58px;
    margin-left: 0px;
    margin-top: 18px;
  }

  .container-contact-section {
    padding-left: 20px;
    padding-top: 40px;
    margin-right: 18px;
  }
  .first-text-block {
    text-align: left;
    font-size: 18px;
    line-height: 1.4em;
    margin-right: 40px;
    margin-top: 40px;
    padding-left: 0px;
  }

  .mail-text-block {
    text-align: left;
    font-weight: 600;
    font-size: 22px;
    line-height: 27px;
  }

  input {
    font-family: Montserrat;
    background: #ffffff padding-box;
    border: 1px solid #707070;
    width: 100%;
    margin-bottom: 21px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    font-size: 18px;
  }

  .write-input-type {
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    box-sizing: border-box;
    font-family: Montserrat;
    font-size: 18px;
    border: 1px solid rgb(112, 112, 112);
  }

  input::-webkit-input-placeholder {
    /* WebKit browsers */
    text-align: left;
    font-size: 18px;
    line-height: 20px;
    font-family: Montserrat;
    letter-spacing: 0px;
    opacity: 1;
  }

  .send-button-container {
    display: flex;
    justify-content: flex-end;
  }

  .send-button {
    background-color: black;
    color: white;
    font-size: 20px;
    font-family: Montserrat;
    color: #ffffff;
    margin-top: 40px;
    cursor: pointer;
    border: none;
    font-weight: 500;
    padding: 8px 40px;
  }

  @media (min-width: 900px) {
    .container-contact-section {
      display: flex;
    }
    .content {
      width: 50%;
    }

    .lower-content-section {
      margin-top: 141px;
    }
    .first-text-block {
      margin-right: 175px;
    }

    .send-button {
      padding: 15px 50px;
    }
  }
  @media (min-width: 1280px) {
    .main-part {
      font-size: 70px;
      line-height: 70px;
    }
    .container-contact-section {
      margin-right: 0;
      padding-top: 100px;
      padding-left: 52px;
      padding-right: 52px;
    }

    .sub-text {
      font-size: 70px;
      line-height: 70px;
    }
  }

  @media (min-width: 1440px) {
    margin-bottom: 120px;
    .main-part {
      font-size: 60px;
      line-height: 60px;
    }

    .sub-text {
      font-size: 60px;
      line-height: 60px;
    }
    .contact-page-line {
      width: 94px;
      margin-left: 0px;
    }

    .container-contact-section {
      padding-left: 72px;
      padding-right: 72px;
      margin-right: 0px;
    }

    .first-text-block {
      font-size: 18px;
      line-height: 27px;
    }

    .mail-text-block {
      font-size: 18px;
      line-height: 27px;
    }

    .lower-content-section {
      margin-top: 200px;
    }
    input {
      padding-left: 30px;
      padding-top: 25px;
      padding-bottom: 25px;
      font-size: 18px;
    }

    .write-input-type {
      padding-left: 30px;
      padding-top: 25px;
    }
  }
`;

export default Contact;
