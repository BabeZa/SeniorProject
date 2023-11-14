import React from 'react';
import Professor from './Professor';
import WeekSNote from '../WeekSNote/WeekSNote'
import WeekSNoteDetail from '../WeekSNote/WeekSNoteDetail'
import Create from '../CreateAndUploadDoc/Create'
import Upload from '../CreateAndUploadDoc/Upload'
import { Switch, Route } from 'react-router-dom';
import { WeekSNoteContextProvider } from "../../context/index";

export default function DocumentRouter() {


  return (
    <WeekSNoteContextProvider>
        <Switch>
          <Route exact path='/professor/' component={Professor} />
          <Route exact path='/professor/weeksnote/' component={WeekSNote} />
          <Route exact path='/professor/weeksnote/detail/:id' component={WeekSNoteDetail} />
          <Route exact path='/professor/createdoc/' component={Create} />
          <Route exact path='/professor/uploaddoc/' component={Upload} />
        </Switch>
    </WeekSNoteContextProvider>
  );  
}

