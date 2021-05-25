import React from 'react';
import styled from 'styled-components';

const TimelineContainer = styled.div`
  position: relative;
  width: 90%;
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 60px auto 120px auto;
`;

const TimelineBranch = styled.div`
  height: 5px;
  background-color: #dded1b;
  border-radius: 12px;
`;

const TimelineItem = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #dded1b;
  border-radius: 100%;
  left: ${(props) => (props.left ? `${props.left}%` : '0')};

  span {
    display: inline-block;
    position: relative;
    width: 150px;
    bottom: 50px;
  }
`;

const calculateDistanceFromLeft = (inputDate, startDate) => {
  const startDateValue = new Date(startDate).valueOf();
  const currentDateValue = new Date().valueOf();
  const inputDateValue = new Date(inputDate).valueOf();

  return ((inputDateValue - startDateValue) * 100) / (currentDateValue - startDateValue);
};

const Timeline = ({ timelineItems, startDate = '2018-06-11' }) => {
  return (
    <TimelineContainer>
      <TimelineBranch />
      <TimelineItem left={calculateDistanceFromLeft(startDate, startDate)}>
        <span>Birth of CDL</span>
      </TimelineItem>
      {timelineItems &&
        timelineItems.map((item) => (
          <TimelineItem key={item.date} left={calculateDistanceFromLeft(item.date, startDate)}>
            <span>{item.title}</span>
          </TimelineItem>
        ))}
    </TimelineContainer>
  );
};

export default Timeline;
