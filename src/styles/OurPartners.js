import styled from 'styled-components';
const OurPartners = styled.div`
  overflow-x: hidden;
  padding-left:20px;
  margin-top:69px;

 .partners-container {
    display: flex;
    align-items: center;
    width: 100%;
    overflow-x: scroll;
    white-space: nowrap;
    margin-bottom: 40px;
    margin-top: 40px;

    ::-webkit-scrollbar {
      display: none;
    }
    
    -ms-overflow-style: none;
    scrollbar-width: none;

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
    padding-left: 52px;
    margin-top: 100px;
    .section-heading {
      font-size: 70px;
      line-height: 67px;
    }
  }

  @media (min-width: 1440px) {
    padding-left: 72px;
    
    .section-heading {
      font-size:60px;
      line-height: 60px;  
    }
  }
`;

export default OurPartners;
