import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Table, Popconfirm, Input, Button, message } from 'antd';
import { connect } from 'dva';
import { SearchOutlined } from '@ant-design/icons';
import styles from './index.less';

import EidtMemberMessageModel from '../component/editmembermessage/index'
import AssessMemberModel from '../component/assessmember/index'

class AllClubMember extends React.Component {

  state = {
    searchValue: '',
    notDeleteList: '',
  }

  componentDidMount () {
    const { dispatch, allClubMember } = this.props;

    if (allClubMember.length > 0) {
      return;
    }
    if (dispatch) {
      dispatch({
        type: 'clubmember/fetchAllClubMember',
        payload: { 
          systemID: sessionStorage.getItem('systemID'),
          option: 'check'
        }
      });
    }
  }

  handleMemberEditClick = (text) => {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'clubmember/isShowMemberEidtModel',
        isShowMemberEidtModel: true, 
        eidtData: text
      });
    }
  }

  handleAssessClick = (text) => {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'clubmember/isShowAssessModel',
        isShowAssessModel: true, 
        eidtData: text
      });
      dispatch({
        type: 'clubmember/fetchGetMemberJoinActivity',
        payload: { 
          memberID: text.memberID,
          option: 'assess'
        }
      });
    }
  }

  handleMemberDeleteClick = (text) => {
    const { dispatch, allClubMember } = this.props;
    this.setState({
      notDeleteList: allClubMember.filter(item => item.memberID !== text.memberID)
    })

    message.success('删除成功');

    // 更新后端数据
    if (dispatch) {
      dispatch({
        type: 'clubmember/fetchDeleteClubMember',
        payload: {
          memberID: text.memberID,
          option: 'delete'
        }
      });

      setTimeout(() => {
        window.location.reload();
      }, 1000)
    }
  }

  handleResetPassWordClick = (text) => {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'clubmember/fetchgetResetPassWord',
        payload: { 
          memberID: text.memberID,
          memberPW: text.memberClassID,
          option: 'resetPassWord'
        }
      });
    }

    message.success('重置密码成功');
  }
  
  handleOnchange = (e) => {
    this.setState({
      searchValue: e.target.value
    })
    if (e.target.value == '') {
      this.setState({
        searchData: ''
      })
    }
  }

  handleSarchOnClick = () => {
    let searchValue = this.state.searchValue;
    const { allClubMember } = this.props;

    if (allClubMember.length !== 0 && searchValue) {
      let searchData = allClubMember.filter((item) => {
        return item.memberID == searchValue
      })

      if (searchData.length == 0) {
        message.warning('没有搜索到你想要到内容');
        this.setState({
          searchValue: ''
        })
        return;
      }

      this.setState({
        searchData: searchData.length == 0 ? '' : searchData,
      })

    } else {
      message.warning('请输入搜索内容');
    }
  }

  render () {

    const columns = [
      {
        title: '会员编码',
        dataIndex: 'memberID',
        key: 'memberID',
        width: '110px',
        fixed: 'left',
        defaultSortOrder: 'descend',
        sorter: (a, b) => Number(a.memberID.substring(3,a.memberID.length)) - Number(b.memberID.substring(3,b.memberID.length)),
      },
      {
        title: '姓名',
        dataIndex: 'memberName',
        key: 'memberName',
        width: '110px',
        fixed: 'left',
      },
      {
        title: '学号',
        dataIndex: 'memberClassID',
        key: 'memberClassID',
        width: '160px',
      },
      {
        title: '专业',
        dataIndex: 'manage',
        key: 'manage',
        width: '160px',
      },
      {
        title: '年级',
        key: 'classYear',
        dataIndex: 'classYear',
        width: '80px',
      },
      {
        title: '学院',
        key: 'college',
        dataIndex: 'college',
        width: '180px',
      },
      {
        title: 'QQ',
        key: 'qq',
        dataIndex: 'qq',
        width: '160px',
      },
      {
        title: '微信',
        key: 'wechat',
        dataIndex: 'wechat',
        width: '160px',
      },
      {
        title: '电话号码',
        key: 'phoneNumber',
        dataIndex: 'phoneNumber',
        width: '150px',
      },
      {
        title: '考核等级',
        key: 'level',
        dataIndex: 'level',
        width: '90px',
      },
      {
        title: '操作',
        key: 'action',
        width: '230px',
        fixed: 'right',
        render: (text, record) => {
          return (
          <span>
            <a style={{ marginRight: 16 }} onClick={() => this.handleMemberEditClick(text)}>编辑</a>
            <a style={{ marginRight: 16 }} onClick={() => this.handleAssessClick(text)}>考核</a>
            <Popconfirm title="确定删除?" onConfirm={() => this.handleMemberDeleteClick(text)}>
              <a style={{ marginRight: 16 }}>删除</a>
            </Popconfirm>
            <Popconfirm title="确定重置密码?" onConfirm={() => this.handleResetPassWordClick(text)}>
              <a >重置密码</a>
            </Popconfirm>
          </span>
        )},
      },
    ];

    const { searchValue, searchData, notDeleteList } = this.state;
    const { allClubMember } = this.props;

    return (
      <PageHeaderWrapper>
        <div className={styles.main}>
          <p>所有会员信息如下列表所示：</p>
          <div style={{dispaly: 'flex', marginBottom: '15px'}}>
            <Input style={{width: '250px'}} placeholder="输入会员编码" value={searchValue} onChange={this.handleOnchange} />
            <Button icon={<SearchOutlined />} onClick={this.handleSarchOnClick}>Search</Button>
          </div>
          <Table 
            columns={columns} 
            dataSource={searchData ? searchData : (notDeleteList ? notDeleteList : allClubMember)} 
            scroll={{ x: 1300 }} 
            bordered 
          />
          <EidtMemberMessageModel />
          <AssessMemberModel />
        </div>
      </PageHeaderWrapper>
    );
  }
};

export default connect(({ clubmember }) => ({
  allClubMember: clubmember.allClubMember,
  isShowMemberEidtModel: clubmember.isShowMemberEidtModel,
  isShowAssessModel: clubmember.isShowAssessModel,
  eidtData: clubmember.eidtData,
  MemberJoinActivityData: clubmember.MemberJoinActivityData
}))(AllClubMember);
