import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Input, Button, Breadcrumb, Modal, Form } from 'antd'
import { CalendarOutlined, EditOutlined, DeleteOutlined, PlusOutlined, HomeOutlined } from '@ant-design/icons'
import API from '../../apiConfig/fetchApi';
import qs from 'qs'
import './User.css';
import CreateUser from '../ButtonCreate/Create';
import { Link } from 'react-router-dom';
const { Search } = Input;
const onSearch = (value) => console.log(value);


function User() {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (items, record, index) => (<>{index + 1}</>)
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      render: (text) => <p className='title-user'>{text}</p>,
    },
    {
      title: 'email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Type',
      dataIndex: 'role',
      dataIndex: 'role',
      render: (_, { role }) => (
        <Tag className='role-user'>
          {role.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'CreateAt',
      dataIndex: 'CreateAt',
      key: 'createdAt',
      render: (_, createdAt) => (
  
        <Space size="small">
  
          <p className='calendar'><CalendarOutlined /></p>
  
          <p>
          {createdAt.createdAt.slice(0, 10).split('-').reverse().join('/')}
          </p>
        </Space>
      ),
    },
    {
      title: '',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <a className='wrap-button-info-2'><EditOutlined 
            onClick={() =>{
              onEditUser(record)
            }}
          /></a>
          <a className='wrap-button-delete-2'><DeleteOutlined 
            onClick={() =>{
              onDeleted(record);
            }}
  
          /></a>
        </Space>
      ),
    },
  
  ]
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const getPage = (pagePagination) => ({
    currentPage: pagePagination.pagination?.current,
    pageSize: pagePagination.pagination?.pageSize,

  });
  const fetchApi = async () => {
    setLoading(true);
    const res = await API.requestGetAPI(`account?typeUser=1&${qs.stringify(getPage(tableParams))}`);
    setItems(res.data.list);
    setLoading(false);
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total: res.data.totalPage * 10,

      },
    });
  }
  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  };
  const deletedAPI = async (record) =>{
    setLoading(true);
    const resDeleted = await API.requestDeleteAPI(`account/delete?accountId=${record.id}`);

  }
  const onDeleted = (record) =>{
    Modal.confirm({
      title: "Are you sure, you want to delete this acount?",
      okText: "Yes",
      okType: "danger",
      onOk: () =>{
        deletedAPI(record);
        setLoading(false);
        setItems((pre) => pre.filter(userUser => userUser.id !== record.id));
      }
    })
  }
  const [isEditing, setIsEditing] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const onEditUser = (record) => {
    setIsEditing(true);
    setEditingAdmin({ ...record });
  }
  
  const onResetAdmin = () => {
    setIsEditing(false);
    setEditingAdmin(null);
    
  }
  const onFinish = (values) => {
    console.log(values);
  
    // await updateUser(values)
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  useEffect(() => {
    setLoading(true);
    fetchApi();
  }, [JSON.stringify(tableParams)]);


  return (
    <>
      <div className="header-tag">
        <div className="title-location">
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item><Link to='/dashboard'><HomeOutlined /> Home</Link></Breadcrumb.Item>
          <Breadcrumb.Item>User management</Breadcrumb.Item>
        </Breadcrumb>
        <h4 style={{fontSize: '1.5rem'}}>User management</h4>
        </div>
        <CreateUser />
      </div>
      <div className='content-button'>

        <Search
          className='input-search'
          placeholder="input search text"
          allowClear
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
        <hr/>
      
      <Table rowKey="id" columns={columns} dataSource={items} loading={loading} pagination={tableParams.pagination} onChange={handleTableChange} bordered/>
      <Modal
          title="Update User"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            onResetAdmin();
          }}
          onOk={() => {
            setItems((pre) => pre.map((user) => {
              if (user.id === editingAdmin.id) {
                return editingAdmin;
              } else {
                return user;
              }
            }));
            onResetAdmin();
          }}
        >
          <Form 
            
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              username: editingAdmin?.username,
              email: editingAdmin?.email,
            }}

            >
            <Form.Item
              name="username"
              label="Username"
              rules={[
                {
                  required: true,
                  message: 'Please input your nickname!',
                  whitespace: true,
                },
              ]}
            >
              <Input
               onChange={(e) => {
                  setEditingAdmin((pre) => {
                    return { ...pre, username: e.target.value }
                  })
                }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"

              rules={[{required: true}]}
            >
              <Input
                disabled
                onChange={(e) => {
                  setEditingAdmin((pre) => {
                    return { ...pre, email: e.target.value }
                  })
                }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  min: 6,
                }
              ]}
              hasFeedback
            >
              <Input.Password 
                onChange={(e) => {
                  setEditingAdmin((pre) => {
                    return { ...pre, username: e.target.value }
                  })
                }}
              />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={['password']}

              hasFeedback
              rules={[
                {
                  required: true,
                  message: 'Please confirm your password!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
          </Form>
          
          
        </Modal>
      </div>
    </>
  )
}

export default User