import React, {useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import CourseContent from './CourseContent'
import Course from './Course'

export default function CourseRouter() {


  return (

    <div>
        <Switch>
          <Route exact path='/course' component={CourseContent}/>
          <Route path={'/course/detail/:id'} component={Course} />
        </Switch>

  
    </div>
  );  
}

