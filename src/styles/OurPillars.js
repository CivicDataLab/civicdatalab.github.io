import styled from 'styled-components';
const OurPillars = styled.div`
padding-left: 20px;
.image-placeholder{
    
    
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

p{
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;    
}

@media (min-width: 900px) {
    .pillars-container{
        grid-template-columns: repeat(3,1fr);
        margin-right: 30px;
       
    }

@media (min-width: 1200px) {
    .pillars-container{
        grid-template-columns: repeat(4,1fr);
       
    }
    @media (min-width: 1440px) {
        padding-left:73px;
    }
}
`;
export default OurPillars;