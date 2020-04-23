import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Input, message } from 'antd';
import styles from './index.less';
import { connect } from 'dva';

class Manage extends React.Component {

  state = {
    isUpdateClubManageVisible: false,
  }

  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'manage/fetchClubManageMessge',
        payload: {
          systemID: sessionStorage.getItem('systemID'),
          option: 'check'
        },
      });
    }
  }

  handleUpdateClick = () => {
    this.setState({
      isUpdateClubManageVisible: true,
    })
  }

  handleCancelClick = () => {
    this.setState({
      isUpdateClubManageVisible: false,
    })
  }

  handleOnFinish = (values) => {
    const { dispatch } = this.props;

    if (values.systemPW == values.clubPass) {
      if (dispatch) {
        console.log('99')
        dispatch({
          type: 'manage/fetchUpdateClubManageMessge',
          payload: { 
            ...values, 
            option: 'update',
            systemID: sessionStorage.getItem('systemID')
          }
        });
      }
      
      message.success('修改成功');
  
      setTimeout(() => {
        window.location.reload();
      },1000)
    } 
  }

  render() {
    const { clubManageMessge } = this.props;
    const { isUpdateClubManageVisible } = this.state;

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };

    return (
      <PageHeaderWrapper >
        <div className={styles.main}>
          <Card title="社团负责人信息如下：" bordered={false} className={styles.card} >
            <div className={styles.cardcontent}>
              <p>社团名称：<span className={styles.itmemanage}>{clubManageMessge ? clubManageMessge[0].systemName : ''}</span></p>
              <p>社团编码：<span className={styles.itmemanage}>{clubManageMessge ? clubManageMessge[0].systemID : ''}</span></p>
              <p>社团登录密码：<span className={styles.itmemanage}>{clubManageMessge ? clubManageMessge[0].systemPW : ''}</span></p>
              <Button onClick={this.handleUpdateClick} type="primary">修改密码</Button>
            </div>
          </Card>
        </div>
        <Modal
          title="添加社团负责人"
          visible={isUpdateClubManageVisible}
          onCancel={this.handleCancelClick}
          footer={null}
          >
          <Form onFinish={this.handleOnFinish} {...layout} style={{width: '80%', textAlign: 'center', margin: '0 auto'}}> 
            <Form.Item
              label="请输入密码"
              name="systemPW"
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="确认密码 "
              name="clubPass"
              rules={[
                { required: true, message: '请再次输入密码！' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || getFieldValue('systemPW') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject('两次输入的密码不一致，请再次输入！');
                  },
                })
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </PageHeaderWrapper>
    );
  }
};

export default connect(({ manage }) => ({
  clubManageMessge: manage.clubManageMessge,
}))(Manage);
