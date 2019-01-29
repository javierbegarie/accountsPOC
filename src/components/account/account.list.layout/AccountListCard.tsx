import * as React from "react";
import { Card } from "Components/shared/Card";
import { Account } from "Model/Account";

export interface IAccountListCard {
    (props: {accounts:Account[]}): JSX.Element;
}

export const AccountListCard:IAccountListCard = ({accounts}) => 
    <div className="row">
        {accounts.map((a,i)=>
            <Card key={i} name={a.name}>
                <p>{`${a.type} - ${a.balance} `}</p>
            </Card>
        )}
    </div>;