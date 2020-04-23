import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Form, Select, Table, Button, Modal, message, Tabs, Tooltip } from 'antd';
import { connect } from 'dva';
import styles from '../../index.less';

const { TabPane } = Tabs;

const AssessMemberModel = ( props ) =>  {

  const [form] = Form.useForm();
  const [tabsActiveKey, setTabsActiveKey] = useState('1');
  const [isShowTabs, setIsShowTabs] = useState(false)

  const handleOnFinish = (values) => {
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'clubmember/fetchUpdateClubMember',
        payload: { 
          ...values,
          option: 'assess',
          memberID: props.eidtData.memberID, 
        }
      });
    }

    message.success('考核成功');
  
    setTimeout(() => {
      if (dispatch) {
        dispatch({
          type: 'clubmember/isShowAssessModel',
          isShowAssessModel: false, 
          eidtData: ''
        });
        dispatch({
          type: 'clubmember/fetchAllClubMember',
          payload: { 
            systemID: sessionStorage.getItem('systemID'),
            option: 'check'
          }
        });
      }
    },1000)
  }


  const handleCancelClick = () => {
    const { dispatch } = props;

    if (dispatch) {
      dispatch({
        type: 'clubmember/isShowAssessModel',
        isShowAssessModel: false, 
        eidtData: ''
      });
    }
  }

  
  const initValues = () => {
    const { eidtData } = props;
    
    form.setFieldsValue({
      level: eidtData !== '' ? eidtData.level : '',
    });
  }

  const { isShowAssessModel, MemberJoinActivityData } = props;

  const columns1 = [
    {
      title: '活动名称',
      dataIndex: 'clubActivity',
      key: 'clubActivity',
    },
    {
      title: '签到',
      dataIndex: 'signIn',
      key: 'signIn',
    },
    {
      title: '签退',
      dataIndex: 'signOff',
      key: 'signOff',
    },
  ];

  const columns2 = [
    {
      title: '活动名称',
      dataIndex: 'clubActivity',
      key: 'clubActivity',
    },
  ];


  const handleTabsChange = (e) => {
    setTabsActiveKey(e)
  }

  let signInsignOffActivity = '';
  let signInActivity = '';
  let signOffActivity = '';
  let notsignInsignOffActivity  = '';

  if (MemberJoinActivityData.length > 0) {
    // 签到签退活动
    signInsignOffActivity = MemberJoinActivityData.filter((item) => {
      return item.signIn == 'true' && item.signOff == 'true';
    })

    // 仅签到活动
    signInActivity = MemberJoinActivityData.filter((item) => {
      return item.signIn == 'true' && item.signOff == 'false';
    })

    // 仅签退活动
    signOffActivity = MemberJoinActivityData.filter((item) => {
      return item.signIn == 'false' && item.signOff == 'true';
    })

    // 未签到签退活动
    notsignInsignOffActivity = MemberJoinActivityData.filter((item) => {
      return item.signIn == 'false' && item.signOff == 'false';
    })
  }

  const hanldeBtnShowClick = () => {
    setIsShowTabs(!isShowTabs)
  }

  return (
    <Modal
    title="考核会员"
    visible={isShowAssessModel}
    onCancel={handleCancelClick}
    footer={null}
    width='650px'
    >
      <p>参考会员报名活动参与情况考核会员：</p>
      <ul>
        <li className={styles.liItem}>全部报名活动：<span className={styles.spanItem}>{MemberJoinActivityData.length}</span></li>
        <li className={styles.liItem}>签到签退活动：<span className={styles.spanItem}>{signInsignOffActivity.length}</span></li>
        <li className={styles.liItem}>仅签到活动：<span className={styles.spanItem}>{signInActivity.length}</span></li>
        <li className={styles.liItem}>仅签退活动：<span className={styles.spanItem}>{signOffActivity.length}</span></li>
        <li className={styles.liItem}>未签到签退活动：<span className={styles.spanItem}>{notsignInsignOffActivity.length}</span></li>
      </ul>
      <Button type="primary" onClick={hanldeBtnShowClick} style={{marginBottom: '12px'}}>
        {isShowTabs ? '收起表格' : '展开查看详情' }
      </Button>
      <Tabs type="card" onChange={handleTabsChange} activeKey={tabsActiveKey} style={{display: isShowTabs ? 'block' : 'none'}}>
        <TabPane tab="全部报名活动" key="1">
          <Table 
            columns={columns1} 
            dataSource={MemberJoinActivityData} 
            bordered 
            pagination={{
              showTotal: () => `共参与${MemberJoinActivityData.length}个活动`,
              pageSize: 5
            }}
          />
        </TabPane>
        <TabPane tab="签到签退活动" key="2">
          <Table 
            columns={columns2} 
            dataSource={signInsignOffActivity} 
            bordered 
            pagination={{
              showTotal: () => `签到签退活动共${signInsignOffActivity.length}个`,
              pageSize: 5
            }}
          />
        </TabPane>
        <TabPane tab="仅签到活动" key="3">
          <Table 
            columns={columns2} 
            dataSource={signInActivity} 
            bordered 
            pagination={{
              showTotal: () => `仅签到活动共${signInActivity.length}个`,
              pageSize: 5
            }}
          />
        </TabPane>
        <TabPane tab="仅签退活动" key="4">
          <Table 
            columns={columns2} 
            dataSource={signOffActivity} 
            bordered 
            pagination={{
              showTotal: () => `仅签退活动共${signOffActivity.length}个`,
              pageSize: 5
            }}
          />
        </TabPane>
        <TabPane tab="未签到签退活动" key="5">
          <Table 
            columns={columns2} 
            dataSource={notsignInsignOffActivity} 
            bordered 
            pagination={{
              showTotal: () => `未签到签退活动共${notsignInsignOffActivity.length}个`,
              pageSize: 5
            }}
          />
        </TabPane>
      </Tabs>
      <Form 
        onFinish={handleOnFinish} 
        className={styles.formItem} 
        form={form}
        initialValues={initValues()}
      > 
        <Form.Item
          name="level"
          label="考核等级"
          hasFeedback
        >
          <Select placeholder="选择会员考核等级">
            <Option value="不及格">不及格</Option>
            <Option value="及格">及格</Option>
            <Option value="良好">良好</Option>
            <Option value="优秀">优秀</Option>
          </Select>
        </Form.Item>
        <Form.Item  wrapperCol={{ span: 12, offset: 11 }}> 
          <Button type="primary" htmlType="submit">
            更新
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
  
};

export default connect(({ clubmember }) => ({
  allClubMember: clubmember.allClubMember,
  isShowMemberEidtModel: clubmember.isShowMemberEidtModel,
  isShowAssessModel: clubmember.isShowAssessModel,
  eidtData: clubmember.eidtData,
  MemberJoinActivityData: clubmember.MemberJoinActivityData
}))(AssessMemberModel);