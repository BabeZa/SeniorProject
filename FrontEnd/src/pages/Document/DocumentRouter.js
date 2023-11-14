import React, { useState, useEffect } from "react";
import DocumentContent from "./DocumentContent";
import TQF3 from "./TQF3/TQF3";
import TQF3Viewer from "./TQF3/TQF3Viewer";
import ShortTQF2 from "./TQF2/ShortTQF2";
import TQF5 from "./TQF5/TQF5";
import SAR from "./SAR/SAR";
import { Switch, Route } from "react-router-dom";

export default function DocumentRouter() {
  return (
    <div className="document-container">
      <Switch>
        {/* <Route exact path='/document/' render={props => (<DocumentContent {...props} document={document} />)}/> */}
        <Route exact path="/document/" component={DocumentContent} />
        {/* <Route path={'/document/tqf3/edit/:id/:ID'} component={EditTQF} />
          <Route path={'/document/tqf3/detail/:id/:ID'} component={DetailTQF} /> */}
        <Route path={"/document/tqf3/detail/:id"} component={TQF3} />
        <Route path={"/document/tqf3/pdf/:id"} component={TQF3Viewer} />
        {/* <Route path={'/document/subject/new'} component={SubjectNew} /> */}
        <Route path={"/document/tqf2/detail/:id"} component={ShortTQF2} />
        <Route path={"/document/tqf5/detail/:id"} component={TQF5} />
        <Route path={"/document/SAR/detail/"} component={SAR} />
      </Switch>
    </div>
  );
}
