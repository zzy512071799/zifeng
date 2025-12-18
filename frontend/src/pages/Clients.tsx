import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Typography, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getClients } from '../utils/request';
import { Client } from '../utils/mockData';

const { Title } = Typography;
const { Option } = Select;

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  // Fetch clients data
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const data = await getClients();
      setClients(data as Client[]);
    } catch (error) {
      message.error('获取客户列表失败');
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add client
  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedClient(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit client
  const handleEdit = (record: Client) => {
    setIsEditMode(true);
    setSelectedClient(record);
    form.setFieldsValue({
      name: record.name,
      gender: record.gender,
      birthDate: dayjs(record.birthDate),
      phone: record.phone,
      email: record.email,
      address: record.address
    });
    setModalVisible(true);
  };

  // Handle delete client
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个客户吗？',
      onOk() {
        // In a real app, you would call an API to delete the client
        setClients(clients.filter(client => client.id !== id));
        message.success('删除成功');
      }
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const newClient: Client = {
        id: isEditMode && selectedClient ? selectedClient.id : Date.now().toString(),
        name: values.name,
        gender: values.gender,
        birthDate: values.birthDate.format('YYYY-MM-DD'),
        phone: values.phone,
        email: values.email,
        address: values.address,
        createDate: isEditMode && selectedClient ? selectedClient.createDate : dayjs().format('YYYY-MM-DD')
      };

      if (isEditMode) {
        // In a real app, you would call an API to update the client
        setClients(clients.map(client => 
          client.id === newClient.id ? newClient : client
        ));
        message.success('更新成功');
      } else {
        // In a real app, you would call an API to add the client
        setClients([...clients, newClient]);
        message.success('添加成功');
      }

      setModalVisible(false);
      form.resetFields();
    }).catch(info => {
      console.error('Validation failed:', info);
    });
  };

  // Table columns
  const columns = [
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '出生日期',
      dataIndex: 'birthDate',
      key: 'birthDate',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      ellipsis: true,
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: Client) => (
        <Button.Group size="small">
          <Button
            type="primary"
            ghost
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            danger
            ghost
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Button.Group>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>客户管理</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        添加客户
      </Button>
      <Table
        columns={columns}
        dataSource={clients}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={isEditMode ? '编辑客户' : '添加客户'}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="姓名"
            rules={[{ required: true, message: '请输入姓名' }]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>
          <Form.Item
            name="gender"
            label="性别"
            rules={[{ required: true, message: '请选择性别' }]}
          >
            <Select placeholder="请选择性别">
              <Option value="男">男</Option>
              <Option value="女">女</Option>
              <Option value="其他">其他</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="birthDate"
            label="出生日期"
            rules={[{ required: true, message: '请选择出生日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="phone"
            label="电话"
            rules={[
              { required: true, message: '请输入电话' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' }
            ]}
          >
            <Input placeholder="请输入电话" />
          </Form.Item>
          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱地址' }
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>
          <Form.Item
            name="address"
            label="地址"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input.TextArea rows={3} placeholder="请输入地址" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Clients;