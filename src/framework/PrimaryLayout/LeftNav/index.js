import React from 'react';
import { Menu, Icon, } from 'antd';
import Link from 'umi/link';
import router from '@/config/router.config';

const { SubMenu } = Menu;

export default function LeftNav({ path }) {
  return <Menu
    mode="inline"
    style={{ height: '100%', borderRight: 0 }}
    selectedKeys={[path]}
  >
    {router.map((route, i) => {
      const { name, path, icon, items } = route;
      if (items) {
        return <SubMenu
          key={path || i}
          title={
            <span>
              <Icon type={icon} />
              {name}
            </span>
          }
        >
          {items.map(item => {
            const { name, path, icon } = item;
            return <Menu.Item key={path}>
              <Link to={path}>
                <div>
                  <Icon type={icon} />
                  <span>{name}</span>
                </div>
              </Link>
            </Menu.Item>
          })}
        </SubMenu>
      }
      if (path) {
        return <Menu.Item key={path}>
          <Link to={path}>
            <div>
              <Icon type={icon} />
              <span>{name}</span>
            </div>
          </Link>
        </Menu.Item>
      }
      return <Menu.Divider key={i} />;
    })}
  </Menu>
}