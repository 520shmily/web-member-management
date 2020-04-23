import { Upload, Modal, message, Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { connect } from 'dva';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

class ShowPhotos extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.clubmessage !== '' ? this.props.clubmessage.clubPhotos : '',
    isbtndisAbled: true
  };


  handleCancel = () => {
    this.setState({ previewVisible: false });
  }

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ 
      fileList,
      isbtndisAbled: false
    });
  }

  handleUpdatePhotoBtnClick = () => {
    const { dispatch } = this.props;
    if(this.state.fileList == 0) {
      message.warning('至少上传一张照片');
      this.setState({
        fileList: this.props.clubmessage !== '' ? this.props.clubmessage.clubPhotos : '',
      })
      return;
    }
    if (dispatch) {
      dispatch({
        type: 'club/fetchUpdateClubMessage',
        payload: {
          clubImg: this.state.fileList,
          clubID: sessionStorage.getItem('systemID'),
          option: 'updateImg',
        }
      });
    }

    message.success('社团简介照片更新成功');
  
    // setTimeout(() => {
    //   window.location.reload();
    // },800)
  }

  render() {
    const { previewVisible, previewImage, fileList, isbtndisAbled } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">重新上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 2 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="" style={{ width: '100%' }} src={previewImage} />
        </Modal>
        <Tooltip title={isbtndisAbled ? '更新图片信息后可点击' : ''}>
          <Button 
            className={styles.updateBtn} 
            type="primary"
            onClick={this.handleUpdatePhotoBtnClick}
            disabled={isbtndisAbled}
            >
            更新
          </Button>
        </Tooltip>
      </div>
    );
  }
}


export default connect(({ club }) => ({
  clubmessage: club.clubmessage,
}))(ShowPhotos);
