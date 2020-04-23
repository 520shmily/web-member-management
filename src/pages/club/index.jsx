import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, DatePicker, Button, Modal, message, Upload } from 'antd';
import { connect } from 'dva';
import styles from '../clubmember/index.less';

import AddClubMessageForm from './component/addClubMesasgeForm/index'
import Empty from './component/empty/index'
import ShowClubMessage from './component/showClubMessage/index'

class AddClubMessage extends React.Component {

  state = {
    isaddClubMessageVisible: false,
  }

  getFetchClubMessage = () => {
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'club/fetchClubMessage',
        payload: {
          clubID: sessionStorage.getItem('systemID'),
          option: 'check'
        }
      });
    }
  }

  componentDidMount () {
    this.getFetchClubMessage();
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

  handleAddOnclik = () => {
    this.setState({
      isaddClubMessageVisible: true
    })
  }

  handleCancelClick = () => {
    this.setState({
      isaddClubMessageVisible: false,
    })
    this.getFetchClubMessage();
  }

  render () {

    const { clubmessage } = this.props;
    const { isaddClubMessageVisible } = this.state;
    
    let isEmptyVisible = true;
    if(clubmessage&&clubmessage.result.length > 0) {
      isEmptyVisible = false;
    }

    return (
      <PageHeaderWrapper>
        <div className={styles.main}>
          {
            isEmptyVisible ?  <Empty handleonClik={this.handleAddOnclik}></Empty> : <ShowClubMessage />
          }
          <Modal
          title="导入社团简介"
          visible={isaddClubMessageVisible}
          onCancel={this.handleCancelClick}
          footer={null}
          >
            <AddClubMessageForm />
          </Modal>
        </div>
      </PageHeaderWrapper>
    );
  }
};

export default connect(({ club }) => ({
  clubmessage: club.clubmessage,
}))(AddClubMessage);