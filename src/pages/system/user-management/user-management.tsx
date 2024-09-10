import { useState } from 'react';
import type { FC } from 'react';
import { Space, Modal, Form, Input, Button, message } from 'antd';
import { DownloadOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import MyButton from '@/components/basic/button';
import MyPage, { MyPageTableOptions } from '@/components/business/page';

import { User } from '@/interface/user';
import { createUser, searchUser, updateUser } from '@/api/user';


const { Item: SearchItem } = MyPage.MySearch;

const UserPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<User | null>(null);

  const handleEdit = (record: User) => {
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
        updateUser(values)
          .then((response: any) => {
            const { errorCode, errorDesc } = response;
            if (errorCode === '0') {
              message.success('Cập nhật người dùng thành công');
            } else if (errorCode === '2') {
              message.error('Người dùng đã tồn tại trong hệ thống');
            } else {
              message.error(
                errorDesc ? `Cập nhật người dùng thất bại: ${errorDesc}` : 'Cập nhật người dùng thất bại'
              );
            }
          })
          .catch(() => {
            message.error('Có lỗi xảy ra khi cập nhật người dùng');
          });
      } else {
        createUser(values)
          .then((response: any) => {
            const { errorCode, errorDesc } = response;
            if (errorCode === '0') {
              message.success('Tạo người dùng thành công');
            } else if (errorCode === '2') {
              message.error('Người dùng đã tồn tại trong hệ thống');
            } else {
              message.error(
                errorDesc ? `Tạo người dùng thất bại: ${errorDesc}` : 'Tạo người dùng thất bại'
              );
            }
          })
          .catch(() => {
            message.error('Có lỗi xảy ra khi tạo người dùng');
          });
      }
      handleCancel();
    });
  };
  
  const tableColumns: MyPageTableOptions<User> = [
    { title: 'Mã người dùng', dataIndex: 'code', key: 'code' },
    { title: 'Tên người dùng', dataIndex: 'name', key: 'name' },
    { title: 'Chức vụ', dataIndex: 'positon', key: 'position' },
    { title: 'Phòng ban', dataIndex: 'department', key: 'department' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Số điện thoại', dataIndex: 'phone', key: 'phone' },
    { title: 'Căn cước công dân', dataIndex: 'citizenId', key: 'citizenId' },
    { title: 'Giới tính', dataIndex: 'gender', key: 'gender' },
    { title: 'Địa chỉ', dataIndex: 'address', key: 'address' },
    { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
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
        pageApi={searchUser}
        searchRender={
          <>
            <SearchItem label="Mã" name="code" type="input" />
            <SearchItem label="Tên" name="name" type="input" />
            <SearchItem label="Chức vụ" name="nameEn" type="input" />
            <SearchItem label="Phòng ban" name="parentCode" type="input" />
            <SearchItem label="Email" name="email" type="input" />
            <SearchItem label="Số điện thoại" name="phone" type="input" />
            <SearchItem label="Căn cước" name="citizenId" type="input" />
            <SearchItem label="Giới tính" name="gender" type="input" />
            <SearchItem label="Địa chỉ" name="address" type="input" />
            <SearchItem label="Trạng thái" name="status" type="input" />
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
            <Form.Item name="nameEn" label="Tên (Tiếng anh)" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
            <Form.Item name="limitValue" label="Giá trị" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Form.Item name="description" label="Mô tả" style={{ flex: 1 }}>
              <Input />
            </Form.Item>
            <Form.Item name="status" label="Trạng thái" style={{ flex: 1 }} >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default UserPage;