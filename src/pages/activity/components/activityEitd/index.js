import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Modal, message, Upload, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from '../../../clubmember/index.less';
import moment from 'moment';

import { UploadOutlined } from '@ant-design/icons';

const ActivityEidtModel = ( props ) =>  {

  const [form] = Form.useForm();
  const [isUploadDisAbled, setIsUploadDisAbled] = useState(false);
  const [fileList, setFileList] = useState('');

  const handleOnFinish = (values) => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'activity/fetchUpdateActivity',
        payload: { 
          ...values,
          activityImg: values.activityImg ? values.activityImg : sessionStorage.getItem('activityImg'),
          option: 'update',
          activityID: sessionStorage.getItem('activityID'),
          activityTime:  moment(values.activityTime).format('YYYY-MM-DD HH:mm:ss'),
          activityStopTime:  moment(values.activityStopTime).format('YYYY-MM-DD HH:mm:ss'),
        }
      });
      setTimeout(() => {
        dispatch({
          type: 'activity/fetchAllActivity',
          payload: { 
            option: 'check',
            clubID: sessionStorage.getItem('systemID'),
          }
        });
      }, 1000)
    }

    message.success('活动信息更新成功');
  
    setTimeout(() => {

      form.setFieldsValue({
        clubActivity: '',
        activitySite: '',
        activityTime: '',
        activityStopTime: '',
        activityIntroduce: '',
        activityRequire: '',
      });

      if (dispatch) {
        dispatch({
          type: 'activity/isShowEidtModel',
          isShowEidtModel: false, 
          eidtData: ''
        });
      }
    },1000)
  }

  const hanldeUploadonChange = (e) => {
    let fileList = e.fileList.filter((item) => {
      return (item.type === 'image/jpeg' || item.type === 'image/png');
    })
    setFileList(fileList)
    
    if (fileList.length == 1) {
      setIsUploadDisAbled(true);
      return;
    } 
    setIsUploadDisAbled(false);
  }

  

  const handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传格式为 JPG 或 PNG 的图片！');
    }
  }


  const handleActivityIntroduceOnChange = (e) => {
    let activityIntroduce = e.target.value;

    if (activityIntroduce.length > 200 ) {
      message.warning('最多输入200字符')
      form.setFieldsValue({activityIntroduce: activityIntroduce.substring(0,200)});

    } else {
      form.setFieldsValue({activityIntroduce: activityIntroduce});
    }
  }


  const handleActivityRequireOnChange = (e) => {
    let activityRequire = e.target.value;
    if (activityRequire.length > 100 ) {
      message.warning('最多输入100字符')
      form.setFieldsValue({activityRequire: activityRequire.substring(0,100)});
    } else {
      form.setFieldsValue({activityRequire: activityRequire});
    }
  }

  const handleCancelClick = () => {
    const { dispatch } = props;

    if (dispatch) {
      dispatch({
        type: 'activity/isShowEidtModel',
        isShowEidtModel: false, 
        eidtData: ''
      });
    }
  }

  const initValues = () => {
    const { eidtData } = props;
    
    form.setFieldsValue({
      clubActivity: eidtData !== '' ? eidtData.clubActivity : '',
      activitySite: eidtData !== '' ? eidtData.activitySite : '',
      activityTime: eidtData !== '' ? moment(eidtData.activityTime) : '',
      activityStopTime: eidtData !== '' ? moment(eidtData.activityStopTime) : '',
      activityIntroduce: eidtData !== '' ? eidtData.activityIntroduce : '',
      activityRequire: eidtData !== '' ? eidtData.activityRequire : '',
    });
  }


  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const { isShowEidtModel } = props;
  
  return (
    <Modal
    title="编辑活动信息"
    visible={isShowEidtModel}
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
          label="活动名称 "
          name="clubActivity"
          rules={[{ required: true, message: '请输入活动名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="活动地点 "
          name="activitySite"
          rules={[{ required: true, message: '请输入活动地点！' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
          label="活动开始时间"
          name="activityTime"
          rules={[{ required: true, message: '请输入活动开始时间!' }]}
        >
          <DatePicker renderExtraFooter={() => 'extra footer'} showTime disabledDate={disabledDate}  />
        </Form.Item>
        <Form.Item
          label="活动结束时间"
          name="activityStopTime"
          rules={[{ required: true, message: '请输入活动结束时间!' }]}
        >
          <DatePicker renderExtraFooter={() => 'extra footer'} showTime disabledDate={disabledDate}  />
        </Form.Item>
        <Form.Item
          label="活动简介"
          name="activityIntroduce"
          rules={[{ required: true, message: '请输入活动简介!' }]}
        >
          <Input.TextArea  
            allowClear 
            autoSize={{ minRows: 2, maxRows: 4 }}
            onChange={handleActivityIntroduceOnChange}
          />
        </Form.Item>
        <Form.Item
          label="活动要求 "
          name="activityRequire"
        >
          <Input.TextArea  
            allowClear 
            autoSize={{ minRows: 2, maxRows: 4 }}
            onChange={handleActivityRequireOnChange}
          />
        </Form.Item>
        <Form.Item
          label="图片"
          name="activityImg"
        >
          <Upload 
            name="activityImg"  
            listType="picture-card"
            onChange={hanldeUploadonChange} 
            beforeUpload={handleBeforeUpload}
            fileList={fileList}>
            <Tooltip title={!isUploadDisAbled ? '直接上传图片覆盖原有图片更新图片信息' : '最多上传一张图片'}>
              <Button disabled={isUploadDisAbled} >
                <UploadOutlined /> 上传图片
              </Button>
            </Tooltip>
          </Upload>
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

export default connect(({ activity }) => ({
  allActivity: activity.allActivity,
  isShowEidtModel: activity.isShowEidtModel,
  eidtData: activity.eidtData,
  isShowCheckJionMemberModel: activity.isShowCheckJionMemberModel,
  saveCheckMemberJoinActivity: activity.saveCheckMemberJoinActivity
}))(ActivityEidtModel);