import { Table, Popconfirm, message, Tooltip, Modal } from 'antd';
import { connect } from 'dva';

class ActivityTable extends React.Component {

  state = {
    searchList: '',
    previewImage: '',
    previewVisible: false,
  }

  handleActivityDelete = text => {

    this.setState({
      searchList: this.props.datalist.filter(item => item.activityID !== text.activityID)
    })

    message.success('删除成功');

    // 更新后端数据
    const { dispatch } = this.props;
    if (dispatch) {
      dispatch({
        type: 'activity/fetchDeleteActivity',
        payload: {
          option: 'delete',
          activityID: text.activityID,
        }
      });
      setTimeout(() => {
        dispatch({
          type: 'activity/fetchAllActivity',
          payload: { 
            option: 'check',
            clubID: sessionStorage.getItem('systemID'),
          }
        });
      }, 1000)
    }
  };

  handleCheckJionMemberClick = text => {
    sessionStorage.setItem('activityName', text.clubActivity);

    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'activity/isShowCheckJionMemberModel',
        isShowCheckJionMemberModel: true, 
      });
      dispatch({
        type: 'activity/fetchGetCheckMemberJoinActivity',
        payload: {
          option: 'checkMember',
          activityID: text.activityID
        }
      });
    }
  }

  handleActivityEditClick = (text) => {
    
    const { dispatch } = this.props;

    if (dispatch) {
      dispatch({
        type: 'activity/isShowEidtModel',
        isShowEidtModel: true, 
        eidtData: text
      });
    }

    sessionStorage.setItem('activityID',text.activityID)
    sessionStorage.setItem('activityImg',text.activityImg)
  }

  // 判断编辑按钮是否可用
  isEditBtnShow = (activityTime) => {
    let nowDate = new Date().getTime();
    let activityDate = new Date(activityTime).getTime(); 
    let isEdit = nowDate - activityDate >= 0;
    return isEdit;
  }

  handleImgClik = (text) => {
    this.setState({
      previewImage: text,
      previewVisible: true,
    })
  }

  handleCancel = () => {
    this.setState({
      previewImage: '',
      previewVisible: false,
    })
  }

  render() {
    const data = this.props.datalist;
    const { searchList, previewVisible, previewImage } = this.state;

    const columns = [
      {
        title: '活动名称',
        dataIndex: 'clubActivity',
        key: 'clubActivity',
        width: '200px',
        fixed: 'left',
      },
      {
        title: '活动地点',
        dataIndex: 'activitySite',
        key: 'activitySite',
        width: '200px',
      },
      {
        title: '开始时间',
        dataIndex: 'activityTime',
        key: 'activityTime',
        width: '130px',
        defaultSortOrder: 'descend',
        sorter: (a, b) => new Date(a.activityTime).getTime() - new Date(b.activityTime).getTime(),
      },
      {
        title: '结束时间',
        key: 'activityStopTime',
        dataIndex: 'activityStopTime',
        width: '130px',
      },
      {
        title: '活动简介',
        key: 'activityIntroduce',
        dataIndex: 'activityIntroduce',
        width: '280px',
      },
      {
        title: '活动要求',
        key: 'activityRequire',
        dataIndex: 'activityRequire',
        width: '260px',
      },
      {
        title: '活动图片',
        key: 'activityImg',
        dataIndex: 'activityImg',
        width: '130px',
        render: text => 
          <img 
            src={text} 
            style={{width: '100px', cursor: 'pointer'}} 
            onClick={() => this.handleImgClik(text)}
          />,
      },
      {
        title: '操作',
        key: 'action',
        width: '180px',
        fixed: 'right',
        render: (text, record) => {
          return (
          <span>
            <Tooltip title={this.isEditBtnShow(text.activityTime) ? '历史活动不能编辑' : ''}>
              <a style={{ marginRight: 16, color:  this.isEditBtnShow(text.activityTime) ? '#c5c5c5' : '' }} 
                onClick={() => this.handleActivityEditClick(text)}>编辑</a>
            </Tooltip>
            <Tooltip title={!this.isEditBtnShow(text.activityTime) ? '正在进行中的活动不能查看明细' : ''}>
              <a style={{ marginRight: 16, color:  !this.isEditBtnShow(text.activityTime) ? '#c5c5c5' : '' }}
                onClick={() => this.handleCheckJionMemberClick(text)}>查看详细</a>
            </Tooltip>
            <Popconfirm title="确定删除?" onConfirm={() => this.handleActivityDelete(text)}>
              <a>删除</a>
            </Popconfirm>
          </span>
        )},
      },
    ];

    return (
      <div>
        <Table 
          columns={columns} 
          dataSource={searchList ? searchList : data} 
          scroll={{ x: 1300 }} 
          bordered 
        />
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}


export default connect(({ activity }) => ({
  allActivity: activity.allActivity,
  isShowEidtModel: activity.isShowEidtModel,
  eidtData: activity.eidtData,
  isShowCheckJionMemberModel: activity.isShowCheckJionMemberModel,
  saveCheckMemberJoinActivity: activity.saveCheckMemberJoinActivity
}))(ActivityTable);
