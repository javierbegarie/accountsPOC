import * as React from "react";
import { AccountList } from "./AccountList";

export interface IAccountPage {
    (props?: any): JSX.Element;
}

export const AccountPage:IAccountPage = (props) => 
    <div>
        <h1>Accounts</h1>
        <AccountList></AccountList>
    </div>;