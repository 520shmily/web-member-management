import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Card, message } from 'antd';
import { connect } from 'dva';
import styles from './index.less';

import AddClubMember from './component/addmembermessage/index'

class ClubMember extends React.Component {

  componentDidMount () {
    const { dispatch } = this.props;

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

  render() {

    return (
      <PageHeaderWrapper>
        <div className={styles.main}>
          <Card title="导入会员信息" bordered={false} className={styles.card} >
            <AddClubMember />
          </Card>
        </div>
      </PageHeaderWrapper>
    );
  }
};

export default connect(({ clubmember }) => ({
  allClubMember: clubmember.allClubMember,
}))(ClubMember);