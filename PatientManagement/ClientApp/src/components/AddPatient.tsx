import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { PatientData } from './FetchPatient';

interface AddPatientDataState {
    title: string;
    loading: boolean;
    countryList: Array<Country>;
    originalStateList: Array<State>;
    stateList: Array<State>;
    patientData: PatientData;
}

export class AddPatient extends React.Component<RouteComponentProps<{}>, AddPatientDataState> {
    constructor(props) {
        super(props);
        this.state = { title: "", loading: true, countryList: [],originalStateList:[],stateList:[], patientData: new PatientData };

        fetch('api/Patient/GetCountryList')
            .then(response => response.json() as Promise<Array<Country>>)
            .then(data => {
                this.setState({ countryList: data });
            });

        fetch('api/Patient/GetStateList')
            .then(response => response.json() as Promise<Array<State>>)
            .then(data => {
                this.setState({ originalStateList: data });
            });

        var pId = this.props.match.params["pId"];

        // This will set state for Edit patient
        if (pId > 0) {
            fetch('api/Patient/Details/' + pId)
                .then(response => response.json() as Promise<PatientData>)
                .then(data => {
                    var states = [];
                    if (data) {
                        data.dateOfBirth = new Date(data.dateOfBirth);
                        states = this
                            .state.originalStateList.filter(x => x.countryId == data.countryId);
                    }
                    this.setState({ title: "Edit", loading: false, patientData: data, stateList: states });
                });
        }

        // This will set state for Add patient
        else {
            this.state = { title: "Create", loading: false, countryList: [],originalStateList:[],stateList:[], patientData: new PatientData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.renderCreateForm = this.renderCreateForm.bind(this);
        this.handleCountryChange = this.handleCountryChange.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.countryList, this.state.stateList);

        return <div>
            <h1>{this.state.title}</h1>
            <h3>Patient</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = this.state.patientData;

        // PUT request for Edit patient.
        if (this.state.patientData.id) {
            fetch('api/Patient/UpsertPatient', {
                method: 'POST',                
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.patientData)

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchpatient");
                })
        }

        // POST request for Add patient.
        else {
            fetch('api/Patient/UpsertPatient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.patientData)

            }).then((response) => response.json())
                .then((responseJson) => {                    
                    this.props.history.push("/fetchpatient");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {        
        this.props.history.push("/fetchpatient");
    }

    private handleCountryChange(e) {
        this.state.patientData.countryId = e.target.value ? Number(e.target.value) : null
        var states = this.state.originalStateList.filter(x => x.countryId?.toString() == e.target.value);
        this.setState({ stateList: states });
    }

    // Returns the HTML Form to the render() method.
    private renderCreateForm(countryList: Array<Country>, stateList: Array<State>) {
        return (
            <form onSubmit={this.handleSave} >
                <div className="form-group row" >
                    <input type="hidden" name="patientId" value={this.state.patientData.id} />
                </div>
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="Name">Name</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="name" defaultValue={this.state.patientData.name} required onChange={e => { this.state.patientData.name = e.target.value }} />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="dob">DOB</label>
                    <div className="col-md-4">
                        <input className="form-control" type="date" name="dob" defaultValue={this.state.patientData.dateOfBirth} required placeholder="DD/MM/YYYY" onChange={e => { this.state.patientData.dateOfBirth = e.target.value }} />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Gender">Gender</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="gender" defaultValue={this.state.patientData.genderId?.toString()} required onChange={e => { e.target.value ? this.state.patientData.genderId = Number(e.target.value) : null }}>
                            <option value="">-- Select Gender --</option>
                            <option value="1">Male</option>
                            <option value="2">Female</option>
                        </select>
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="addressln1">Address Lin1-1</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="addressln1" defaultValue={this.state.patientData.addressLine1} required onChange={e => { this.state.patientData.addressLine1 = e.target.value }} />
                    </div>
                </div >
                < div className="form-group row" >
                    <label className=" control-label col-md-12" htmlFor="addressln2">Address Lin1-2</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="addressln2" defaultValue={this.state.patientData.addressLine2} onChange={e => { this.state.patientData.addressLine2 = e.target.value }} />
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="City" >City</label>
                    <div className="col-md-4">
                        <input className="form-control" type="text" name="City" defaultValue={this.state.patientData.city} required onChange={e => { this.state.patientData.city = e.target.value }} />
                    </div>
                </div>
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="Country">Country</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="Country" defaultValue={this.state.patientData.countryId?.toString()} required onChange={this.handleCountryChange} >
                            <option value="">-- Select Country --</option>
                            {countryList.map(cntry =>
                                <option key={cntry.id} value={cntry.id}>{cntry.description}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group row">
                    <label className="control-label col-md-12" htmlFor="State">State</label>
                    <div className="col-md-4">
                        <select className="form-control" data-val="true" name="State" defaultValue={this.state.patientData.stateId?.toString()} required onChange={e => { e.target.value ? this.state.patientData.stateId = Number(e.target.value) : null }}>
                            <option value="">-- Select State --</option>
                            {this.state.stateList.map(state =>
                                <option key={state.id} value={state.id}>{state.description}</option>
                            )}
                        </select>
                    </div>
                </div >
                <div className="form-group">
                    <button type="submit" className="btn btn-default">Save</button>
                    <button className="btn" onClick={this.handleCancel}>Cancel</button>
                </div >
            </form >
        )
    }
}

export class Country {
    id: number = 0;
    name: string = "";
    description?: string="";
}
export class State {
    id: number = 0;
    name: string = "";
    description?: string="";
    countryId: number;
} 