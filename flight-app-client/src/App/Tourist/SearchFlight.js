import React, { Component } from 'react';
import { getCorrcetFlight, putRelationship } from '../../Util/APIUtilsTourist.js'
import NotFound from '../../Common/NotFound.js';
import ServerError from '../../Common/ServerError.js';
import LoadingIndicator from '../../Common/LoadingIndicator.js'
import { Form, Button, DatePicker, notification, Select } from 'antd/lib';
import FormItem from 'antd/lib/form/FormItem';

const { Option } = Select;

class SearchFlight extends Component{
    constructor(props) {
        super(props);
        this.state ={
            startDate: {
                value: ''
            },
            endDate: {
                value: ''
            },
            flights: [],
            touristId: {
                value: ''
            },
            flightId:{
                value: ''
            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.sendRelationship = this.sendRelationship.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        var addTouristRequest = this.state.startDate.value;
        if(this.state.endDate.value !== null){
           addTouristRequest = addTouristRequest + "/" + this.state.endDate.value;
        }
        
        getCorrcetFlight(addTouristRequest)
        .then(response => {
            this.setState({flights:response});
            notification.success({
                message: 'Fligth App',
                description: "Select and buy flight!",
            });     
            console.log(this.state.flights);     
            
        }).catch(error => {
            notification.error({
                message: 'Fligth App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    handleDatePickerChange(name, inputValue){
        console.log(name + " " + inputValue)
        this.setState({
            [name] : {
                value: inputValue
            }
        })
        console.log(name + " " + inputValue)
    }

    handleFlightPick(event){
        
        this.setState({
            flightId: {
                value: event
            }
        })
        
    }

    sendRelationship(event){
        console.log(this.state.flightId.value + " " + this.props.touristId);
        const rlRq = {
            touristId: this.props.touristId,
            flightId: this.state.flightId.value
        }
        putRelationship(rlRq, this.props.touristId, this.state.flightId.value);
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

    var dataSource = this.state.flights.map(
        d => 
            <Option key={d.id}>Stars {d.fligthStart}
                | Ends {d.fligthEnd}
                | TicketPrice {d.ticketPrice}
                | Seats {d.seats}
                | Taken {d.takenSeatss}
            </Option>);


        return(
            <div className="flight-table">
                <h1>Search for flight for this tourist!</h1>
                    <Form layout="inline">    
                        <FormItem label="Starting Date">
                            <DatePicker
                                name="startDate"
                                onChange={(date, dateString) => this.handleDatePickerChange("startDate", dateString)}/>
                        </FormItem>
                        <FormItem label="Ending Date">
                            <DatePicker 
                                name="endDate"
                                placeholder="Not Required"
                                onChange={(date, dateString) => this.handleDatePickerChange("endDate", dateString)}/>
                        </FormItem>
                        <FormItem>
                        <Button type="primary" 
                            htmlType="submit" 
                            size="small" 
                            className="addToursit-form-button"
                            onClick={this.handleSubmit}
                            >Search</Button>
                    </FormItem>
                    </Form>
                    <br/>
                    <Select 
                        style={{ width: 600}}
                        placeholder="Search by date above"
                        onChange={(event) => this.handleFlightPick(event)}
                    >
                        {dataSource}
                    </Select>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={this.sendRelationship}
                    >Buy</Button>
            </div>
        );
    }
}

export default SearchFlight;