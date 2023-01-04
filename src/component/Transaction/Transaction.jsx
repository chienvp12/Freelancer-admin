import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { Table, Space, Tag, Input, Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons'
import API from '../../apiConfig/fetchApi';
import { Link } from 'react-router-dom';
const { Search } = Input;
const onSearch = (value) => console.log(value);



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
    dataIndex: 'Fullname',
    key: 'Fullname',
    render: (_, { account }) => (

      <Space size='small'>
        {account.username}

      </Space>

    ),
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: (amount) => <p>{amount}$</p>

  },

  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type }) => (
      <Tag color={type == 2 ? 'green' : type == 1 ? 'blue' : ''}>
        {type == 2 ? 'Withdraw' : type == 1 ? 'Recharge' : ''}
      </Tag>
    )

  },

  {
    title: 'CreateAt',
    // dataIndex: 'CreateAt',
    key: 'createdAt',
    render: (_, createdAt) => (

      <Space size="small">
        <p>

          {/* ((new Date(createdAt.createdAt).getDate() < 10) ? '0' : '') + new Date(createdAt.createdAt).getDate() + '/' + (((new Date(createdAt.createdAt).getMonth() + 1) < 10) ? '0' : '') + (new Date(createdAt.createdAt).getMonth() + 1) + '/' + new Date(createdAt.createdAt).getFullYear() */}
          {createdAt.createdAt.slice(0, 10).split('-').reverse().join('/')}

        </p>
      </Space>
    ),
  },
]
function Transaction() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      showSizeChanger: false,
    },
  });

  const getPage = (pagePagination) => ({
    currentPage: pagePagination.pagination?.current,
    pageSize: pagePagination.pagePagination?.pageSize,
  })
  const fetchApi = async () => {
    setLoading(true);

    const res = await API.requestGetAPI(`transaction?${qs.stringify(getPage(tableParams))}`);
    console.log();
    setItems(res.data.list);
    setLoading(false);
    setTableParams({
      pagination: {
        ...tableParams.pagination,
        total: res.data.totalPage * 10,
      }
    })
  }
  useEffect(() => {

    fetchApi();

  }, [JSON.stringify(tableParams)]);

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });
  }

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
            <Breadcrumb.Item>Transaction management</Breadcrumb.Item>
          </Breadcrumb>
          <h4 style={{ fontSize: '1.5rem' }}>Transaction management</h4>
        </div>

      </div>
      <Table rowKey="id" columns={columns} dataSource={items} loading={loading} pagination={tableParams.pagination} onChange={handleTableChange} bordered />
    </>
  )

}
export default Transaction