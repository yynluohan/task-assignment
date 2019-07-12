import { create } from '../framework/utils/services'
import { message,notification } from 'antd';

export default {
  namespace: 'login',
  state: {
    myTaskList: [], //我的任务列表
    registeredGithubUsername: ''
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/register') {
          const { registeredGithubUsername='' } = location.query;
          if (registeredGithubUsername) {
            notification.warning({ message: '请先完善信息后再继续！'})
            dispatch({
              type: 'save',
              payload:{
                registeredGithubUsername
              }
            })
          }
        }
      });
    },
  },

  effects: {

    *create({ payload },{ call,put }) {
      const result = yield call(create,'/api/sys/oauth/login',{...payload});
      if (result.code === 200) {
        message.success('登录成功！')
        window.localStorage.currentStatus = '';
        window.localStorage.token = result.data.accessToken;
        window.localStorage.username = payload.account;
        setTimeout(function() {
           window.location.href = window.MC.HASH + '/';
        },100)
      } else {
        message.error(result.message)
      }
    },

    *onRegister({ payload },{ call,put,select }) {
      const { registeredGithubUsername } = yield select(({ login }) => login)
      let data = {...payload}
      if (registeredGithubUsername) {
        data.registeredGithubUsername = registeredGithubUsername
      }
      const result = yield call(create,'/api/sys/oauth/register',data);
      if (result.code === 200) {
        message.success(`${registeredGithubUsername ? '绑定成功！' : '注册成功！'}`)
        setTimeout(function() {
          window.location.href = window.MC.HASH + '/login';
        },100)
      } else {
        message.error(result.message)
      }
    }

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
