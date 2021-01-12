import styled from 'styled-components';

const SliderHomePage = styled.div`
  background:${(props) => (props.dark == true ? 'black':'#eaf0f8')};
  width: 281px;
  height: 125px;
  padding-left:21px;
  padding-top: 10px;
  padding-right: 24px;
 
  .heading-scroll-section {
    text-align: left;
    font-size: 10px;
    line-height: 12px;
    font-family: 'Helvetica', 'Neue';
    letter-spacing: 0px;
    
    color:${(props) => (props.dark == true ? 'white':"#707070")};
    opacity: 1;
    display: flex;
  }
  .circle-scroll-section {
    height: 24px;
    width: 23px;
    background-color:${(props) => (props.dark == true ? 'white':"black")} ;
    border-radius: 50%;
  
    display: flex;
  }
  .circle-container{
    display: flex;
    justify-content: space-between;
}
  }

  .line-scroll-section {
    width: 32px;
    height: 0px;
    border: 5px solid;
    border-color:${(props) => (props.dark == true ? '#DDF521':"#707070")} ;
    opacity: 1;
    margin-left:0px;
   
  }
  .content-scroll-section {
   
    text-align: left;
    font-size: 20px;
    line-height: 24px;
    font-family: 'Helvetica', 'Neue';
    letter-spacing: 0px;
    
    color: ${(props) => (props.dark == true ? 'white':"#585050")} ;
    opacity: 1;
    margin-top: 10px;
    width: 225px;
  }
  .circle-container{
      display: flex;
      align-items:center;
    
  }
}
`;

export default SliderHomePage;
