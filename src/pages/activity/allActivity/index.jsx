import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import styles from './index.less';
import { SearchOutlined } from '@ant-design/icons';
import { Tabs, Input, Button, message } from 'antd';
import ActivityTable from '../components/activityTable/index';
import ActivityEidtModel from '../components/activityEitd/index';
import CheckJionModel from '../components/checkJionMember/index';

const { TabPane } = Tabs;

class allActivity extends React.Component {

  state = {
    searchValue: '',
    tabsActiveKey: '1',
    searchData: '',
  }

  componentDidMount () {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'activity/fetchAllActivity',
        payload: { 
          option: 'check',
          clubID: sessionStorage.getItem('systemID'),
        }
      });
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
    const { allActivity } = this.props;

    if (allActivity.length !== 0 && searchValue) {
      let searchData = allActivity.filter((item) => {
        return item.clubActivity == searchValue
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
        tabsActiveKey: '1'
      })

    } else {
      message.warning('请输入搜索内容');
    }
  }

  handleTabsChange = (e) => {
    this.setState({
      tabsActiveKey: e
    })
  }

  render () {
    const { searchValue, tabsActiveKey, searchData } = this.state;
    const { allActivity } = this.props;

    // 计算时间
    const compareTime = (activityTime) => {
      let nowDate = new Date().getTime();
      let activityDate = new Date(activityTime).getTime();

      if (activityDate - nowDate >= 0) { 
        return 0
      } else {
        return 1
      }
    }

    let activitingData = '';
    let activitiedData = '';

    if (allActivity) {
        // 进行中活动
        activitingData = allActivity.filter((item) => {
        return compareTime(item.activityTime) == 0;
      })
      
      // 历史活动
        activitiedData = allActivity.filter((item) => {
        return compareTime(item.activityTime) == 1;
      })
    }

    return (
      <PageHeaderWrapper>
       <div   className={styles.main}>
        <div style={{dispaly: 'flex', marginBottom: '15px'}}>
          <p>所有活动信息如下列表所示：</p>
          <Input style={{width: '250px'}} placeholder="输入活动名称" value={searchValue} onChange={this.handleOnchange} />
          <Button icon={<SearchOutlined />} onClick={this.handleSarchOnClick}>Search</Button>
        </div>
        <Tabs type="card" onChange={this.handleTabsChange} activeKey={tabsActiveKey}>
          <TabPane tab="所有活动" key="1">
            <ActivityTable datalist={searchData ? searchData : allActivity} />
          </TabPane>
          <TabPane tab="历史活动" key="2">
            <ActivityTable datalist={activitiedData} />
          </TabPane>
          <TabPane tab="进行中活动" key="3">
            <ActivityTable datalist={activitingData} />
          </TabPane>
        </Tabs>
        <ActivityEidtModel />
        <CheckJionModel />
       </div>
      </PageHeaderWrapper>
    );
  }
};

export default connect(({ activity }) => ({
  allActivity: activity.allActivity,
  isShowEidtModel: activity.isShowEidtModel,
  eidtData: activity.eidtData,
}))(allActivity);
