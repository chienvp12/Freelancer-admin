import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Input, Breadcrumb, Modal, Form } from 'antd';
import { CalendarOutlined, EditOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons';
import './Admin.css';
import API from '../../apiConfig/fetchApi';
import CreateUser from '../ButtonCreate/Create';
import { Link } from 'react-router-dom';
const { Search } = Input;
const onSearch = (value) => console.log(value);
const username = localStorage.getItem('username');

function Admin() {
  const [item, setItem] = useState([]);
  const [loading, setLoading] = useState(false);
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: 50,
      render: (items, record, index) => (<>{index + 1}</>)
    },
    {
      title: 'Fullname',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Username',
      dataIndex: 'email',
      key: 'email',
    },

    {
      title: 'Tags',
      key: 'role',
      dataIndex: 'role',
      render: (_, { role }) => (
        <Tag className='role-admin'>
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
      width: 50,
      render: (record) => {
        return (
          <Space size="middle">

            <button className='wrap-button-info-2'><EditOutlined onClick={() => {
              onEditUser(record)
            }} /></button>

            {username === record.username ? '' : <button className='wrap-button-delete-2'><DeleteOutlined onClick={() => {
              onDeleted(record)
            }} /></button>}
          </Space>
        )
      },
    },
  ];
  const onDeleted = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this acount?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deletedAPI(record);
        setLoading(false);
        setItem((pre) => pre.filter((userAdmin) => userAdmin.id !== record.id));
      },
    });
  }
  const deletedAPI = async (record) => {
    setLoading(true);
    const resDeleted = await API.requestDeleteAPI(`account/delete?accountId=${record.id}`);

  }
  const getUserAdmin = async () => {
    setLoading(true);
    const resListAcount = await API.requestGetAPI('account?typeUser=0&currentPage=1&pageSize=10');
    setItem(resListAcount.data.list);
    setLoading(false);

  }
  const [isEditing, setIsEditing] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const onEditUser = (record) => {
    setIsEditing(true);
    console.log({ ...record });
    setEditingAdmin({ ...record });
  }
  
  const onResetAdmin = () => {
    setIsEditing(false);
    setEditingAdmin(null);    
  }
  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  const updateUser = async (record)=>{
    const resUpdate = await API.requestPutAPI('account/update', record);
  } 
  useEffect(() => {
    getUserAdmin();
  }, [JSON.stringify(item)]);
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
          <h4 style={{ fontSize: '1.5rem' }}>User management</h4>
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
        <hr />
        <Table rowKey="id" columns={columns} dataSource={item} loading={loading} bordered />
        <Modal
          title="Update User"
          open={isEditing}
          okText="Save"
          onCancel={() => {
            onResetAdmin();
          }}
          onOk={() => {
            setItem((pre) => pre.map((user) => {
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
export default Admin