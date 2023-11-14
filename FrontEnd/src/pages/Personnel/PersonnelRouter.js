import React, {useState, useEffect } from 'react';
import PersonnelContent from './PersonnelContent';
import { Switch, Route } from 'react-router-dom';
import PersonnelProfile from './PersonnelProfile'


export default function PersonnelRouter() {


  return (

    <div className="professors-container">
        <Switch>
          <Route exact path='/personnel' component={PersonnelContent}/>
          <Route path={'/personnel/detail/:id'} component={PersonnelProfile} />
        </Switch>

  
    </div>
  );  
}

