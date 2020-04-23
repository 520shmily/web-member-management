import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Modal, message, Upload, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from '../../../clubmember/index.less';

const EidtMemberMessageModel = ( props ) =>  {

  const [form] = Form.useForm();
  const [isUploadDisAbled, setIsUploadDisAbled] = useState(false);
  const [fileList, setFileList] = useState('');

  const handleOnFinish = (values) => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'clubmember/fetchUpdateClubMember',
        payload: { 
          ...values,
          option: 'update',
          systemID: sessionStorage.getItem('systemID'),
        }
      });
    }

    message.success('会员信息更新成功');
  
    setTimeout(() => {
      if (dispatch) {
        dispatch({
          type: 'clubmember/isShowMemberEidtModel',
          isShowMemberEidtModel: false, 
          eidtData: ''
        });
        dispatch({
          type: 'clubmember/fetchAllClubMember',
          payload: { 
            systemID: sessionStorage.getItem('systemID'),
            option: 'check'
          }
        });
      }
    },1000)
  }


  const handleCancelClick = () => {
    const { dispatch } = props;

    if (dispatch) {
      dispatch({
        type: 'clubmember/isShowMemberEidtModel',
        isShowMemberEidtModel: false, 
        eidtData: ''
      });
    }
  }

  const initValues = () => {
    const { eidtData } = props;
    
    form.setFieldsValue({
      memberID: eidtData !== '' ? eidtData.memberID : '',
      memberName: eidtData !== '' ? eidtData.memberName : '',
      memberClassID: eidtData !== '' ? eidtData.memberClassID : '',
      manage: eidtData !== '' ? eidtData.manage : '',
      classYear: eidtData !== '' ? eidtData.classYear : '',
      college: eidtData !== '' ? eidtData.college : '',
      qq: eidtData !== '' ? eidtData.qq : '',
      wechat: eidtData !== '' ? eidtData.wechat : '',
      phoneNumber: eidtData !== '' ? eidtData.phoneNumber : '',
    });
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const { isShowMemberEidtModel } = props;

  return (
    <Modal
    title="编辑会员信息"
    visible={isShowMemberEidtModel}
    onCancel={handleCancelClick}
    footer={null}
    >
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
            更新
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
  
};

export default connect(({ clubmember }) => ({
  allClubMember: clubmember.allClubMember,
  isShowMemberEidtModel: clubmember.isShowMemberEidtModel,
  isShowAssessModel: clubmember.isShowAssessModel,
  eidtData: clubmember.eidtData,
  MemberJoinActivityData: clubmember.MemberJoinActivityData
}))(EidtMemberMessageModel);