import * as React from "react";
import { Card } from "Components/shared/Card";
import { Account } from "Model/Account";

export interface IAccountListItem {
    (props: {accounts:Account[]}): JSX.Element;
}

export const AccountListItem:IAccountListItem = ({accounts}) => 
    <ul className="collection">
        {accounts.map((a,i)=>
           <li key={i} className="collection-item">{a.name} - {a.balance}</li>
        )}
    </ul>