import React, { Component } from 'react';
import './App.css';
import MetricList from "./components/metric/metric_list";
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
    constructor() {
        super();
    }

    render(){
        return (
            <div className="App container">
                <MetricList />
                <ToastContainer/>
            </div>
        );
    }
}

export default App;
