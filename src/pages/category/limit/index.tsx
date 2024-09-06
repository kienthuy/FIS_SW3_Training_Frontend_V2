import type { MyPageTableOptions } from '@/components/business/page';
import type { FC } from 'react';

import { Space, Tag } from 'antd';

import MyButton from '@/components/basic/button';
import MyPage from '@/components/business/page';
import { searchLimit } from '@/api/limit';
import { Limit } from '@/interface/limit';
import { log } from 'console';

const { Item: SearchItem } = MyPage.MySearch;

const tableColums: MyPageTableOptions<Limit> = [
  { title: 'Mã', dataIndex: 'code', key: 'code' },
  { title: 'Tên', dataIndex: 'name', key: 'name' },
  { title: 'Tên (Tiếng anh)', dataIndex: 'nameEn', key: 'nameEn' },
  { title: 'Trạng thái', dataIndex: 'status', key: 'status' },
 
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
          <SearchItem label="Mã" name="code" type="input" />
          <SearchItem label="Tên" name="name" type="input" />
          <SearchItem label="Tên (Tiếng anh)" name="nameEn" type="input" />
          <SearchItem label="Hạn mức" name="limit" type="input" />
          <SearchItem label="Mô tả" name="description" type="input" />
          <SearchItem label="Trạng thái" name="status" type="input" />
        </>
      }
      tableOptions={tableColums}
    ></MyPage>
  );
};

export default LimitPage;
