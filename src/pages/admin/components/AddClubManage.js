import { Modal, Form, Input, Button, message } from 'antd';
import React from 'react';
import { connect } from 'dva';

class AddClubManage extends React.Component {


  handleCancelClick = () => {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'admin/changeIsAddStatus',
        payload: false,
      });
    }
  }

  handleOnFinish = (values) => {
    const { dispatch, allClubManageMessge } = this.props;
    let noSameClub = allClubManageMessge.filter((item) => {
      return item.systemID == values.systemID;
    })

    if (noSameClub&&noSameClub.length > 0) {
      message.warning('社团已存在，请核对社团信息是否正确输入');
      return;
    }

    if (dispatch) {
      dispatch({
        type: 'admin/fetchAddClubManageMessge',
        payload: { ...values, option: 'add', id: allClubManageMessge.length + 1 }
      });
    }

    message.success('添加成功');

    setTimeout(() => {
      window.location.reload();
    },800)
  }

  render() {
    const { isAddClubManageVisible } = this.props;
    return (
      <Modal
          title="添加社团负责人"
          visible={isAddClubManageVisible}
          onCancel={this.handleCancelClick}
          footer={null}
          >
          <Form onFinish={this.handleOnFinish} style={{width: '60%', textAlign: 'center', margin: '0 auto'}}> 
            <Form.Item name='systemID' label="社团编码" rules={[{ required: true,  message: '请输入社团编码！', }]}>
              <Input />
            </Form.Item>
            <Form.Item name='systemName' label="社团名称" rules={[{ required: true,  message: '请输入社团名称！', }]}>
              <Input  />
            </Form.Item>
            <Form.Item name='systemPW' label="社团密码" rules={[{ required: true,  message: '请输入社团密码！', }]}>
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
    );
  }
};

export default connect(({ admin }) => ({
  isAddClubManageVisible: admin.isAddClubManageVisible,
  allClubManageMessge: admin.allClubManageMessge
}))(AddClubManage);;
