import React from 'react';
import { Modal,Form,Input,Select } from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const FormItem = Form.Item;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 20,
  },
  width: 1000,
};

 class UpdateNodal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      status: props.status || '',
      username: props.username || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status != undefined) {
      this.setState({
        status: nextProps.status
      })
    }
    if (nextProps.username != undefined) {
      this.setState({
        username: nextProps.username
      })
    }
  }

  handleCancel = () => {
    this.props.onBack()
  }

  handleOk = () => {
    const { getFieldsValue,validateFields } = this.props.form;
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue()
      }
      data.note = data.note.toHTML()
      this.props.onSubmit(data)
    })
  }

  render() {

    const { getFieldDecorator } = this.props.form;
    const { status,username } = this.state;

    console.log('GGGGGGGGGGGGG ',username);

    let statusList = [];

    let doneItem = {};
    if (username == window.localStorage.username) {
      doneItem = {
        title:'完成',
        value: 'DONE'
      }
    }

    if (status == 'OPEN') {
      statusList = [
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
        {...doneItem}
      ]
    }

    if (status == 'DONE' || status == 'CLOSED') {
      statusList = [
        {
          title:'开放',
          value: 'OPEN'
        },
      ]
    }

    if (status == 'FIXED' || status == 'NFP' || status == 'NTF' || status == 'DEPLICATE' ||
       status == 'NR') {
       if (username == window.localStorage.username) {
         statusList = [
           {
             title:'关闭',
             value: 'CLOSED'
           },
         ]
       }
    }

    return (
      <Modal
          title="更新状态"
          width = '800px'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Form>
          <FormItem label="状态" hasFeedback {...formItemLayout}>
            {getFieldDecorator('status', {
              rules: [
                {
                  required: true,
                  message: 'Please select!',
                },
              ],
            })(
              <Select>
                {
                  statusList.map((item,index) => (
                    <Select.Option value={item.value} key={index}>{item.title}</Select.Option>
                  ))
                }
              </Select>
            )}
          </FormItem>
          <FormItem label='说明' hasFeedback {...formItemLayout} >
            {getFieldDecorator('note', {
              rules: [
                {
                  required: false,
                  message: 'Please select!',
                },
              ],
            })(
              <BraftEditor/>
            )}
          </FormItem>
          </Form>
        </Modal>
    )
  }
}

export default Form.create()(UpdateNodal)
