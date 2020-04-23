

import React, { useState } from 'react';
import { Table , Input, Popconfirm, Form,  message } from 'antd';
import { connect } from 'dva';

// 表格设置编辑框
const EditableCell = ({
  editing,
  dataIndex,
  title,
  // inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  // const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入${title}!`,
            },
          ]}
        >
          {/* {inputNode} */}
          <Input />
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};


const AdminTable = ( props ) => {

  const { allClubManageMessge, data } = props;
  const [form] = Form.useForm();
  const [searchList, setSearchList] = useState('');
  const [editingKey, setEditingKey] = useState('');


  const handleDelete = text => {
    const dataSource = [...allClubManageMessge];
    setSearchList(dataSource.filter(item => item.id !== text.id))

    message.success('删除成功');
  
    // 更新后端数据
    const { dispatch } = props;
    if (dispatch) {
      dispatch({
        type: 'admin/fetchRemoveClubManageMessge',
        payload: {
          systemID: text.systemID,
          option: 'delete'
        }
      });

      setTimeout(() => {
        setSearchList('')
        dispatch({
          type: 'admin/fetchAllClubManageMessge',
          payload: { option: 'check' }
        });
      }, 5000)
    }
  };

  // 以下是点击编辑之后调用的函数
  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.id)
  };

  const cancel = () => {
    setEditingKey('')
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newSearchList = [ ...allClubManageMessge ];
      const index = newSearchList.findIndex(item => key === item.id);

      if (index > -1) {
        const item = newSearchList[index];
        newSearchList.splice(index, 1, { ...item, ...row });
        setSearchList(newSearchList)
        setEditingKey('')

        message.success('保存成功');
        // 更新数据库数据
        const { dispatch } = props;
        if (dispatch) {
          await dispatch({
            type: 'admin/fetchUpdateClubManageMessge',
            payload: {
              row,
              option: 'update'
            }
          });
        }
        
      } else {
        newSearchList.push(row);
        setSearchList(newSearchList)
        setEditingKey('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };


  const columns = [
    {
      title: '序号',
      dataIndex: 'id',
      key: 'id',
      // editable: true,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: '社团名称',
      dataIndex: 'systemName',
      key: 'systemName',
      editable: true,
    },
    {
      title: '社团编码',
      dataIndex: 'systemID',
      key: 'systemID',
      editable: true,
    },
    {
      title: '社团密码',
      key: 'systemPW',
      dataIndex: 'systemPW',
      editable: true,
    },
    {
      title: '操作',
      key: 'action',
      width: '120px',
      render: (text, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              onClick={() => save(record.id)}
              style={{
                marginRight: 8,
              }}
            >
              保存
            </a>
            <Popconfirm title="确定取消?" onConfirm={cancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <a disabled={editingKey !== ''} onClick={() => edit(record)}  style={{
                marginRight: 8,
              }}>
            编辑
            </a>
            {allClubManageMessge.length >= 1 ? (
              <Popconfirm title="确定删除?" onConfirm={() => handleDelete(text)}>
                <a>删除</a>
              </Popconfirm>
            ) : null}
        </span>
        );
      },
    },
  ];


  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: record => ({
        record,
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false} >
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={searchList ? searchList : data}
        columns={mergedColumns}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  )
}

export default connect(({ admin }) => ({
  allClubManageMessge: admin.allClubManageMessge,
}))(AdminTable);