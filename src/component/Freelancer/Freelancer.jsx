import React, { useState, useEffect } from 'react';
import qs from 'qs';
import { Space, Table, Tag, Rate, Input, Breadcrumb, Button, Drawer, Modal } from 'antd';
import './Freelancer.css';
import API from '../../apiConfig/fetchApi';
import { EditOutlined, DeleteOutlined, HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import Profile from '../ProfileJob/Profile';
const { Search } = Input;
const onSearch = (value) => console.log(value);
function Freelancer() {
  const columns = [
    {
      title: '#',
      dataIndex: 'index',
      key: 'index',
      width: '2%',
      render: (items, record, index) => (<>{index + 1}</>)
    },
    {
      title: 'Information',
      dataIndex: 'name',
      key: 'name',
      width: '13%',
      render: (_, name) => (
        <Space size='small'>
          <img src={name.thumbnail} alt="" className='thumbnail-avatar' />
          <p>{name.name}</p>
        </Space>
      )

    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
      width: '5%',

    },
    {
      title: 'Phone Number',
      dataIndex: 'phone',
      key: 'phone',
      width: 150,

    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '10%',
      render: (_, address) => (
        <Space size='small'>
          <HomeOutlined />
          <p>{address.address}</p>
        </Space>
      ),
    },
    {
      title: 'Language',
      dataIndex: 'language',
      key: 'language',
      width: '40%',
      render: (_, { language }) => (

        <>
          {language.split(',').map((language) => {

            return (
              <Tag color='blue' key={language}>
                {language.toUpperCase()}
              </Tag>
            );
          })}
        </>

      ),
    },

    {
      title: 'Rate',
      key: 'rate',
      render: (rate) => (
        <Rate className='rate-freelancer' disabled allowHalf defaultValue={rate.rate} />
      ),
    },
    {
      title: '',
      key: 'action',
      width: '4%',

      render: (_, record) => (

        <Space size="middle">

          <a className='wrap-button-info-2' onClick={() => {
            showDrawer(record)
          }}><EditOutlined /></a>
          <a className='wrap-button-delete-2'><DeleteOutlined  onClick={() =>{
            onDeleted(record)
          }}/></a>
        </Space>
      ),
    },
  ];
  const [items, setItems] = useState([]);
  const [jobDone, setJobDone] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [profile, setProfile] = useState(null);

  const showDrawer = (record) => {
    setOpenDrawer(true);
    setProfile({ ...record })

  }

  const [tableParams, settableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    }
  });
  const getPage = (pagePagination) => ({
    currentPage: pagePagination.pagePagination?.current,
    pageSize: pagePagination.pagePagination?.pageSize,
  })

  const fetchApi = async () => {
    setLoading(true);

    const res = await API.requestGetAPI(`freelancer?${qs.stringify(getPage(tableParams))}`);
    setItems(res.data.list);
    setLoading(false);
    settableParams({
      pagination: {
        ...tableParams.pagination,
        total: res.data.totalPage * 10,

      },
    });
  }

  const handleTableChange = (pagination) => {
    settableParams({
      pagination,
    });
  };
  const onClose = () => {
    setOpenDrawer(false);
  }
  const onDeleted = (record) =>{
    Modal.confirm({
      title: "Are you sure, you want to delete this acount?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        deletedAPI(record);
        setLoading(false);
        setItems((pre) => pre.filter((userAdmin) => userAdmin.id !== record.id));
      },
    });
  }
  const deletedAPI = async (record) => {
    setLoading(true);
    const resDeleted = await API.requestDeleteAPI(`account/delete?accountId=${record.id}`);

  }
  useEffect(() => {

    fetchApi();
  }, [JSON.stringify(tableParams)]); //JSON.stringify(tableParams) reload phan trang 
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
            <Breadcrumb.Item>Freelancer management</Breadcrumb.Item>
          </Breadcrumb>
          <h4 style={{ fontSize: '1.5rem' }}>Freelancer management</h4>
        </div>
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
        <Table
          rowKey="id"
          columns={columns}
          dataSource={items}
          loading={loading}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
          bordered
        />
        <Drawer
          destroyOnClose
          title="Freelancer information"
          width={640}
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
          <Profile {...profile}/>

        </Drawer>
      </div>
    </>
  )
}
export default Freelancer;
  