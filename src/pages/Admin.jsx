import React from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Table , Button, Input, Popconfirm, Form, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import AddClubManage from './admin/components/AddClubManage'
import { connect } from 'dva';
import AdminTable from './admin/components/AdminTable'

class Admin extends React.Component {

  state = {
    currentValue: '',
    searchList: '',
  }

  componentDidMount() {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'admin/fetchAllClubManageMessge',
        payload: { option: 'check' }

      });
    }
  }

  handleOnchange = (e) => {
    this.setState({
      currentValue: e.target.value,
    })
    if (e.target.value == '') {
      this.setState({
        searchList: ''
      })
    }
  }

  handleSarchOnClick = () => {
    let allClubManageMessge = this.props.allClubManageMessge;
    let currentValue = this.state.currentValue;

    if (allClubManageMessge.length !== 0 && currentValue) {
      let searchList = allClubManageMessge.filter((item) => {
        return (item.systemID === currentValue) 
      })

      this.setState({
        searchList: searchList.length == 0 ? '' : searchList
      })

      if (searchList.length == 0) {
        message.warning('没有搜索到你想要到内容');
        this.setState({
          currentValue: ''
        })
      }

    } else {
      message.warning('请输入搜索内容');
    }
  }

  handleAddOnClick = () => {
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'admin/changeIsAddStatus',
        payload: true,
      });
    }
  
  }

  render() {
    const { allClubManageMessge } = this.props;
    const { currentValue, searchList } = this.state;

    return (
      <PageHeaderWrapper content="Tips：该页面仅由 admin 权限的系统管理员可查看，社团负责人登录不可查看">
        <div style={{backgroundColor: '#fff', padding: '20px'}}>
          <p>所有社团负责人信息如下列表所示：</p>
          <div style={{dispaly: 'flex', marginBottom: '15px'}}>
            <Input style={{width: '250px'}} placeholder="输入社团编码" value={currentValue} onChange={this.handleOnchange} />
            <Button icon={<SearchOutlined />} onClick={this.handleSarchOnClick}>Search</Button>
            <Button style={{position: "absolute",right: '3%'}} type="primary" onClick={this.handleAddOnClick}>添加</Button>
          </div>
          <AdminTable  data={searchList ? searchList : allClubManageMessge} />
        </div>
        <AddClubManage />
      </PageHeaderWrapper>
    )
  }
}

export default connect(({ admin }) => ({
  allClubManageMessge: admin.allClubManageMessge,
}))(Admin);
