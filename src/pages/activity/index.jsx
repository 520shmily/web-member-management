import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Card, message, Upload, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from '../clubmember/index.less';

import { UploadOutlined } from '@ant-design/icons';

const moment = require('moment');

const AddNewActivity = ( props ) =>  {

  const [form] = Form.useForm();
  const [isUploadDisAbled, setIsUploadDisAbled] = useState(false);
  const [fileList, setFileList] = useState('');

  const handleOnFinish = (values) => {
    const { dispatch } = props;
    if (new Date(values.activityStopTime) <= new Date(values.activityTime)) {
      message.error('活动结束时间必须大于活动开始时间');
      form.setFieldsValue({
        activityStopTime: '',
      });
      return;
    }
    if (dispatch) {
      dispatch({
        type: 'activity/fetchAddnewActivity',
        payload: { 
          ...values,
          activityTime:  moment(values.activityTime).format('YYYY-MM-DD HH:mm:ss'),
          activityStopTime:  moment(values.activityStopTime).format('YYYY-MM-DD HH:mm:ss'),
          option: 'add',
          clubID: sessionStorage.getItem('systemID'),
        }
      });
    }

    message.success('发布新活动成功');
  
    setTimeout(() => {
      form.setFieldsValue(initValues());
      setFileList('');
      setIsUploadDisAbled(false);
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

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const initValues = () => {
    return {
      clubActivity: '',
      activityIntroduce: '',
      activitySite: '',
      activityTime: '',
      activityStopTime: '',
      activityRequire: ''
    }
  }

  const disabledDate = (current) => {
    return current && current < moment().endOf('day');
  }

  return (
    <PageHeaderWrapper>
      <div className={styles.main}>
      <Card title="发布新活动" bordered={false} className={styles.card} >
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
              <DatePicker renderExtraFooter={() => 'extra footer'} showTime disabledDate={disabledDate} />
            </Form.Item>
            <Form.Item
              label="活动结束时间"
              name="activityStopTime"
              rules={[{ required: true, message: '请输入活动结束时间!' }]}
            >
              <DatePicker renderExtraFooter={() => 'extra footer'} showTime disabledDate={disabledDate} />
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
              label="图片"
              name="activityImg"
              rules={[{ required: true, message: '请上传图片用于活动介绍!' }]}
            >
              <Upload 
                listType="picture-card"
                name="activityImg"  
                onChange={hanldeUploadonChange} 
                beforeUpload={handleBeforeUpload}
                disabled={isUploadDisAbled}
                fileList={fileList}>
                <Tooltip title={!isUploadDisAbled ? '' : '最多上传一张图片'}>
                  <Button disabled={isUploadDisAbled}>
                    <UploadOutlined /> 上传图片
                  </Button>
                </Tooltip>
              </Upload>
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
            <Form.Item  wrapperCol={{ span: 12, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                发布
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </PageHeaderWrapper>
  );
  
};

export default connect(({ activity }) => ({
  allActivity: activity.allActivity,
  isShowCheckJionMemberModel: activity.isShowCheckJionMemberModel,
  saveCheckMemberJoinActivity: activity.saveCheckMemberJoinActivity
}))(AddNewActivity);