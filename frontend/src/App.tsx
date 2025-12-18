import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Card, Statistic, Row, Col, Table, Button } from 'antd';
import { Link, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  LogoutOutlined,
  MenuOutlined
} from '@ant-design/icons';
import Cases from './pages/Cases';
import Clients from './pages/Clients';
import Finance from './pages/Finance';
import Schedules from './pages/Schedules';
import Login from './pages/Login';
import { mockData } from './utils/mockData';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if screen is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      setCollapsed(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Mock dashboard stats
  const stats = [
    { title: '案件总数', value: 128, icon: <FileTextOutlined />, route: '/cases', color: '#1890ff', menuKey: 'cases' },
    { title: '客户总数', value: 85, icon: <UserOutlined />, route: '/clients', color: '#52c41a', menuKey: 'clients' },
    { title: '文档数量', value: 342, icon: <FileTextOutlined />, route: '/cases', color: '#faad14', menuKey: 'cases' },
    { title: '本月收入', value: 156800, icon: <DollarOutlined />, route: '/finance', color: '#f5222d', menuKey: 'finance' }
  ];

  // Get current user from localStorage
  const getUser = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  };

  // Check auth status on component mount and listen for storage changes
  const [user, setUser] = useState<any>(getUser());

  useEffect(() => {
    const checkAuth = () => {
      setUser(getUser());
    };

    // Listen for storage changes (e.g. when user logs out in another tab)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  // Determine current menu key based on location
  const getCurrentMenuKey = () => {
    switch (location.pathname) {
      case '/cases':
        return 'cases';
      case '/clients':
        return 'clients';
      case '/finance':
        return 'finance';
      case '/schedules':
        return 'schedules';
      default:
        return 'dashboard';
    }
  };

  // Handle card click with menu activation
  const handleCardClick = (route: string) => {
    navigate(route);
    // Menu selection is handled automatically by location change
  };

  // Check auth status directly before rendering
  const checkAuthStatus = () => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    return token && userData;
  };

  return (
    <>
      {!checkAuthStatus() ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', padding: '0 16px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isMobile && (
                <Button
                  type="text"
                  icon={<MenuOutlined />}
                  onClick={() => setCollapsed(!collapsed)}
                  style={{ marginRight: 16 }}
                />
              )}
              <Title level={2} style={{ margin: 0, color: '#1890ff', fontSize: isMobile ? '18px' : '24px' }}>律所后台管理系统</Title>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {user && <span style={{ marginRight: 16, fontSize: isMobile ? '14px' : '16px' }}>欢迎, {user.name}</span>}
              <LogoutOutlined 
                style={{ cursor: 'pointer', fontSize: '18px', color: '#666' }} 
                onClick={handleLogout} 
              />
            </div>
          </Header>
          <Layout>
            <Sider 
              collapsible 
              collapsed={collapsed} 
              onCollapse={setCollapsed}
              width={200} 
              style={{ background: '#fff' }}
              breakpoint="lg"
              collapsedWidth={isMobile ? 0 : 80}
            >
              <Menu
                mode="inline"
                selectedKeys={[getCurrentMenuKey()]}
                style={{ height: '100%', borderRight: 0 }}
                theme="light"
                items={[
                  {
                    key: 'dashboard',
                    icon: <DashboardOutlined />,
                    label: <Link to="/">{!collapsed && '首页'}</Link>
                  },
                  {
                    key: 'cases',
                    icon: <FileTextOutlined />,
                    label: <Link to="/cases">{!collapsed && '案件管理'}</Link>
                  },
                  {
                    key: 'clients',
                    icon: <UserOutlined />,
                    label: <Link to="/clients">{!collapsed && '客户管理'}</Link>
                  },
                  {
                    key: 'finance',
                    icon: <DollarOutlined />,
                    label: <Link to="/finance">{!collapsed && '财务管理'}</Link>
                  },
                  {
                    key: 'schedules',
                    icon: <CalendarOutlined />,
                    label: <Link to="/schedules">{!collapsed && '日程管理'}</Link>
                  }
                ]}
              />
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
                          <Col xs={12} sm={12} md={8} lg={6} key={index}>
                            <Card
                              className="stat-card"
                              hoverable
                              onClick={() => handleCardClick(stat.route)}
                            >
                              <Statistic
                                title={stat.title}
                                value={stat.value}
                                prefix={stat.icon}
                                valueStyle={{ color: stat.color }}
                              />
                            </Card>
                          </Col>
                        ))}
                      </Row>
                      <Title level={3}>系统概览</Title>
                      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Card title="最近案件" hoverable>
                            <Table
                              dataSource={mockData.cases.slice(0, 5)}
                              columns={[
                                { title: '案件编号', dataIndex: 'caseNumber', key: 'caseNumber' },
                                { title: '客户姓名', dataIndex: 'clientName', key: 'clientName' },
                                { title: '案件类型', dataIndex: 'caseType', key: 'caseType' },
                                { title: '状态', dataIndex: 'status', key: 'status' }
                              ]}
                              pagination={false}
                              size="small"
                              scroll={{ x: isMobile ? 500 : undefined }}
                            />
                          </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Card title="最近客户" hoverable>
                            <Table
                              dataSource={mockData.clients.slice(0, 5)}
                              columns={[
                                { title: '姓名', dataIndex: 'name', key: 'name' },
                                { title: '性别', dataIndex: 'gender', key: 'gender' },
                                { title: '电话', dataIndex: 'phone', key: 'phone' },
                                { title: '邮箱', dataIndex: 'email', key: 'email' }
                              ]}
                              pagination={false}
                              size="small"
                              scroll={{ x: isMobile ? 500 : undefined }}
                            />
                          </Card>
                        </Col>
                      </Row>
                      <Row gutter={[16, 16]}>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Card title="近期日程" hoverable>
                            <Table
                              dataSource={mockData.schedules.slice(0, 5)}
                              columns={[
                                { title: '标题', dataIndex: 'title', key: 'title' },
                                { 
                                  title: '时间', 
                                  key: 'time',
                                  render: (_, record) => `${record.date} ${record.startTime} - ${record.endTime}`
                                },
                                { title: '描述', dataIndex: 'description', key: 'description' }
                              ]}
                              pagination={false}
                              size="small"
                              scroll={{ x: isMobile ? 500 : undefined }}
                            />
                          </Card>
                        </Col>
                        <Col xs={24} sm={24} md={12} lg={12}>
                          <Card title="财务概览" hoverable>
                            <Table
                              dataSource={mockData.financialRecords.slice(0, 5)}
                              columns={[
                                { 
                                  title: '类型', 
                                  dataIndex: 'type', 
                                  key: 'type',
                                  render: (type) => (
                                    <span style={{ color: type === '收入' ? '#52c41a' : '#ff4d4f' }}>
                                      {type}
                                    </span>
                                  )
                                },
                                { 
                                  title: '金额', 
                                  dataIndex: 'amount', 
                                  key: 'amount',
                                  render: (amount, record) => (
                                    <span style={{ color: record.type === '收入' ? '#52c41a' : '#ff4d4f' }}>
                                      {record.type === '收入' ? '+' : '-'}¥{amount.toLocaleString()}
                                    </span>
                                  )
                                },
                                { title: '支付方式', dataIndex: 'paymentMethod', key: 'paymentMethod' },
                                { title: '日期', dataIndex: 'date', key: 'date' }
                              ]}
                              pagination={false}
                              size="small"
                              scroll={{ x: isMobile ? 500 : undefined }}
                            />
                          </Card>
                        </Col>
                      </Row>
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
      )}
    </>
  );
};

export default App;