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
      <Card title="Tìm kiếm khách hàng">
        <Row gutter={[16, 16]} align="middle">
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
            <Button type="default" className='theme-color' icon={<SearchOutlined />}>
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


      <div style={{marginTop: '20px'}}>
        {/* First card layout */}
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="card-container">
              <img src={mailIncome} alt="Mail Income" className="card-icon" />
              <div className="card-content">
                <h1 className="card-title">Yêu liên quan</h1>
                <p className="card-value">0</p>
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
            </div>
          </Col>
          {/* Fourth card layout */}
          <Col span={6}>
            <div className="card-container">
                <img src={mailRelate} alt="Mail Relate" className="card-icon" />
                <div className="card-content">
                  <h1 className="card-title">Yêu liên quan</h1>
                  <p className="card-value">0</p>
                </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* <SalePercent loading={loading} /> */}
      {/* <TimeLine loading={loading} /> */}
    </div>
  );
};

export default DashBoardPage;
