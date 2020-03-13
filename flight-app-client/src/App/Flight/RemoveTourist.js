import React, { Component } from 'react';
import { deleteRelationship } from '../../Util/APIUtilsTourist.js'
import NotFound from '../../Common/NotFound.js';
import ServerError from '../../Common/ServerError.js';
import LoadingIndicator from '../../Common/LoadingIndicator.js'
import { Button, Select } from 'antd/lib';

const { Option } = Select;

class RemoveTourist extends Component{
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
            touristId: {
                value: event
            }
        })
    }

    sendAbandon(event){
        const rlRq = {
            touristId: this.state.touristId.value,
            flightId: this.props.flightId
        }
        deleteRelationship(rlRq, this.state.touristId.value, this.props.flightId);
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
            <Option key={d.id}> {d.name} | {d.surname} | {d.country} | {d.birthDate}
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

export default RemoveTourist