import React from 'react';
import { Select,Button,Tabs } from 'antd';
import styles from './home.css';
import { ScalableList } from 'list-productization';
import { connect } from 'dva';
import { query } from 'zero-element/lib/utils/request';
import AddIssueModal from './AddIssueModal';
import AssignListItem from '../../common/listItem/AssignListItem';
import router from 'umi/router';

const { TabPane } = Tabs;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: '',
      visible: false
    }
  }

  onSubmit = (data) => {
    this.props.dispatch({
      type: 'home/create',
      payload:data
    })
    this.setState({
      visible: false
    })
  }

  render() {

    const { status,visible } = this.state;

    const item = {
      title:'Reducing the verification cost of a SNARK through hierarchical aggregation',
      subtitle:'General Layer 2',
      replies: '115',
      views: '49.3k',
      des: 'May 15',
      id:'2',
      images: [
        {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'},
        {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'},
        {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'}
      ],
      route: '#/issues/IssuesDetail'
    }

    const list = [
      {
        ...item,
        images: [
          {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'},
          {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'},
          {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'},
          {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'},
          {url:'http://img.19196.com/uploads/151125/9-151125103F5930.jpg'}
        ]
      },
      {
        ...item,
        id:3
      }
    ]

    const selectList = [
      {
        title:'开放',
        value: 'OPEN'
      },
      {
        title:'未发现问题',
        value: 'NTF'
      },
      {
        title:'无法重现',
        value: 'NR'
      },
      {
        title:'重复',
        value: 'DEPLICATE'
      },
      {
        title:'无修复计划',
        value: 'NFP'
      },
      {
        title:'修复',
        value: 'FIXED'
      },
      {
        title:'完成',
        value: 'DONE'
      },
      {
        title:'关闭',
        value: 'CLOSED'
      },
    ]

    const selectedStyle = () => {
      return {
        backgroundColor:'#e45735',
        color: '#fff'
      }
    }

    const myListProps = {
      API:`/api/mine/issues?status=${status}`,
      loadmore:false,
      gateWayData:{
        "subtitle":"status",
        "replies":"replyNum",
        "name": "createByName",
        "time": "createTime",
        "status":"priority"
      }
    }

    const noDoneListProps = {
      API:`/api/open/issues?status=${status}`,
      loadmore:false,
      gateWayData:{
        "subtitle":"status",
        "replies":"replyNum",
        "name": "createByName",
        "time": "createTime",
        "status":"priority"
      }
    }

    const createListProps = {
      API:`/api/mine/issues/originator?status=${status}`,
      loadmore:false,
      gateWayData:{
        "subtitle":"status",
        "replies":"replyNum",
        "name": "createByName",
        "time": "createTime",
        "status":"priority"
      }
    }

    const joinListProps = {
      API:`/api/mine/issues/participate?status=${status}`,
      loadmore:false,
      gateWayData:{
        "subtitle":"status",
        "replies":"replyNum",
        "name": "createByName",
        "time": "createTime",
        "status":"priority"
      }
    }

    const modalProps = {
      visible,
      onBack:() => this.setState({ visible: false }),
      onSubmit: this.onSubmit
    }

    const assignProps = {
      onClick:(data) => router.push(`/issuesDetail?id=${data}`)
    }

    const action = (
      <Select style={{width: '200px',marginRight:'calc(100vw - 750px)',marginTop:'0.5em'}} placeholder='状态查询'
        onChange = {(e) => this.setState({ status: e })}
      >
        <Select.Option value=''>全部</Select.Option>
        {
          selectList.length > 0 && selectList.map((item,index) => (
            <Select.Option key={index} value={item.value}>{item.title}</Select.Option>
          ))
        }
      </Select>
    )

    const commonElement = () => {
      const style = {
        borderBottom: '2px solid #f2f2f2',
        padding: '0 0 0.5em 0.5em',
        color:'#9E9E9E',
        display: 'flex'
      }
      return (
        <div style={style}>
          <div style={{ width: '60%'}}>issues</div>
          <div style={{ width: '40%',display: 'flex',justifyContent: 'space-around'}}>
            <div style={{width:'50%'}}></div>
            <div style={{marginLeft:'1em'}}>优先级</div>
            <div>回复数</div>
          </div>
        </div>
      )
    }

    return (
      <div>
        <div style={{ marginBottom: '1em'}}>
          <Button type='primary' onClick={() =>this.setState({ visible: true })}>添加</Button>
        </div>
        <Tabs defaultActiveKey="1" tabBarExtraContent={action}>
          <TabPane tab="我的" key="1">
            {commonElement()}
            <ScalableList {...myListProps}>
              <AssignListItem {...assignProps}/>
            </ScalableList>
          </TabPane>
          <TabPane tab="未完成" key="2">
            {commonElement()}
            <ScalableList {...noDoneListProps}>
              <AssignListItem {...assignProps}/>
            </ScalableList>
          </TabPane>
          <TabPane tab="我创建的" key="3">
            {commonElement()}
            <ScalableList {...createListProps}>
             <AssignListItem {...assignProps}/>
            </ScalableList>
          </TabPane>
          <TabPane tab="我参与的" key="4">
            {commonElement()}
            <ScalableList {...joinListProps}>
             <AssignListItem {...assignProps}/>
            </ScalableList>
          </TabPane>
        </Tabs>
        { visible ? <AddIssueModal {...modalProps}/> : '' }
      </div>
    )
  }

}

function mapStateToProps(state) {
  return {
    home: state.home
 }
}

export default connect(mapStateToProps)(Home)
