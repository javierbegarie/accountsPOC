import React = require("react");
import { 
    AccountListLayoutType 
} from "Components/account/account.list.layout/AccountListLayoutType";
import { AccountListItem } from "Components/account/account.list.layout/AccountListItem";
import { AccountListCard } from "Components/account/account.list.layout/AccountListCard";
import { Account } from 'Model/Account';
import { AccountService } from "Services/account/AccountService";
import { Select } from "Components/shared/Select";
import { Card } from "Components/shared/Card";

export interface AccountListState{
    accounts: Account[];
    layoutType: AccountListLayoutType
}

export class AccountList extends React.Component<any,AccountListState>{

    private selectOptions = [
        {label:'Item View', value: AccountListLayoutType.ITEM},
        {label:'Card View', value: AccountListLayoutType.CARD},
    ];

    constructor(props:any){
        super(props);
        this.state = {
            accounts: [],
            layoutType: AccountListLayoutType.ITEM
        }
        this.getAccounts();
    }

    getAccounts(){
        let n = 0;
        AccountService.getAccounts().subscribe(accounts=>{
            this.setState({accounts});
        },err=>{
            console.log(err);
        })
    }

    handleSelect=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        switch(event.target.value){
            case AccountListLayoutType.ITEM: this.setState({layoutType:AccountListLayoutType.ITEM}); break;
            case AccountListLayoutType.CARD: this.setState({layoutType:AccountListLayoutType.CARD}); break;
        }
    }

    render(){
        return(
        <div>
            <div className="row firstCard">
                <Card name="Choose a layout">
                    <Select handleChange={this.handleSelect} selectName="Layout Select" options={this.selectOptions}></Select>
                </Card>
            </div>
            <div>
            {(() => {
                switch(this.state.layoutType){
                    case AccountListLayoutType.ITEM: 
                        return <AccountListItem accounts={this.state.accounts}></AccountListItem>
                    case AccountListLayoutType.CARD: 
                        return <AccountListCard accounts={this.state.accounts}></AccountListCard>
                    default: return <AccountListItem accounts={this.state.accounts}></AccountListItem>
                }
            })()}
            </div>
        </div>
        )
    }
}