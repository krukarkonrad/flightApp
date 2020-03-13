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
                <div className="tourist-table">  
                    <Tabs defaultActiveKey="1">    
                        <TabPane tab="List with tourists" key="1">
                            <TouristList />
                        </TabPane>
                        <TabPane tab="Add Tourist" key="2">
                            <TouristAdd />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
        
    }
}

export default Tourists