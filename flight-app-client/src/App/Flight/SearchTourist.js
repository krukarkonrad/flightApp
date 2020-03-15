import React, { Component } from 'react';
import { putRelationship, getAllTourist } from '../../Util/APIUtilsTourist.js'
import NotFound from '../../Common/NotFound.js';
import ServerError from '../../Common/ServerError.js';
import LoadingIndicator from '../../Common/LoadingIndicator.js'
import { Button, Select } from 'antd/lib';

const { Option } = Select;

class SearchTourist extends Component{
    constructor(props) {
        super(props);
        this.state = {
            touristsFlights: [],
            touristId: {
                value: ''
            },
            flightId: {
                value: ''
            },
            tourists: []
        }
        this.sendAbandon = this.sendAbandon.bind(this);
        this.loadTourists = this.loadTourists.bind(this)
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

    handleFlightPick(event){
        this.setState({
            touristId: {
                value: event
            }
        })
    }

    componentDidMount(){
        this.loadTourists();
    }

    sendAbandon(event){
        const rlRq = {
            touristId: this.state.touristId.value,
            flightId: this.props.flightId
        }
        putRelationship(rlRq, this.state.touristId.value, this.props.flightId)
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

    var dataSource = this.state.tourists.map(
        d => 
            <Option key={d.id}> {d.name} | {d.surname} | {d.country} | {d.birthDate} | {d.notes}
            </Option>);

        return(
            <div className="flight-table">
                <Select 
                    style={{ width: 500}}
                    placeholder="Pick a tourist"
                    onChange={(event) => this.handleFlightPick(event)}
                >
                    {dataSource}
                </Select>
                <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.sendAbandon}
                >Add</Button>
            </div>
        );
        
    }
}

export default SearchTourist