import React, { Component } from 'react';
import './Tourists.css'
import { getAllTourist, getTourist } from '../../Util/APIUtilsTourist.js'
import NotFound from '../../Common/NotFound.js';
import ServerError from '../../Common/ServerError.js';
import LoadingIndicator from '../../Common/LoadingIndicator.js'
import { Table, Collapse, Button } from 'antd/lib';
import { TOURSIT_COLUMNS, FLIGHT_COLUMNS } from '../../Constants/index.js'
import SearchFlight from './SearchFlight';
import RemoveFlight from './RemoveFlight';

const { Panel } = Collapse;

class TouristList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            tourists: [],
            isLoading: false
        }
        this.loadTourists = this.loadTourists.bind(this);
    }

    loadTourists(){
        this.setState({
            isLoading: true
        });

        getAllTourist()
        .then(response => {
            this.setState({
                tourists: response,
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
        this.loadTourists()
    }

    handleRefresh(touristId, localIndex)  {
        getTourist(touristId)
        .then(response => {
            let tempClone = this.state.tourists;
            tempClone[localIndex]=response;
            this.setState({
                tourists: tempClone
            })
        });
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

        var dataSource = this.state.tourists;

        return(
            <div className="tourist-table"> 
                <Table
                    alignment={'center'}
                    columns={TOURSIT_COLUMNS}
                    rowKey = "id"
                    expandedRowRender={(record, index) => {
                        var touristId = this.state.tourists[index].id;
                        return (
                            <Collapse accordion>
                                <Panel 
                                    header="Booked Flight" key="1" 
                                    extra={
                                        <Button
                                        onClick={event => this.handleRefresh(touristId, index)}
                                        >Refresh</Button>}
                                    >
                                <Table 
                                    bordered
                                    rowKey="id"
                                    columns={FLIGHT_COLUMNS}
                                    dataSource={dataSource[index].flights}
                                    /> 
                                </Panel>
                                <Panel header="Book new Flight" key="2">
                                <SearchFlight
                                    touristId={touristId}/>
                                </Panel>
                                <Panel header="Remove Flight" key="3">
                                <RemoveFlight
                                    touristId={touristId}
                                    touristsFlights={dataSource[index].flights}/>
                                </Panel>
                            </Collapse>
                            )
                    }}
                    dataSource={dataSource}
                />
            </div>
        );
        
    }
}

export default TouristList;