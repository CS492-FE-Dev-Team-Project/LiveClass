import React from 'react';
import { Layout, Menu, Row, Col, Typography, Card, Image, Button } from 'antd';
import styled from 'styled-components';
import ClassCard from '../components/classCard';

const { Text, Link } = Typography;
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Meta } = Card;

const PageLayout = styled(Layout)`
  height: 100vh;
`;

const LobbyHeader = styled(Header)`
  color: #f7fafc;
`;

const Logo = styled.div`
  width: 120px;
  height: 31px;
  font-size: 30px;
  font-weight: bold;
`;

const LobbyContent = styled(Content)`
  padding: 50px;
`;

const sampleSrc =
  'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png';

const ButtonWrapper = styled.div`
  position: fixed;
  bottom: 100px;
  width: 100px;
  height: 100px;
  right: 100px;
`;

const LobbyPage = () => {
  return (
    <PageLayout className="layout">
      <LobbyHeader>
        <Logo>LiveClass</Logo>
      </LobbyHeader>
      <LobbyContent>
        <Row justify="start">
          <Col span={6}>
            <ClassCard src={sampleSrc} className="CS330" />
          </Col>
          <Col span={6}>
            <ClassCard src={sampleSrc} className="CS330" />
          </Col>
          <Col span={6}>
            <ClassCard src={sampleSrc} className="CS330" />
          </Col>
          <Col span={6}>
            <ClassCard src={sampleSrc} className="CS330" />
          </Col>
        </Row>
        <ButtonWrapper>
          <Button type="primary" shape="circle" size="large">
            +
          </Button>
        </ButtonWrapper>
      </LobbyContent>
    </PageLayout>
  );
};

export default LobbyPage;
