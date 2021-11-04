import React from 'react';
import styled from 'styled-components';

const ClassCardBase = styled.div`
  border-radius: 30px;
  width: 300px;
  height: 200px;
  position: relative;
  overflow: hidden;
  padding: 0;
  margin: 0;
  box-shadow: 0 2px 1px rgb(0, 0, 0, 0.05);
  text-shadow: 0 -1px 0 rgb(0, 0, 0, 0.12);
  border-color: rgba(0, 0, 0, 0.85);
  &:hover {
    cursor: pointer;
    box-shadow: 0 0 5px rgb(0, 0, 0, 1);
  }
`;

const ClassCardImg = styled.img`
  width: 100%;
  top: 0;
`;

const ClassCardWrap = styled.div`
  bottom: 0;
  width: 100%;
  height: 40%;
  background-color: #ffffff;
  font-weight: bold;
  font-size: 30px;
  position: absolute;
  text-align: left;
  padding: 10px;
`;

const ClassCard = ({ src, className }: { src: string; className: string }) => {
  return (
    <ClassCardBase>
      <ClassCardImg src={src} />
      <ClassCardWrap>{className}</ClassCardWrap>
    </ClassCardBase>
  );
};

export default ClassCard;
