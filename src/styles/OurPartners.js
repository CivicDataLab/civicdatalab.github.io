import styled from 'styled-components';
const OurPartners = styled.div`
  overflow-x: hidden;
  padding-left: 0;
  margin-top: 69px;

  .partners-container {
    display: flex;
    align-items: center;
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    margin-bottom: 40px;
    margin-top: 40px;

    > * {
      margin-right: 40px;
      vertical-align: middle;
    }
  }

  p {
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  @media (min-width: 900px) {
    .partners-container {
      margin-right: 18px;
    }
  }

  @media (min-width: 1280px) {
    margin-top: 100px;
    padding-left: 0;

    .section-heading {
      font-size: 70px;
      line-height: 67px;
    }
  }

  @media (min-width: 1440px) {
    .section-heading {
      font-size: 60px;
      line-height: 60px;
    }
  }
`;

export default OurPartners;
