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
var FetchPatient = /** @class */ (function (_super) {
    __extends(FetchPatient, _super);
    function FetchPatient() {
        var _this = _super.call(this) || this;
        _this.state = { patientList: [], loading: true };
        fetch('api/Patient/GetPatients')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ patientList: data, loading: false });
        });
        // This binding is necessary to make "this" work in the callback
        _this.handleDelete = _this.handleDelete.bind(_this);
        _this.handleEdit = _this.handleEdit.bind(_this);
        return _this;
    }
    FetchPatient.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderPatientTable(this.state.patientList);
        return React.createElement("div", null,
            React.createElement("h1", null, "Patient Data"),
            React.createElement("p", null, "This component demonstrates fetching Patient data from the server."),
            React.createElement("p", null,
                React.createElement(react_router_dom_1.Link, { to: "/addpatient" }, "Create New")),
            contents);
    };
    // Handle Delete request for an patient
    FetchPatient.prototype.handleDelete = function (id) {
        var _this = this;
        if (!confirm("Do you want to delete patient with Id: " + id))
            return;
        else {
            fetch('api/Patient/Delete/' + id, {
                method: 'delete'
            }).then(function (data) {
                _this.setState({
                    patientList: _this.state.patientList.filter(function (rec) {
                        return (rec.id != id);
                    })
                });
            });
        }
    };
    FetchPatient.prototype.handleEdit = function (id) {
        this.props.history.push("/patient/edit/" + id);
    };
    // Returns the HTML table to the render() method.
    FetchPatient.prototype.renderPatientTable = function (patientList) {
        var _this = this;
        return React.createElement("table", { className: 'table' },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null),
                    React.createElement("th", null, "Patient Id"),
                    React.createElement("th", null, "Name"),
                    React.createElement("th", null, "Gender"),
                    React.createElement("th", null, "State"),
                    React.createElement("th", null, "Country"),
                    React.createElement("th", null, "City"),
                    React.createElement("th", null, "Address"))),
            React.createElement("tbody", null, patientList.map(function (patient) {
                return React.createElement("tr", { key: patient.id },
                    React.createElement("td", null),
                    React.createElement("td", null, patient.id),
                    React.createElement("td", null, patient.name),
                    React.createElement("td", null, patient.genderName),
                    React.createElement("td", null, patient.stateName),
                    React.createElement("td", null, patient.countryName),
                    React.createElement("td", null, patient.city),
                    React.createElement("td", null, patient.addressLine1),
                    React.createElement("td", null,
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleEdit(patient.id); } }, "Edit"),
                        "  |",
                        React.createElement("a", { className: "action", onClick: function (id) { return _this.handleDelete(patient.id); } }, "Delete")));
            })));
    };
    return FetchPatient;
}(React.Component));
exports.FetchPatient = FetchPatient;
var PatientData = /** @class */ (function () {
    function PatientData() {
        this.name = "";
        this.addressLine1 = "";
        this.addressLine2 = "";
        this.city = "";
        this.zip = "";
        this.countryName = "";
        this.stateName = "";
        this.genderName = "";
    }
    return PatientData;
}());
exports.PatientData = PatientData;
//# sourceMappingURL=FetchPatient.js.map