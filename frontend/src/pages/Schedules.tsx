import React, { useState, useEffect } from 'react';
import { Calendar, Table, Typography, Card, Row, Col } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getSchedules } from '../utils/request';
import { Schedule } from '../utils/mockData';

const { Title } = Typography;

const Schedules: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs>(dayjs());
  const [filteredSchedules, setFilteredSchedules] = useState<Schedule[]>([]);

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
        {daySchedules.slice(0, 2).map(schedule => (
          <div key={schedule.id} className="schedule-item">
            <span className="schedule-title">{schedule.title}</span>
          </div>
        ))}
        {daySchedules.length > 2 && (
          <div className="more-schedules">
            +{daySchedules.length - 2} 个更多
          </div>
        )}
      </div>
    );
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
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
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
            extra={<ClockCircleOutlined />}
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
    </div>
  );
};

export default Schedules;