import React from 'react'
import './Headers.css'
import logo from './logo.png'
import { Button, Layout, Dropdown } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
const { Header } = Layout;




function Headers() {

  const username = localStorage.getItem('username');
  const email = localStorage.getItem('email');
  const handleClick = () => {
    localStorage.clear();
    window.location.href = '/login';

  }
  const items = [
    {
      key: '1',
      label: (

        <div><UserOutlined /> Profile</div>

      )
    },
    {
      key: '2',
      label: (
        <div  onClick={handleClick}><LogoutOutlined />Logout</div>
      )
    }
  ]
  return (

    <Layout>
      <Header className="header">
        <Link className='logo' to='/dashboard'>
          <img src={logo} alt="" />
          <p>FFlancer</p>
        </Link>
        <div className="dropdown-container">
          <div className="dropdown-text">
            <p className='header-text'>FFlancer Technology Joint Stock Company</p>
            <p>D.Administration</p>
          </div>
          <Dropdown
            
            trigger={['click']}
            menu={{
              items,
            }}
            placement="top"
          >

            <div className='dropdown-profile'>
              <div className='logo-profile'>{username.split('')[0]}</div>
              <div className='profile-header'>
                <p>{username.charAt(0).toUpperCase() + username.slice(1)}</p>
                <p>{email}</p>
              </div>

            </div>
          </Dropdown>
        </div>
      </Header>

    </Layout>

  )
}

export default Headers;
