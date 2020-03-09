import React, {Component} from 'react';
import { Spin, Button } from 'antd/lib';
import { Link } from 'react-router-dom';
import './NotFound.css';

class LoadingIndicator extends Component {
    render() {
        return (
            <div className="page-not-found">
                <h1 className="title">
                    Loading data
                </h1>
                <div className="desc">
                    <Spin tip="Please wait"/>
                </div>
                {/* <Link to="/"><Button className="go-back-btn" type="primary" size="large">Too Long? Go Back!</Button></Link> */}
            </div>
        );
    }
}

export default LoadingIndicator;