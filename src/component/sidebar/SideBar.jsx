import React, { useState } from 'react'
import { Layout, Menu} from 'antd'
import { DashboardOutlined, UserOutlined, TeamOutlined, DesktopOutlined, GlobalOutlined, BarChartOutlined, SyncOutlined, MenuOutlined } from '@ant-design/icons';
import './SideBar.css'
import {useLocation, useNavigate } from 'react-router-dom';
const { Sider } = Layout;
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    }
}
const items = [
    getItem('DashBoard', '/dashboard', <DashboardOutlined />),
    getItem('SYSTEM', 'g1', null, [getItem('Admin', '/admin', <UserOutlined />)], 'group'),
    getItem('MANAGEMENT', 'g2', null, [
        getItem('User', '/user', <TeamOutlined />),
        getItem('Freelancer', '/freelancer', <GlobalOutlined />),
        getItem('Job', '/job', <DesktopOutlined />),
        getItem('Transaction', '/transaction', <SyncOutlined />)
    ], 'group'),
    getItem('STATISTICAL / REPORT', 'g3', null, [getItem('Statistical report', '/Statistical', <BarChartOutlined />)], 'group'),
];

function SideBar() {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <Sider
            
            trigger = {null}
            collapsible
            collapsed={collapsed}
            onCollapse={() => setCollapsed(!collapsed)}
        >
      <div className="logo1" />

            <Menu
                onClick={({ key }) => {
                    navigate(key);
                }}
                items={items}
                selectedKeys={[location.pathname]}
            />
            {React.createElement(collapsed ? MenuOutlined : MenuOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Sider>


    )
}

export default SideBar