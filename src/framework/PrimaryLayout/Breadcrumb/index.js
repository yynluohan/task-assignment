import React, { useMemo } from 'react';
import { Breadcrumb } from 'antd';
import router from '@/config/router.config';

export default ({ path }) => {
  const pathAry = useMemo(() => {
    const arr = path.split("\/");
    const rst = [];
    arr.shift();
    arr.push('');
    arr.forEach((key, i) => {
      rst.push(`/${arr.slice(0, i).join('/')}`);
    });
    if (rst[1] === '/') {
      rst.splice(1, 1);
    }
    return rst;

  }, [path]);

  return <Breadcrumb className="ZEleA-Breadcrumb-margin">
    {pathAry.length > 1 && pathAry.map((item, i) => {
      console.log('MMMM ==',pathAry);
      if (item === '/') {
        return <Breadcrumb.Item key={item}
                onClick={() => window.location.href="#/"}
                style={{cursor:'pointer'}}
                >
          主页
        </Breadcrumb.Item>;
      }
      return <Breadcrumb.Item key={item}>
        {findPath(item, router).name}
      </Breadcrumb.Item>;
    })}
  </Breadcrumb>
}

function findPath(path, router) {
  const queue = [...router];
  let rst = {};
  while (queue.length) {
    const route = queue.shift();
    if (route.path === path) {
      rst = route;
      break;
    }
    if (route.items) {
      queue.push(...route.items);
    }
  }
  return rst;
}
