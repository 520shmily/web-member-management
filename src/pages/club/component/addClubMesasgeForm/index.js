import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, Tooltip, Button, Card, message, Upload } from 'antd';
import { connect } from 'dva';

import { UploadOutlined } from '@ant-design/icons';

class AddClubMessageForm extends React.Component {

  state = {
    isUploadDisAbled: false,
    fileList: '',
    isClubWordMessageDisAbled: false,
    clubWordMessageValue: '',
  }

  handleOnFinish = (values) => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'club/fetchAddnewClubMessage',
        payload: { 
          ...values,
          clubID: sessionStorage.getItem('systemID'),
          option: 'add'
         }
      });
    }

    message.success('社团简介导入成功');
  
    setTimeout(() => {
      if (dispatch) {
        dispatch({
          type: 'club/fetchClubMessage',
          payload: {
            clubID: sessionStorage.getItem('systemID'),
            option: 'check'
          }
        });
      }
    },1000)
  }

  hanldeUploadonChange = (e) => {
    let fileList = e.fileList.filter((item) => {
      return (item.type === 'image/jpeg' || item.type === 'image/png');
    })
    this.setState({
      fileList: fileList
    })

    if (fileList.length == 2) {
      this.setState({
        isUploadDisAbled: true,
      })
      return;
    } 
    this.setState({
      isUploadDisAbled: false,
    })
  }

  handleBeforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传格式为 JPG 或 PNG 的图片！');
    }
  }

  handleClubWordMessageOnChange = (e) => {
    if (e.target.value.length > 300 ) {
      message.warning('最多输入300字符')
    } else {
      this.setState({
        clubWordMessageValue: e.target.value
      })
    }
  }

  render () {
    const layout = {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 16,
      },
    };

    const { isUploadDisAbled, fileList, clubWordMessageValue } = this.state;

    return (
      <Form onFinish={this.handleOnFinish} {...layout}> 
        <Form.Item
          label="社团名称 "
          name="clubName"
          rules={[{ required: true, message: '请输入社团名称！' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="社团编码 "
          name="clubID"
          rules={[{ required: true, message: '请输入社团编码！' }]}
        >
            <Input />
        </Form.Item>
        <Form.Item
          label="社团简介"
          name="clubWordMessage"
          rules={[{ required: true, message: '请输入社团简介!' }]}
        >
          <Input.TextArea  
            allowClear 
            autoSize={{ minRows: 3, maxRows: 6 }}
            onChange={this.handleClubWordMessageOnChange}
            value={clubWordMessageValue}
          />
        </Form.Item>
        <Form.Item
          label="图片"
          name="clubImg"
          rules={[{ required: true, message: '请上传图片用于社团介绍!' }]}
        >
          <Upload 
            listType="picture-card"
            name="clubImg"
            onChange={this.hanldeUploadonChange} 
            beforeUpload={this.handleBeforeUpload}
            disabled={isUploadDisAbled}
            fileList={fileList}
            >
              <Tooltip title={!isUploadDisAbled ? '' : '最多上传两张图片'}>
                <Button disabled={isUploadDisAbled}>
                  <UploadOutlined /> 上传图片
                </Button>
              </Tooltip>
          </Upload>
        </Form.Item>
        <Form.Item  wrapperCol={{ span: 12, offset: 6 }}>
          <Button type="primary" htmlType="submit">
            导入
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default connect(({ club }) => ({
  clubmessage: club.clubmessage,
}))(AddClubMessageForm);