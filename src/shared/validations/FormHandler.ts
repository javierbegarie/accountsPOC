import { InputConstraints, InputValidatorBuilder } from "./input";
import { Observable } from "rxjs/internal/Observable";
import { fromEvent,  NEVER, Subject} from 'rxjs';
import { map, merge, filter } from 'rxjs/operators';
import { ChangeEvent } from "react";

export interface FormField{
    name:string;
    constraints: InputConstraints
}

interface FormInput extends FormField{
    element?:HTMLInputElement;
    validator?:(value:string)=>boolean;
}

interface FormFieldState{
    name:string;
    isFieldvalid:boolean;
    value: string;
    isFormValid:boolean;
}

export class FormHandler{
    private form:HTMLElement;
    private inputs: FormInput[];

    private onChangeSource = new Subject<FormFieldState>();
    private onSubmitSource = new Subject<any>();

    public onChange: Observable<FormFieldState> = this.onChangeSource.asObservable();
    public onSubmit: Observable<any> = this.onSubmitSource.asObservable();

    constructor(fields:FormField[]){
        this.inputs = fields;
    }

    setForm = (form:HTMLElement):void =>{
        if(this.form) return;
        this.form = form;
        fromEvent(form,'submit').pipe(
            map(e=>e.preventDefault()),
            filter(e=>this.isFormValid())
        ).subscribe(()=>this.onSubmitSource.next());
    }

    refFieldInput = (fieldName:string) => (element:HTMLInputElement):void=>{
        let input = this.inputs.find(i=>i.name===fieldName);
        if(input.element) return;
        input.element = element;
        input.validator = InputValidatorBuilder(input.constraints);
        this.emitOnChanges(element,input);
    }

    isFormValid = ():boolean=>
         this.inputs.every(inp=>inp.validator && inp.validator(inp.element.value));

    private emitOnChanges = (element:HTMLInputElement,input:FormInput):void =>{
        fromEvent(element,'keyup').pipe(
            map( (e:any):FormFieldState =>({
                name:input.name,
                isFieldvalid: input.validator(e.target.value),
                value: e.target.value,
                isFormValid: this.isFormValid()
            })) 
        ).subscribe(fState=>this.onChangeSource.next(fState));
    }
}