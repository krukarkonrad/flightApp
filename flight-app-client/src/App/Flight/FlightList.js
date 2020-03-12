import React, { Component } from 'react';
import './Flights.css'
import { getAllFlight } from '../../Util/APIUtilsFlights.js'
import NotFound from '../../Common/NotFound.js';
import ServerError from '../../Common/ServerError.js';
import LoadingIndicator from '../../Common/LoadingIndicator.js'
import { Table } from 'antd/lib';
import { TOURSIT_COLUMNS, FLIGHT_COLUMNS } from '../../Constants/index.js'

class FlightList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            flights: [],
            isLoading: false
        }
        this.loadFlights = this.loadFlights.bind(this);
    }

    loadFlights(){
        this.setState({
            isLoading: true
        });

        getAllFlight()
        .then(response => {
            this.setState({
                flights: response,
                isLoading: false
            });
        }).catch(error => {
            if(error.status === 404){
                this.setState({
                    notFound: true,
                    isLoading: false
                });
            } else {
                this.setState({
                    serverError: true,
                    isLoading: false
                });
            }
        });
    }

    componentDidMount(){
        this.loadFlights()
    }

    render(){
        if(this.state.isLoading) {
            return <LoadingIndicator />;
        }

        if(this.state.notFound) {
            return <NotFound />;
        }

        if(this.state.serverError) {
            return <ServerError />;
        }

        var dataSource = this.state.flights;
              
        return(
            <div className="flight-table">  
                <Table
                    alignment={'center'}
                    columns={FLIGHT_COLUMNS}
                    rowKey = "id"
                    expandedRowRender={(record, index) => {
                        var touristData = dataSource[index].tourists;
                        return (
                                <Table 
                                    bordered
                                    rowKey="id"
                                    columns={TOURSIT_COLUMNS}
                                    dataSource={touristData}
                                />
                                
                                )
                    }}
                    dataSource={dataSource}
                />
            </div>
        );
        
    }
}

export default FlightList;