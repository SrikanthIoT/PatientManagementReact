"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_1 = require("react-router");
var Layout_1 = require("./components/Layout");
var Home_1 = require("./components/Home");
var FetchPatient_1 = require("./components/FetchPatient");
var AddPatient_1 = require("./components/AddPatient");
require("./custom.css");
var react_1 = require("react");
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    App.prototype.render = function () {
        return (React.createElement(Layout_1.Layout, null,
            React.createElement(react_router_1.Route, { exact: true, path: '/', component: Home_1.Home }),
            React.createElement(react_router_1.Route, { path: '/fetchpatient', component: FetchPatient_1.FetchPatient }),
            React.createElement(react_router_1.Route, { path: '/addpatient', component: AddPatient_1.AddPatient }),
            React.createElement(react_router_1.Route, { path: '/patient/edit/:pId', component: AddPatient_1.AddPatient })));
    };
    return App;
}(react_1.Component));
exports.default = App;
//# sourceMappingURL=App.js.map