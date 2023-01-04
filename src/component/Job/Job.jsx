import React, { useEffect, useState } from 'react';
import { Table, Space, Tag, Breadcrumb, Drawer, Button, Form, Rate, Empty } from 'antd';
import { EditOutlined, HomeOutlined } from '@ant-design/icons'
import API from '../../apiConfig/fetchApi';
import qs from 'qs';
import './Job.css';
import { Link } from 'react-router-dom';
import Profile from '../ProfileJob/Profile';
import Jobdone from '../Jobdone/Jobdone';

function Job() {
    const columns = [
        {
            title: '#',
            dataIndex: 'index',
            key: 'index',
            width: 50,
            render: (items, record, index) => (<>{index + 1}</>)
        },
        {
            title: 'Subject',
            dataIndex: 'subject',
            key: 'subject',
            width: 500
        },
        {
            title: 'Renter',
            dataIndex: 'account',
            key: 'account',
            render: (_, { account }) => (

                <Space size='small'>
                    {account.username}

                </Space>

            ),
        },
        {
            title: 'Freelancer',
            dataIndex: 'freelancer',
            key: 'freelancer',
            render: (_, { freelancer }) => (

                <Space size='small'>
                    {freelancer.name}

                </Space>

            ),
        },
        {
            title: 'Salary',
            dataIndex: 'salary',
            key: 'salary',
            render: (salary) => <p>{salary}$</p>

        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (status) => {
                return <Tag color={status === 2 ? 'blue' : status === 0 ? 'red' : status === 1 ? 'yellow' : status === 4 ? 'green' : ''}>
                    {status === 2 ? 'Doing' : status === 0 ? 'Close' : status === 1 ? 'Pending' : status === 4 ? 'Done' : status === 3 ? 'Review' : ''}
                </Tag>
            }

        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a className='wrap-button-info-2'><EditOutlined onClick={() => {
                        showDrawer(record)
                    }} /></a>
                </Space>
            ),
        },
    ]
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [profile, setProfile] = useState(null);
    const [childrenDrawer, setChildrenDrawer] = useState(false);
    const [children, setChildren] = useState(false);
    const [freelancer, setFreelancer] = useState(null);
    
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            showSizeChanger: false,
        },
    });
    const getPage = (pagePagination) => ({
        currentPage: pagePagination.pagination?.current,
        pageSize: pagePagination.pagination?.pageSize,
    });
    const fetchApi = async () => {
        setLoading(true);
        const res = await API.requestGetAPI(`job?${qs.stringify(getPage(tableParams))}`);
        setLoading(false);
        setItems(res.data.list);
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
    const onClose = () => {
        setOpenDrawer(false);
    };
    const showDrawer = (record) => {
        setOpenDrawer(true);
        setProfile({ ...record })
        setFreelancer(record.freelancer)
       
    }
    const showChildrenDrawer = () => {
        setChildrenDrawer(true);
    };
    const showChildren = () =>{
        setChildren(true);
    }
    const onChildrenClose = () =>{
        setChildren(false);
    }
    const onChildrenDrawerClose = () => {
        setChildrenDrawer(false);
    };
    useEffect(() => {
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
                        <Breadcrumb.Item>Job management</Breadcrumb.Item>
                    </Breadcrumb>
                    <h4 style={{ fontSize: '1.5rem' }}>Job management</h4>
                </div>

            </div>
            <Table rowKey="id" columns={columns} dataSource={items} loading={loading} pagination={tableParams.pagination} onChange={handleTableChange} bordered />
            <Drawer
                destroyOnClose
                title="Job information"
                width={750}
                placement="right"
                closable={false}
                onClose={onClose}
                open={openDrawer}
                footer={
                    <Space>
                        <Button onClick={onClose}>Cancel</Button>
                    </Space>
                }
            >
                <Form>
                    <Form.Item >
                        <div className='content-profile'>
                            <div className="fullname">
                                <span className='label-content'>Subject: </span>
                                <span>{profile?.subject}</span>
                            </div>
                            <div className="gender">
                                <span className='label-content'>Salary: </span>
                                <span> {profile?.salary}$</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item >
                        <div className='content-profile'>
                            <div className="fullname">
                                <span className='label-content'>Renter: </span>
                                <span style={{color:'blue', cursor: 'pointer' }} onClick={showChildren}>{profile?.account.username}</span>
                                <Drawer
                                    title='Account infomation'
                                    width={700}
                                    closable={false}
                                    onClose={onChildrenClose}
                                    open={children}
                                    footer={
                                        <Button onClick={onClose}>Cancel</Button>
                                    }
                                >
                                <Jobdone {...freelancer}/>
                                </Drawer>

                            </div>
                            <div className="gender">
                                <span className='label-content'>Freelancer: </span>
                                <span onClick={showChildrenDrawer} style={{ color:'blue', cursor: 'pointer' }}> {profile?.freelancer.name}</span>
                                <Drawer
                                    title='Freelancer information'
                                    width={700}
                                    closable={false}
                                    onClose={onChildrenDrawerClose}
                                    open={childrenDrawer}
                                    footer={
                                        <Button onClick={onClose}>Cancel</Button>
                                    }
                                >
                                    <Profile {...freelancer}/>
                                </Drawer>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item >
                        <div className='content-profile'>
                            <div className="fullname">
                                <span className='label-content'>Description: </span>
                                <div dangerouslySetInnerHTML={{ __html: profile?.description }}></div>

                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item >
                        <div className='content-profile'>
                            <div className="fullname">
                                <span className='label-content'>Status: </span>
                                {
                                    <Tag color={profile?.status === 2 ? 'blue' : profile?.status === 0 ? 'red' : profile?.status === 1 ? 'yellow' : profile?.status === 4 ? 'green' : ''}>
                                        {profile?.status === 2 ? 'Doing' : profile?.status === 0 ? 'Close' : profile?.status === 1 ? 'Pending' : profile?.status === 4 ? 'Done' : profile?.status === 3 ? 'Review' : ''}
                                    </Tag>
                                }
                            </div>
                            <div className="gender">
                                <span className='label-content'>Result: </span>
                                <span> {profile?.result}</span>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item >
                        <div className='content-profile'>
                            <div className="fullname">
                                <span className='label-content'>Comment: </span>
                                <Rate allowHalf defaultValue={1.5}></Rate>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item >
                        <div className='chat'>
                            <div className="fullname">
                                <span className='label-content'>Chat: </span>

                                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
                            </div>
                        </div>
                    </Form.Item>
                </Form>

            </Drawer>
        </>
    )
}

export default Job