import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import AlertComponent from './Alert';
import { Redirect } from 'react-router';
import AuthService from './AuthService';

class Dashboard extends Component {
	constructor() {
		super();
		this.state = {
			UserType: localStorage.getItem('UserType')
		};
		this.renderJobSeekerDeatils = this.renderJobSeekerDeatils.bind(this);
		this.removeDetails = this.removeDetails.bind(this);
		this.renderTopRecentJobs = this.renderTopRecentJobs.bind(this);
		this.alert = React.createRef();
		this.Auth = new AuthService();
	}

	componentDidMount() {
		this.userDetails();
		document.title = 'Job Portal - Dashboard';
	}

	componentWillMount() {
		if (!this.Auth.loggedIn()) {
			this.setState({
				isLoggedIn: false
			});
			this.Auth.logout();
		}
	}

	userDetails() {
		// console.log(data);
		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		let data = {
			UserId: localStorage.getItem('UserId')
		};
		// console.log(data);
		console.log('USER DETAIL ' + this.state.UserType);

		if (this.state.UserType == '999') {
			axios
				.get(`${this.Auth.domain}/getallrecentjobs`, Config)
				.then((response) => {
					// console.log(response.data.result);
					this.setState({
						recentTopJobList: response.data.result
					});
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			axios
				.post(`${this.Auth.domain}/getalljobseeker`, data, Config)
				.then((response) => {
					console.log(response);
					this.setState({
						jobseekerList: response.data.result
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}

	editProfile(UserId) {
		localStorage.setItem('jobseekerUserId', UserId);
	}

	popupDelete(UserId) {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="react-confirm-alert-body w-100">
						<h6 class="text-center mb-4 text-dark font-weight-bold">Are you sure you want to Delete?</h6>
						<div class="text-center">
							<button class="mr-4 btn btn-secondary" onClick={onClose}>
								Cancel
							</button>
							<button
								class="btn btn-primary"
								onClick={() => {
									this.removeDetails(UserId);
									onClose();
								}}
							>
								Delete
							</button>
						</div>
					</div>
				);
			}
		});
	}

	triggerAlert() {
		this.alert.current.enableMessageView();
	}

	removeDetails(UserId) {
		const data = {
			UserId: UserId
		};
		console.log(data);
		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		axios
			.post(`${this.Auth.domain}/deletejobseeker`, data, Config)
			.then((response) => {
				console.log(response);
				this.setState({
					success: true,
					successResp: response.data.success,
					responseMsg: response.data.message
				});
				this.triggerAlert();
				window.scrollTo(0, 0);
				this.userDetails();
			})
			.catch((err) => {
				console.log(err);
			});
	}

	renderTopRecentJobs() {
		return _.map(this.state.recentTopJobList, (list) => {
			// console.log(list.UserId)
			return (
				<div class="card mb-4">
					<h5 class="card-header">JobTitle : {list.JobTitle}</h5>
					<div class="card-body">
						<p class="card-text">Qualification: {list.Qualification}</p>
						<p class="card-text">Skills: {list.PrimarySkills}</p>
						<p class="card-text">Experience: {list.Experience} Years</p>
					</div>
				</div>
			);
		});
	}

	renderJobSeekerDeatils() {
		return _.map(this.state.jobseekerList, (list) => {
			// console.log(list.UserId)
			localStorage.setItem('list_userId', list.UserId);
			return (
				<tr>
					<td class="text-capitalize">{list.UserName}</td>
					<td>{list.PrimarySkills}</td>
					<td>{list.CurrentEmp}</td>
					<td>{list.ExpInYear}</td>
					<td>{list.ExpInMonth}</td>
					<td class={list.Status == 'Active' ? 'status-active' : 'status-inactive'}>{list.Status}</td>

					{/* Employer*/}
					{this.state.UserType === '999' ? null : (
						<td>
							<Link to="/editprofile">
								<button
									type="submit"
									class="btn btn-primary mr-2 mb-2 edit-btn"
									onClick={() => this.editProfile(list.UserId)}
								>
									Edit
								</button>
							</Link>
							<button
								type="submit"
								class="btn btn-primary mb-2"
								onClick={() => this.popupDelete(list.UserId)}
							>
								Delete
							</button>
						</td>
					)}
				</tr>
			);
		});
	}

	render() {
		if (this.state.isLoggedIn == false) {
			return <Redirect to="/" />;
		}
		return (
			<div>
				<Header />
				<div class="container section">
					<h5 class="mb-3 mt-4 text-uppercase">
						{this.state.UserType === '999' ? 'Recent Job posts' : 'List of Registered Job Seekers'}
					</h5>
					{this.state.success ? (
						<AlertComponent
							message={this.state.responseMsg}
							ref={this.alert}
							className={
								this.state.successResp ? (
									'alert-success d-block alert success-message mr-4'
								) : (
									'd-block alert success-message mr-4 alert-danger'
								)
							}
						/>
					) : null}

					{this.state.UserType === '999' ? (
						<div>{this.renderTopRecentJobs()}</div>
					) : (
						<table class="table table-bordered w-100">
							<thead class="text-center">
								<tr>
									<th>Name</th>
									<th>Primary Skills</th>
									<th>Current Empolyment</th>
									<th>Experience Years</th>
									<th>Experience Months</th>
									<th>Status</th>
									<th>Actions</th>
								</tr>
							</thead>
							<tbody>{this.renderJobSeekerDeatils()}</tbody>
						</table>
					)}
				</div>
				<Footer />
			</div>
		);
	}
}

export default Dashboard;
