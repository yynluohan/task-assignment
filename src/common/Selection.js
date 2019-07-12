import React from 'react';
import { Menu,Dropdown,Button,Icon,notification,Table,Modal,Input,Pagination  } from 'antd';
import Filter from './Filter';

class Selection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      list: [],              //list为表格数据源
      selectedData: [],      //选择表格某项或者多项的时候，用于组件导出
      selectedRowKeys: [],
      type: this.props.type || 'radio',    //表格数据限制单选（也可传入'checkbox'设置多选）
      modalTitle: this.props.modalTitle || '选择账户',  //modal框的标题
      total: 1,
      pageSize: 10,
      size: this.props.size || 'default',  //表格类型，也可传入'small'
      getDisabled: this.props.getDisabled || false,
      isShowButtonText: props.isShowButtonText || false,
      visible:props.visible || false,
      isHiddenRow: props.isHiddenRow || false, //是否需要隐藏选择
    }
    if(props.isShowButtonText == true){
      this.showModal()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      getDisabled: nextProps.getDisabled,
    })
  }

  //展示modal
  showModal = () => {
    this.setState({
      visible: true,
    });
    //调用api，获取数据（method表示传进来的方法，比如get，post方法），apiUrl表示调用的api
   this.props.apiUrl && this.props.method(this.props.apiUrl,{...this.props.queryData}).then(({ code, data, message }) => {
     if(code == 200){
       let listData = [];
       if(data.records) {      //判断api是否分页处理
         listData = data.records
       } else {
         listData = data
       }
       this.setState({
         list: listData,
         total: data.total,
         pageSize: data.size
       });
     }
   })
  }

  //点击取消的时候，隐藏modal
  handleCancel = () => {
    this.setState({
      visible: false,
      selectedRowKeys:[]
    });
    if(this.props.onBack){
      this.props.onBack()
    }
  }

  //点击确定时，导出所选数据
  handleOk = () => {
    this.setState({
      visible: false,
      selectedRowKeys:[]
    });
    this.props.selected(this.state.selectedData)
  }

  //查询功能
  onSearch = (e) => {
    //调用api，更新表格数据
    this.props.method(this.props.apiUrl, {...e}).then(({ code, data, message }) => {
      if(code == 200){
        let listData = [];
        if(data.records) {
          listData = data.records
        } else {
          listData = data
        }
        this.setState({
          list: listData,
          total: data.total
        });
      }
    })
  }

  //选择表格项的时候，获取并更新selectedData
  onSelect = (data) =>{
    this.setState({
      selectedData: data.selectedRows,
      selectedRowKeys: data.selectedRowKeys
    });
  }

  onPageChange = (e) => {
    this.props.method(this.props.apiUrl, {pageNum: e,...this.props.queryData}).then(({ code, data,message }) => {
      let listData = [];
      if(data.records) {
        listData = data.records
      } else {
        listData = data
      }
      this.setState({
        list: listData,
      });
    })
  }

  render() {

    //注：columns为表格表头；fields为搜索字段；intlPrefix为国际化；
    const { columns, fields, intlPrefix, butName } = this.props;
    const { list, selectedRowKeys, type, modalTitle, total, pageSize, size, getDisabled,
            isShowButtonText,isHiddenRow } = this.state;


    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        const data = {
          selectedRowKeys,
          selectedRows,
        }
        this.onSelect(data)
      },
      selectedRowKeys,
      type
    }

    return (
      <span>
        {
          this.props.isButton ?
          <Button onClick={this.showModal} disabled={getDisabled} type='primary'>{butName || '请选择'}</Button>
          :
          <span>
            {
              isShowButtonText ? ''
              :
              <a onClick={this.showModal} style={{color:'#558eea'}}>{butName || '请选择'}</a>
            }
          </span>
        }
        <Modal
            title={modalTitle}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            width={this.props.modalWidth || 1000}
          >
            <div>
              <div style={{marginBottom: '1.5em'}}>
                <Filter    //查询控件
                  fields={fields}
                  intlPrefix={intlPrefix}
                  onSearch={(e) =>this.onSearch(e)}
                />
              </div>
              {
                isHiddenRow ?
                <Table
                  columns={columns}
                  dataSource={list}
                  bordered={true}
                  pagination={false}
                  size={size}
                />
                :
                <Table
                  columns={columns}
                  rowSelection={rowSelection}
                  dataSource={list}
                  bordered={true}
                  pagination={false}
                  size={size}
                />
              }
              <div style={{textAlign: 'right',marginTop: '1em'}}>
                <Pagination defaultCurrent={1} total={total} pageSize={pageSize} onChange={(e) => this.onPageChange(e)}/>
              </div>
          </div>
        </Modal>
      </span>
    )
  }
}

export default Selection
