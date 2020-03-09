import React, { Component } from 'react';
import './Turists.css'
import { getAllTurist , } from '../../Util/APIUtilsTurist'
import NotFound from '../../Common/NotFound';
import ServerError from '../../Common/ServerError';
import LoadingIndicator from '../../Common/LoadingIndicator'
import { Table } from 'antd/lib';

class TuristList extends Component{
    constructor(props) {
        super(props);
        this.state ={
            turists: [],
            isLoading: false
        }
        this.loadTurists = this.loadTurists.bind(this);
    }

    loadTurists(){
        this.setState({
            isLoading: true
        });

        getAllTurist()
        .then(response => {
            this.setState({
                turists: response,
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
        this.loadTurists()
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

        var dataSource = this.state.turists;
        
        const columns = [
            {title: 'Name', dataIndex: 'name', key: 'name', align: 'center'},
            {title: 'Surname', dataIndex: 'surname', key: 'surname', align: 'center'},
            {title: 'Country', dataIndex: 'country', key: 'country', align: 'center'},
            {title: 'Birth Date', dataIndex: 'birthDate', key: 'birthDate', align: 'center'},
            {title: 'Notes', dataIndex: 'notes', key: 'notes', align: 'center'}
        ]
        
        return(
            <div className="turist-table">  
                <Table
                    alignment={'center'}
                    columns={columns}
                    rowKey = "id"
                    expandedRowRender={record => <p style={{ margin: 0 }}>{record.fligths}</p>}
                    dataSource={dataSource}
                />
            </div>
        );
        
    }
}

export default TuristList;