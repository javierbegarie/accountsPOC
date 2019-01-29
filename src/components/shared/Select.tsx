import * as React from "react";

export interface Select {
    (props: {selectName:string,options:Option[],handleChange:(event:React.ChangeEvent<HTMLSelectElement>)=>void}): JSX.Element;
}

interface Option {
    label:string;
    value:string;
}

export const Select:Select = ({selectName,options,handleChange}) => 
    <div className="input-field col s12">
        <select onChange={handleChange}>
            <option disabled defaultValue="">Choose an option</option>
            {options.map((o,i)=>
                <option key={i} value={o.value}>{o.label}</option>
            )}
        </select>
        <label>{selectName}</label>
    </div>

