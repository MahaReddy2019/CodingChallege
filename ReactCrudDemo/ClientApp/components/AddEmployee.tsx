import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { EmployeeData } from './FetchEmployee';

interface AddEmployeeDataState {
    title: string;
    loading: boolean;
    department: Array<any>;
    empData: EmployeeData;
}

export class AddEmployee extends React.Component<RouteComponentProps<{}>, AddEmployeeDataState> {
    constructor(props) {
        super(props);

		this.state = { title: "", loading: true, department: [], empData: new EmployeeData };

		fetch('api/Employee/GetDepartmentList')
            .then(response => response.json() as Promise<Array<any>>)
            .then(data => {
				this.setState({ department: data });
            });

        var empid = this.props.match.params["empid"];

        // This will set state for Edit employee
        if (empid > 0) {
            fetch('api/Employee/Details/' + empid)
                .then(response => response.json() as Promise<EmployeeData>)
                .then(data => {
                    this.setState({ title: "Edit", loading: false, empData: data });
                });
        }

        // This will set state for Add employee
        else {
            this.state = { title: "Create", loading: false, department: [], empData: new EmployeeData };
        }

        // This binding is necessary to make "this" work in the callback
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    public render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderCreateForm(this.state.department);

        return <div>
            <h3>Add New Employee</h3>
            <hr />
            {contents}
        </div>;
    }

    // This will handle the submit form event.
    private handleSave(event) {
        event.preventDefault();
        const data = new FormData(event.target);
	    console.log(data);
        // PUT request for Edit employee.
        if (this.state.empData.employeeId) {
            fetch('api/Employee/Edit', {
                method: 'PUT',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }

        // POST request for Add employee.
        else {
            fetch('api/Employee/Create', {
                method: 'POST',
                body: data,

            }).then((response) => response.json())
                .then((responseJson) => {
                    this.props.history.push("/fetchemployee");
                })
        }
    }

    // This will handle Cancel button click event.
    private handleCancel(e) {
        e.preventDefault();
        this.props.history.push("/fetchemployee");
    } 

    // Returns the HTML Form to the render() method.
    private renderCreateForm(Department: Array<any>) {
        return (
			<form className="borderstyle col-sm-12" onSubmit={this.handleSave} >
				<h4>Department</h4>
				<p><b>Select the department and add the employee.</b></p>
				<div className="requiredFontstyle"><span className="gly-color">&nbsp;*</span>Required field</div>
				<br/>
				<div className="form-group row">
					<label className="control-label col-md-12" htmlFor="departmentName">Department Name</label>
					<div className="col-md-4">
						<select className="inupt-form-style" data-val="true" name="departmentName" defaultValue={this.state.empData.departmentName} required>
							<option value=""> Select department name</option>
							{Department.map(department =>
								<option key={department.cityid} value={department.cityName}>{department.cityName}</option>
							)}
						</select>
					</div>
				</div >
				<h4>Employee information</h4>
				<div className="requiredFontstyle"><span className="gly-color">&nbsp;*</span>Required field</div>
                <div className="form-group row" >
                    <input type="hidden" name="employeeId" value={this.state.empData.employeeId} />
                </div>
                < div className="form-group row col-md-6" >
					<label className=" control-label col-md-12" htmlFor="FirstName">FirstName<span className="gly-color">&nbsp;*</span></label>
					<div className="col-md-10">
						<input className="inupt-form-style" type="text" name="Firstname" defaultValue={this.state.empData.firstName} required />
                    </div>
				</div >
				< div className="form-group row col-md-6" >
				<label className=" control-label col-md-12" htmlFor="LastName">LastName<span className="gly-color">&nbsp;*</span></label>
				<div className="col-md-10">
					<input className="inupt-form-style" type="text" name="Lastname" defaultValue={this.state.empData.lastName} required />
				</div>
				</div >
				<div className="form-group row col-md-6">
					<label className="control-label col-md-12" htmlFor="Designation">Designation<span className="gly-color">&nbsp;*</span></label>
                    <div className="col-md-10">
						<input className="inupt-form-style" data-val="true" name="Designation" defaultValue={this.state.empData.designation} required/>
                    </div>
                </div >
				<div className="form-group row col-md-6">
					<label className="control-label col-md-12" htmlFor="EmployeeType" >Employee Type<span className="gly-color">&nbsp;*</span></label>
					<div className="col-md-10">
						<input className="inupt-form-style" type="text" name="EmployeeType" defaultValue={this.state.empData.employeeType} required />
                    </div>
                </div>
				<div className="form-group row col-md-6">
					<label className="control-label col-md-12" htmlFor="ReportingManager">Manager's Name<span className=" gly-color">&nbsp;*</span></label>
					<div className="col-md-10">
						<input className="inupt-form-style" data-val="true" name="ReportingManager" defaultValue={this.state.empData.reportingManager} required/>
                            
                    </div>
				</div >
				<div className="form-group row col-md-6">
					<label className="control-label col-md-12" htmlFor="Notes">Notes</label>
					<div className="col-md-10">
						<input className="inupt-form-style" data-val="true" name="notes" defaultValue={this.state.empData.Notes} />

					</div>
				</div >
				<div className="form-group col-md-6">
					<button type="submit" className="btn  backcolor">Save Employee</button> &nbsp; &nbsp;
                    <a className="" onClick={this.handleCancel}>Cancel</a>
                </div >
            </form >
        )
    }
}