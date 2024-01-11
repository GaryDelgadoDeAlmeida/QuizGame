/*
 * Welcome to your app's main JavaScript file!
 *
 * This file will be included onto the page via the importmap() Twig function,
 * which should already be in your base.html.twig.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import RoutesConfig from "./screens/RouteConfig"
import { BrowserRouter } from 'react-router-dom';
import '../styles/index.scss'

ReactDOM.render((
    <React.StrictMode>
        <BrowserRouter>
            <RoutesConfig />
        </BrowserRouter>
    </React.StrictMode>
), document.getElementById('root'));