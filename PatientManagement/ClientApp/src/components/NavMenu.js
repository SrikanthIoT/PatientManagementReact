"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_router_dom_1 = require("react-router-dom");
var NavMenu = /** @class */ (function (_super) {
    __extends(NavMenu, _super);
    function NavMenu() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavMenu.prototype.render = function () {
        return React.createElement("div", { className: 'main-nav' },
            React.createElement("div", { className: 'navbar navbar-inverse' },
                React.createElement("div", { className: 'navbar-header' },
                    React.createElement("button", { type: 'button', className: 'navbar-toggle', "data-toggle": 'collapse', "data-target": '.navbar-collapse' },
                        React.createElement("span", { className: 'sr-only' }, "Toggle navigation"),
                        React.createElement("span", { className: 'icon-bar' }),
                        React.createElement("span", { className: 'icon-bar' }),
                        React.createElement("span", { className: 'icon-bar' })),
                    React.createElement(react_router_dom_1.Link, { className: 'navbar-brand', to: '/' }, "Patient Management")),
                React.createElement("div", { className: 'clearfix' }),
                React.createElement("div", { className: 'navbar-collapse collapse' },
                    React.createElement("ul", { className: 'nav navbar-nav' },
                        React.createElement("li", null,
                            React.createElement(react_router_dom_1.NavLink, { to: '/', exact: true, activeClassName: 'active' },
                                React.createElement("span", { className: 'glyphicon glyphicon-home' }),
                                " Home")),
                        React.createElement("li", null,
                            React.createElement(react_router_dom_1.NavLink, { to: '/fetchpatient', activeClassName: 'active' },
                                React.createElement("span", { className: 'glyphicon glyphicon-th-list' }),
                                " Patient"))))));
    };
    return NavMenu;
}(React.Component));
exports.NavMenu = NavMenu;
//# sourceMappingURL=NavMenu.js.map