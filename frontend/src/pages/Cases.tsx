import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, Typography, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getCases } from '../utils/request';
import { Case } from '../utils/mockData';

const { Title } = Typography;
const { Option } = Select;


const Cases: React.FC = () => {
  const [cases, setCases] = useState<Case[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [selectedCase, setSelectedCase] = useState<Case | null>(null);

  // Fetch cases data
  useEffect(() => {
    fetchCases();
  }, []);

  const fetchCases = async () => {
    setLoading(true);
    try {
      const data = await getCases();
      setCases(data as Case[]);
    } catch (error) {
      message.error('获取案件列表失败');
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle add case
  const handleAdd = () => {
    setIsEditMode(false);
    setSelectedCase(null);
    form.resetFields();
    setModalVisible(true);
  };

  // Handle edit case
  const handleEdit = (record: Case) => {
    setIsEditMode(true);
    setSelectedCase(record);
    form.setFieldsValue({
      caseNumber: record.caseNumber,
      clientName: record.clientName,
      caseType: record.caseType,
      status: record.status,
      createDate: dayjs(record.createDate),
      updateDate: dayjs(record.updateDate)
    });
    setModalVisible(true);
  };

  // Handle delete case
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个案件吗？',
      onOk() {
        // In a real app, you would call an API to delete the case
        setCases(cases.filter(caseItem => caseItem.id !== id));
        message.success('删除成功');
      }
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const newCase: Case = {
        id: isEditMode && selectedCase ? selectedCase.id : Date.now().toString(),
        caseNumber: values.caseNumber,
        clientName: values.clientName,
        caseType: values.caseType,
        status: values.status,
        createDate: values.createDate.format('YYYY-MM-DD'),
        updateDate: values.updateDate.format('YYYY-MM-DD')
      };

      if (isEditMode) {
        // In a real app, you would call an API to update the case
        setCases(cases.map(caseItem => 
          caseItem.id === newCase.id ? newCase : caseItem
        ));
        message.success('更新成功');
      } else {
        // In a real app, you would call an API to add the case
        setCases([...cases, newCase]);
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
      title: '案件编号',
      dataIndex: 'caseNumber',
      key: 'caseNumber',
    },
    {
      title: '客户姓名',
      dataIndex: 'clientName',
      key: 'clientName',
    },
    {
      title: '案件类型',
      dataIndex: 'caseType',
      key: 'caseType',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建日期',
      dataIndex: 'createDate',
      key: 'createDate',
    },
    {
      title: '更新日期',
      dataIndex: 'updateDate',
      key: 'updateDate',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: string, record: Case) => (
        <div>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="small"
            style={{ marginRight: 8 }}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            size="small"
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Title level={3}>案件管理</Title>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={handleAdd}
        style={{ marginBottom: 16 }}
      >
        添加案件
      </Button>
      <Table
        columns={columns}
        dataSource={cases}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
      <Modal
        title={isEditMode ? '编辑案件' : '添加案件'}
        visible={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="caseNumber"
            label="案件编号"
            rules={[{ required: true, message: '请输入案件编号' }]}
          >
            <Input placeholder="请输入案件编号" />
          </Form.Item>
          <Form.Item
            name="clientName"
            label="客户姓名"
            rules={[{ required: true, message: '请输入客户姓名' }]}
          >
            <Input placeholder="请输入客户姓名" />
          </Form.Item>
          <Form.Item
            name="caseType"
            label="案件类型"
            rules={[{ required: true, message: '请选择案件类型' }]}
          >
            <Select placeholder="请选择案件类型">
              <Option value="民事纠纷">民事纠纷</Option>
              <Option value="刑事辩护">刑事辩护</Option>
              <Option value="合同纠纷">合同纠纷</Option>
              <Option value="知识产权">知识产权</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              <Option value="进行中">进行中</Option>
              <Option value="已结案">已结案</Option>
              <Option value="已归档">已归档</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="createDate"
            label="创建日期"
            rules={[{ required: true, message: '请选择创建日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="updateDate"
            label="更新日期"
            rules={[{ required: true, message: '请选择更新日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Cases;