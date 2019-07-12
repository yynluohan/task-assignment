/**
    * @author Yang,YN
    * @editor
    * @updated
    * @desc  //展示有关评论的item
    * @eg
    <CommentListItem>
      icon = ''   //图标或者头像
      name = ''   //一般可表示名字
      commentName = ''   //评论者的名字或其他
      content = ''    //内容
      subtitle = ''     //副标题
      isDeleteAllow = true     //是否显示删除按钮
    </CommentListItem>
 */

import React from 'react';

export default class CommentListItem extends React.Component {

  onDelete = (value) => {
    if(this.props.itemData.id){
      this.props.onDelete(this.props.itemData.id);
    }
  }

  render(){

    const { icon,name,commentName,content,subtitle,isDeleteAllow,fromStatus,toStatus } = this.props.itemData;

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

    const style = {
      display: 'flex',
      backgroundColor: '#fff',
      padding: '0.7em',
      borderBottom: '1px solid #f2f2f2',
      ...this.props.style
    }

    const iconStyle = {
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      ...this.props.iconStyle
    }

    const nameStyle = {
      color: '#000',
      ...this.props.nameStyle
    }

    const commentNameStyle = {
      color: 'rgba(166, 166, 166, 1)',
      ...this.props.commentNameStyle
    }

    const contentStyle = {
      wordWrap:'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      lineClamp: '2',
      width:'100%',
      ...this.props.contentStyle
    }

    const itemContentFirst = {
      wordWrap:'break-word',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      lineClamp: '2',
      ...this.props.itemContentFirst
    }

    const isDeleteAllowStyle = {
      color:'rgb(128, 128, 128)',
      ...this.props.isDeleteAllowStyle
    }

    const sectionStyle = {
      marginLeft: '0.7em',
      width: 'calc(100% - 50px - 0.7em)',
      ...this.props.sectionStyle
    }

    const subtitleStyle = {
      margin:'5px 0',
      ...this.props.subtitleStyle
    }

    const fromStatusStyle = {
      backgroundColor: fromStatus ? colorObj[fromStatus] : '#fff',
      color: '#fff',
      fontSize: '13px',
      padding: '0.1em 0.3em',
      borderRadius: '2px'
    }

    const toStatusStyle = {
      backgroundColor: toStatus ? colorObj[toStatus] : '#fff',
      color: '#fff',
      fontSize: '13px',
      padding: '0.1em 0.3em',
      borderRadius: '2px'
    }

    const createHtml = (text) => {
      return {
        __html:text
      }
    }

    return (
      <div style={ style }>
        { icon ? <img src={ icon } style={ iconStyle }/> : ''}
        <div style={ sectionStyle }>
          <div style={{display: 'flex',justifyContent: 'space-between'}}>
            <div style={{ display: 'flex',alignItems: 'center'}}>
              <span style={nameStyle}>{name}</span>
              {
                fromStatus ?
                <span style={{ marginLeft: '3em'}}>
                  <span style={fromStatusStyle}>{colorName[fromStatus]}</span>
                  <span style={{margin: '0 0.5em'}}>➝</span>
                </span>
                :
                ''
              }
              {
                toStatus ?
                <span>
                   <span style={toStatusStyle}>{colorName[toStatus]}</span>
                </span>
                : ''
               }
            </div>
            {
              isDeleteAllow ?
              <a style={ isDeleteAllowStyle } onClick={() => this.onDelete()}>删除</a>
              : ''
            }
          </div>
          { subtitle ? <div style={ subtitleStyle }>{ subtitle }</div> : '' }
          {
            commentName ?
            <div style={itemContentFirst}>
              回复 <span style={commentNameStyle}>{ commentName }</span> : { content }
            </div>
            :
            <div style={ contentStyle } dangerouslySetInnerHTML={createHtml(content)}></div>
          }
        </div>
      </div>
    )
  }
}
