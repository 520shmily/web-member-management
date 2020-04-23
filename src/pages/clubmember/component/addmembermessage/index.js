import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, message } from 'antd';
import { connect } from 'dva';
import styles from '../../index.less';

const AddClubMember = (props) => {
  const [form] = Form.useForm();

  const handleOnFinish = (values) => {
    const { dispatch, allClubMember } = props;

    let isHavedMember = allClubMember.filter((item) => {
      return item.memberID == values.memberID;
    })

    if (isHavedMember&&isHavedMember.length > 0) {
      message.warning('该会员已存在请核对会员信息');
      return;
    }

    if (dispatch) {
      dispatch({
        type: 'clubmember/fetchAddClubMember',
        payload: { 
          ...values,
          option: 'add',
          systemID: sessionStorage.getItem('systemID'),
        }
      });
    }

    message.success('导入会员信息成功');
  
    setTimeout(() => {
      // window.location.reload();
      form.setFieldsValue(initValues());
    },1000)
  }


  const initValues = () => {
    return {
      memberID: '',
      memberName: '',
      memberClassID: '',
      manage: '',
      classYear: '',
      college: '',
      qq: '',
      wechat: '',
      phoneNumber: ''
      }
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  return (
      <Form 
        onFinish={handleOnFinish} 
        className={styles.formItem} 
        {...layout} 
        form={form}
        initialValues={initValues()}
      > 
        <Form.Item
          label="会员编码 "
          name="memberID"
          rules={[{ required: true, message: '请输入会员编码！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="姓名"
          name="memberName"
          rules={[{ required: true, message: '请输入姓名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="学号"
          name="memberClassID"
          rules={[{ required: true, message: '请输入学号!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="专业 "
          name="manage"
          rules={[{ required: true, message: '请输入专业！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="年级"
          name="classYear"
          rules={[{ required: true, message: '请输入年级!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="学院 "
          name="college"
          rules={[{ required: true, message: '请输入学院！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="QQ"
          name="qq"
          rules={[{ required: true, message: '请输入QQ!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="微信 "
          name="wechat"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="电话"
          name="phoneNumber"
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || (/^1[3456789]\d{9}$/.test(value))) {
                  return Promise.resolve();
                }
                return Promise.reject('电话号码格式错误！');
              },
            })
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item  wrapperCol={{ span: 12, offset: 8 }}> 
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    );
};

export default connect(({ clubmember }) => ({
  allClubMember: clubmember.allClubMember,
}))(AddClubMember);