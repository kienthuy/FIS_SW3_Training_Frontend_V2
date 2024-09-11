import { useState } from 'react';
import type { FC } from 'react';
import { Space, Modal, Form, Input, Button, message } from 'antd';
import { DownloadOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import MyButton from '@/components/basic/button';
import MyPage, { MyPageTableOptions } from '@/components/business/page';

import { Position } from '@/interface/position';
import { createPosition, searchPosition, updatePosition } from '@/api/position';


const { Item: SearchItem } = MyPage.MySearch;

const PositionPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<Position | null>(null);

  const handleEdit = (record: Position) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setCurrentRecord(null);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      if (currentRecord) {
        updatePosition(values)
          .then((response: any) => {
            const { errorCode, errorDesc } = response;
            if (errorCode === '0') {
              message.success('Cập nhật chức vụ thành công');
            } else if (errorCode === '2') {
              message.error('Chức vụ này đã tồn tại trong hệ thống');
            } else {
              message.error(
                errorDesc ? `Cập nhật chức vụ thất bại: ${errorDesc}` : 'Cập nhật chức vụ thất bại'
              );
            }
          })
          .catch(() => {
            message.error('Có lỗi xảy ra khi cập nhật chức vụ');
          });
      } else {
        createPosition(values)
          .then((response: any) => {
            const { errorCode, errorDesc } = response;
            if (errorCode === '0') {
              message.success('Tạo chức vụ thành công');
            } else if (errorCode === '2') {
              message.error('Chức vụ đã tồn tại trong hệ thống');
            } else {
              message.error(
                errorDesc ? `Tạo chức vụ thất bại: ${errorDesc}` : 'Tạo chức vụ thất bại'
              );
            }
          })
          .catch(() => {
            message.error('Có lỗi xảy ra khi tạo chức vụ');
          });
      }
      handleCancel();
    });
  };
  
  const tableColumns: MyPageTableOptions<Position> = [
    { title: 'Mã chức vụ', dataIndex: 'code', key: 'code' },
    { title: 'Tên chức vụ', dataIndex: 'name', key: 'name' },
    { title: 'Chức vụ', dataIndex: 'position', key: 'position' },
    { title: 'Trạng thái', dataIndex: 'department', key: 'department' },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <MyButton type="text" onClick={() => handleEdit(record)}>Sửa</MyButton>
        </Space>
      ),
    },
  ];

  return (
    <>
      <MyPage
        pageApi={searchPosition}
        searchRender={
          <>
            <SearchItem label="Mã" name="code" type="input" />
            <SearchItem label="Tên" name="name" type="input" />
            <SearchItem label="Chức vụ" name="position" type="input" />
            <SearchItem label="Phòng ban" name="department" type="input" />
          </>
        }
        tableOptions={tableColumns}
      />

      <div style={{
        position: 'fixed',
        bottom: 'calc(50% - 80px)',
        right: 5,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '8px'
      }}>
        <MyButton type="default" className='theme-color' icon={<PlusOutlined />} onClick={handleCreate}>Tạo mới</MyButton>
        <Button type="default" icon={<DownloadOutlined />}>Export CSV</Button>
        <Button type="default" icon={<ExportOutlined />}>Export Excel</Button>
      </div>

      <Modal
        title={currentRecord ? 'Sửa giới hạn' : 'Tạo giới hạn'}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Hủy
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Lưu
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" colon={false}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item name="code" label="Mã" rules={[{ required: true, message: 'Vui lòng nhập Mã!' }]} style={{ flex: 1 }}>
              <Input />
            </Form.Item>
            <Form.Item name="name" label="Tên" rules={[{ required: true, message: 'Vui lòng nhập Tên!' }]} style={{ flex: 1 }}>
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item name="position" label="Chức vụ" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
            <Form.Item name="department" label="Phòng ban" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default PositionPage;