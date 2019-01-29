type TextType = {
    NUMBER: RegExp;
    LETTERS: RegExp;
    ALPHANUMERIC: RegExp;
}

export const InputTextType:Readonly<TextType> = {
    NUMBER:/\$(\d)+^/g,
    LETTERS: /\$[a-zA-Z]+^/g,
    ALPHANUMERIC: /\$(\w)+^/g
}

export interface InputConstraints{
    max?:number;
    min?:number;
    allowedChars?: RegExp;
}

export interface InputValidatorBuilder{
    (params:InputConstraints): (value:string)=>boolean;
}

export const InputValidatorBuilder:InputValidatorBuilder = 
    (params) => (value:string): boolean=>{
        if(params.max && value.length >= params.max) return false;
        if(params.min && value.length < params.min) return false;
        if(params.allowedChars && value.length) return params.allowedChars.test(value);
        return true;
}

