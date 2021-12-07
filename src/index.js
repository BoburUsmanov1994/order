import React from 'react';
import ReactDOM from 'react-dom';
import Router from "./router";
import Theme from "./theme";
import Store from "./store";
import Auth from "./services/auth/Auth";



ReactDOM.render(
    <React.StrictMode>
        <Store>
            <Auth>
                <Theme>
                    <Router/>
                </Theme>
            </Auth>
        </Store>
    </React.StrictMode>,
    document.getElementById('root')
);

