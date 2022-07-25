import * as React from 'react';
import { Route} from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchPatient } from "./components/FetchPatient";
import { AddPatient } from "./components/AddPatient";

import './custom.css'
import { Component } from 'react'; 

export default class App extends Component {
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/fetchpatient' component={FetchPatient} />
                <Route path='/addpatient' component={AddPatient} />
                <Route path='/patient/edit/:pId' component={AddPatient} />
            </Layout>
        );
    }
}
