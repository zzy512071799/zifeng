import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Alert, Spin } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/request';

const { Title } = Typography;

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleLogin = () => {
    form.validateFields().then(values => {
      setLoading(true);
      setError(null);

      login(values)
        .then((response: any) => {
          // Store user info and token in localStorage
          localStorage.setItem('user', JSON.stringify(response.data.user));
          localStorage.setItem('token', response.data.accessToken);
          navigate('/');
        })
        .catch(err => {
          setError(err.response?.data?.message || '登录失败，请检查用户名和密码');
        })
        .finally(() => {
          setLoading(false);
        });
    }).catch(() => {
      setError('请填写完整的登录信息');
    });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5'
    }}>
      <Card style={{ width: 400, boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Title level={2} style={{ color: '#1890ff' }}>律所后台管理系统</Title>
          <p style={{ color: '#666' }}>请登录您的账号</p>
        </div>

        {error && (
          <Alert
            message="登录失败"
            description={error}
            type="error"
            showIcon
            style={{ marginBottom: 24 }}
          />
        )}

        {/* Test Account Info */}
        <div style={{ marginBottom: 24, padding: '12px', backgroundColor: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: '6px' }}>
          <div style={{ marginBottom: 8, fontWeight: 'bold', color: '#52c41a' }}>测试账号信息：</div>
          <div style={{ marginBottom: 4 }}>管理员账号：admin / admin123</div>
          <div>测试账号：test / test123</div>
        </div>

        <Spin spinning={loading}>
          <Form
            form={form}
            name="login"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名!' }]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="用户名"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                style={{ width: '100%' }}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

export default Login;