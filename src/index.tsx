import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "Components/app/app";
import { AutoInit } from 'materialize-css'



ReactDOM.render(
    <App></App>,
    document.getElementById("root")
);

AutoInit();
