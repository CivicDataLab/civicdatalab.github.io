import styled from 'styled-components';
import StandardGrid from './StandardGrid';


const Contact = styled(StandardGrid)`
  padding-top: 40px;
  margin-right: 18px;
  margin-bottom: 60px;

  .sub-text {
    width: 100%;
    color: black;
  }

  hr {
    border: 8px solid #000000;
    border-radius: 12px;
    width: 58px;
    margin-left: 0px;
    margin-top: 18px;
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
    border-radius: 12px;
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
    border-radius: 12px;
  }

  input::-webkit-input-placeholder {
    /* WebKit browsers */
    text-align: left;
    font-size: 18px;
    line-height: 20px;
    font-family: Montserrat;
    letter-spacing: 0px;
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
    margin-top: 40px;
    cursor: pointer;
    border: none;
    font-weight: 500;
    padding: 8px 40px;
    border-radius: 28px;
  }

  @media (min-width: 900px) {

    .send-button {
      padding: 15px 50px;
    }
  }
  @media (min-width: 1280px) {
    margin-right: 0;
    padding: 80px 0;

    .main-part {
      font-size: 70px;
      line-height: 70px;
    }

    .sub-text {
      font-size: 70px;
      line-height: 70px;
    }

    .upper-content-section {
      grid-column: 1/4;
    }

    .lower-content-section {
      grid-column: 4/10;
    }
  }

  @media (min-width: 1440px) {
    margin-bottom: 120px;
    margin-right: 0px;

    .main-part {
      font-size: 60px;
      line-height: 60px;
    }

    hr {
      margin-top: 40px;
      margin-bottom: 40px;
    }

    .sub-text {
      font-size: 60px;
      line-height: 60px;
    }
    .contact-page-line {
      width: 94px;
      margin-left: 0px;
    }

    .first-text-block {
      font-size: 18px;
      line-height: 27px;
    }

    .mail-text-block {
      font-size: 18px;
      line-height: 27px;
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
