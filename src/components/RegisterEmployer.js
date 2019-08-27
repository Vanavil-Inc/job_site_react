import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { Textbox, Textarea } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import '../index.css';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import AuthService from './AuthService';

class RegisterEmployer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {},
			UserId: '',
			Password: '',
			confpwd: '',
			Organisation: '',
			Address: '',
			MOM: '',
			UserName: '',
			email: '',
			Country: '',
			UserType: '002',
			Status: 'Active',
			validate: false,
			hasPasswordError: true,
			hasUserIdError: true,
			hasConfirmPwdError: true,
			hasMOMError: true,
			hasOrganisationError: true,
			hasUserNameError: true,
			hasEmailError: true,
			hasAddressError: true,
			hasCountryError: true,
			adminType: localStorage.getItem('UserType'),
			pageType: localStorage.getItem('PAGETYPE')
		};
		this.validateForm = this.validateForm.bind(this);
		this.register = this.register.bind(this);
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
			hasMOMError,
			hasOrganisationError,
			hasEmailError,
			hasAddressError,
			hasCountryError,
			hasUserNameError
		} = this.state;
		if (
			!hasUserIdError &&
			!hasPasswordError &&
			!hasConfirmPwdError &&
			!hasMOMError &&
			!hasOrganisationError &&
			!hasUserNameError &&
			!hasEmailError &&
			!hasAddressError &&
			!hasCountryError
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
										this.register(e);
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
			//this.register(e);
		}
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		let { formData } = this.state;
		formData[name] = value;

		if (target.name == 'Password') {
			this.setState({
				pwd: target.value
			});
		}

		this.setState({
			formData: formData
		});
	};

	register = (e) => {
		e.preventDefault();
		const { formData } = this.state;
		formData['UserType'] = this.state.UserType;
		formData['Status'] = this.state.Status;

		this.setState({
			formData: formData
		});

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
						defaultRegister: true
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

		console.log(formData);
	};

	getProfile = () => {
		const { formData } = this.state;
		formData['UserId'] = formData.UserId;
		formData['UserType'] = this.state.UserType;
		this.setState({
			formData: formData
		});
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
						{this.state.defaultRegister === true ? this.state.adminType === '001' ? null : (
							<Link to="/"> Please Login</Link>
						) : null}
					</strong>
				</div>
			);
		}
	}

	render() {
		const {
			UserId,
			Password,
			confpwd,
			Organisation,
			MOM,
			UserName,
			email,
			Address,
			Country,
			validate
		} = this.state;
		// const profileData = this.state.profileData[0].UserId;
		// console.log(profileData);
		const searchRegister =
			(this.state.adminType === '001' && this.state.pageType === 'REGISTER') ||
			this.state.pageType === 'REGISTER';
		return (
			<form onSubmit={this.validateForm}>
				<div class="row ml-4 mr-4">
					{this.renderError()}
					{this.renderSucsessMsg()}
					<div class="form-group d-flex col-xl-12 xs-d-block">
						<label class="col-xl-6">User ID / Hand Phone Number:*</label>
						<div class={searchRegister ? 'col-xl-12 pl-0' : 'form-group d-flex col-xl-6 pl-0 xs-d-block'}>
							<Textbox
								// tabIndex="1" // Optional.[String or Number].Default: none.
								id={'UserId'} // Optional.[String].Default: "".  Input ID.
								classNameInput="form-control"
								classNameWrapper={searchRegister ? 'col-xl-6' : 'col-xl-10 col-lg-9 col-md-8'}
								customStyleWrapper={{
									padding: 0
								}}
								value={UserId}
								name="UserId"
								type="number"
								maxLength={8}
								disabled={false}
								placeholder="Enter 8 digit hand phone number"
								validate={validate}
								validationCallback={(res) => this.setState({ hasUserIdError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'UserId', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
									check: true, // Optional.[Bool].Default: true. To determin if you need to validate.,
									required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
									type: 'string',
									max: 8,
									min: 8
								}}
							/>
							<div
								class={
									this.state.adminType === '001' && this.state.pageType === 'PROFILEEDIT' ? (
										'submit_btn col-xl-2 w-proEdit-100'
									) : (
										' d-none'
									)
								}
							>
								<button type="submit" class="btn btn-primary proEdit-btn" onClick={this.getProfile}>
									Search
								</button>
							</div>
						</div>
					</div>
					{(this.state.adminType === '001' && this.state.pageType === 'REGISTER') ||
					this.state.pageType === 'REGISTER' ? (
						<div class="w-100">
							<div class="form-group d-flex col-xl-12 xs-d-block">
								<label class="col-xl-6">Password:*</label>
								<Textbox
									id={'Password'}
									classNameInput="form-control"
									classNameWrapper="col-xl-6"
									customStyleWrapper={{
										padding: 0
									}}
									value={Password}
									name="Password"
									type="password"
									disabled={false}
									placeholder="**********"
									validate={validate}
									validationCallback={(res) =>
										this.setState({ hasPasswordError: res, validate: false })}
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
							<div class="form-group d-flex col-xl-12 xs-d-block">
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
									disabled={false}
									placeholder="**********"
									validate={validate}
									validationCallback={(res) =>
										this.setState({ hasConfirmPwdError: res, validate: false })}
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
					) : null}

					<div class="form-group d-flex col-xl-12 xs-d-block">
						<label class="col-xl-6">Name of the Organisation:*</label>
						<Textbox
							id={'Organisation'}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="Organisation"
							type="text"
							value={Organisation}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasOrganisationError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'Organisation',
								check: true,
								required: true,
								type: 'string'
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block">
						<label class="col-xl-6">MOM Registration Number:*</label>
						<Textbox
							id={'MOM'}
							classNameInput="form-control"
							classNameWrapper="col-xl-6"
							customStyleWrapper={{
								padding: 0
							}}
							name="MOM"
							type="text"
							value={MOM}
							disabled={false}
							placeholder=""
							validate={validate}
							validationCallback={(res) => this.setState({ hasMOMError: res, validate: false })}
							onChange={(name, e) => this.handleInputChange(e, name)}
							onBlur={(e) => {}}
							validationOption={{
								name: 'MOM',
								check: true,
								required: true,
								type: 'string'
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block">
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
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block">
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
								// customFunc: email => {
								//   const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
								//   if (reg.test(String(email).toLowerCase())) {
								//     return true;
								//   } else {
								//     return "Enter a valid email address";
								//   }
								// }
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block">
						<label class="col-xl-6">Address:*</label>
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
								required: true,
								type: 'string'
							}}
						/>
					</div>
					<div class="form-group d-flex col-xl-12 xs-d-block">
						<label class="col-xl-6">Country:*</label>
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
								required: true,
								type: 'string'
							}}
						/>
					</div>
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
export default RegisterEmployer;
