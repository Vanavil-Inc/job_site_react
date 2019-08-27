import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Textbox, Textarea, Select, Checkbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import AuthService from './AuthService';

const formData = new FormData();

class RegisterJobseeker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			timestamp: true,
			inputKey: Date.now(),
			file: null,
			deviceWidth: window.innerWidth,
			UserId: '',
			Password: '',
			confpwd: '',
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
			ExpInMonth: '0 Months',
			ExpInYear: '0 Years',
			UserType: '999',
			chkbx_overtime: true,
			chkbx_accom: true,
			chkbx_air_tkt: true,
			Status: 'Active',
			DocDirPath: '',
			validate: false,
			hasPasswordError: true,
			hasUserIdError: true,
			hasConfirmPwdError: true,
			hasUserNameError: true,
			hasEmailError: true,
			adminType: localStorage.getItem('UserType'),
			pageType: localStorage.getItem('PAGETYPE')
		};
		this.validateForm = this.validateForm.bind(this);
        this.registerJobseeker = this.registerJobseeker.bind(this);
        this.Auth = new AuthService();
	}

	toggleValidating(validate) {
		this.setState({ validate });
	}

	validateForm(e) {
		e.preventDefault();
		this.toggleValidating(true);
		const {
			hasUserIdError,
			hasPasswordError,
			hasConfirmPwdError,
			hasEmailError,

			hasUserNameError
		} = this.state;
		if (
			(!hasUserIdError && !hasPasswordError && !hasConfirmPwdError && !hasUserNameError && !hasEmailError) ||
			(!hasUserIdError && !hasPasswordError && !hasConfirmPwdError)
		) {
			e.preventDefault();
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className="react-confirm-alert-body w-100">
							<h6 class="text-center mb-4 text-dark font-weight-bold">
								Are you sure you want to Register?
							</h6>
							<div class="text-center">
								<button class="mr-4 btn btn-secondary" onClick={onClose}>
									Cancel
								</button>
								<button
									class="btn btn-primary"
									onClick={() => {
										this.registerJobseeker(e);
										onClose();
									}}
								>
									Continue
								</button>
							</div>
						</div>
					);
				}
			});
			//this.registerJobseeker(e);
		}
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		formData.set(name, value);
		
		if (target.name == 'Password') {
			this.setState({
				pwd: target.value
			});
		}
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
		console.log(name);
	}

	onFileUpload = (e) => {
		console.log(e.target.files[0]);
		this.setState({
			file: e.target.files[0]
		});
	};
	registerJobseeker = (e) => {
		e.preventDefault();

		formData.set('UserType', this.state.UserType);
		formData.set('ExpInYear', this.state.ExpInYear);
		formData.set('ExpInMonth', this.state.ExpInMonth);
		formData.set('OverTime', this.state.chkbx_overtime);
		formData.set('Accommodation', this.state.chkbx_accom);
		formData.set('AirTicket', this.state.chkbx_air_tkt);
		formData.set('Status', this.state.Status);
		formData.append('file', this.state.file);

		console.log(this.state.OverTime);
		// console.log(e.target.id)
		console.log(this.state.chkbx_overtime);

		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		axios
			.post(`${this.Auth.domain}/register`, formData, Config)
			.then((response) => {
				console.log(response);
				console.log('success' + response.data.success);
				this.setState({
					success: response.data.success
				});
				if (response.data.success) {
					this.setState({
						responseMsg: response.data.message,
						defaultRegister: true,
						file: null,
						inputKey: Date.now()
					});
					if (this.props.onChange) this.props.onChange(null);
				} else {
					this.setState({
						responseMsg: response.data.message
					});
				}
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				console.log(error);
			});
		console.log(formData);
	};

	getProfile = () => {
		formData.set('UserId', formData.get("UserId"));
		formData.set('UserType', this.state.UserType);
		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		axios
			.post(`${this.Auth.domain}/getonejobseeker`, formData, Config)
			.then((response) => {
				console.log(response);
				console.log('success' + response.data.success);
				this.setState({
					success: response.data.success
				});
				if (response.data.success) {
					this.setState({
						responseMsg: response.data.message,
						profileData: response.data.result
					});
					window.scrollTo(0, 0);
				} else {
					this.setState({
						responseMsg: response.data.message
					});
					window.scrollTo(0, 0);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	renderError() {
		if (this.state.success === false) {
			return (
				<div className="alert alert-danger error-message ml-4 mr-4">
					<strong>{this.state.responseMsg}</strong>
				</div>
			);
		}
	}

	renderSucsessMsg() {
		if (this.state.success === true) {
			return (
				<div className="alert alert-success error-message ml-4 mr-4">
					<strong>
						{this.state.responseMsg}
						{this.state.defaultRegister === true ? 
							this.state.adminType === "001" ? null : <Link to="/"> Please Login</Link>
						 : null}
					</strong>
				</div>
			);
		}
	}

	onTakePhoto (dataUri) {
		// Do stuff with the dataUri photo...
		console.log(dataUri);
	  }

	render() {
		const {
			UserId,
			Password,
			confpwd,
			PrimarySkills,
			AdditionalSkills,
			UserName,
			email,
			Address,
			Country,
			CurrentEmp,
			CurrentSal,
			ExpSal,
			JoinDate,
			OtherSkills,
			validate
		} = this.state;
		if (this.state.toLogin === true) {
			return <Redirect to="/" />;
		}
		const { deviceWidth } = this.state;
		const width = deviceWidth < 768;
		const searchRegister= this.state.adminType==='001' && this.state.pageType==="REGISTER" || this.state.pageType==="REGISTER"
		const searchProfileBtn = this.state.adminType==='001' && this.state.pageType==="PROFILEEDIT"  
		// console.log(searchRegister);
		// console.log(searchProfileBtn);
		return (
			<form onSubmit={this.validateForm} encType="multipart/form-data" ref="form">
				<div class="row ml-4 mr-4" key={this.state.inputKey}>
					{this.renderError()}
					{this.renderSucsessMsg()}
					<div class="form-group d-flex col-xl-12 xs-d-block">
						<label class="col-xl-6">User ID / Hand Phone Number:*</label>
						<div class={searchRegister ?"col-xl-12 pl-0" :"form-group d-flex col-xl-6 pl-0 xs-d-block"}>
						<Textbox
							id={'UserId'}
							classNameInput="form-control"
							classNameWrapper={searchRegister && !searchProfileBtn ? "col-xl-6" : "col-xl-10 col-lg-9 col-md-8"}
							customStyleWrapper={{
								padding: 0
							}}
							maxLength={8}
							value={UserId}
							name="UserId"
							type="number"
							disabled={false}
							placeholder="Enter 8 digit hand phone number"
							validate={validate}
							validationCallback={(res) => this.setState({ hasUserIdError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'UserId',
								check: true,
								required: true,
								type: 'string',
								max: 8,
								min: 8
							}}
						/>
						<div class={(this.state.adminType === '001' && this.state.pageType === 'PROFILEEDIT') ? (
									'submit_btn col-xl-2 w-proEdit-100'
								) : (
									' d-none'
								)
							}>
							<button type="submit" class="btn btn-primary proEdit-btn" onClick={this.getProfile}>
								Search
							</button>
						</div></div>
						
					</div>
					{(this.state.adminType==='001' && this.state.pageType==="REGISTER")|| this.state.pageType==="REGISTER"?

					<div class="w-100">
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Password:*</label>
							<Textbox
								// tabIndex="1" // Optional.[String or Number].Default: none.
								id={'Password'} // Optional.[String].Default: "". Input ID.
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								value={Password}
								name="Password"
								type="password"
								// value={name}
								disabled={false}
								placeholder="**********"
								validate={validate}
								validationCallback={(res) => this.setState({ hasPasswordError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'Password', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
									check: true, // Optional.[Bool].Default: true. To determin if you need to validate.,
									required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
									type: 'string',
									max: 16,
									min: 6
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
						<label class="col-xl-6">Confirm Password:*</label>
						<Textbox
							id={'confpwd'}
							classNameInput="form-control"
							value={confpwd}
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="confpwd"
							type="password"
							// value={name}
							disabled={false}
							placeholder="**********"
							validate={validate}
							validationCallback={(res) => this.setState({ hasConfirmPwdError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'Confirm Password',
								check: true,
								required: true,
								type: 'string',
								max: 16,
								min: 6,
								customFunc: (res) => {
									if (res != this.state.pwd) {
										console.log(res);
										return 'Confirm Password does not match';
									}
									return true;
								}
							}}
						/>
					</div>
					</div>
					:null}

					<div class={width ? 'd-none' : 'w-100'}>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
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
								value={UserName}
								disabled={false}
								placeholder=""
								validate={validate}
								validationCallback={(res) => this.setState({ hasUserNameError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'User Name',
									check: true,
									required: true,
									type: 'string'

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">E-mail Address:</label>
							<Textbox
								id={'email'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="email"
								type="text"
								value={email}
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
									//     const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
									//     if (reg.test(String(email).toLowerCase())) {
									//         return true;
									//     } else {
									//         return 'Enter a valid email address';
									//     }
									// }

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Address:</label>
							<Textarea
								id={'Address'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="Address"
								type="text"
								value={Address}
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

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Country:</label>
							<Textbox
								id={'Country'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="Country"
								type="text"
								value={Country}
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

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Primary Skills:</label>
							<Textbox
								id={'PrimarySkills'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="PrimarySkills"
								type="text"
								value={PrimarySkills}
								disabled={false}
								placeholder=""
								validate={validate}
								validationCallback={(res) =>
									this.setState({ hasPrimarySkillsError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'PrimarySkills',
									check: true,
									required: false,
									type: 'string'

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Additional Skills:</label>
							<Textbox
								id={'AdditionalSkills'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="AdditionalSkills"
								type="text"
								value={AdditionalSkills}
								disabled={false}
								placeholder=""
								validate={validate}
								validationCallback={(res) =>
									this.setState({ hasAdditionalSkillsError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'AdditionalSkills',
									check: true,
									required: false,
									type: 'string'

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Other Skills:</label>
							{/* <div class="d-block col-xl-6 col-sm-6 xs-d-block pl-0"> */}
							<Textbox
								id={'OtherSkills'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0,
									marginBottom: 22
								}}
								name="OtherSkills"
								type="text"
								value={OtherSkills}
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

									//msgOnError: "Error",
								}}
							/>
							{/* </div> */}
						</div>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block ">
						<label class="col-xl-6">Upload Passport/WP/ID/Documents:</label>
						{/* <div class="d-block col-xl-6 col-sm-6 xs-d-block pl-0"> */}
						<div class="row col-xl-6">
							{/* <label class="mr-2 mt-1">Upload file:</label> */}
							<input
								class="w-100"
								type="file"
								id="file"
								name="file"
								key={this.state.inputKey}
								onChange={this.onFileUpload}
							/>
						</div>
					</div>
					<div class={width ? 'd-none' : 'w-100'}>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Experience:</label>
							<div class="d-flex col-xl-6">
								<select
									class="form-control mr-3 exp_year col-xl-3"
									id="ExpInYear"
									onChange={(e) => this.handleExp(e)}
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
								>
									<option value="0 Months" selected>
										0 Months
									</option>
									<option value="1 Months">1 Months</option>
									<option value="2 Months">2 Months</option>
									<option value="3 Months">3 Months</option>
								</select>
							</div>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Current Employment:</label>
							<Textbox
								id={'CurrentEmp'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="CurrentEmp"
								type="text"
								value={CurrentEmp}
								disabled={false}
								placeholder=""
								validate={validate}
								validationCallback={(res) =>
									this.setState({ hasCurrentEmpError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'CurrentEmp',
									check: true,
									required: false,
									type: 'string'

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Current Salary:</label>
							<Textbox
								id={'CurrentSal'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="CurrentSal"
								type="text"
								value={CurrentSal}
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

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Expected Salary:</label>
							<Textbox
								id={'ExpSal'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="ExpSal"
								type="text"
								value={ExpSal}
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

									//msgOnError: "Error",
								}}
							/>
						</div>
						<div class="form-group d-flex col-xl-12 xs-d-block ">
							<label class="col-xl-6">Joining Date:</label>
							<Textbox
								id={'JoinDate'}
								classNameInput="form-control"
								classNameWrapper="col-xl-6"
								customStyleWrapper={{
									padding: 0
								}}
								name="JoinDate"
								type="text"
								value={JoinDate}
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

									//msgOnError: "Error",
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
					{/* <div className="w-50">
        <Camera
		  onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
		  idealResolution = {{width: 840, height: 640}}
		  onClick={this.onFileUpload}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isSilentMode = {true}
          isDisplayStartCameraError = {true}
          isFullscreen = {false}
          sizeFactor = {1}
        />
      </div> */}
					<div class="submit_btn mt-5 mb-5">
						<button type="submit" class="btn btn-primary btn-style" onClick={this.validateForm}>
							Submit
						</button>
					</div>
				</div>
				<input type="submit" style={{ display: 'none' }} />
			</form>
		);
	}
}

export default RegisterJobseeker;
