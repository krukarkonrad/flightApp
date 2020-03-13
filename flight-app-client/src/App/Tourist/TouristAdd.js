import React, { Component } from 'react';
import { postTourist } from '../../Util/APIUtilsTourist'

import { 
    NAME_MIN_LENGTH, NAME_MAX_LENGTH,
    GENDERS
} from '../../Constants/index.js';

import { Form, Input, Button, notification, DatePicker, Cascader } from 'antd';
import FormItem from 'antd/lib/form/FormItem';

class TouristAdd extends Component{
    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            surname: {
                value: ''
            },
            gender: {
                value: ''
            },
            country: {
                value: ''
            },
            notes: {
                value: ''
            },
            birthDate:{
                value:''
            }
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleDatePickerChange(inputValue) {
        this.setState({
            birthDate : {
                value: inputValue
            }
        });
    }

    handleCascader(inputValue){
        this.setState({
            gender : {
                value: inputValue[0]
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        
        const addTouristRequest = {
            name: this.state.name.value,
            surname: this.state.surname.value,
            gender: this.state.gender.value,
            country: this.state.country.value,
            notes: this.state.notes.value,
            birthDate: this.state.birthDate.value
        };

        postTourist(addTouristRequest)
        .then(response => {
            notification.success({
                message: 'Fligth App',
                description: "New Tourist Added!",
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
            <div className="tourist-add-container">
            <h1 className="page-title">Add new tourist</h1>
            <div className="add-content">
                <Form className="add-tourist-form">
                    <FormItem
                        label="Name"
                        validateStatus={this.state.validateStatus}
                        help={this.state.name.errorMsg}>
                        <Input
                            size="large"
                            name="name"
                            autoComplete="off"
                            placeholder="First Name"
                            value={this.state.name.value}
                            onChange={(event) => this.handleInputChange(event, this.validateName)}>
                        </Input>
                    </FormItem>
                    <FormItem
                        label="Surname"
                        validateStatus={this.state.validateStatus}
                        help={this.state.surname.errorMsg}>
                        <Input
                            size="large"
                            name="surname"
                            autoComplete="off"
                            placeholder="Surname"
                            value={this.state.surname.value}
                            onChange={(event) => this.handleInputChange(event, this.validateName)}>
                        </Input>
                    </FormItem>
                    <FormItem
                        label="Gender"
                        validateStatus={this.state.validateStatus}>
                        <Cascader 
                            options={GENDERS}
                            onChange={(v, s) => this.handleCascader(v)}
                        />
                    </FormItem>
                    <FormItem
                        label="Country"
                        validateStatus={this.state.validateStatus}
                        help={this.state.country.errorMsg}>
                        <Input
                            size="large"
                            name="country"
                            autoComplete="off"
                            placeholder="Country"
                            value={this.state.country.value}
                            onChange={(event) => this.handleInputChange(event, this.validateName)}>
                        </Input>
                    </FormItem>
                    <FormItem
                        label="Birth Date"
                        validateStatus={this.state.validateStatus}>
                        <DatePicker 
                            onChange={(date, dateString) => this.handleDatePickerChange(dateString)}/> 
                    </FormItem>
                    <FormItem
                        label="Notes"
                        validateStatus={this.state.validateStatus}
                        help={this.state.notes.errorMsg}>
                        <Input
                            size="large"
                            name="notes"
                            autoComplete="off"
                            placeholder="Notes"
                            value={this.state.notes.value}
                            onChange={(event) => this.handleInputChange(event, this.validateName)}>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" 
                            htmlType="submit" 
                            size="large" 
                            className="addToursit-form-button"
                            onClick={this.handleSubmit}
                            >Add Tourist</Button>
                    </FormItem>
                </Form>
                </div>
            </div>
        )
    }

    validateName = (name) => {
        if(name.length < NAME_MIN_LENGTH) {
            return {
                validateStatus: 'error',
                errorMsg: `It is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
            }
        } else if (name.length > NAME_MAX_LENGTH) {
            return {
                validationStatus: 'error',
                errorMsg: `It is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
              };            
        }
    }
}
export default TouristAdd;