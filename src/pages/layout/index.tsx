import type { MenuChild, MenuList } from '@/interface/layout/menu.interface';
import type { FC } from 'react';

import './index.less';

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';

import { Drawer, Layout, theme as antTheme } from 'antd';
import { Suspense, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router';

import { getMenuList } from '@/api/layout.api';
import { setUserItem } from '@/stores/user.store';
import { getFirstPathCode } from '@/utils/getFirstPathCode';
import { getGlobalState } from '@/utils/getGloabal';

import { useGuide } from '../guide/useGuide';
import HeaderComponent from './header';
import MenuComponent from './menu';
import TagsView from './tagView';

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage: FC = () => {
  const location = useLocation();
  const [openKey, setOpenkey] = useState<string>();
  const [selectedKey, setSelectedKey] = useState<string>(location.pathname);
  const [menuList, setMenuList] = useState<MenuList>([]);
  const { device, collapsed, newUser } = useSelector(state => state.user);
  const token = antTheme.useToken();

  const isMobile = device === 'MOBILE';
  const dispatch = useDispatch();
  const { driverStart } = useGuide();

  useEffect(() => {
    const code = getFirstPathCode(location.pathname);

    setOpenkey(code);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  const toggle = () => {
    dispatch(
      setUserItem({
        collapsed: !collapsed,
      }),
    );
  };

  const initMenuListAll = (menu: MenuList) => {
    const MenuListAll: MenuChild[] = [];

    menu.forEach(m => {
      if (!m?.children?.length) {
        MenuListAll.push(m);
      } else {
        m?.children.forEach(mu => {
          MenuListAll.push(mu);
        });
      }
    });

    return MenuListAll;
  };

  type MenuItem = {
    code: string;
    label: {
      zh_CN: string;
      en_US: string;
    };
    icon?: string;
    path: string;
    children?: MenuItem[];
  };

  const transformMenuList = (data: any[]): MenuItem[] => {
    const menuMap: Record<string, MenuItem> = {};
    const menuList: MenuItem[] = [];
  
    // First, map the items by their code
    data.forEach(item => {
      const menuItem: MenuItem = {
        code: item.code.toLowerCase(),
        label: {
          zh_CN: item.name,
          en_US: item.nameEn,
        },
        icon: item.icon || 'default-icon', // Use a default icon if none is provided
        path: item.path || '', // Default to empty string if path is null
      };
      menuMap[item.code] = menuItem;
    });
  
    // Then, build the tree structure
    data.forEach(item => {
      if (item.parentCode) {
        const parent = menuMap[item.parentCode];
        if (parent) {
          parent.children = parent.children || [];
          parent.children.push(menuMap[item.code]);
        }
      } else {
        menuList.push(menuMap[item.code]);
      }
    });
  
    return menuList;
  };

  const fetchMenuList = useCallback(async () => {
    const { data } = await getMenuList();

    if (data) {
      console.log(data);
      const transformedMenuList = transformMenuList(data);
      setMenuList(transformedMenuList);
      dispatch(
        setUserItem({
          menuList: initMenuListAll(transformedMenuList),
        }),
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchMenuList();
  }, [fetchMenuList]);

  useEffect(() => {
    window.onresize = () => {
      const { device } = getGlobalState();
      const rect = document.body.getBoundingClientRect();
      const needCollapse = rect.width < WIDTH;

      dispatch(
        setUserItem({
          device,
          collapsed: needCollapse,
        }),
      );
    };
  }, [dispatch]);

  useEffect(() => {
    newUser && driverStart();
  }, [newUser]);

  return (
    <Layout className="layout-page">
      <HeaderComponent collapsed={collapsed} toggle={toggle} />
      <Layout>
        {!isMobile ? (
          <Sider
            className="layout-page-sider"
            trigger={null}
            collapsible
            style={{ backgroundColor: token.token.colorBgContainer }}
            collapsedWidth={isMobile ? 0 : 80}
            collapsed={collapsed}
            breakpoint="md"
          >
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={k => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={k => setSelectedKey(k)}
            />
            <h1></h1>
            <div onClick={toggle}>
              <span id="sidebar-trigger">{collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}</span>
            </div>
          </Sider>
        ) : (
          <Drawer
            width="200"
            placement="left"
            bodyStyle={{ padding: 0, height: '100%' }}
            closable={false}
            onClose={toggle}
            open={!collapsed}
          >
            <MenuComponent
              menuList={menuList}
              openKey={openKey}
              onChangeOpenKey={k => setOpenkey(k)}
              selectedKey={selectedKey}
              onChangeSelectedKey={k => setSelectedKey(k)}
            />
          </Drawer>
        )}
        <Content className="layout-page-content">
          <TagsView />
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutPage;
