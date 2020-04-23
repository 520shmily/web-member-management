import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Select, Table, Button, Modal, message, Upload, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from '../../../clubmember/index.less';

const CheckJionModel = ( props ) =>  {

  const handleCancelClick = () => {
    const { dispatch } = props;

    if (dispatch) {
      dispatch({
        type: 'activity/isShowCheckJionMemberModel',
        isShowCheckJionMemberModel: false, 
        eidtData: ''
      });
    }
  }


  const { isShowCheckJionMemberModel } = props;

  const columns = [
    // {
    //   title: '姓名',
    //   dataIndex: 'memberName',
    //   key: 'memberName',
    //   width: '100px'
    // },
    {
      title: '会员编码',
      dataIndex: 'memberID',
      key: 'memberID',
      width: '100px'
    },
    {
      title: '活动评论',
      dataIndex: 'activitythinks',
      key: 'activitythinks',
      render: text => {
        return text ? text : '该会员没有评论该活动'
      } 
    },
  ];


  const { saveCheckMemberJoinActivity } = props;

  return (
    <Modal
    title="查看详细"
    visible={isShowCheckJionMemberModel}
    onCancel={handleCancelClick}
    footer={null}
    >
      <p>查看 <span style={{color: '#3f56f6'}}>{sessionStorage.getItem('activityName')}</span> 具体报名的情况：</p>
      <Table 
        columns={columns} 
        dataSource={saveCheckMemberJoinActivity} 
        bordered 
        pagination={{
          showTotal: () => `共有${saveCheckMemberJoinActivity.length}人报名该活动`,
          pageSize: 8
        }}
      />
    </Modal>
  );
  
};

export default connect(({ activity }) => ({
  allActivity: activity.allActivity,
  isShowEidtModel: activity.isShowEidtModel,
  eidtData: activity.eidtData,
  isShowCheckJionMemberModel: activity.isShowCheckJionMemberModel,
  saveCheckMemberJoinActivity: activity.saveCheckMemberJoinActivity
}))(CheckJionModel);