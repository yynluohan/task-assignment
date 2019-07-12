import React from 'react';
import PrimaryLayout from '@/framework/PrimaryLayout';


if (process.env.NODE_ENV === 'devDependencies') {

  window.MC = { HOST: ""};
  // window.MC.HOST = 'http://192.168.31.232:8081'
  window.MC.HOST = 'http://120.79.77.207:8080';
}


function BasicLayout(props) {
  return (
    <PrimaryLayout {...props}>
      {props.children}
    </PrimaryLayout>
  );
}

export default BasicLayout;
