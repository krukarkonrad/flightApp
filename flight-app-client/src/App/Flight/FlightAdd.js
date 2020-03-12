import React, { Component } from 'react';
import { postFlight } from '../../Util/APIUtilsFlights'

import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    GENDERS
} from '../../Constants/index.js';

import { Form, InputNumber, Button, notification, DatePicker, TimePicker } from 'antd';
import FormItem from 'antd/lib/form/FormItem';
import './FlightAdd.css'

class FlightAdd extends Component{
    constructor(props) {
        super(props);
        this.state = {
            fligthStart: {
                value: ''
            },
            fligthEnd: {
                value: ''
            },
            seats: {
                value: ''
            },
            takenSeatss: {
                value: ''
            },
            ticketPrice: {
                value: ''
            },
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTime = this.handleTime.bind(this);
        this.handlePriceChange = this.handlePriceChange.bind(this)
        this.handleDate = this.handleDate.bind(this)
    }

    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;        
        const inputValue = target.value;

        this.setState({
            [inputName] : {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }

    handleDate(name, dateString) {
        console.log(name)
        this.setState({
            [name] : {
                value: dateString
            }
        });
        console.log(name + " " + dateString);
    }

    handleTime(name, timeString) {
        this.setState({
            [name] : {
                value: this.state[name].value + " " + timeString 
            }
        });
    }

    handlePriceChange(name, value){
        console.log(name + " " +value)
        this.setState({
            [name]:{
                value: value
            }
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const addFlightRequest = {
            fligthStart: this.state.fligthStart.value,
            fligthEnd: this.state.fligthEnd.value,
            seats: this.state.seats.value,
            takenSeatss: this.state.takenSeatss.validateStatus,
            ticketPrice: this.state.ticketPrice.value
        };
        console.log(addFlightRequest);
        postFlight(addFlightRequest)
        .then(response => {
            notification.success({
                message: 'Fligth App',
                description: "New Flight Added!",
            });          
            
        }).catch(error => {
            notification.error({
                message: 'Fligth App',
                description: error.message || 'Sorry! Something went wrong. Please try again!'
            });
        });
    }

    render(){
        return(
            <div className="tflight-add-container">
            <h1 className="page-title">Add new flight</h1>
            <div className="add-content">
                <Form className="add-tflight-form">

                    <FormItem
                        label="Start Date and Time"
                        validateStatus={this.state.validateStatus}>
                        <DatePicker 
                            onChange={(date, dateString) => this.handleDate('fligthStart', dateString)}/> 
                        <TimePicker 
                            onChange={(time, timeString) => this.handleTime('fligthStart', timeString)}/>
                    </FormItem>

                    <FormItem
                        label="End Date and Time"
                        validateStatus={this.state.validateStatus}>
                        <DatePicker 
                            onChange={(date, dateString) => this.handleDate('fligthEnd', dateString)}/> 
                        <TimePicker 
                            onChange={(time, timeString) => this.handleTime('fligthEnd', timeString)}/>
                    </FormItem>


                    <FormItem
                        label="How many seats">
                        <InputNumber
                            onChange={(value) => this.handlePriceChange("seats", value)}
                        /> 
                    </FormItem>

                    <FormItem
                        label="Already taken?">
                        <InputNumber
                            defaultValue="0"
                            onChange={(value) => this.handlePriceChange("takenSeatss", value)}
                        /> 
                    </FormItem>

                    <FormItem
                        label="Put Price:">
                        <InputNumber
                            onChange={(value) => this.handlePriceChange("ticketPrice", value)}
                        /> 
                    </FormItem>

                    <FormItem>
                        <Button type="primary" 
                            htmlType="submit" 
                            size="large" 
                            className="addToursit-form-button"
                            onClick={this.handleSubmit}
                            >Add Flight</Button>
                    </FormItem>
                </Form>
                </div>
            </div>
        )
    }
}
export default FlightAdd;