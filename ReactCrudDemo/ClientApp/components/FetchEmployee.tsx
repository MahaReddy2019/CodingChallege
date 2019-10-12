import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

interface FetchEmployeeDataState {
	empList: EmployeeData[];
	loading: boolean;
}

export class FetchEmployee extends React.Component<RouteComponentProps<{}>, FetchEmployeeDataState> {
	constructor() {
		super();
		this.state = { empList: [], loading: true };

		fetch('api/Employee/Index')
			.then(response => response.json() as Promise<EmployeeData[]>)
			.then(data => {
				this.setState({ empList: data, loading: false });
			});

		// This binding is necessary to make "this" work in the callback
		this.handleDelete = this.handleDelete.bind(this);
		this.handleEdit = this.handleEdit.bind(this);

	}

	public render() {
		let contents = this.state.loading
			? <p><em>Loading...</em></p>
			: this.renderEmployeeTable(this.state.empList);

		return <div className="col-sm-12">
			<div className="col-sm-12">
				<div className="col-sm-10"><b>Employee List</b></div>

				<button className="col-sm-1 btn backcolor" >
					<Link to="/addemployee" className="glyphicon glyphicon-plus">Add</Link>
				</button>
			</div>
			<br /><br /><br />
			<div className="col-sm-12">{contents}</div>


		</div>;
	}

	// Handle Delete request for an employee
	private handleDelete(id: number) {
		if (!confirm("Do you want to delete employee with Id: " + id))
			return;
		else {
			fetch('api/Employee/Delete/' + id, {
				method: 'delete'
			}).then(data => {
				this.setState(
					{
						empList: this.state.empList.filter((rec) => {
							return (rec.employeeId != id);
						})
					});
			});
		}
	}

	private handleEdit(id: number) {
		this.props.history.push("/employee/edit/" + id);
	}

	// Returns the HTML table to the render() method.
	private renderEmployeeTable(empList: EmployeeData[]) {

		return <table className='table'>
			<thead>
				<tr>
					<th></th>
					<th>Name</th>
					<th>Designation</th>
					<th>Type</th>
					<th>ReportingManager</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{empList.map(emp =>
					<tr key={emp.employeeId}><td></td>
						<td>{emp.firstName + " " + (emp.lastName == null ? "" : emp.lastName)}</td>
						<td>{emp.designation}</td>
						<td>{emp.employeeType}</td>
						<td>{emp.reportingManager}</td>
						<td>
							<a className="action glyphicon glyphicon-pencil" onClick={(id) => this.handleEdit(emp.employeeId)}></a>  <span>&nbsp;&nbsp;&nbsp;</span>
							<a className="action glyphicon glyphicon-trash gly-color" onClick={(id) => this.handleDelete(emp.employeeId)}></a>
						</td>
					</tr>
				)}
			</tbody>
		</table>;
	}
}

export class EmployeeData {
	employeeId: number = 0;
	firstName: string = "";
	designation: string = "";
	employeeType: string = "";
	reportingManager: string = "";
	departmentName: string = "";
	lastName: string = "";
	Notes: string = "";

} 