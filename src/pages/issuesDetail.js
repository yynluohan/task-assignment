import React from 'react';
import styles from './css/issuesDetail.css';
import { ScalableList } from 'list-productization';
import CommentListItem from '../common/listItem/CommentListItem';
import { connect } from 'dva';
import { Button } from 'antd';
import AssignModal from '../components/issues/AssignModal';
import UpdateNodal from '../components/issues/UpdateNodal';

class IssuesDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultType: 0,
    }
  }

  onAssign = () => {
    this.props.dispatch({
      type: 'home/onShowAssignModal',
    })
  }

  onAssignOk = (data) => {
    this.props.dispatch({
      type: 'home/onAssignOk',
      payload:data
    })
  }

  onUpdate = () => {
    this.props.dispatch({
      type:'home/save',
      payload:{
        updateVisible: true,
      }
    })
  }

  onUpdateOk = (data) => {
    this.props.dispatch({
      type: 'home/onUpdate',
      payload:data
    })
  }

  render() {

    const { defaultType } = this.state;
    const { item,visible,updateVisible } = this.props.home;
    const _this = this

    const colorObj = {
      "OPEN":"#BF1E2E",
      "NTF":"#08c",
      "NR":"#25AAE2",
      "DEPLICATE":"#ED207B",
      "NFP":"#808281",
      "FIXED":"#92278F",
      "DONE":"#0E76FF",
      "CLOSED":"#3AB54A"
    }

    const  colorName = {
      "OPEN":"开放",
      "NTF":"未发现问题",
      "NR":"无法重现",
      "DEPLICATE":"重复",
      "NFP":"无修复计划",
      "FIXED":"修复",
      "DONE":"完成",
      "CLOSED":"关闭"
    }

    const listProps = {
      loadmore:false,
      list:item.issueNotes || [],
      gateWayData:{
        "icon":"imageUrl",
        "name":"handlerName",
        "content": "note",
        "subtitle": "createTime"
      }
    }

    const subtitleStyle = {
      backgroundColor: item.status ? colorObj[item.status] : '#fff',
    }

    const createMarkup = (text) => {
      return { __html: text };
    }

    const assignModalProps = {
      visible,
      onSubmit: this.onAssignOk,
      onBack() {
        _this.props.dispatch({
          type: 'home/save',
          payload:{
            visible: false
          }
        })
      }
    }

    const updateMopdalProps = {
      status: item.status,
      username: item.createByName,
      visible: updateVisible,
      onSubmit:this.onUpdateOk,
      onBack() {
        _this.props.dispatch({
          type: 'home/save',
          payload:{
            updateVisible: false
          }
        })
      }
    }

    return(
      <div>
        <div>
          <Button type='primary' onClick={() => this.onAssign()}>指派</Button>
          <Button type='primary' onClick={() => this.onUpdate()} style={{marginLeft: '1em'}}>更新状态</Button>
        </div>
        <div className={styles.title}>{item.title}</div>
        <div className={styles.subtitle} style={subtitleStyle}>{item.status ? colorName[item.status] : ''}</div>
        { item.note ? <div dangerouslySetInnerHTML={createMarkup(item.note)}></div> : '' }
        <div style={{ marginTop: '1em',borderTop:'1px solid #ccc'}}>
          <ScalableList {...listProps}>
            <CommentListItem />
          </ScalableList>
        </div>
        { visible ? <AssignModal {...assignModalProps}/> : '' }
        { updateVisible ? <UpdateNodal {...updateMopdalProps}/> : '' }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    home: state.home
  }
}

export default connect(mapStateToProps)(IssuesDetail)
