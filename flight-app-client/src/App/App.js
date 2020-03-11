import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import Footer from "../Common/Footer"
import Tourists from "../App/Tourist/Tourists"
import Flight from "../App/Flight/Flights"
import { Tabs } from 'antd/lib';
import { Layout } from "antd/lib"
const { Content } = Layout;

const { TabPane } = Tabs;

function App() {
  return (
    <Layout className="app-container">
      {/* <AppHeader>

      </AppHeader> */}
      <div className="container">
        <Content className="app-content">
        <Tabs defaultActiveKey="1">    
          <TabPane tab="Tourist" key="1">
            <Tourists />
          </TabPane>
          <TabPane tab="Fligths" key="2">
            <Flight />
          </TabPane>
        </Tabs>
        </Content>
      </div>
      <Footer/>
    </Layout>
  );
}

export default App;
