import React, { Component } from 'react';
import './Flights.css'
import FlightList from './FlightList'
import FlightAdd from './FlightAdd'
import { Tabs } from 'antd/lib';

const { TabPane } = Tabs;

class Flights extends Component{
    render(){
        return(
            <div className="flight-panel">
                <div className="flight-table">  
                    <Tabs defaultActiveKey="1">    
                        <TabPane tab="List with Tourist" key="1">
                            <FlightList />
                        </TabPane>
                        <TabPane tab="Add Flight" key="2">
                            <FlightAdd />
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
        
    }
}

export default Flights