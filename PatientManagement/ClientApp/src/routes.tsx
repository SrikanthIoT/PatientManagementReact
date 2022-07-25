import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchPatient } from "./components/FetchPatient";
import { AddPatient } from "./components/AddPatient";

export const routes = <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/fetchpatient' component={FetchPatient} />
    <Route path='/addpatient' component={AddPatient} />
    <Route path='/patient/edit/:pId' component={AddPatient} />
</Layout>;