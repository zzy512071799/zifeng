import React from 'react';
import { Layout, Menu, Typography, Card, Statistic, Row, Col } from 'antd';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import Cases from './pages/Cases';
import Clients from './pages/Clients';
import Finance from './pages/Finance';
import Schedules from './pages/Schedules';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const navigate = useNavigate();

  // Mock dashboard stats
  const stats = [
    { title: '案件总数', value: 128, icon: <FileTextOutlined />, route: '/cases' },
    { title: '客户总数', value: 85, icon: <UserOutlined />, route: '/clients' },
    { title: '文档数量', value: 342, icon: <FileTextOutlined />, route: '/cases' },
    { title: '本月收入', value: 156800, icon: <DollarOutlined />, route: '/finance' }
  ];

  return (
    <Layout>
      <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff' }}>
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>律所后台管理系统</Title>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['dashboard']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
              <Link to="/">首页</Link>
            </Menu.Item>
            <Menu.Item key="cases" icon={<FileTextOutlined />}>
              <Link to="/cases">案件管理</Link>
            </Menu.Item>
            <Menu.Item key="clients" icon={<UserOutlined />}>
              <Link to="/clients">客户管理</Link>
            </Menu.Item>
            <Menu.Item key="finance" icon={<DollarOutlined />}>
              <Link to="/finance">财务管理</Link>
            </Menu.Item>
            <Menu.Item key="schedules" icon={<CalendarOutlined />}>
              <Link to="/schedules">日程管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content
            style={{
              background: '#fff',
              padding: 24,
              margin: 0,
              minHeight: 280
            }}
          >
            <Routes>
              <Route path="/" element={
                <div>
                  <Title level={3}>统计数据</Title>
                  <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    {stats.map((stat, index) => (
                      <Col span={6} key={index}>
                        <Card
                          className="stat-card"
                          hoverable
                          onClick={() => navigate(stat.route)}
                        >
                          <Statistic
                            title={stat.title}
                            value={stat.value}
                            prefix={stat.icon}
                            valueStyle={{ color: '#1890ff' }}
                          />
                        </Card>
                      </Col>
                    ))}
                  </Row>
                  <Title level={3}>系统概览</Title>
                  <p>欢迎使用律所后台管理系统！</p>
                </div>
              } />
              <Route path="/cases" element={<Cases />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/schedules" element={<Schedules />} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;