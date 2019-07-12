import { query,create } from '../framework/utils/services'

import { notification } from 'antd';

export default {
  namespace: 'home',
  state: {
    myTaskList: [], //我的任务列表
    item: {},
    visible: false, //显隐指派modal
    updateVisible: false,  //更新状态modal
    id: '', //issue id
  },


  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/') {
          const { accessToken } = location.query;
          if (accessToken) {
            window.localStorage.token = accessToken;
            window.localStorage.currentStatus = '';
          }
          dispatch({
            type: 'getPermission'
          })
        }

        if (location.pathname === '/issuesDetail') {
          const query = location.query || {}
          if (query.id) {
            dispatch({
              type: 'save',
              payload:{
                id: query.id
              }
            })
            dispatch({
              type: 'getTaskDetail',
              payload:{
                id:query.id
              }
            })
          }

        }

      });
    },
  },

  effects: {

    *getPermission({ payload },{ call,put }) {
      const result = yield call(query,'/api/sys/users/perm/groups/mine')
      window.localStorage.permission = JSON.stringify(result.data);
    },

    *getTaskDetail({ payload },{ call,put }) {
      const result = yield call(query,`/api/crud/issues/${payload.id}`);
      if (result.code === 200) {
        yield put({
          type: 'save',
          payload:{
            item: result.data
          }
        })
      }

    },

    *create({ payload },{ call,put }) {
      const result = yield call(create,'/api/crud/issues',payload);
      if (result.code === 200) {
        notification.success({ message: '添加成功！'})
        window.location.reload(true)
      }
    },

    *onShowAssignModal({ payload },{ call,put }) {
      yield put({
        type:'save',
        payload:{
          visible: true
        }
      })
    },

    *onAssignOk({ payload },{ call,put,select }) {
      const { id } = yield select(({ home }) => home);
      const result = yield call(create,`/api/issue/issues/${id}/action/assign`,{...payload});
      if (result.code === 200) {
        notification.success({ message: '指派成功！'});
        yield put({
          type: 'save',
          payload:{
            visible: false
          }
        })
      } else {
        notification.error({ message: result.message });
      }
    },

    *onUpdate({ payload },{ call,put,select }) {
      const { id,item } = yield select(({ home }) => home);
      const obj = {
        "NTF": "ntf",
        "NR": "nr",
        "DEPLICATE":"deplicate",
        "NFP":"nfp",
        "FIXED":"fixed",
        "DONE":"done",
      }

      let result = '';
      if (item.status === 'OPEN') {
        result = yield call(create,`/api/issue/issues/${id}/action/${obj[payload.status]}`,{note: payload.note})
      }
      if (item.status === 'FIXED' || item.status === 'NFP' || item.status === 'NTF' ||
         item.status === 'DEPLICATE' || item.status === 'NR') {
        if (payload.status === 'CLOSED') {
          result = yield call(create,`/api/issue/issues/${id}/action/closed`,{note: payload.note})
        }
      }

      if (item.status === 'DONE' && item.status === 'CLOSED') {
        if (payload.status === 'OPEN') {
          result = yield call(create,`/api/issue/issues/${id}/action/restart`,{note: payload.note})
        }
      }
      if (result.code === 200) {
        notification.success({ message: '操作成功！'})
        yield put({
          type: 'save',
          payload:{
            updateVisible: false
          }
        })
      }
      if (result.code !== 200) {
        notification.error({ message: result.message})
      }

    },

    *githubLogin({ payload },{ call,put }) {
      // const result = yield call(query,'/api/pub/github/login');
      // const result = yield call(query,'https://github.com/login/oauth/authorize?client_id=85a1c691b01e695e906d')

    }


  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
