"use strict";
//import 'bootstrap/dist/css/bootstrap.css';
//import * as React from 'react';
//import * as ReactDOM from 'react-dom';
//import { BrowserRouter } from 'react-router-dom';
//import App from './App';
//import registerServiceWorker from './registerServiceWorker';
Object.defineProperty(exports, "__esModule", { value: true });
//const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
//const rootElement = document.getElementById('root');
//ReactDOM.render(
//    <BrowserRouter basename={baseUrl}>
//        <App history={undefined} />
//  </BrowserRouter>,
//  rootElement);
//registerServiceWorker();
require("./css/site.css");
require("../node_modules/bootstrap/dist/css/bootstrap.min.css");
//import 'bootstrap/dist/css/bootstrap.css';
var React = require("react");
var ReactDOM = require("react-dom");
var react_hot_loader_1 = require("react-hot-loader");
var react_router_dom_1 = require("react-router-dom");
var RoutesModule = require("./routes");
var routes = RoutesModule.routes;
function renderApp() {
    // This code starts up the React app when it runs in a browser. It sets up the routing
    // configuration and injects the app into a DOM element.
    var baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
    var rootElement = document.getElementById('root');
    ReactDOM.render(React.createElement(react_hot_loader_1.AppContainer, null,
        React.createElement(react_router_dom_1.BrowserRouter, { children: routes, basename: baseUrl })), rootElement);
}
renderApp();
// Allow Hot Module Replacement
//if (module.hot) {
//    module.hot.accept('./routes', () => {
//        routes = require<typeof RoutesModule>('./routes').routes;
//        renderApp();
//    });
//}
//# sourceMappingURL=index.js.map