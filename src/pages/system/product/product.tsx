import { useState } from 'react';
import type { FC } from 'react';
import { Space, Modal, Form, Input, Button, message } from 'antd';
import { DownloadOutlined, ExportOutlined, PlusOutlined } from '@ant-design/icons';
import MyButton from '@/components/basic/button';
import MyPage, { MyPageTableOptions } from '@/components/business/page';

import { Product } from '@/interface/product';
import { createProduct, searchProduct, updateProduct } from '@/api/product';



const { Item: SearchItem } = MyPage.MySearch;

const ProductPage: FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentRecord, setCurrentRecord] = useState<Product | null>(null);

  const handleEdit = (record: Product) => {
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
        updateProduct(values)
          .then((response: any) => {
            const { errorCode, errorDesc } = response;
            if (errorCode === '0') {
              message.success('Cập nhật phòng ban thành công');
            } else if (errorCode === '2') {
              message.error('Phòng ban đã tồn tại trong hệ thống');
            } else {
              message.error(
                errorDesc ? `Cập nhật phòng ban thất bại: ${errorDesc}` : 'Cập nhật phòng ban thất bại'
              );
            }
          })
          .catch(() => {
            message.error('Có lỗi xảy ra khi cập nhật phòng ban');
          });
      } else {
        createProduct(values)
          .then((response: any) => {
            const { errorCode, errorDesc } = response;
            if (errorCode === '0') {
              message.success('Tạo phòng ban thành công');
            } else if (errorCode === '2') {
              message.error('Phong ban đã tồn tại trong hệ thống');
            } else {
              message.error(
                errorDesc ? `Tạo phòng ban thất bại: ${errorDesc}` : 'Tạo phòng ban thất bại'
              );
            }
          })
          .catch(() => {
            message.error('Có lỗi xảy ra khi tạo phòng ban');
          });
      }
      handleCancel();
    });
  };
  
  const tableColumns: MyPageTableOptions<Product> = [
    { title: 'Mã phòng ban', dataIndex: 'code', key: 'code' },
    { title: 'Tên phòng ban', dataIndex: 'name', key: 'name' },
    { title: 'Tên (Tiếng anh)', dataIndex: 'nameEn', key: 'nameEn' },
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
        pageApi={searchProduct}
        searchRender={
          <>
            <SearchItem label="Mã" name="code" type="input" />
            <SearchItem label="Tên" name="name" type="input" />
            <SearchItem label="Tên (Tiếng anh)" name="nameEn" type="input" />
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
            <Form.Item name="status" label="Trạng thái" style={{ flex: 1 }} >
              <Input />
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default ProductPage;