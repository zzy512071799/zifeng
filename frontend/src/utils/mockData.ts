// Mock data interfaces

export interface Case {
  id: string;
  caseNumber: string;
  clientName: string;
  caseType: string;
  status: string;
  createDate: string;
  updateDate: string;
}

export interface Client {
  id: string;
  name: string;
  gender: string;
  birthDate: string;
  phone: string;
  email: string;
  address: string;
  createDate: string;
}

export interface FinancialRecord {
  id: string;
  type: string;
  amount: number;
  paymentMethod: string;
  date: string;
  description: string;
}

export interface Schedule {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status: string;
}

// Mock data values
export const mockData = {
  cases: [
    {
      id: '1',
      caseNumber: 'CASE2024001',
      clientName: '张三',
      caseType: '民事纠纷',
      status: '进行中',
      createDate: '2024-01-15',
      updateDate: '2024-02-20'
    },
    {
      id: '2',
      caseNumber: 'CASE2024002',
      clientName: '李四',
      caseType: '刑事辩护',
      status: '已结案',
      createDate: '2024-02-10',
      updateDate: '2024-03-15'
    },
    {
      id: '3',
      caseNumber: 'CASE2024003',
      clientName: '王五',
      caseType: '合同纠纷',
      status: '进行中',
      createDate: '2024-03-05',
      updateDate: '2024-03-25'
    }
  ],
  
  clients: [
    {
      id: '1',
      name: '张三',
      gender: '男',
      birthDate: '1985-06-15',
      phone: '13800138001',
      email: 'zhangsan@example.com',
      address: '北京市朝阳区',
      createDate: '2024-01-15'
    },
    {
      id: '2',
      name: '李四',
      gender: '女',
      birthDate: '1990-08-20',
      phone: '13900139001',
      email: 'lisi@example.com',
      address: '上海市浦东新区',
      createDate: '2024-02-10'
    },
    {
      id: '3',
      name: '王五',
      gender: '男',
      birthDate: '1978-12-05',
      phone: '13700137001',
      email: 'wangwu@example.com',
      address: '广州市天河区',
      createDate: '2024-03-05'
    }
  ],
  
  financialRecords: [
    {
      id: '1',
      type: '收入',
      amount: 50000,
      paymentMethod: '银行转账',
      date: '2024-01-20',
      description: '案件代理费'
    },
    {
      id: '2',
      type: '支出',
      amount: 8000,
      paymentMethod: '现金',
      date: '2024-01-25',
      description: '办公费用'
    },
    {
      id: '3',
      type: '收入',
      amount: 35000,
      paymentMethod: '银行转账',
      date: '2024-02-15',
      description: '案件代理费'
    },
    {
      id: '4',
      type: '支出',
      amount: 12000,
      paymentMethod: '银行转账',
      date: '2024-02-20',
      description: '法律咨询费'
    },
    {
      id: '5',
      type: '收入',
      amount: 45000,
      paymentMethod: '银行转账',
      date: '2024-03-10',
      description: '案件代理费'
    }
  ],
  
  schedules: [
    {
      id: '1',
      title: '会见客户',
      description: '与张三讨论案件进展',
      date: '2024-03-28',
      startTime: '10:00',
      endTime: '11:30',
      status: '已确认'
    },
    {
      id: '2',
      title: '法院开庭',
      description: '李四案件开庭审理',
      date: '2024-03-29',
      startTime: '09:00',
      endTime: '12:00',
      status: '已确认'
    },
    {
      id: '3',
      title: '团队会议',
      description: '每周案件讨论会议',
      date: '2024-03-29',
      startTime: '14:00',
      endTime: '15:30',
      status: '已确认'
    },
    {
      id: '4',
      title: '客户咨询',
      description: '新客户案件咨询',
      date: '2024-03-30',
      startTime: '16:00',
      endTime: '17:30',
      status: '已预约'
    }
  ]
};