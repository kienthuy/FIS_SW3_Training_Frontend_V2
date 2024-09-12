import type { FC } from 'react';

import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, Layout, theme as antTheme, Tooltip } from 'antd';
import { createElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Avator from '@/assets/header/avator.jpeg';
import { ReactComponent as EnUsSvg } from '@/assets/header/en_US.svg';
import { ReactComponent as LanguageSvg } from '@/assets/header/language.svg';
import { ReactComponent as MoonSvg } from '@/assets/header/moon.svg';
import { ReactComponent as SunSvg } from '@/assets/header/sun.svg';
import { ReactComponent as ZhCnSvg } from '@/assets/header/zh_CN.svg';
import PortalIconSvg from '@/assets/header/portal-icon.svg';
import { LocaleFormatter, useLocale } from '@/locales';
import { setGlobalState } from '@/stores/global.store';
import { setUserItem } from '@/stores/user.store';

import { logoutAsync } from '../../stores/user.action';
import HeaderNoticeComponent from './notice';

const { Header } = Layout;

interface HeaderProps {
  collapsed: boolean;
  toggle: () => void;
}

type Action = 'userInfo' | 'userSetting' | 'logout';

const HeaderComponent: FC<HeaderProps> = ({ collapsed, toggle }) => {
  const { logged, locale, device } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.global);
  const navigate = useNavigate();
  const token = antTheme.useToken();
  const dispatch = useDispatch();
  const { formatMessage } = useLocale();

  const onActionClick = async (action: Action) => {
    switch (action) {
      case 'userInfo':
        return;
      case 'userSetting':
        return;
      case 'logout':
        const res = Boolean(await dispatch(logoutAsync()));

        res && navigate('/login');

        return;
    }
  };

  const toLogin = () => {
    navigate('/login');
  };

  const selectLocale = ({ key }: { key: any }) => {
    dispatch(setUserItem({ locale: key }));
    localStorage.setItem('locale', key);
  };

  const onChangeTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';

    localStorage.setItem('theme', newTheme);
    dispatch(
      setGlobalState({
        theme: newTheme,
      }),
    );
  };

  return (
    <Header className="layout-page-header bg-2" style={{ backgroundColor: token.token.colorBgContainer }}>
      {device !== 'MOBILE' && (
        <div className="logo" style={{ width: collapsed ? 80 : 200, backgroundColor: '#FFC20E' }}>
          <img src={PortalIconSvg} alt="" style={{ width: '100%', height: '100%' }} />
        </div>
      )}
     <div className="layout-page-header-main" style={{ background: 'linear-gradient(90deg, #F00016 0.2%, #EF0012 50.07%, #FFA000 75%, #FFBE00 84.97%, #FFCE00 99.93%)' }}>
        <div>
          hello
        </div>
        <div style={{ textAlign: 'center' }}>
          <div className="marquee-container">
            <div className="marquee-content">
              <div className="marquee-item">Chào mừng bạn đến với hệ thống</div>
              <div className="marquee-item">Dự án được phát triển bởi ThụyPTK2</div>
            </div>
          </div>
        </div>

        <div className="actions">
          <Tooltip
            title={formatMessage({
              id: theme === 'dark' ? 'gloabal.tips.theme.lightTooltip' : 'gloabal.tips.theme.darkTooltip',
            })}
          >
            <div className="action-btn" onClick={onChangeTheme}>
              {createElement(theme === 'dark' ? SunSvg : MoonSvg)}
            </div>
          </Tooltip>
          {/* <div className="action-btn">
            <HeaderNoticeComponent />
          </div> */}
         
          <Dropdown
            menu={{
              onClick: info => selectLocale(info),
              items: [
                {
                  key: 'zh_CN',
                  icon: <ZhCnSvg />,
                  disabled: locale === 'zh_CN',
                  label: 'Tiếng việt',
                },
                {
                  key: 'en_US',
                  icon: <EnUsSvg />,
                  disabled: locale === 'en_US',
                  label: 'English',
                },
              ],
            }}
          >
            <div className="action-btn">
              <LanguageSvg id="language-change" />
            </div>
          </Dropdown>

          {logged ? (
            <Dropdown
              menu={{
                items: [
                  {
                    key: '1',
                    icon: <UserOutlined />,
                    label: (
                      <div onClick={() => navigate('/dashboard')}>
                        <LocaleFormatter id="header.avator.account" />
                      </div>
                    ),
                  },
                  {
                    key: '2',
                    icon: <LogoutOutlined />,
                    label: (
                      <div onClick={() => onActionClick('logout')}>
                        <LocaleFormatter id="header.avator.logout" />
                      </div>
                    ),
                  },
                ],
              }}
            >
              <div className="action-btn user-action">
                <img src={Avator} className="user-avator" alt="avator" />
              </div>
            </Dropdown>
          ) : (
            <div className="action-btn" onClick={toLogin}>
              {formatMessage({ id: 'gloabal.tips.login' })}
            </div>
          )}
        </div>

      </div>
    </Header>
  );
};

export default HeaderComponent;
