import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import _ from 'lodash';
import { Textbox, Textarea, Select, Checkbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import AuthService from './AuthService';

const formData = new FormData();
class ProfileEdit extends Component {
	constructor(props) {
		super(props);

		this.state = {
			UserType: localStorage.getItem('UserType'),
			jobseekerUserId: localStorage.getItem('jobseekerUserId'),
			UserId: localStorage.getItem('UserId'),
			selectedMonth: '',
			UserName: '',
			email: '',
			Address: '',
			Country: '',
			PrimarySkills: '',
			AdditionalSkills: '',
			OtherSkills: '',
			CurrentEmp: '',
			CurrentSal: '',
			ExpSal: '',
			JoinDate: '',
			ExpInMonth: '',
			ExpInYear: '',
			Status: '',
			chkbx_overtime: true,
			chkbx_accom: true,
			chkbx_air_tkt: true,
			DocDirPath: '',
			deviceWidth: window.innerWidth
		};
		console.log('profile cons' + this.state.UserType);
		this.validateForm = this.validateForm.bind(this);
		this.renderJobSeekerDeatils = this.renderJobSeekerDeatils.bind(this);
		this.Auth = new AuthService();
	}

	componentDidMount() {
		this.getUserDetails();
		document.title = 'Job Portal - Profile Edit';
	}

	componentWillMount() {
		if (!this.Auth.loggedIn()) {
			this.setState({
				isLoggedIn: false
			});
			this.Auth.logout();
		}
	}

	getUserDetails() {
		let UserTypeId = this.state.UserType === '001' ? this.state.jobseekerUserId : this.state.UserId;
		let data = {
			UserId: UserTypeId
		};

		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		console.log(data);

		axios
			.post(`${this.Auth.domain}/getonejobseeker`, data, Config)
			.then((response) => {
				// console.log(response.data.result[0].ExpInMonth);
				console.log(response);
				if (response.data.success) {
					this.setState({
						jobseekerUpdateList: response.data.result,
						ExpInMonth: response.data.result[0].ExpInMonth,
						ExpInYear: response.data.result[0].ExpInYear,
						Status: response.data.result[0].Status
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}

	validateForm(e) {
		e.preventDefault();
		confirmAlert({
			customUI: ({ onClose }) => {
				return (
					<div className="react-confirm-alert-body w-100">
						<h6 class="text-center mb-4 text-dark font-weight-bold">Are you sure you want to Edit?</h6>
						<div class="text-center">
							<button class="mr-4 btn btn-secondary" onClick={onClose}>
								Cancel
							</button>
							<button
								class="btn btn-primary"
								onClick={() => {
									this.updateJobseeker(e);
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

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		formData.set(name, value);
	};
	handleExp(e) {
		if (e.target.id === 'ExpInYear') {
			this.setState({
				ExpInYear: e.target.value
			});
		} else {
			this.setState({
				ExpInMonth: e.target.value
			});
		}
	}

	handleStatus(e) {
		this.setState({
			Status: e.target.value
		});
		console.log(this.state.Status);
	}

	handleJobType(name, e) {
		if (e.target.id === 'over-time') {
			this.setState({
				chkbx_overtime: name ? true : false
			});
		} else if (e.target.id === 'accomodation') {
			this.setState({
				chkbx_accom: name ? true : false
			});
		} else {
			this.setState({
				chkbx_air_tkt: name ? true : false
			});
		}
	}
	onFileUpload = (e) => {
		console.log(e.target.files[0]);
		this.setState({
			file: e.target.files[0]
		});
	};
	updateJobseeker = (e) => {
		e.preventDefault();
		let UserTypeId = this.state.UserType == '999' ? this.state.UserId : this.state.jobseekerUserId;
		formData.set('UserId', UserTypeId);
		formData['UserType'] = this.state.UserType;
		formData.set('Status', this.state.Status);
		if (this.state.UserType != '002') {
			formData.set('ExpInYear', this.state.ExpInYear);
			formData.set('ExpInMonth', this.state.ExpInMonth);
		}
		formData.append('file', this.state.file);

		// localStorage.setItem("UserName",formData.UserName);
		console.log('FORM DATA');
		console.log(UserTypeId);
		console.log(this.state.UserType);

		console.log(formData);

		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		axios
			.put(`${this.Auth.domain}/updatejobseeker`, formData, Config)
			.then((response) => {
				console.log(response);
				if (response.data.success) {
					this.setState({
						toDashboard: true
					});
					window.scrollTo(0, 0);
				} else {
					this.setState({
						responseMsg: response.data.message
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
		console.log(formData);
	};

	renderError() {
		if (this.state.success === false) {
			return (
				<div className="alert alert-danger error-message-login ml-n1">
					<strong>{this.state.responseMsg}</strong>
				</div>
			);
		}
	}
	renderJobSeekerDeatils() {
		const { deviceWidth } = this.state;
		const width = deviceWidth < 768;
		const { validate } = this.state;
		return _.map(this.state.jobseekerUpdateList, (list) => {
			console.log('sdfssssssssssssssssssssssssssssssss');
			return (
				<div class="row ml-4 mr-4 pt-4">
					{this.renderError()}
					{/* <div class="form-group d-flex col-xl-12 xs-d-block ">
										<label class="col-xl-6">Full Name:*</label>
										<Textbox
                                            id={'UserName'}
											classNameInput="form-control"
											classNameWrapper="col-xl-6"
											customStyleWrapper={{
												padding: 0
											}}
											name="UserName"
											type="text"
											value={list.UserName}
											disabled={true}
											placeholder=""
											validate={validate}
											validationCallback={(res) =>
												this.setState({ hasUserNameError: res, validate: false })}
											onChange={(name, e) => this.handleInputChange(e, name)}
											onBlur={(e) => {
											}}
											validationOption={{
												name: 'User Name',
												check: true,
												required: true,
												type: 'string'
											}}
										/>
									</div> */}
					<div
						class={this.state.UserType === '999' ? 'd-none' : 'form-group d-flex col-xl-12 xs-d-block mt-4'}
					>
						<label class="col-xl-6">Status:</label>
						<select
							class="form-control col-xl-6"
							id="status"
							onChange={(e) => this.handleStatus(e)}
							value={this.state.Status}
						>
							<option value="Active" selected>
								Active
							</option>
							<option value="Inactive">Inactive</option>
						</select>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block ">
						<label class="col-xl-6">E-mail Address:</label>
						<Textbox
							id={'email'}
							defaultValue={list.email}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="email"
							type="text"
							value={list.email}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasEmailError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'Email',
								check: true,
								required: false,
								type: 'string'
								// customFunc: (email) => {
								// 	const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
								// 	if (reg.test(String(email).toLowerCase())) {
								// 		return true;
								// 	} else {
								// 		return 'Enter a valid email address';
								// 	}
								// }
							}}
						/>
					</div>
					<div class={width ? 'd-none' : 'form-group d-flex col-xl-12 xs-d-block'}>
						<label class="col-xl-6">Address:</label>
						<Textarea
							id={'Address'}
							defaultValue={list.Address}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="Address"
							type="text"
							value={list.Address}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasAddressError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'Address',
								check: true,
								required: false,
								type: 'string'
							}}
						/>
					</div>
					<div class={width ? 'd-none' : 'form-group d-flex col-xl-12 xs-d-block'}>
						<label class="col-xl-6">Country:</label>
						<Textbox
							id={'Country'}
							defaultValue={list.Country}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="Country"
							type="text"
							value={list.Country}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasCountryError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'Country',
								check: true,
								required: false,
								type: 'string'
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block ">
						<label class="col-xl-6">Primary Skills:</label>
						<Textbox
							id={'PrimarySkills'}
							defaultValue={list.PrimarySkills}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="PrimarySkills"
							type="text"
							value={list.PrimarySkills}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasCountryError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'PrimarySkills',
								check: true,
								required: false,
								type: 'string'
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block ">
						<label class="col-xl-6">Additional Skills:</label>
						<Textbox
							id={'AdditionalSkills'}
							defaultValue={list.AdditionalSkills}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="AdditionalSkills"
							type="text"
							value={list.AdditionalSkills}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasCountryError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'AdditionalSkills',
								check: true,
								required: false,
								type: 'string'
							}}
						/>
					</div>
					<div class={width ? 'd-none' : 'form-group d-flex col-xl-12 col-sm-12 xs-d-block '}>
						<label class="col-xl-6 col-sm-6">Other Skills:</label>
						<div class="d-block col-xl-6 col-sm-6 xs-d-block pl-0">
							<Textbox
								id={'OtherSkills'}
								defaultValue={list.OtherSkills}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0,
									marginBottom: 22
								}}
								name="OtherSkills"
								type="text"
								value={list.OtherSkills}
								disabled={false}
								placeholder=""
								validate={validate}
								validationCallback={(res) =>
									this.setState({ hasOtherSkillsError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'OtherSkills',
									check: true,
									required: false,
									type: 'string'
								}}
							/>
							<div class="row col">
								<label class="mr-2 mt-1">Upload file:</label>
								<input type="file" id="file" name="file" onChange={this.onFileUpload} />
							</div>
						</div>
					</div>
					<div class={width ? 'd-none' : 'form-group d-flex col-xl-12 xs-d-block'}>
						<label class="col-xl-6">Experience:</label>
						<div class="d-flex col-xl-6">
							<select
								class="form-control mr-3 exp_year col-xl-3"
								id="ExpInYear"
								onChange={(e) => this.handleExp(e)}
								value={this.state.ExpInYear}
							>
								<option value="0 Years" selected>
									0 Years
								</option>
								<option value="1 Years">1 Years</option>
								<option value="2 Years">2 Years</option>
								<option value="3 Years">3 Years</option>
							</select>
							<select
								class="form-control col-xl-3 exp_mnt"
								id="ExpInMonth"
								onChange={(e) => this.handleExp(e)}
								value={this.state.ExpInMonth}
							>
								<option value="0 Months" selected>
									0 Months
								</option>
								<option value="1 Months">1 Months </option>
								<option value="2 Months">2 Months</option>
								<option value="3 Months">3 Months</option>
							</select>
						</div>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block ">
						<label class="col-xl-6">Current Employment:</label>
						<Textbox
							id={'CurrentEmp'}
							defaultValue={list.CurrentEmp}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="CurrentEmp"
							type="text"
							value={list.CurrentEmp}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasCurrentEmpError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'CurrentEmp',
								check: true,
								required: false,
								type: 'string'
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block ">
						<label class="col-xl-6">Current Salary:</label>
						<Textbox
							id={'CurrentSal'}
							defaultValue={list.CurrentSal}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="CurrentSal"
							type="text"
							value={list.CurrentSal}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasCountryError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'CurrentSal',
								check: true,
								required: false,
								type: 'string'
							}}
						/>
					</div>
					<div class={width ? 'd-none' : 'w-100'}>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Expected Salary:</label>
							<Textbox
								id={'ExpSal'}
								defaultValue={list.ExpSal}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="ExpSal"
								type="text"
								value={list.ExpSal}
								disabled={false}
								placeholder=""
								validate={validate}
								validationCallback={(res) => this.setState({ hasExpSalError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'ExpSal',
									check: true,
									required: false,
									type: 'string'
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Joining Date:</label>
							<Textbox
								id={'JoinDate'}
								defaultValue={list.JoinDate}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="JoinDate"
								type="text"
								value={list.JoinDate}
								disabled={false}
								placeholder=""
								validate={validate}
								validationCallback={(res) => this.setState({ hasCountryError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'JoinDate',
									check: true,
									required: false,
									type: 'string'
								}}
							/>
						</div>

						<div class="col-12 d-flex ml-3 mt-2 w-100 xs-d-block">
							<div class="form-check col-xl-4">
								<Checkbox
									tabIndex="5" //Optional.[String or Number].Default: none.
									id={'over-time'} //Optional.[String].Default: "". Input ID.
									name={'over-time'} //Optional.[String].Default: "". Input name
									value="over-time" //Required.[String].Default: "".
									checked={this.state.switchStatus ? false : true} //Required.[Bool].Default: false.
									disabled={false} //Optional.[Bool].Default: false.
									//validate={validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
									classNameInputBox="form-check-input"
									classNameWrapper="form-check-label"
									validationCallback={(res) =>
										this.setState({
											hasAgreementError: res,
											validate: false
										})} //Optional.[Func].Default: none. Return the validation result.
									onChange={(name, e) => this.handleJobType(name, e)} //Required.[Func].Default: () => {}. Will return the value.
									labelHtml={
										<div class="form-check-label" id="over-time" style={{ marginTop: 11 }}>
											Prefer Over-time
										</div>
									}
									validationOption={{
										name: 'agreement', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
										check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
										required: false //Optional.[Bool].Default: true. To determin if it is a required field.
									}}
								/>
							</div>
							<div class="form-check col-xl-4">
								<Checkbox
									tabIndex="5" //Optional.[String or Number].Default: none.
									id={'accomodation'} //Optional.[String].Default: "". Input ID.
									name={'accomodation'} //Optional.[String].Default: "". Input name
									value="accomodation" //Required.[String].Default: "".
									checked={this.state.switchStatus ? false : true} //Required.[Bool].Default: false.
									disabled={false} //Optional.[Bool].Default: false.
									//validate={validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
									classNameInputBox="form-check-input"
									classNameWrapper="form-check-label"
									validationCallback={(res) =>
										this.setState({
											hasAgreementError: res,
											validate: false
										})} //Optional.[Func].Default: none. Return the validation result.
									onChange={(name, e) => this.handleJobType(name, e)} //Required.[Func].Default: () => {}. Will return the value.
									labelHtml={
										<div class="form-check-label" id="accomodation" style={{ marginTop: 11 }}>
											Require Accommodation
										</div>
									} //Required.[Html].Default: none.
									validationOption={{
										name: 'agreement', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
										check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
										required: false //Optional.[Bool].Default: true. To determin if it is a required field.
									}}
								/>
							</div>
							<div class="form-check col-xl-4">
								<Checkbox
									tabIndex="5" //Optional.[String or Number].Default: none.
									id={'air-ticket'} //Optional.[String].Default: "". Input ID.
									name={'air-ticket'} //Optional.[String].Default: "". Input name
									value="air-ticket" //Required.[String].Default: "".
									checked={this.state.switchStatus ? false : true} //Required.[Bool].Default: false.
									disabled={false} //Optional.[Bool].Default: false.
									//validate={validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
									classNameInputBox="form-check-input"
									classNameWrapper="form-check-label"
									validationCallback={(res) =>
										this.setState({
											hasAgreementError: res,
											validate: false
										})} //Optional.[Func].Default: none. Return the validation result.
									onChange={(name, e) => this.handleJobType(name, e)} //Required.[Func].Default: () => {}. Will return the value.
									labelHtml={
										<div class="form-check-label" id="air-ticket" style={{ marginTop: 11 }}>
											Air-ticket by Agency
										</div>
									} //Required.[Html].Default: none.
									validationOption={{
										name: 'air-ticket', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
										check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
										required: false //Optional.[Bool].Default: true. To determin if it is a required field.
									}}
								/>
							</div>
						</div>
					</div>
					<div class="submit_btn mt-5 mb-5">
						<button type="submit" class="btn btn-primary btn-style">
							Submit
						</button>
					</div>
				</div>
			);
		});
	}

	render() {
		if (this.state.toDashboard === true) {
			return <Redirect to="/dashboard" />;
		}
		if (this.state.isLoggedIn == false) {
			return <Redirect to="/" />;
		}

		return (
			<div>
				<Header />
				<form onSubmit={this.validateForm}>
					<div class="container section">
						<div class="text-center innerpage_heading mb-3">
							<h5 class="title">Profile Edit</h5>
						</div>
						<div class="container form-backrd">
							{this.state.UserType != '002' ? (
								this.renderJobSeekerDeatils()
							) : (
								<div class="row ml-4 mr-4">
									<div class="form-group d-flex col-xl-12 xs-d-block mt-4">
										<label class="col-xl-6">Status:</label>
										<select
											class="form-control col-xl-6"
											id="status"
											onChange={(e) => this.handleStatus(e)}
											value={this.state.Status}
										>
											<option value="Active" selected>
												Active
											</option>
											<option value="Inactive">Inactive</option>
										</select>
									</div>
									<div class="submit_btn mt-5 mb-5">
										<button type="submit" class="btn btn-primary btn-style">
											Submit
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
					<input type="submit" style={{ display: 'none' }} />
				</form>
				<Footer />
			</div>
		);
	}
}

export default ProfileEdit;
