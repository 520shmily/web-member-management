import React, { useState, useEffect } from 'react';
import { connect } from 'dva';
import { Input, Button, message, Tooltip } from 'antd';
import styles from './index.less';

import ShowPhotos from '../showPhotos/index'

class ShowClubMessage extends React.Component {
  state = {
    clubWordMessageValue: this.props.clubmessage.result == '' ? '' : this.props.clubmessage.result[0].clubWordMessage ,
    isbtndisAbled: true,
  }

  handleClubWordMessageUpdateOnChange = (e) => {
    this.setState({
      isbtndisAbled: false
    })
    if (e.target.value.length > 300 ) {
      message.warning('最多输入300字符')
    } else {
      this.setState({
        clubWordMessageValue: e.target.value
      })
    }
  }

  handleUpdateBtnClick = () => {
    const { dispatch } = this.props;
    if (this.state.clubWordMessageValue == '') {
      message.warning('社团简介不能为空');
      this.setState({
        clubWordMessageValue: this.props.clubmessage.result == '' ? '' : this.props.clubmessage.result[0].clubWordMessage
      })
      return;
    }
    if (dispatch) {
      dispatch({
        type: 'club/fetchUpdateClubMessage',
        payload: {
          clubWordMessage: this.state.clubWordMessageValue,
          clubID: sessionStorage.getItem('systemID'),
          option: 'updateWord',
        }
      });
    }

    message.success('社团简介更新成功');
  }

  render () {
    const { clubmessage } = this.props;
    const { clubWordMessageValue, isbtndisAbled } = this.state;

    return (
    <div>
      <div className={styles.showContent}>
        <div className={styles.showmessage}>
          <div>
            <span className={styles.messageTitle}>社团简介</span>
            <span className={styles.tips}>(Tips:可在文本框中直接修改点击更新按钮更新社团简介信息)</span>
            <Input.TextArea  
              allowClear 
              autoSize={{ minRows: 8, maxRows: 8 }}
              onChange={this.handleClubWordMessageUpdateOnChange}
              value={clubWordMessageValue}
            />
            <Tooltip title={isbtndisAbled ? '更新社团简介后可点击' : ''}>
              <Button 
                className={styles.updateBtn} 
                type="primary"
                onClick={this.handleUpdateBtnClick}
                disabled={isbtndisAbled}
                >
                更新
              </Button>
            </Tooltip>
          </div>
          <div>
            <span className={styles.messageTitle}>社团简介图片信息</span>
            <span className={styles.tips}>(Tips:可直接删除图片后重新上传)</span>
            <div>
              <ShowPhotos />
            </div>
          </div>
        </div>
      </div>
     </div>
    );
  }
};


export default connect(({ club }) => ({
  clubmessage: club.clubmessage,
}))(ShowClubMessage);
