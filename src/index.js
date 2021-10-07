import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./router";
import Theme from "./theme";


ReactDOM.render(
    <React.StrictMode>
        <Theme>
            <Router/>
        </Theme>
    </React.StrictMode>,
    document.getElementById('root')
);

