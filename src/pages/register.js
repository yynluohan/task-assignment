import React from 'react';
import { Input,message,Form } from 'antd';
import styles from './css/register.css';
import router from 'umi/router';
import { connect } from 'dva';

const FormItem = Form.Item;

class Register extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      account: '',
      password: '',
      passwordAgain: ''
    }
  }

  onRegisterOk = () => {
    const { validateFields } = this.props.form;
    const { account,password,passwordAgain } = this.state;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      if (password !== passwordAgain) {
        message.error('两次输入的密码不一致，请重新输入！');
        return;
      }
      this.props.dispatch({
        type: 'login/onRegister',
        payload:{
          account,
          password
        }
      })
    })
  }

  onBackLogin = () => {
    window.localStorage.currentStatus = '登录'
    router.push('/login')
  }

  render() {

    const { password } = this.state;
    const { registeredGithubUsername } = this.props.login;

    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.top}>
              <div>{ registeredGithubUsername ? '账号绑定' : '注册' }</div>
              <div>已有账号？<span onClick={() => this.onBackLogin()}>登录</span></div>
            </div>

            <FormItem style={{width:'70%'}}>
              {getFieldDecorator('account', {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名！',
                  }
                ],
              })(
                <Input style={{height:'45px',fontSize:'18px',marginTop:'1.5em'}}
                 onChange={(e) => this.setState({ account: e.target.value })}
                 placeholder='用户名'
                />
              )}
            </FormItem>
            <FormItem style={{width:'70%'}}>
              {getFieldDecorator('password', {
                rules: [
                  {
                    required: true,
                    message: '请填写密码！',
                  },
                  {
                    min:6,
                    message: '密码长度不能少于6位！'
                  }
                ],
              })(
                <Input style={{height:'45px',fontSize:'18px',marginTop:'1.5em'}}
                 onChange={(e) => this.setState({ password: e.target.value })}
                 type='password'
                 placeholder='密码'
                />
              )}
            </FormItem>


            {
              password ?
              <FormItem style={{width:'70%'}}>
                {getFieldDecorator('passwordAgain', {
                  rules: [
                    {
                      required: true,
                      message: '请填写密码！',
                    },
                    {
                      min:6,
                      message: '密码长度不能少于6位！'
                    }
                  ],
                })(
                  <Input style={{height:'45px',fontSize:'18px',marginTop:'1.5em'}}
                   onChange={(e) => this.setState({ passwordAgain: e.target.value })}
                   type='password'
                   placeholder='再次确认密码'
                  />
                )}
              </FormItem>
              :
              ''
            }
            <div className={styles.login} onClick={() => this.onRegisterOk()}>
              {
                registeredGithubUsername ?
                '账号绑定'
                :
                '注册'
              }
            </div>
          </div>
        </div>
     </Form>
    )
  }
}

function mapStateToProps(state) {
  return {
    login: state.login
  }
}

const RegisterForm = Form.create()(Register)

export default connect(mapStateToProps)(RegisterForm)
