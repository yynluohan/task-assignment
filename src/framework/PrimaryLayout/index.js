import React from 'react';
import { Layout,Icon,Popover } from 'antd';
// import LeftNav from './LeftNav';
import Breadcrumb from './Breadcrumb';
import { query } from '../utils/services';

const { Header, Content } = Layout;

class PrimaryLayout extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      avatar: ''
    }
  }

  componentDidMount() {
    this.setLocal()
  }

  setLocal = () => {
    const { children } = this.props;
    if (children.props.location.pathname === '/') {
      const { accessToken } = children.props.location.query;
      if (accessToken) {
        query('/api/github/user').then(({ code,data}) => {
          window.localStorage.username = data.login;
          window.localStorage.avatar = data.avatar_url
          this.setState({
            username: data.login,
            avatar: data.avatar_url
          })
        })
      }
    }
  }

  render() {

    const { children } = this.props;
    const { username,avatar } = this.state;

    function onLoginOut() {
      window.localStorage.token = '';
      window.localStorage.username = '';
      window.localStorage.avatar = '';
      window.location.href = '#/login'
    }

    const isHide = () => {
      let isTrue = true;
      if (children.props.location.pathname === '/login' ||
         children.props.location.pathname === '/register' ||
         children.props.location.pathname === '/resetPassword') {
        isTrue = false
      }
      if (children.props.location.pathname === '/' && !window.localStorage.token) {
        isTrue = false
      }
      return isTrue
    }

    const toDoContent = (
      <Icon type="logout" style={{cursor:'pointer'}} onClick={onLoginOut}/>
    )

    return (
      <Layout>
          {
            isHide() ?
            <Header className="header" style={{ height:'64px',padding:0,backgroundColor:'#fff'}}>
              <div style={{ display: 'flex',justifyContent:'space-between'}}>
                <div style={{ display:'flex',marginLeft: '2em',alignItems:'center'}}>
                  <div>task-assignment</div>
                </div>
                <div style={{ marginRight:'3em'}}>
                  <span>
                  {
                    window.localStorage.avatar || avatar ?
                    <img style={{ width: '35px',borderRadius: '50%',marginRight:'1em'}} alt="" src={window.localStorage.avatar}/>
                    : ''
                  }
                  <Popover content={toDoContent} placement='rightTop'>
                    <span>{ username ||window.localStorage.username }</span>
                  </Popover>
                  </span>
                </div>
              </div>
            </Header>
            :
            ''
          }
          <Layout className="ant-layout-has-sider">
            <Layout style={{ padding: isHide() ? '0 24px 24px' : '' }}>
              {
                isHide() ?
                <div style={{ marginTop: '1em'}}>
                <Breadcrumb path={children.props.location.pathname} />
              </div>
              : ''
             }
              <Content
                style={ isHide() ? {
                  background: '#fff',
                  padding: '1em',
                  margin: '1em 0',
                  // minHeight: 280,
                  minHeight: 'calc(100vh - 66px)'
                } : {}}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
      </Layout>
    )
  }

}

export default PrimaryLayout
