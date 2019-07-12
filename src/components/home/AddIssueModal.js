import React from 'react';
import { Modal,Form,Input,Select } from 'antd';
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 20,
  },
  width: 1000,
};

 class AddIssueModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible || false
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

    return (
      <Modal
          title="添加issue"
          width = '1000px'
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <Form>
          <FormItem label="标题" hasFeedback {...formItemLayout}>
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please select!',
                },
              ],
            })(
              <Input rows={4}/>
            )}
          </FormItem>
          <FormItem label="优先级" hasFeedback {...formItemLayout}>
            {getFieldDecorator('priority', {
              rules: [
                {
                  required: true,
                  message: 'Please select!',
                },
              ],
            })(
              <Select>
                <Select.Option value={1}>优化</Select.Option>
                <Select.Option value={2}>次要</Select.Option>
                <Select.Option value={3}>一般</Select.Option>
                <Select.Option value={4}>严重</Select.Option>
                <Select.Option value={5}>崩溃</Select.Option>
              </Select>
            )}
          </FormItem>
          <FormItem label='描述' hasFeedback {...formItemLayout} >
            {getFieldDecorator('note', {
              rules: [
                {
                  required: false,
                  message: 'Please select!',
                },
              ],
            })(
              <BraftEditor

              />
            )}
          </FormItem>
          </Form>
        </Modal>
    )
  }

}

export default Form.create()(AddIssueModal)
