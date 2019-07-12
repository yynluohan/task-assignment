import React from 'react';
import { Form, Input, Button, Select } from 'antd';

const dateFormat = 'DD/MM/YYYY';

const Filter = ({ onSearch, fields = [], intlPrefix = '',

  form: { getFieldDecorator, getFieldsValue,resetFields } }) => {

  function onReset() {
    resetFields()
  }


  function handleSearch() {
    const data = { ...getFieldsValue() };
    // 如果用的是DatePicker，则传上来的是一个moment对象，moment对象被JSON.stringify后没问题，
    // 但被qs.stringify则会把该对象整个内容转为字符串，因此update的时候不需要做这种转换，且update的时候后台还可以用一个Date对象来接收，
    // 而Search的时候则需要手动转成字符串，且后台用一个字符串来接收
    for (const key in data) {
      if (!data[key]) {
        delete data[key];
      } else if (typeof (data[key]) === 'object') {
        data[key] = data[key].format(dateFormat);
      }
    }
    onSearch(data);
  }

  const createByFields = fields => fields.length > 0 &&
     fields.map((item, index) => {
       if (typeof (item) === 'object') {
         if (item.name && item.values && item.values.length > 0 && item.displayValues && item.values.length === item.displayValues.length) {
           const opts = () => item.values.map((selectItem, selectIndex) => (
             <Select.Option value={selectItem} key={`${index}-${selectIndex}`}>
               {item.displayValues[selectIndex]}
             </Select.Option>
           ));
           return (
             <span key={`${index}`}>
               <span style={{ marginTop: '5px' }}>
                 {item.name}:
               </span>
               {getFieldDecorator(item.name, {
                    initialValue: '',
                  })(
                    <Select style={{ width: '100px', margin: '0 1em 0.5em 0' }}>
                      <Select.Option value="" />
                      {opts()}
                    </Select>
                  )}
             </span>
           );
         } else if (item.name && item.data && item.textField) { // valueField is optional
           const id = item.valueField ? item.valueField : 'id';
           const opts = () => item.data && item.data.map((optItem, optIndex) => (
             <Select.Option value={optItem[id]} key={`${index}-${optIndex}`}>
               {optItem[item.textField]}
             </Select.Option>
           ));
           return (
             <span key={`${index}`}>
               <span>
                 {item.name}:
               </span>
               {getFieldDecorator(item.name, {
                    initialValue: '',
                  })(
                    <Select style={{ width: '100px', margin: '0 1em 0.5em 0' }}>
                      <Select.Option value="" />
                      {opts()}
                    </Select>
                  )}
             </span>
           );
         } else if (item.name && item.component) {
           return (
             <span key={`${index}`}>
               <span>
                 {item.name}
               </span>
               {getFieldDecorator(item.name, {
                  initialValue: undefined,
                })(
                  item.component
                )
                }
             </span>
           );
         }
       } else {
         return (
           <span key={`${index}`}>
             {getFieldDecorator(item, {
                    initialValue: '',
                  })(
                    <Input addonBefore={item} style={{ width: '185px', margin: '0 1em 0.5em 0' }} />
                  )}
           </span>
         );
       }
     });

  const createSearchBtn = () => {
    if (fields.length > 0 && onSearch) {
      return (
        <div>
          <Button onClick={() => handleSearch()} type="primary" style={{ marginLeft: '15px' }}>搜索</Button>
          <Button onClick={() => onReset()} style = {{ marginLeft: '1em' }}>重置</Button>
        </div>
      )
    }
  };

  return (
    <div>
      <Form>
        {/* <Row> */}
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {createByFields(fields)}
          {createSearchBtn()}
        </div>
        {/* </Row> */}
      </Form>
    </div>
  );
};

export default Form.create()(Filter);
