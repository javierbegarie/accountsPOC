import { BaseHttpService } from "Services/base/BaseHttpService";
import { Subject, timer } from "rxjs";
import { takeWhile, switchMap,tap } from "rxjs/operators";
import { Account } from "Model/Account";

export namespace AccountService{

    export const getAccounts = ()=>{
        let stream = new Subject<Account[]>();
        let accounts = [new Account('','','',null)];

        timer(0, 5000).pipe(
                switchMap(_ =>{console.log('doble switch'); return BaseHttpService.get('accounts')}),
                tap(()=>console.log('GET ACC')),
                takeWhile(acc=>accounts.some( (a:Account)=>!a.balance))
            ).subscribe(acc=>{
            accounts = acc;
            stream.next(accounts);
        })
        return stream.asObservable();
    }
}