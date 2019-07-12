import React from 'react';
import { Modal,Form,Input,Select } from 'antd';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';
import Selection from '../../common/Selection';
import { query } from '../../framework/utils/services'

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

 class AssignModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false,
      selectRow:[],
    }
  }

  handleCancel = () => {
    this.props.onBack()
  }

  handleOk = () => {
    const { getFieldsValue,validateFields } = this.props.form;
    const { selectRow } = this.state
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        ownerId: selectRow[0].id
      }
      data.note = data.note.toHTML()
      this.props.onSubmit(data)
    })
  }

  onSelectOwner = (data) => {
    const { setFieldsValue } = this.props.form;
    if (data && data.length > 0) {
      setFieldsValue({'ownerName': data[0].name})
      this.setState({
        selectRow: data
      })
    }
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    const selectionProps = {
      isButton: true,
      method:query,
      apiUrl: '/api/adm/users',
      modalTitle: '指派人列表',
      columns:[
        {
          title: '姓名',
          key: 'name',
          dataIndex: 'name'
        },
        {
          title: '性别',
          key: 'sex',
          dataIndex: 'sex'
        },
        {
          title: '电话',
          key: 'phone',
          dataIndex: 'phone'
        },
        {
          title: '邮箱',
          key: 'email',
          dataIndex: 'email'
        }
      ],
      selected:this.onSelectOwner
    }

    return (
      <Modal
          title="指派"
          width = '800px'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Form>
          <FormItem label="指派对象" hasFeedback {...formItemLayout}>
            {getFieldDecorator('ownerName', {
              rules: [
                {
                  required: true,
                  message: 'Please select!',
                },
              ],
            })(
              <div>
                <Input rows={4} style={{ width: '200px',marginRight: '1em'}}
                  value={this.state.selectRow.length > 0 ? this.state.selectRow[0].name : ''}
                  disabled={true}
                />
                <Selection {...selectionProps}/>
              </div>
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

export default Form.create()(AssignModal)
