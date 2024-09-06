import type { MyPageTableOptions } from '@/components/business/page';
import type { FC } from 'react';

import { Space, Tag } from 'antd';

import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
import { searchLimit } from '@/api/limit';
import { Limit } from '@/interface/limit';

const { Item: SearchItem } = MyPage.MySearch;

const tableColums: MyPageTableOptions<Limit> = [
  { title: 'First Name', dataIndex: 'firstName', key: 'firstName' },
  { title: 'Last Name', dataIndex: 'lastName', key: 'lastName' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
 
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <MyButton type="text">Invite</MyButton>
        <MyButton type="text">Delete</MyButton>
      </Space>
    ),
  },
];

const LimitPage: FC = () => {
  return (
    <MyPage
      pageApi={searchLimit}
      searchRender={
        <>
          <SearchItem label="STK" name="accountNumber" type="input" />
          <SearchItem label="Họ tên" name="fullname" type="input" />
          <SearchItem label="CCCD" name="cccd" type="input" />
          <SearchItem label="Email" name="email" type="input" />
          <SearchItem label="SĐT" name="phone" type="input" />
          <SearchItem label="Trạng thái" name="status" type="input" />
        </>
      }
      tableOptions={tableColums}
    ></MyPage>
  );
};

export default LimitPage;
