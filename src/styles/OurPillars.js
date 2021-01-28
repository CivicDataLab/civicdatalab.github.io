import styled from 'styled-components';

const OurPillars = styled.div`
padding-left: 20px;
margin: 60px auto;

.image-placeholder {
  height: 150px;
  background-color: darkgray;
}

.pillars-container{
  display:grid;
  grid-template-columns: 50% 50%;
  grid-column-gap: 25px;
  grid-row-gap: 25px;
  margin-right: 50px;
}

.image-container {
  h1 {
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 10px;
    text-align: center;  
}
}

@media (min-width: 900px) {
  .pillars-container{
    grid-template-columns: repeat(3,1fr);
    margin-right: 18px;   
  }

@media (min-width: 1200px) {
  > h1 {
    font-size: 60px;
    line-height: 60px;
  }
  .pillars-container{
    grid-template-columns: repeat(4,1fr);
  }
  @media (min-width: 1440px) {
    padding-left:73px;
  }
}
`;
export default OurPillars;
