import styled from 'styled-components';
const OurPartners = styled.div`
.partners-section-wraper{
    padding-left:20px;
    margin-top:69px;
}
.partners-image-placeholder{
    margin-top: 6px;
    height: 150px;
    background-color: darkgray;


}

.partners-container{
    display:grid;
    grid-template-columns: repeat(3,1fr);
    grid-column-gap: 7px;
    grid-row-gap: 7px;
    margin-right: 20px;
}

p{
    height: 70px;
    display: flex;
    align-items: flex-end;
    justify-content: center;    
}

@media (min-width: 900px) {
    .partners-container{
        grid-template-columns: repeat(4,1fr);
        margin-right: 18px;
       
    }

    


@media (min-width: 1200px) {
    .partners-container{
        grid-template-columns: repeat(5,1fr);
      
    }
    .section-heading{
        font-size: 70px;
        line-height: 67px;
    }
}
@media (min-width: 1440px) {
.partners-container{
    grid-template-columns: repeat(6,1fr);
    
    
}

.partners-section-wraper{
    padding-left: 73px; 
}
.section-heading{
    font-size:60px;
    line-height: 60px;
    
}
}
`;
export default OurPartners;
