import React from 'react';
import { Input } from 'antd';
import styles from './css/resetPassword.css';
import router from 'umi/router'

export default class ResetPassword extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    }
  }

  onRegisterOk = () => {
    // window.localStorage.token = '123';
    // window.location.href = '#/'
  }

  onBackLogin = () => {
    window.localStorage.currentStatus = '登录'
    router.push('/login')
  }

  render() {

    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div>重置密码</div>
            <div onClick={() => this.onBackLogin()}>返回登录</div>
          </div>
          <Input style={{width:'70%',height:'45px',fontSize:'18px',margin:'2em 0'}}
           placeholder='Email'
          />
          <Input style={{width:'70%',height:'45px',fontSize:'18px'}}
           type='password'
           placeholder='password'
          />
          <div className={styles.login} onClick={() => this.onRegisterOk()}>提交</div>
        </div>
      </div>
    )
  }

}
