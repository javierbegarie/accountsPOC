import * as React from "react";

export interface Card {
    (props: {name?:string,children:JSX.Element}): JSX.Element;
}

export const Card:Card = ({name,children}) => 
    <div className="col s12 m6">
        <div className="card">
            <div className="card-content">
                <span className="card-title">{name}</span>
                {children}
            </div>
        </div>
    </div>