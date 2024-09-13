import React, { useEffect, useState } from 'react';
import { Card, Input, Button, Row, Col, Table, Radio, Select, DatePicker, Spin, Alert, Typography } from 'antd';
import { SearchOutlined, SmileOutlined, BugTwoTone, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, ReloadOutlined } from '@ant-design/icons';
import { searchBooking } from '@/api/booking';
import mailIncome from '@/assets/icon/mailIncome.png';
import mailOutcome from '@/assets/icon/mailOutcome.png';
import mailFollow from '@/assets/icon/mailFollow.png';
import mailRelate from '@/assets/icon/mailRelate.png';
import bgSearch from '@/assets/bg/bg-search.png';

const { Option } = Select;
const { Title, Text } = Typography;

const DashBoardPage = () => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await searchBooking({ /* your params here if any */ });
        if (response.status) {
          const transformedData:any = response.result.data.map(item => ({
            key: item.id, // Unique key
            id: item.id,
            product: item.product || 'N/A', // Default value if null
            name: item.name,
            status: item.status || 'N/A', // Default value if null
            createdDate: new Date(item.createdDate).toLocaleDateString(), // Format date
          }));
          setDataSource(transformedData);
        } else {
          // setError("Failed to fetch data");
        }
      } catch (err) {
        // setError('An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Mã yêu cầu',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Loại dịch vụ',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdDate',
      key: 'createdDate',
    },
  ];

  return (
    <div>
      <Card
        className='container'
        style={{
          backgroundImage: `url(${bgSearch})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          border: '1px solid #ccc',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          margin: '16px',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Tìm kiếm khách hàng</h1>

        <Row
          gutter={[16, 16]}
          align="middle"
          style={{
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            border: '1px solid #ccc',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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

      <div style={{ margin: '16px' }}>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <div className="card-container">
              <img src={mailIncome} alt="Mail Income" className="card-icon" />
              <div className="card-content">
                <h1 className="card-title">Yêu cầu liên quan</h1>
                <p className="card-value">0</p>
              </div>
              <div className="decorative-circles">
                <div className="circle" id='mailIncome'></div>
                <div className="circle-s" id='mailIncome'></div>
              </div>
            </div>
          </Col>
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

              {loading ? (
                <Spin />
              ) : error ? (
                <Alert message={error} type="error" />
              ) : (
                <Table
                  style={{ marginTop: '16px' }}
                  dataSource={dataSource}
                  columns={columns}
                  pagination={{ pageSize: 10 }}
                />
              )}
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashBoardPage;