import React, { useState, useEffect } from 'react';
import { Calendar, Table, Typography, Card, Row, Col, Modal, Form, Input, DatePicker, TimePicker, Select, Button, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getSchedules } from '../utils/request';
import { Schedule } from '../utils/mockData';

const { TextArea } = Input;
const { Option } = Select;

const { Title } = Typography;

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentSchedule, setCurrentSchedule] = useState<Schedule | null>(null);
  const [form] = Form.useForm();

  // Status color mapping
  const statusColorMap: Record<string, string> = {
    '已确认': 'green',
    '已预约': 'blue',
    '已计划': 'orange',
    '已完成': 'purple',
    '取消': 'red'
  };

  // Status options for select
  const statusOptions = [
    { value: '已确认', label: '已确认' },
    { value: '已预约', label: '已预约' },
    { value: '已计划', label: '已计划' },
    { value: '已完成', label: '已完成' },
    { value: '取消', label: '取消' }
  ];

  // Fetch schedules data
  useEffect(() => {
    fetchSchedules();
  }, []);

  // Filter schedules when selected date changes
  useEffect(() => {
    if (schedules.length > 0) {
      filterSchedulesByDate(selectedDate);
    }
  }, [selectedDate, schedules]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const data = await getSchedules();
      setSchedules(data as Schedule[]);
    } catch (error) {
      console.error('Error fetching schedules:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter schedules by selected date
  const filterSchedulesByDate = (date: dayjs.Dayjs) => {
    const filtered = schedules.filter(schedule => 
      dayjs(schedule.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );
    setFilteredSchedules(filtered);
  };

  // Handle date selection
  const handleDateSelect = (date: dayjs.Dayjs) => {
    setSelectedDate(date);
  };

  // Get schedule title abbreviation
  const getScheduleAbbreviation = (title: string): string => {
    if (title.length <= 2) return title;
    return title.substring(0, 2);
  };

  // Custom cell render for calendar
  const cellRender = (value: dayjs.Dayjs) => {
    const dateStr = value.format('YYYY-MM-DD');
    const daySchedules = schedules.filter(schedule => schedule.date === dateStr);
    
    return (
      <div className="calendar-cell">
        <div className="date-number">{value.date()}</div>
        {daySchedules.length > 0 && (
          <div className="schedules-count">
            {daySchedules.length} 个任务
          </div>
        )}
        {daySchedules.slice(0, 3).map(schedule => (
          <div 
            key={schedule.id} 
            className="schedule-item"
            style={{
              backgroundColor: statusColorMap[schedule.status] || '#d9d9d9',
              color: '#fff',
              padding: '2px 4px',
              borderRadius: '4px',
              marginBottom: '2px',
              fontSize: '12px',
              textAlign: 'center'
            }}
          >
            <span className="schedule-title">{getScheduleAbbreviation(schedule.title)}</span>
          </div>
        ))}
        {daySchedules.length > 3 && (
          <div className="more-schedules" style={{ fontSize: '12px', color: '#888' }}>
            +{daySchedules.length - 3}
          </div>
        )}
      </div>
    );
  };

  // Show modal for adding or editing schedule
  const showModal = (schedule?: Schedule) => {
    if (schedule) {
      setIsEditing(true);
      setCurrentSchedule(schedule);
      form.setFieldsValue({
        ...schedule,
        date: dayjs(schedule.date),
        startTime: dayjs(schedule.startTime, 'HH:mm'),
        endTime: dayjs(schedule.endTime, 'HH:mm')
      });
    } else {
      setIsEditing(false);
      setCurrentSchedule(null);
      form.resetFields();
      form.setFieldsValue({ date: selectedDate });
    }
    setIsModalVisible(true);
  };

  // Handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Handle form submission
  const handleSubmit = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        date: values.date.format('YYYY-MM-DD'),
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm')
      };

      if (isEditing && currentSchedule) {
        // Update existing schedule
        const updatedSchedules = schedules.map(schedule => 
          schedule.id === currentSchedule.id ? { ...schedule, ...formattedValues } : schedule
        );
        setSchedules(updatedSchedules);
      } else {
        // Add new schedule
        const newSchedule: Schedule = {
          id: `new-${Date.now()}`,
          ...formattedValues
        };
        setSchedules([...schedules, newSchedule]);
      }
      
      setIsModalVisible(false);
    }).catch(errorInfo => {
      console.error('Form validation failed:', errorInfo);
    });
  };

  // Handle delete schedule
  const handleDelete = (id: string) => {
    const updatedSchedules = schedules.filter(schedule => schedule.id !== id);
    setSchedules(updatedSchedules);
  };

  // Table columns for schedules
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      render: (_: any, record: Schedule) => (
        <span>{record.startTime} - {record.endTime}</span>
      )
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span 
          style={{
            backgroundColor: statusColorMap[status] || '#d9d9d9',
            color: '#fff',
            padding: '2px 8px',
            borderRadius: '10px',
            fontSize: '12px'
          }}
        >
          {status}
        </span>
      )
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
      width: 200
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Schedule) => (
        <Space.Compact size="small">
          <Button 
            type="primary" 
            ghost
            icon={<EditOutlined />} 
            onClick={() => showModal(record)}
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
        </Space.Compact>
      )
    }
  ];

  return (
    <div>
      <Title level={3}>日程管理</Title>
      <Row gutter={[24, 24]}>
        {/* Calendar */}
        <Col span={10}>
          <Card title="日历" bordered={false}>
            <Calendar
              value={selectedDate}
              onSelect={handleDateSelect}
              cellRender={cellRender}
              style={{ width: '100%' }}
            />
          </Card>
        </Col>
        
        {/* Schedule List */}
        <Col span={14}>
          <Card 
            title={`${selectedDate.format('YYYY年MM月DD日')} 的日程`} 
            bordered={false}
            extra={
              <Button 
                type="primary" 
                icon={<PlusOutlined />} 
                onClick={() => showModal()}
                size="small"
              >
                新增日程
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={filteredSchedules}
              rowKey="id"
              loading={loading}
              pagination={false}
              locale={{ emptyText: '当天没有日程' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Modal for adding/editing schedule */}
      <Modal
        title={isEditing ? '编辑日程' : '新增日程'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            {isEditing ? '更新' : '添加'}
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{ status: '已计划' }}
        >
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入日程标题' }]}
          >
            <Input placeholder="请输入日程标题" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <TextArea rows={3} placeholder="请输入日程描述" />
          </Form.Item>

          <Form.Item
            name="date"
            label="日期"
            rules={[{ required: true, message: '请选择日期' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="startTime"
                label="开始时间"
                rules={[{ required: true, message: '请选择开始时间' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="endTime"
                label="结束时间"
                rules={[{ required: true, message: '请选择结束时间' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="status"
            label="状态"
            rules={[{ required: true, message: '请选择状态' }]}
          >
            <Select placeholder="请选择状态">
              {statusOptions.map(option => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Schedules;