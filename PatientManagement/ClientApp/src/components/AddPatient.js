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
exports.State = exports.Country = exports.AddPatient = void 0;
var React = require("react");
var FetchPatient_1 = require("./FetchPatient");
var AddPatient = /** @class */ (function (_super) {
    __extends(AddPatient, _super);
    function AddPatient(props) {
        var _this = _super.call(this, props) || this;
        _this.state = { title: "", loading: true, countryList: [], originalStateList: [], stateList: [], patientData: new FetchPatient_1.PatientData };
        fetch('api/Patient/GetCountryList')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ countryList: data });
        });
        fetch('api/Patient/GetStateList')
            .then(function (response) { return response.json(); })
            .then(function (data) {
            _this.setState({ originalStateList: data });
        });
        var pId = _this.props.match.params["pId"];
        // This will set state for Edit patient
        if (pId > 0) {
            fetch('api/Patient/Details/' + pId)
                .then(function (response) { return response.json(); })
                .then(function (data) {
                var states = [];
                if (data) {
                    data.dateOfBirth = new Date(data.dateOfBirth);
                    states = _this
                        .state.originalStateList.filter(function (x) { return x.countryId == data.countryId; });
                }
                _this.setState({ title: "Edit", loading: false, patientData: data, stateList: states });
            });
        }
        // This will set state for Add patient
        else {
            _this.state = { title: "Create", loading: false, countryList: [], originalStateList: [], stateList: [], patientData: new FetchPatient_1.PatientData };
        }
        // This binding is necessary to make "this" work in the callback
        _this.handleSave = _this.handleSave.bind(_this);
        _this.handleCancel = _this.handleCancel.bind(_this);
        _this.renderCreateForm = _this.renderCreateForm.bind(_this);
        _this.handleCountryChange = _this.handleCountryChange.bind(_this);
        return _this;
    }
    AddPatient.prototype.render = function () {
        var contents = this.state.loading
            ? React.createElement("p", null,
                React.createElement("em", null, "Loading..."))
            : this.renderCreateForm(this.state.countryList, this.state.stateList);
        return React.createElement("div", null,
            React.createElement("h1", null, this.state.title),
            React.createElement("h3", null, "Patient"),
            React.createElement("hr", null),
            contents);
    };
    // This will handle the submit form event.
    AddPatient.prototype.handleSave = function (event) {
        var _this = this;
        event.preventDefault();
        var data = this.state.patientData;
        // PUT request for Edit patient.
        if (this.state.patientData.id) {
            fetch('api/Patient/UpsertPatient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.patientData)
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/fetchpatient");
            });
        }
        // POST request for Add patient.
        else {
            fetch('api/Patient/UpsertPatient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.patientData)
            }).then(function (response) { return response.json(); })
                .then(function (responseJson) {
                _this.props.history.push("/fetchpatient");
            });
        }
    };
    // This will handle Cancel button click event.
    AddPatient.prototype.handleCancel = function (e) {
        this.props.history.push("/fetchpatient");
    };
    AddPatient.prototype.handleCountryChange = function (e) {
        this.state.patientData.countryId = e.target.value ? Number(e.target.value) : null;
        var states = this.state.originalStateList.filter(function (x) { var _a; return ((_a = x.countryId) === null || _a === void 0 ? void 0 : _a.toString()) == e.target.value; });
        this.setState({ stateList: states });
    };
    // Returns the HTML Form to the render() method.
    AddPatient.prototype.renderCreateForm = function (countryList, stateList) {
        var _this = this;
        var _a, _b, _c;
        return (React.createElement("form", { onSubmit: this.handleSave },
            React.createElement("div", { className: "form-group row" },
                React.createElement("input", { type: "hidden", name: "patientId", value: this.state.patientData.id })),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "Name" }, "Name"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "name", defaultValue: this.state.patientData.name, required: true, onChange: function (e) { _this.state.patientData.name = e.target.value; } }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "dob" }, "DOB"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "date", name: "dob", defaultValue: this.state.patientData.dateOfBirth, required: true, placeholder: "DD/MM/YYYY", onChange: function (e) { _this.state.patientData.dateOfBirth = e.target.value; } }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Gender" }, "Gender"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "gender", defaultValue: (_a = this.state.patientData.genderId) === null || _a === void 0 ? void 0 : _a.toString(), required: true, onChange: function (e) { e.target.value ? _this.state.patientData.genderId = Number(e.target.value) : null; } },
                        React.createElement("option", { value: "" }, "-- Select Gender --"),
                        React.createElement("option", { value: "1" }, "Male"),
                        React.createElement("option", { value: "2" }, "Female")))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "addressln1" }, "Address Lin1-1"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "addressln1", defaultValue: this.state.patientData.addressLine1, required: true, onChange: function (e) { _this.state.patientData.addressLine1 = e.target.value; } }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: " control-label col-md-12", htmlFor: "addressln2" }, "Address Lin1-2"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "addressln2", defaultValue: this.state.patientData.addressLine2, onChange: function (e) { _this.state.patientData.addressLine2 = e.target.value; } }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "City" }, "City"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("input", { className: "form-control", type: "text", name: "City", defaultValue: this.state.patientData.city, required: true, onChange: function (e) { _this.state.patientData.city = e.target.value; } }))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "Country" }, "Country"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "Country", defaultValue: (_b = this.state.patientData.countryId) === null || _b === void 0 ? void 0 : _b.toString(), required: true, onChange: this.handleCountryChange },
                        React.createElement("option", { value: "" }, "-- Select Country --"),
                        countryList.map(function (cntry) {
                            return React.createElement("option", { key: cntry.id, value: cntry.id }, cntry.description);
                        })))),
            React.createElement("div", { className: "form-group row" },
                React.createElement("label", { className: "control-label col-md-12", htmlFor: "State" }, "State"),
                React.createElement("div", { className: "col-md-4" },
                    React.createElement("select", { className: "form-control", "data-val": "true", name: "State", defaultValue: (_c = this.state.patientData.stateId) === null || _c === void 0 ? void 0 : _c.toString(), required: true, onChange: function (e) { e.target.value ? _this.state.patientData.stateId = Number(e.target.value) : null; } },
                        React.createElement("option", { value: "" }, "-- Select State --"),
                        this.state.stateList.map(function (state) {
                            return React.createElement("option", { key: state.id, value: state.id }, state.description);
                        })))),
            React.createElement("div", { className: "form-group" },
                React.createElement("button", { type: "submit", className: "btn btn-default" }, "Save"),
                React.createElement("button", { className: "btn", onClick: this.handleCancel }, "Cancel"))));
    };
    return AddPatient;
}(React.Component));
exports.AddPatient = AddPatient;
var Country = /** @class */ (function () {
    function Country() {
        this.id = 0;
        this.name = "";
        this.description = "";
    }
    return Country;
}());
exports.Country = Country;
var State = /** @class */ (function () {
    function State() {
        this.id = 0;
        this.name = "";
        this.description = "";
    }
    return State;
}());
exports.State = State;
//# sourceMappingURL=AddPatient.js.map