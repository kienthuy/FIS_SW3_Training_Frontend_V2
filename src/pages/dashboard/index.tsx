import type { FC } from 'react';

import './index.less';

import { useEffect, useState } from 'react';

import Overview from './overview';
import SalePercent from './salePercent';
import TimeLine from './timeLine';
import { Card, Input, Button, Row, Col } from 'antd';
import { SearchOutlined, SmileOutlined, BugTwoTone, MailOutlined, SendOutlined, EyeOutlined, LinkOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;
import { Typography } from 'antd';
import mailIncome from '@/assets/icon/mailIncome.png';
import mailOutcome from '@/assets/icon/mailOutcome.png';
import mailFollow from '@/assets/icon/mailFollow.png';
import mailRelate from '@/assets/icon/mailRelate.png';
import bgSearch from '@/assets/bg/bg-search.png';

import { Radio, Select, DatePicker, Table } from 'antd';
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';

// Option component from Select
const { Option } = Select;


const dataSource = [
  {
    key: '1',
    name: 'Yêu cầu 1',
    type: 'Loại 1',
    date: '2023-09-01',
  },
  {
    key: '2',
    name: 'Yêu cầu 2',
    type: 'Loại 2',
    date: '2023-09-02',
  },
];

// Columns for the table
const columns = [
  {
    title: 'Tên yêu cầu',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Loại',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Ngày tạo',
    dataIndex: 'date',
    key: 'date',
  },
];

const DashBoardPage: FC = () => {
  const [loading, setLoading] = useState(true);

  // mock timer to mimic dashboard data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div>
      <Card
        className='container'
        style={{
          backgroundImage: `url(${bgSearch})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '1px solid #ccc', // Light gray border
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Subtle shadow
          margin: '16px',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Tìm kiếm khách hàng</h1>

        <Row
          gutter={[16, 16]}
          align="middle"
          style={{
            backgroundColor: '#fff',  // Background color for the Row
            padding: '20px',          // Padding inside the Row
            borderRadius: '10px',     // Rounded corners
            border: '1px solid #ccc', // Light gray border
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',  // Subtle shadow
          }}
        >
          <Col span={7}>
            <Input placeholder="Mã khách hàng" />
          </Col>
          <Col span={7}>
            <Input placeholder="CCCD/CMND/MST" />
          </Col>
          <Col span={6}>
            <Input placeholder="Số tài khoản" />
          </Col>
          <Col span={2}>
            <Button type="default" className="theme-color" icon={<SearchOutlined />}>
              Tìm kiếm
            </Button>
          </Col>
          <Col span={1}>
            <Button icon={<BugTwoTone />} />
          </Col>
          <Col span={1}>
            <Button icon={<SmileOutlined />} />
          </Col>
        </Row>
      </Card>
      {/* <Overview loading={loading} /> */}


      <div style={{ margin: '16px', }}>
        {/* First card layout */}
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="card-container">
              <img src={mailIncome} alt="Mail Income" className="card-icon" />
              <div className="card-content">
                <h1 className="card-title">Yêu liên quan</h1>
                <p className="card-value">0</p>
              </div>
              <div className="decorative-circles">
                <div className="circle" id='mailIncome'></div>
                <div className="circle-s" id='mailIncome'></div>
              </div>
            </div>
          </Col>
          {/* Second card layout */}
          <Col span={6}>
            <div className="card-container">
              <img src={mailOutcome} alt="Mail Outcome" className="card-icon" />
              <div className="card-content">
                <h1 className="card-title">Yêu cầu đi</h1>
                <p className="card-value">0</p>
              </div>
              <div className="decorative-circles">
                <div className="circle" id='mailOutcome'></div>
                <div className="circle-s" id='mailOutcome'></div>
              </div>
            </div>
          </Col>
          {/* Third card layout */}
          <Col span={6}>
            <div className="card-container">
              <img src={mailFollow} alt="Mail Follow" className="card-icon" />
              <div className="card-content">
                <h1 className="card-title">Yêu cầu theo dõi</h1>
                <p className="card-value">0</p>
              </div>
              <div className="decorative-circles">
                <div className="circle" id='mailFollow'></div>
                <div className="circle-s" id='mailFollow'></div>
              </div>
            </div>

          </Col>
          {/* Fourth card layout */}
          <Col span={6}>
            <div className="card-container">
              <img src={mailRelate} alt="Mail Relate" className="card-icon" />
              <div className="card-content">
                <h1 className="card-title">Yêu cầu liên quan</h1>
                <p className="card-value">0</p>
              </div>
              <div className="decorative-circles">
                <div className="circle" id='mailRelate'></div>
                <div className="circle-s" id='mailRelate'></div>
              </div>
            </div>
          </Col>
        </Row>
      </div>


      <div className="container">
        <Row gutter={[16, 16]}>
          {/* Card 1: Status and Priority */}
          <Col span={5}>
            <Card title="Lọc theo trạng thái">
              <div className="status-container">
                <h3>Chọn trạng thái:</h3>
                <Radio.Group>
                  <Radio value="all">
                    <CheckCircleOutlined /> Tất cả
                  </Radio>
                  <Radio value="pending">
                    <ClockCircleOutlined /> Chờ duyệt
                  </Radio>
                  <Radio value="rejected">
                    <CloseCircleOutlined /> Từ chối duyệt
                  </Radio>
                  <Radio value="approved">
                    <CheckCircleOutlined /> Đã duyệt
                  </Radio>
                </Radio.Group>

                <h3>Mức độ ưu tiên:</h3>
                <Radio.Group>
                  <Radio value="low">
                    <span className="dot low"></span> Thấp
                  </Radio>
                  <Radio value="medium">
                    <span className="dot medium"></span> Trung bình
                  </Radio>
                  <Radio value="high">
                    <span className="dot high"></span> Khẩn cấp
                  </Radio>
                </Radio.Group>
              </div>
            </Card>
          </Col>

          {/* Card 2: Search Form and Table */}
          <Col span={19}>
            <Card title="Tìm kiếm yêu cầu">
              <Row gutter={[16, 16]} align="middle">
                <Col span={8}>
                  <Select placeholder="Chọn loại yêu cầu">
                    <Option value="type1">Loại 1</Option>
                    <Option value="type2">Loại 2</Option>
                    <Option value="type3">Loại 3</Option>
                  </Select>
                </Col>
                <Col span={8}>
                  <DatePicker placeholder="Ngày bắt đầu" />
                </Col>
                <Col span={8}>
                  <DatePicker placeholder="Ngày kết thúc" />
                </Col>
              </Row>

              <Row gutter={[16, 16]} style={{ marginTop: '16px' }}>
                <Col span={12}>
                  <Button type="primary" icon={<SearchOutlined />}>
                    Tìm kiếm
                  </Button>
                </Col>
                <Col span={12}>
                  <Button icon={<ReloadOutlined />}>Làm mới</Button>
                </Col>
              </Row>

              <Table
                style={{ marginTop: '16px' }}
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 10 }}
              />
            </Card>
          </Col>
        </Row>
      </div>


      {/* <SalePercent loading={loading} /> */}
      {/* <TimeLine loading={loading} /> */}
    </div>
  );
};

export default DashBoardPage;
