import styled from 'styled-components';

const OurPillars = styled.div`
padding: 0 20px;
margin-top: 60px;

.pillars-container {
  display:grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  margin-right: 50px;

  .image-container {
    z-index: -1;
  }
}

  h3 {
    font-size: 22px;
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    text-align: center;
    font-family: Bungee;
  }

@media (min-width: 768px) {
  .pillars-container {
    grid-template-columns: repeat(4,1fr);
    margin-right: 18px;   
  }

  h3 {
    font-size: 28px;
    max-width: 80px;
  }
}

@media (min-width: 1280px) {
  padding: 0;
  margin-top: 80px;
  
  h3 {
    font-size: 40px;
  }
}

@media (min-width: 1440px) {
    padding: 0;
  }
}
`;
export default OurPillars;
