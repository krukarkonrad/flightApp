import React, { Component } from 'react';
//import './Flights.css'
import { getCorrcetFlight } from '../../Util/APIUtilsTourist.js'
import NotFound from '../../Common/NotFound.js';
import ServerError from '../../Common/ServerError.js';
import LoadingIndicator from '../../Common/LoadingIndicator.js'
import { Form, Button, DatePicker, notification } from 'antd/lib';
import { TOURSIT_COLUMNS, FLIGHT_COLUMNS } from '../../Constants/index.js'
import FormItem from 'antd/lib/form/FormItem';

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
            flights: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
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
            // notification.success({
            //     message: 'Fligth App',
            //     description: "New Tourist Added!",
            // });     
            console.log(response);     
            
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
    }

    // componentDidMount(){
    //     this.loadFlights()
    // }

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
            </div>
        );
        
    }
}

export default SearchFlight;