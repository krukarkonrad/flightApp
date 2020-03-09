import React, { Component } from 'react';
import './Turists.css'
import TuristList from './TuristList'
import TuristAdd from './TuristAdd'
import { Tabs } from 'antd/lib';

const { TabPane } = Tabs;

class Turists extends Component{
    render(){
        return(
            <div className="tusirst-panel">
                <h1>Turists</h1>
                <div className="turist-table">  
                    <Tabs defaultActiveKey="1">    
                        <TabPane tab="List with flights" key="1">
                            <TuristList />
                        </TabPane>
                        <TabPane tab="Add Turist" key="2">
                            <TuristAdd />
                        </TabPane>
                        <TabPane tab="Edit Turist" key="3">
                            edit
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
        
    }
}

export default Turists