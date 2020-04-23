import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Table, Input, Button, message, Popconfirm } from 'antd';
import styles from './index.less';
import { connect } from 'dva';
import { SearchOutlined } from '@ant-design/icons';

class Suggest extends  React.Component {

  state = {
    searchValue: '',
    searchData: '',
    notDeleteList: '',
  }

  componentDidMount () {
    if (this.props.allClubMember) return;

    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'suggest/fetchAllSuggest',
        payload: {
          clubID: sessionStorage.getItem('systemID')
        }
      }); 
    }
  }

  handleMemberDeleteClick = (text) => {
    const data = this.props.allSuggest;
    this.setState({
      notDeleteList: data.filter(item => item.memberID !== text.memberID)
    })

    message.success('删除成功');

    // 更新后端数据
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'suggest/fetchDeleteSuggest',
        payload: {
          memberID: text.memberID 
        }
      });

      setTimeout(() => {
        dispatch({
          type: 'suggest/fetchAllSuggest',
          payload: {
            clubID: sessionStorage.getItem('systemID')
          }
        }, 5000); 
      })
    }
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
    const data = this.props.allSuggest;

    if (data.length !== 0 && searchValue) {
      let searchData = data.filter((item) => {
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

  render() {

    const columns = [
      {
        title: 'memberID',
        dataIndex: 'memberID',
        key: 'memberID',
        defaultSortOrder: 'descend',
        sorter: (a, b) => Number(a.memberID.substring(3,a.memberID.length)) - Number(b.memberID.substring(3,b.memberID.length)),
      },
      {
        title: 'memberName',
        dataIndex: 'memberName',
        key: 'memberName',
      },
      {
        title: 'suggest',
        dataIndex: 'suggest',
        key: 'suggest',
      },
      {
        title: '操作',
        key: 'action',
        width: '70px',
        render: (text, record) => {
          return (
          <span>
            <Popconfirm title="确定删除?" onConfirm={() => this.handleMemberDeleteClick(text)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )},
      },
    ];
    
    const { searchValue, searchData, notDeleteList } = this.state;
    const { allSuggest } = this.props;

    return (
      <PageHeaderWrapper>
        <div className={styles.main}>
          <p>所有会员建议如下列表所示：</p>
          <div style={{dispaly: 'flex', marginBottom: '15px'}}>
            <Input style={{width: '250px'}} placeholder="输入会员编码" value={searchValue} onChange={this.handleOnchange} />
            <Button icon={<SearchOutlined />} onClick={this.handleSarchOnClick}>Search</Button>
          </div>
          <Table columns={columns} dataSource={searchData ? searchData : (notDeleteList ? notDeleteList : allSuggest)} bordered />
        </div>
      </PageHeaderWrapper>
    );
  }
};

export default connect(({ suggest }) => ({
  allSuggest: suggest.allSuggest,
}))(Suggest);