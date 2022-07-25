import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchPatientDataState {
    patientList: PatientData[];
    loading: boolean;
}

export class FetchPatient extends React.Component<RouteComponentProps<{}>, FetchPatientDataState> {
    constructor() {
        super();
        this.state = { patientList: [], loading: true };

        fetch('api/Patient/GetPatients')
            .then(response => response.json() as Promise<PatientData[]>)
            .then(data => {
                this.setState({ patientList: data, loading: false });
            });

        // This binding is necessary to make "this" work in the callback
        this.handleDelete = this.handleDelete.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderPatientTable(this.state.patientList);

        return <div>
            <h1>Patient Data</h1>
            <p>This component demonstrates fetching Patient data from the server.</p>
            <p>
                <Link to="/addpatient">Create New</Link>
            </p>
            {contents}
        </div>;
    }

    // Handle Delete request for an patient
    private handleDelete(id: number) {
        if (!confirm("Do you want to delete patient with Id: " + id))
            return;
        else {
            fetch('api/Patient/Delete/' + id, {
                method: 'delete'
            }).then(data => {
                this.setState(
                    {
                        patientList: this.state.patientList.filter((rec) => {
                            return (rec.id != id);
                        })
                    });
            });
        }
    }

    private handleEdit(id: number) {
        this.props.history.push("/patient/edit/" + id);
    }

    // Returns the HTML table to the render() method.
    private renderPatientTable(patientList: PatientData[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th></th>
                    <th>Patient Id</th>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>State</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Address</th>
                </tr>
            </thead>
            <tbody>
                {patientList.map((patient:PatientData) =>
                    <tr key={patient.id}>
                        <td></td>
                        <td>{patient.id}</td>
                        <td>{patient.name}</td>
                        <td>{patient.genderName}</td>
                        <td>{patient.stateName}</td>
                        <td>{patient.countryName}</td>
                        <td>{patient.city}</td>
                        <td>{patient.addressLine1}</td>
                        <td>
                            <a className="action" onClick={(id) => this.handleEdit(patient.id)}>Edit</a>  |
                            <a className="action" onClick={(id) => this.handleDelete(patient.id)}>Delete</a>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>;
    }
}

export class PatientData {
    id: number;
    name: string = "";
    genderId?: number;
    dateOfBirth: any;
    addressLine1: string = "";
    addressLine2: string = "";
    city: string = "";
    stateId?: number;
    zip: string = "";
    countryId?: number;
    countryName: string = "";
    stateName: string = "";
    genderName: string = "";
} 