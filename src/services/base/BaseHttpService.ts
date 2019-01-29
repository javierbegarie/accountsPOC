import { BASE_URL } from 'Shared/constants/environment';
import { Observable } from 'rxjs/internal/Observable';
import { Observer } from 'rxjs';

export interface HttpInterceptor{
    onResponse(res:Response):void;
    onFail(reason:Response):void;
}

export interface HttpParam{
    [key:string]: any;
}

export class BaseHttpService {

    private static interceptors:HttpInterceptor[]=[];

    private static defaultHeaders = {
        'Content-Type': 'application/json'
    }

    static addInterceptor(interceptor:HttpInterceptor):void{
        BaseHttpService.interceptors.push(interceptor);
    }

    static get(endpoint:string,params?:HttpParam):Observable<any>{
        let url = `${BASE_URL}/${endpoint}`;
        if(params){ url.concat( BaseHttpService.toUrlParams(params) );  }
        let req = BaseHttpService.request(url);
        BaseHttpService.publishToInterceptors(req);
        return req;
    }

    static post(endpoint:string,params:HttpParam=null,headers:Object={}):Observable<any>{
        let url = `${BASE_URL}/${endpoint}`;
        let options = { 
            method:'POST', 
            body: JSON.stringify(params),
            headers: this.toFetchHeaders(Object.assign(headers,BaseHttpService.defaultHeaders))
        };
        let req = BaseHttpService.request(url,options);
        BaseHttpService.publishToInterceptors(req);
        return req;
    }

    private static publishToInterceptors(req:Observable<any>):void{
        req.subscribe(
            response=> BaseHttpService.interceptors.forEach(int=>int.onResponse(response)) , 
            error=> BaseHttpService.interceptors.forEach(int=>int.onFail(error)) 
        );
    }

    private static request(url:string,options:RequestInit=null):Observable<any>{
        return Observable.create((observer:Observer<any>)=>{
            fetch(url,options)
            .then((res:Response)=>res.json())
            .then((res)=>{
                observer.next(res);
            })
        });
    }

    private static toFetchHeaders(headers:any):Headers{
        let fetchHeader = new Headers();
        Object.keys(headers).forEach(name=>{
            fetchHeader.append(name,headers[name]);
        });
        //console.log(fetchHeader);
        return fetchHeader;
    }

    private static toUrlParams(params:HttpParam):string{
        return '?'.concat(Object.keys(params).map((k,i,keys)=>`${k}=${params[k.toString()]}`).join('&'));
    }
}