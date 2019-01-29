import * as React from "react";
import {
  HashRouter as Router,
  Route,
  Redirect
} from "react-router-dom";
import { AccountPage } from "Components/account/AccountPage";

export const App = (props:any)=>{
  return (
    <Router>
      <div>
        <Route path="/" component={AccountPage} />
      </div>
    </Router>
  );
}
