import React from 'react';
import { Input,Checkbox,Form } from 'antd';
import styles from './css/login.css';
import { connect } from 'dva';

const FormItem = Form.Item;

class Login extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      modalVisible: false,
      account: window.localStorage.account ? window.localStorage.account : '',
      password: window.localStorage.password ? window.localStorage.password : '',
      checked: window.localStorage.password && window.localStorage.account ? true : false
    }
  }

  onLogin = () => {
    const { account,password } = this.state;
    const { validateFields,getFieldsValue } = this.props.form;

    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        account,
        password
      }
      this.props.dispatch({
        type: 'login/create',
        payload:data
      })
    })
  }

  onRegister = () => {
    window.localStorage.currentStatus = '注册'
    window.location.href = window.MC.HASH + '/register'
  }

  onForgot = () => {
    window.localStorage.currentStatus = '重置密码'
    window.location.href = window.MC.HASH + '/resetPassword'
  }

  onSave = (e) => {
    const { account,password } = this.state;
    if (e.target.checked) {
      window.localStorage.account = account
      window.localStorage.password = password
    } else {
      window.localStorage.account = ''
      window.localStorage.password = ''
    }
    this.setState({
      checked: e.target.checked
    })
  }

  onGithubLogin = () => {
    this.props.dispatch({
      type: 'home/githubLogin'
    })
  }

  render() {

    const { modalVisible,account,password,checked } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <Form>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div>登录</div>
            <div onClick={() => this.onRegister()}>注册</div>
          </div>
          <FormItem style={{width:'70%'}}>
            {getFieldDecorator('account', {
              initialValue: account || '',
              rules: [
                {
                  required: true,
                  message: '请输入用户名！',
                },
              ],
            })(
              <Input style={{height:'45px',fontSize:'18px',marginTop:'1em'}}
               placeholder='用户名'
               onChange={(e) =>this.setState({ account: e.target.value })}
              />
            )}
          </FormItem>
          <FormItem style={{width:'70%'}}>
            {getFieldDecorator('password', {
              initialValue: password || '',
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
              <Input style={{height:'45px',fontSize:'18px',marginTop:'1em'}}
               type='password'
               placeholder='密码'
               onChange={(e) => this.setState({ password: e.target.value })}
              />
            )}
          </FormItem>
          <div className={styles.centerBut}>
            <Checkbox onChange={(e) => this.onSave(e)}
             disabled={ account && password ? false : true }
             checked={ account && password && checked ? true : false }
            >
              记住我
            </Checkbox>
            <div onClick={() => this.onForgot()}>忘记密码?</div>
          </div>
          <div className={styles.login} onClick={() => this.onLogin()}>登录</div>
          <div className={styles.line}>
            <span></span>
            <div>其他方式登录</div>
            <span></span>
          </div>

          <div className={styles.footBut}>
            <a href={`${window.MC.HOST}/api/pub/github/login`}>
              <img src='http://www.333cn.com/graphic/hyzx/h005/h28/img201304181451523.png'
                alt='github账户登录'
                onMouseEnter = {() => this.setState({modalVisible: true})}
                onMouseLeave = {() => this.setState({modalVisible: false})}
                // onClick={() => this.onGithubLogin()}
              />
            </a>
            { modalVisible ? <div>使用github账户登录</div> : ''}
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

const LoginForm = Form.create()(Login)

export default connect(mapStateToProps)(LoginForm)
