import React from 'react';
import './App.css';
import 'antd/dist/antd.css';

import Footer from "../Common/Footer"
import Turists from "../App/Turist/Turists"

import { Layout } from "antd/lib"
const { Content } = Layout;


function App() {
  return (
    <Layout className="app-container">
      {/* <AppHeader>

      </AppHeader> */}
      <div className="container">
        <Content className="app-content">
          <Turists/>
        </Content>
      </div>
      <Footer/>
    </Layout>
  );
}

export default App;
