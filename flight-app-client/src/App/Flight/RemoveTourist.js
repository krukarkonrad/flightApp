import React, { Component } from 'react';
import { deleteRelationship } from '../../Util/APIUtilsTourist.js'
import NotFound from '../../Common/NotFound.js';
import ServerError from '../../Common/ServerError.js';
import LoadingIndicator from '../../Common/LoadingIndicator.js'
import { Form, Button, DatePicker, notification, Select } from 'antd/lib';

const { Option } = Select;

class RemoveFlight extends Component{
    constructor(props) {
        super(props);
        this.state = {
            touristsFlights: [],
            touristId: {
                value: ''
            },
            flightId: {
                value: ''
            }
        }
        this.sendAbandon = this.sendAbandon.bind(this);
    }

    handleFlightPick(event){
        this.setState({
            flightId: {
                value: event
            }
        })
    }

    sendAbandon(event){
        console.log(this.state.flightId.value + " " + this.props.touristId);
        const rlRq = {
            touristId: this.props.touristId,
            flightId: this.state.flightId.value
        }
        deleteRelationship(rlRq, this.props.touristId, this.state.flightId.value);
        alert("REFRESH PAGE!");
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

    var dataSource = this.props.touristsFlights.map(
        d => 
            <Option key={d.id}>Stars {d.fligthStart}
                | Ends {d.fligthEnd}
                | TicketPrice {d.ticketPrice}
                | Seats {d.seats}
                | Taken {d.takenSeatss}
            </Option>);


        return(
            <div className="flight-table">
                <Select 
                    style={{ width: 500}}
                    placeholder="Pick a fliht"
                    onChange={(event) => this.handleFlightPick(event)}
                >
                    {dataSource}
                </Select>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.sendAbandon}
                >Abandon</Button>
            </div>
        );
        
    }
}

export default RemoveFlight