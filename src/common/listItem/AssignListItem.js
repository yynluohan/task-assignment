import React from 'react';

export default class AssignListItem extends React.Component {

  onClick = () => {
    const { route,id } = this.props.itemData;
    if(route && id) {
      window.location.href = `${route}?id=${id}`
    }
    if (this.props.onClick) {
      this.props.onClick(id)
    }
  }

  render() {

    const { title,subtitle,images,replies,status,des,name,time } = this.props.itemData;

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

    const obj = {
      "1":"优化",
      "2":"次要",
      "3":"一般",
      "4":"严重",
      "5":"崩溃",
    }

    const colorStyle = {
      "1":"#795548",
      "2":"#009688",
      "3":"#03A9F4",
      "4":"#FF9800",
      "5":"#ff0f0f",
    }

    const style = {
      padding: '1em 0.5em',
      borderBottom: '1px solid #e9e9e9',
      backgroundColor: '#fff',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer'
    }

    const titleStyle = {
      color: '#222',
      fontSize: '15px',
      ...this.props.titleStyle
    }

    const subtitleStyle = {
      display:'inline-block',
      backgroundColor: subtitle ? colorObj[subtitle] : '#fff',
      color: '#fff',
      padding: '0 0.3em',
      marginTop: '0.3em',
      ...this.props.subtitleStyle
    }

    const imageItemStyle = (item) => {
      return {
        width: '30px',
        height: '30px',
        display: 'inline-block',
        backgroundImage:`url(${item.url})`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        borderRadius: '50%',
        margin:'0 3px 3px 0',
      }
    }

    const repliesStyle = {
      // color: '#cf7721',
      // fontWeight:700,
      ...this.props.repliesStyle
    }

    const desStyle = {
      color: '#919191',
      ...this.props.desStyle
    }

    const statusStyle = {
      color: status ? colorStyle[status] : '#000',
      fontWeight:700,
      ...this.props.statusStyle
    }

    return(
      <div style={ style } onClick={() => this.onClick()}>
        <div style={{ width: '60%' }}>
          { title !== undefined ? <div style={ titleStyle }>{ title }</div> : '' }
          <div style={{display: 'flex',alignItems:'center',margin: '0.5em 0'}}>
            { subtitle !== undefined ? <div style={ subtitleStyle }>{ colorName[subtitle] }</div> : '' }
            { name ? <span style={{margin: '0 0.5em 0 1em',fontSize:"13px"}}>{name}</span> : ''}
            { time ? <span style={{fontSize:"13px"}}>创建于{time}</span> : ''}
          </div>
        </div>
        <div style={{ width: '40%',display: 'flex',justifyContent: 'center'}}>
          <div style={{ width:'100%',display: 'flex',justifyContent: 'space-around',alignItems: 'center' }}>
            <div style={{ display: 'flex',width:'50%',flexWrap:'wrap'}}>
              {
                images && images.length > 0 && images.map((item,index) => (
                  <div key={index} style={imageItemStyle(item)}></div>
                ))
              }
            </div>
            { status !== undefined ? <div style={ statusStyle }>{ obj[status] }</div> : '' }
            { replies !== undefined ? <div style={ repliesStyle }>{ replies }</div> : '' }
            { des !== undefined ? <div style={ desStyle }>{ des }</div> : '' }
          </div>
        </div>
      </div>
    )
  }
}
