import Layout, { Content } from 'antd/es/layout/layout'
import React from 'react'

import './App.css'
import Headers from './component/Headers/Headers'
import SideBar from './component/sidebar/SideBar'
import { Footer } from 'antd/es/layout/layout'

import Routers from './config/Route'

function App() {
  return (
    <Layout >
      <Headers />
      <Layout >
        <Layout>
        <SideBar />
          <Content>
            <div style={{ padding: 24, minHeight: 360 }}>
              <Routers />
            </div>
            {/* <Login /> */}
          </Content>
        </Layout>
          <Footer
            style={{
              textAlign: 'center',
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 1,
            
            }}
          >
            Copyright © 2022. All right reserved.
          </Footer>
      </Layout>

    </Layout>
  )
}

export default App