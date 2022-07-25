"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./components/Home");
var FetchPatient_1 = require("./components/FetchPatient");
var AddPatient_1 = require("./components/AddPatient");
exports.routes = React.createElement(Layout_1.Layout, null,
    React.createElement(react_router_dom_1.Route, { exact: true, path: '/', component: Home_1.Home }),
    React.createElement(react_router_dom_1.Route, { path: '/fetchpatient', component: FetchPatient_1.FetchPatient }),
    React.createElement(react_router_dom_1.Route, { path: '/addpatient', component: AddPatient_1.AddPatient }),
    React.createElement(react_router_dom_1.Route, { path: '/patient/edit/:pId', component: AddPatient_1.AddPatient }));
//# sourceMappingURL=routes.js.map