import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Temp1 from './temp1';
import Temp2 from './temp2';
import Admin from './Admin';

export default function index() {
    return (
        <>
            <Switch>
              <Route exact path='/admin' component={Admin}  />
              <Route path={'/admin/temp1'} component={Temp1} />
              <Route path={'/admin/temp2'} component={Temp2} />
            </Switch>
    
        </>
)}