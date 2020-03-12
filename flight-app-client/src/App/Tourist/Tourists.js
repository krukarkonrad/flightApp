import React, { Component } from 'react';
import './Tourists.css'
import TouristList from './TouristList'
import TouristAdd from './TouristAdd'
import { Tabs } from 'antd/lib';

const { TabPane } = Tabs;

class Tourists extends Component{
    render(){
        return(
            <div className="tusirst-panel">
                {/* <h1>Tourists</h1> */}
                <div className="tourist-table">  
                    <Tabs defaultActiveKey="1">    
                        <TabPane tab="List with tourists" key="1">
                            <TouristList />
                        </TabPane>
                        <TabPane tab="Add Tourist" key="2">
                            <TouristAdd />
                        </TabPane>
                        <TabPane tab="Edit Tourist" key="3">
                            edit
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
        
    }
}

export default Tourists