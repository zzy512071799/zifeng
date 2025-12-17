import React, { useState, useEffect } from 'react';
import { Table, Typography, Select, DatePicker, Row, Col, Card, Statistic } from 'antd';
import { DollarOutlined, ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { getFinancialRecords } from '../utils/request';
import { FinancialRecord } from '../utils/mockData';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Finance: React.FC = () => {
  const [records, setRecords] = useState<FinancialRecord[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filteredRecords, setFilteredRecords] = useState<FinancialRecord[]>([]);
  
  // Filter state
  const [filters, setFilters] = useState({
    type: '',
    paymentMethod: '',
    dateRange: null as [dayjs.Dayjs, dayjs.Dayjs] | null
  });

  // Fetch financial records data
  useEffect(() => {
    fetchRecords();
  }, []);

  // Apply filters when filters change
  useEffect(() => {
    applyFilters();
  }, [filters, records]);

  const fetchRecords = async () => {
    setLoading(true);
    try {
      const data = await getFinancialRecords();
      setRecords(data as FinancialRecord[]);
    } catch (error) {
      console.error('Error fetching financial records:', error);
    } finally {
      setLoading(false);
    }
  };

  // Apply filters to records
  const applyFilters = () => {
    let result = [...records];

    // Filter by type
    if (filters.type) {
      result = result.filter(record => record.type === filters.type);
    }

    // Filter by payment method
    if (filters.paymentMethod) {
      result = result.filter(record => record.paymentMethod === filters.paymentMethod);
    }

    // Filter by date range
    if (filters.dateRange) {
      const [startDate, endDate] = filters.dateRange;
      const start = startDate.startOf('day').valueOf();
      const end = endDate.endOf('day').valueOf();
      result = result.filter(record => {
        const recordDate = dayjs(record.date).valueOf();
        return recordDate >= start && recordDate <= end;
      });
    }

    setFilteredRecords(result);
  };

  // Calculate summary stats
  const calculateStats = () => {
    const totalIncome = filteredRecords
      .filter(record => record.type === '收入')
      .reduce((sum, record) => sum + record.amount, 0);
    
    const totalExpense = filteredRecords
      .filter(record => record.type === '支出')
      .reduce((sum, record) => sum + record.amount, 0);
    
    const balance = totalIncome - totalExpense;

    return {
      totalIncome,
      totalExpense,
      balance
    };
  };

  const stats = calculateStats();

  // Table columns
  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <span style={{ color: type === '收入' ? '#52c41a' : '#f5222d' }}>
          {type}
        </span>
      )
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number, record: FinancialRecord) => (
        <span style={{ color: record.type === '收入' ? '#52c41a' : '#f5222d' }}>
          {record.type === '收入' ? '+' : '-'}{amount.toFixed(2)} 元
        </span>
      )
    },
    {
      title: '支付方式',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
    },
    {
      title: '日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div>
      <Title level={3}>财务管理</Title>
      
      {/* Stats Summary */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col span={8}>
          <Card>
            <Statistic
              title="总收入"
              value={stats.totalIncome}
              prefix={<ArrowUpOutlined style={{ color: '#52c41a' }} />}
              suffix="元"
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="总支出"
              value={stats.totalExpense}
              prefix={<ArrowDownOutlined style={{ color: '#f5222d' }} />}
              suffix="元"
              valueStyle={{ color: '#f5222d' }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic
              title="结余"
              value={stats.balance}
              prefix={<DollarOutlined />}
              suffix="元"
              valueStyle={{ color: stats.balance >= 0 ? '#52c41a' : '#f5222d' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filter Section */}
      <Card style={{ marginBottom: 24 }}>
        <Title level={5}>筛选条件</Title>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={8} lg={6}>
            <span style={{ marginRight: 8 }}>类型：</span>
            <Select
              placeholder="选择类型"
              style={{ width: 'calc(100% - 50px)' }}
              value={filters.type}
              onChange={(value) => setFilters({ ...filters, type: value })}
              allowClear
            >
              <Option value="收入">收入</Option>
              <Option value="支出">支出</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <span style={{ marginRight: 8 }}>支付方式：</span>
            <Select
              placeholder="选择支付方式"
              style={{ width: 'calc(100% - 80px)' }}
              value={filters.paymentMethod}
              onChange={(value) => setFilters({ ...filters, paymentMethod: value })}
              allowClear
            >
              <Option value="银行转账">银行转账</Option>
              <Option value="现金">现金</Option>
              <Option value="支付宝">支付宝</Option>
              <Option value="微信">微信</Option>
            </Select>
          </Col>
          <Col xs={24} sm={24} md={16} lg={12}>
            <span style={{ marginRight: 8 }}>日期范围：</span>
            <RangePicker
              style={{ width: 'calc(100% - 80px)' }}
              value={filters.dateRange}
              onChange={(dates) => setFilters({ ...filters, dateRange: dates as [dayjs.Dayjs, dayjs.Dayjs] | null })}
              allowClear
            />
          </Col>
        </Row>
      </Card>

      {/* Records Table */}
      <Table
        columns={columns}
        dataSource={filteredRecords}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default Finance;