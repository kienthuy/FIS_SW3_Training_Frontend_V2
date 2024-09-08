import type { MyFormProps } from '@/components/core/form';
import { css } from '@emotion/react';
import MyButton from '@/components/basic/button';
import MyForm from '@/components/core/form';
import { useLocale } from '@/locales';
import { Collapse } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchProps<T> extends MyFormProps<T> {
  onSearch: (values: T) => void;
  title?: string; // Optional title for the Collapse panel
}

const BaseSearch = <T extends object>(props: SearchProps<T>) => {
  const { children, onSearch, title = "Tra cứu thông tin", ...rest } = props;
  const [form] = MyForm.useForm<T>();
  const { formatMessage } = useLocale();

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      onSearch(values);
    }
  };

  return (
    <div css={styles}>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header={title} key="1">
          <MyForm {...rest} form={form} layout="inline">
            {children}
            <MyForm.Item>
              <MyButton type="default" className='theme-color' onClick={onSubmit} icon={<SearchOutlined />}>
                {formatMessage({ id: 'component.search.request' })}
              </MyButton>
              <MyButton onClick={() => form.resetFields()}>
                {formatMessage({ id: 'component.search.reset' })}
              </MyButton>
            </MyForm.Item>
          </MyForm>
        </Collapse.Panel>
      </Collapse>
    </div>
  );
};


const MySearch = Object.assign(BaseSearch, {
  Item: MyForm.Item,
});

export default MySearch;

const styles = css`
  padding: 20px;
  .ant-form-item {
    margin-bottom: 20px;
  }
`;
