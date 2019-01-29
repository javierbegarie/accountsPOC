import { BaseHttpService } from "Services/base/BaseHttpService";

export namespace AccountService{
    export const getAccounts = ()=>{
        return BaseHttpService.get('accounts');
    }
}