import { PageHeaderWrapper } from '@ant-design/pro-layout';
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

class Photos extends React.Component {


  componentDidMount () {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'photos/fetchClubPhotos',
        payload: {
          clubID: sessionStorage.getItem('systemID'),
          option: 'check'
        }
      });
    }
  }

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: this.props.clubphotos.length > 0 ? this.props.clubphotos : '',
    isBtnAbled: true,
    btnMessage: this.props.clubphotos.length > 0 ? '更新' : '全部导入'
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
      fileList ,
      isBtnAbled: false
    });
  }

  newAddPhoto = () => {

    let nowfileList = this.state.fileList;
    let fileList = this.props.clubphotos;

    if ((nowfileList.length - fileList.length) > 3) {
      message.warning('批量最多一次更新三张图片');
      return;
    }

    let photolist = nowfileList.map((item, index) => {
      if(item.thumbUrl) {
        return {url: item.thumbUrl, uid: index}
      } else {
        return item
      }
    })

    let addphotolist = photolist.filter((item,index) => {
      return index >= fileList.length
    })

    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'photos/fetchClubPhotos',
        payload: {
          clubID: sessionStorage.getItem('systemID'),
          option: 'update',
          imageId: addphotolist,
        }
      });
      setTimeout(() => {
        dispatch({
          type: 'photos/fetchClubPhotos',
          payload: {
            clubID: sessionStorage.getItem('systemID'),
            option: 'check'
          }
        });
      },1000)
    }

    message.success('成功添加社团风采墙照片');
  }

  handleUpdatePhotoBtnClick = () => {

    if (this.state.btnMessage == '更新') {
      this.newAddPhoto();
      return;
    }
    
    let photolist = this.state.fileList.map((item, index) => {
      if(item.thumbUrl) {
        return {url: item.thumbUrl, uid: index}
      } else {
        return item
      }
    })

    if (photolist.length > 3) {
      message.warning('批量最多一次导入三张图片');
      return;
    }

    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'photos/fetchClubPhotos',
        payload: {
          clubID: sessionStorage.getItem('systemID'),
          option: 'add',
          imageId: photolist,
        }
      });
      setTimeout(() => {
        dispatch({
          type: 'photos/fetchClubPhotos',
          payload: {
            clubID: sessionStorage.getItem('systemID'),
            option: 'check'
          }
        });
      },1000)
    }

    message.success('成功导入社团风采墙照片');

    this.setState({
      btnMessage: false
    })
  }

  handleONRemove = (e) => {
    let uid = '';
    let notdeleteList = this.state.fileList.filter((item) => {
      if(item.uid == e.uid) {
        uid = item.uid
      }
      return item.uid !== e.uid;
    })

    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'photos/fetchdeleterClubPhotos',
        payload: {
          clubID: sessionStorage.getItem('systemID'),
          option: 'delete',
          uid: uid,
        }
      });
      setTimeout(() => {
        dispatch({
          type: 'photos/fetchClubPhotos',
          payload: {
            clubID: sessionStorage.getItem('systemID'),
            option: 'check'
          }
        });
      },1000)
    }

    this.setState({
      fileList: notdeleteList
    })

    message.success('图片删除成功')
    return false;
  }

  render () {
    const { previewVisible, previewImage, fileList, isBtnAbled, btnMessage } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">上传</div>
      </div>
    );

    return (
      <PageHeaderWrapper>
        <div className={styles.main}>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
            className={styles.uploadPhotos}
            onRemove={this.handleONRemove}
          >
            {fileList.length >= 20 ? message.warning('最多上传20张照片') : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
         
          <Tooltip title={isBtnAbled ? '更新图片后可点击' : ''}>
            <Button 
              className={styles.updateBtn} 
              type="primary"
              onClick={this.handleUpdatePhotoBtnClick}
              disabled={isBtnAbled}
              >
              {btnMessage}
            </Button>
          </Tooltip>
        </div>
      </PageHeaderWrapper>
    );
  }
};


export default connect(({ photos }) => ({
  clubphotos: photos.clubphotos,
}))(Photos);
