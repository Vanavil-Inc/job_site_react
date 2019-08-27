import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import axios from 'axios';
import _ from 'lodash';
import AuthService from './AuthService';
import { confirmAlert } from 'react-confirm-alert';
import AlertComponent from './Alert';
import { Redirect } from 'react-router';
import { Textbox, Textarea, Select, Checkbox } from 'react-inputs-validation';
import SearchInput, { createFilter } from 'react-search-input';
const KEYS_TO_FILTERS = ['PrimarySkills', 'JobTitle', 'Qualification'];

class RecentJobs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			recentJobList: [],
			searchRecentJobList: [],
			UserType: localStorage.getItem('UserType'),
			searchTerm: '',
			list: '',
			data: {},
			edit: false,
			JobNo: '',
			JobTitle: '',
			Qualification: '',
			PrimarySkills: '',
			Experience: '',
			JobDetails: '',
			validate: false,
			hasJobNoError: true,
			searchTerm: ''
		};
		this.Auth = new AuthService();
		this.alert = React.createRef();
		this.recentJobDetails = this.recentJobDetails.bind(this);
		this.searchUpdated = this.searchUpdated.bind(this);
	}

	toggleValidating(validate) {
		this.setState({ validate });
	}

	componentDidMount() {
		document.title = 'Job Portal - Recent Jobs';
		this.recentJobDetails();
	}

	// componentWillMount() {
	// 	if (!this.Auth.loggedIn()) {
	// 		this.setState({
	// 			isLoggedIn: false
	// 		});
	// 		this.Auth.logout();
	// 	}
	// }

	handleInputChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;
		//console.log(name);
		//console.log(e.target.value);
		let { data } = this.state;
		data[name] = value;
		//console.log(data);
		this.setState({
			data: data
		});
	};

	validate(e) {
		e.preventDefault();
		this.toggleValidating(true);
		const { hasJobNoError } = this.state;
		if (!hasJobNoError) {
			e.preventDefault();
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className="react-confirm-alert-body w-100">
							<h6 class="text-center mb-4 text-dark font-weight-bold">Are you sure you want to Save?</h6>
							<div class="text-center">
								<button class="mr-4 btn btn-secondary" onClick={onClose}>
									Cancel
								</button>
								<button
									class="btn btn-primary"
									onClick={() => {
										this.createJob(e);
										onClose();
									}}
								>
									Save
								</button>
							</div>
						</div>
					);
				}
			});
		}
	}

	recentJobDetails() {
		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		axios
			.get(`${this.Auth.domain}/getallrecentjobs`, Config)
			.then((response) => {
				//console.log(response);
				this.setState({
					recentJobList: response.data.result
				});
				//console.log(this.state.recentJobList);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	createJob = (e) => {
		e.preventDefault();
		let { data } = this.state;
		console.log(data);
		this.setState({
			data: data
		});
		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		axios
			.post(`${this.Auth.domain}/jobpost`, data, Config)
			.then((response) => {
				this.setState({
					success: true,
					successResp: response.data.success,
					responseMsg: response.data.message
				});
				this.triggerAlert();
				window.scrollTo(0, 0);
				this.recentJobDetails();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	updateJob = (e, JobNo) => {
		e.preventDefault();
		// data['JobNo'] = JobNo;
		console.log(JobNo);
		let { data } = this.state;
		data['JobNo'] = JobNo;
		console.log(data);
		this.setState({
			data: data
		});
		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		axios
			.put(`${this.Auth.domain}/updatejob`, data, Config)
			.then((response) => {
				console.log(response);
				this.setState({
					success: true,
					successResp: response.data.success,
					responseMsg: response.data.message,
					edit: false
				});
				this.triggerAlert();
				window.scrollTo(0, 0);
				this.recentJobDetails();
			})
			.catch((err) => {
				console.log(err);
			});
	};

	handleEdit = (e, JobNo) => {
		this.setState({
			edit: true,
			row: JobNo
		});
	};
	handleClose = (e) => {
		this.setState({
			edit: false
		});
	};

	DeleteJob(e, JobNo) {
		e.preventDefault();
		const data = {
			JobNo: JobNo
		};
		console.log(data);
		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};
		axios
			.post(`${this.Auth.domain}/deletejob`, data, Config)
			.then((response) => {
				console.log(response);
				this.setState({
					success: true,
					successResp: response.data.success,
					responseMsg: response.data.message
				});
				this.triggerAlert();
				window.scrollTo(0, 0);
				this.recentJobDetails();
			})
			.catch((err) => {
				console.log(err);
			});
	}
	triggerAlert() {
		this.alert.current.enableMessageView();
	}

	addRow(e) {
		var recentJobList = this.state.recentJobList;

		recentJobList.push('new row');
		this.setState({
			recentJobList: recentJobList,
			newJob: 'true'
		});
	}
	deleteRow(e, index) {
		var recentJobList = this.state.recentJobList;
		recentJobList.splice(index, 1);
		this.setState({
			recentJobList: recentJobList
		});
	}

	popupDelete(e, JobNo) {
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
									this.DeleteJob(e, JobNo);
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

	popupUpdate(e, JobNo) {
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="react-confirm-alert-body w-100">
						<h6 class="text-center mb-4 text-dark font-weight-bold">Are you sure you want to Save?</h6>
						<div class="text-center">
							<button class="mr-4 btn btn-secondary" onClick={onClose}>
								Cancel
							</button>
							<button
								class="btn btn-primary"
								onClick={() => {
									this.updateJob(e, JobNo);
									onClose();
								}}
							>
								Save
							</button>
						</div>
					</div>
				);
			}
		});
	}

	render() {
		if (this.state.isLoggedIn == false) {
			return <Redirect to="/" />;
		}
		const recentDetails = this.state.recentJobList;
		const filteredEmails = recentDetails != null ? this.state.recentJobList.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS)) : null

		const {validate, JobNo} = this.state;
		return (
			<div>
				<Header />
				<div class="container section">
					<div class="text-center innerpage_heading mb-3">
						<h5 class="title">{this.state.UserType === "001" ? 'Job Post' : 'Recent Jobs'}</h5>
					</div>
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
					{this.state.UserType === "001" ? null : <div class="form-group d-flex col-xl-12 xs-d-block">
						<label class="col-xl-2 searchText">Search by Skills</label>
						<SearchInput className="search-input mr-4" onChange={this.searchUpdated} />
						<button type="submit" class="btn btn-primary search-btn">
							Search
						</button>
					</div>}
					<form>
						<table class="table table-bordered w-100">
							<thead class="text-center">
								<tr>
									<th>Job No.</th>
									<th>Job Title</th>
									<th>Qualification</th>
									<th>Primary Skills</th>
									<th>Experience</th>
									<th>Job Details</th>
									{this.state.UserType === '001' ? <th>Action</th> : <th>Apply</th>}
								</tr>
							</thead>
							<tbody>
								{filteredEmails != null ?
									filteredEmails.map((list, index) => {
										return (
											<tr>
												<td>
													<Textbox
														id={'JobNo'}
														defaultValue={list.JobNo}
														classNameInput="form-control"
														classNameWrapper="col-xl-12"
														classNameInput="recentjobs-input"
														customStyleWrapper={{
															padding: 0
														}}
														name="JobNo"
														type="number"
														value={list.JobNo}
														disabled={false}
														placeholder=""
														validate={validate}
														validationCallback={(res) =>
															this.setState({ hasJobNoError: res, validate: false })}
														onChange={(name, e) => this.handleInputChange(e, name)}
														onBlur={(e) => { }}
														validationOption={{
															name: 'Job No',
															check: true,
															required: true,
															type: 'number',
															//showMsg:false
														}}
													/>
												</td>
												<td class="text-capitalize">
													<Textarea
														id={'JobTitle'}
														defaultValue={list.JobTitle}
														classNameInput="form-control"
														classNameWrapper="col-xl-12"
														classNameInput="recentjobs-input"
														customStyleWrapper={{
															padding: 0
														}}
														rows="4"
														cols="80"
														maxlength="200"
														customStyleInput={{
															overflow: 'hidden'
														}}
														name="JobTitle"
														type="text"
														value={list.JobTitle}
														disabled={false}
														placeholder=""
														onChange={(name, e) => this.handleInputChange(e, name)}
													/>
												</td>
												<td>
													<Textarea
														id={'Qualification'}
														defaultValue={list.Qualification}
														classNameInput="form-control"
														classNameWrapper="col-xl-12"
														classNameInput="recentjobs-input"
														customStyleWrapper={{
															padding: 0
														}}
														rows="4"
														cols="80"
														maxlength="200"
														customStyleInput={{
															overflow: 'hidden'
														}}
														name="Qualification"
														type="text"
														value={list.Qualification}
														disabled={false}
														placeholder=""
														onChange={(name, e) => this.handleInputChange(e, name)}
													/>
												</td>
												<td class="text-capitalize">
													<Textarea
														id={'PrimarySkills'}
														defaultValue={list.PrimarySkills}
														classNameInput="form-control"
														classNameWrapper="col-xl-12"
														classNameInput="recentjobs-input"
														customStyleWrapper={{
															padding: 0
														}}
														rows="4"
														cols="80"
														maxlength="200"
														customStyleInput={{
															overflow: 'hidden'
														}}
														name="PrimarySkills"
														type="text"
														value={list.PrimarySkills}
														disabled={false}
														placeholder=""
														onChange={(name, e) => this.handleInputChange(e, name)}
													/>
												</td>
												<td>
													<Textarea
														id={'Experience'}
														defaultValue={list.Experience}
														classNameInput="form-control"
														classNameWrapper="col-xl-12"
														classNameInput="recentjobs-input"
														customStyleWrapper={{
															padding: 0
														}}
														rows="4"
														cols="80"
														maxlength="200"
														customStyleInput={{
															overflow: 'hidden'
														}}
														name="Experience"
														type="text"
														value={list.Experience}
														disabled={false}
														placeholder=""
														onChange={(name, e) => this.handleInputChange(e, name)}
													/>
												</td>
												<td>
													<Textarea
														id={'JobDetails'}
														defaultValue={list.JobDetails}
														classNameInput="form-control"
														classNameWrapper="col-xl-12"
														classNameInput="recentjobs-input"
														customStyleWrapper={{
															padding: 0
														}}
														rows="4"
														cols="80"
														maxlength="200"
														customStyleInput={{
															overflow: 'hidden'
														}}
														name="JobDetails"
														type="text"
														value={list.JobDetails}
														disabled={false}
														placeholder=""
														onChange={(name, e) => this.handleInputChange(e, name)}
													/>
												</td>
												{this.state.UserType === '001' ? (
													<td>
														{list.JobNo == null ? (
															<div class="recentjobs-icon-width">
																<i
																	class="fa fa-floppy-o recentjobs-icons mr-2"
																	onClick={(e) => this.validate(e)}
																/>
																<i
																	class="fa fa-close recentjobs-icons  recentjobs-close"
																	onClick={(e) => this.deleteRow(e, index)}
																/>
															</div>
														) : this.state.row == list.JobNo && this.state.edit ? (
															<div>
																<i
																	class="fa fa-floppy-o recentjobs-icons mr-2"
																	onClick={(e) => this.popupUpdate(e, list.JobNo)}
																/>
																<i
																	class="fa fa-close recentjobs-icons recentjobs-close"
																	onClick={(e) => this.handleClose(e)}
																/>
															</div>
														) : (
																	<div class="recentjobs-icon-width">
																		<i
																			class="fa fa-edit recentjobs-icons mr-2"
																			onClick={(e) => this.handleEdit(e, list.JobNo)}
																		/>
																		<i
																			class="fa fa-trash-o recentjobs-icons"
																			onClick={(e) => this.popupDelete(e, list.JobNo)}
																		/>
																	</div>
																)}
													</td>
												) : (
														<td>
															<input type="checkbox" class="form-check-input" id="td-checkbox" name="option1" value="something" />
														</td>
													)}
											</tr>
										);
									}) : this.state.UserType != "001" ? <tr>
										<td colSpan="7" class="job-empty">No Jobs Available</td></tr> :
										<tr>
											<td>
												<Textbox
													id={'JobNo'}
													//defaultValue={list.JobNo}
													classNameInput="form-control"
													classNameWrapper="col-xl-12"
													classNameInput="recentjobs-input"
													customStyleWrapper={{
														padding: 0
													}}
													name="JobNo"
													type="number"
													value={JobNo}
													disabled={false}
													placeholder=""
													validate={validate}
													validationCallback={(res) =>
														this.setState({ hasJobNoError: res, validate: false })}
													onChange={(name, e) => this.handleInputChange(e, name)}
													//onBlur={(e) => { }}
													validationOption={{
														name: 'Job No',
														check: true,
														required: true,
														type: 'number',
														//showMsg: false
													}}
												/>
											</td>
											<td class="text-capitalize">
												<Textarea
													id={'JobTitle'}
													//defaultValue={list.JobTitle}
													classNameInput="form-control"
													classNameWrapper="col-xl-12"
													classNameInput="recentjobs-input"
													customStyleWrapper={{
														padding: 0
													}}
													rows="4"
													cols="80"
													maxlength="200"
													customStyleInput={{
														overflow: 'hidden'
													}}
													name="JobTitle"
													type="text"
													//value={list.JobTitle}
													disabled={false}
													placeholder=""
													onChange={(name, e) => this.handleInputChange(e, name)}
												/>
											</td>
											<td>
												<Textarea
													id={'Qualification'}
													//defaultValue={list.Qualification}
													classNameInput="form-control"
													classNameWrapper="col-xl-12"
													classNameInput="recentjobs-input"
													customStyleWrapper={{
														padding: 0
													}}
													rows="4"
													cols="80"
													maxlength="200"
													customStyleInput={{
														overflow: 'hidden'
													}}
													name="Qualification"
													type="text"
													//value={list.Qualification}
													disabled={false}
													placeholder=""
													onChange={(name, e) => this.handleInputChange(e, name)}
												/>
											</td>
											<td class="text-capitalize">
												<Textarea
													id={'PrimarySkills'}
													//defaultValue={list.PrimarySkills}
													classNameInput="form-control"
													classNameWrapper="col-xl-12"
													classNameInput="recentjobs-input"
													customStyleWrapper={{
														padding: 0
													}}
													rows="4"
													cols="80"
													maxlength="200"
													customStyleInput={{
														overflow: 'hidden'
													}}
													name="PrimarySkills"
													type="text"
													value=""
													disabled={false}
													placeholder=""
													onChange={(name, e) => this.handleInputChange(e, name)}
												/>
											</td>
											<td>
												<Textarea
													id={'Experience'}
													//defaultValue={list.Experience}
													classNameInput="form-control"
													classNameWrapper="col-xl-12"
													classNameInput="recentjobs-input"
													customStyleWrapper={{
														padding: 0
													}}
													rows="4"
													cols="80"
													maxlength="200"
													customStyleInput={{
														overflow: 'hidden'
													}}
													name="Experience"
													type="text"
													//value={list.Experience}
													disabled={false}
													placeholder=""
													onChange={(name, e) => this.handleInputChange(e, name)}
												/>
											</td>
											<td>
												<Textarea
													id={'JobDetails'}
													//defaultValue={list.JobDetails}
													classNameInput="form-control"
													classNameWrapper="col-xl-12"
													classNameInput="recentjobs-input"
													customStyleWrapper={{
														padding: 0
													}}
													rows="4"
													cols="80"
													maxlength="200"
													customStyleInput={{
														overflow: 'hidden'
													}}
													name="JobDetails"
													type="text"
													//value={list.JobDetails}
													disabled={false}
													placeholder=""
													onChange={(name, e) => this.handleInputChange(e, name)}
												/>
											</td>
											{this.state.UserType === '001' ? (
												<td>

													<div class="recentjobs-icon-width">
														<i
															class="fa fa-floppy-o recentjobs-icons mr-2"
															disabled onClick={(e) => this.validate(e)}
														/>
														{/* <i
																	class="fa fa-close recentjobs-icons  recentjobs-close"
																	onClick={(e) => this.deleteRow(e, index)}
																/> */}
													</div>

													{/* <div>
																<i
																	class="fa fa-floppy-o recentjobs-icons mr-2"
																	onClick={(e) => this.popupUpdate(e, list.JobNo)}
																/>
																<i
																	class="fa fa-close recentjobs-icons recentjobs-close"
																	onClick={(e) => this.handleClose(e)}
																/>
															</div> */}

													{/* <div class="recentjobs-icon-width">
																		<i
																			class="fa fa-edit recentjobs-icons mr-2"
																			onClick={(e) => this.handleEdit(e, list.JobNo)}
																		/>
																		<i
																			class="fa fa-trash-o recentjobs-icons"
																			onClick={(e) => this.popupDelete(e, list.JobNo)}
																		/>
																	</div> */}
													{/* )} */}
												</td>
											) : (
													<td>
														<input type="checkbox" class="form-check-input" id="td-checkbox" name="option1" value="something" />
													</td>
												)}
										</tr>}

							</tbody>
						</table>
					</form>
					{this.state.UserType === "001" ? this.state.recentJobList != null ? <button type="submit" class='btn btn-primary btn-style' onClick={(e) => this.addRow(e)}>
						Add Job
					</button> : <button type="submit" class='btn btn-primary btn-style' disabled>
						Add Job
					</button> :null}
				</div>
				<Footer />
			</div>
		);
	}
	searchUpdated(term) {
		this.setState({ searchTerm: term })
	}
}

export default RecentJobs;
