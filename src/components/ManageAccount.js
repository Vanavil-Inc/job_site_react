import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AlertComponent from './Alert';
import AuthService from './AuthService';

class ManageAccount extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {},
			UserId: localStorage.getItem('UserId'),
			CurrentPassword: '',
			inputKey: Date.now(),
			Password: '',
			confpwd: '',
			validate: false,
			successResp: true,
			hasPasswordError: true,
			hasConfirmPwdError: true,
			hasCurrentPasswordError: true
		};
		this.validateForm = this.validateForm.bind(this);
		this.alert = React.createRef();
		this.Auth = new AuthService();
	}

	componentDidMount(){
		document.title = "Job Portal - Manage Account"
	}

	componentWillMount() {
		if (!this.Auth.loggedIn()) {
			this.setState({
				isLoggedIn: false
			});
			this.Auth.logout();
		}
	}

	toggleValidating(validate) {
		this.setState({ validate });
	}

	validateForm(e) {
		console.log('validated enetered');
		e.preventDefault();
		this.toggleValidating(true);
		const { hasPasswordError, hasConfirmPwdError, hasCurrentPasswordError } = this.state;
		if (!hasPasswordError && !hasConfirmPwdError && !hasCurrentPasswordError) {
			e.preventDefault();
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className="react-confirm-alert-body w-100">
							<h6 class="text-center mb-4 text-dark font-weight-bold">Are you sure you want to save</h6>
							<div class="text-center">
								<button class="mr-4 btn btn-secondary" onClick={onClose}>
									Cancel
								</button>
								<button
									class="btn btn-primary"
									onClick={() => {
										this.manageAccount(e);
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
	triggerAlert() {
		this.alert.current.enableMessageView();
	}

	manageAccount = (e) => {
		console.log('manageacccount enetered');
		e.preventDefault();
		const { formData } = this.state;

		formData['UserId'] = this.state.UserId;

		console.log(formData);

		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		axios
			.put(`${this.Auth.domain}/manageaccount`, formData, Config)
			.then((response) => {
				console.log(response);

				this.setState({
					success: true,
					successResp: response.data.success,
					responseMsg: response.data.message,
					inputKey: Date.now()
				});
				this.triggerAlert();

				if (this.props.onChange) this.props.onChange(null);
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				console.log(error);
			});
		console.log(formData);
	};

	render() {
		if (this.state.isLoggedIn == false) {
			return <Redirect to="/" />;
		}
		const { CurrentPassword, Password, confpwd, validate } = this.state;
		return (
			<div>
				<Header />
				<form onSubmit={this.validateForm}>
					<div class="container section">
						<div class="text-center innerpage_heading mb-3">
							<h5 class="title">Manage Account</h5>
						</div>
						{this.state.success ? (
							<AlertComponent
								ref={this.alert}
								message={this.state.responseMsg}
								className={
									this.state.successResp ? (
										'alert-success d-block alert success-message mr-4'
									) : (
										'd-block alert success-message mr-4 alert-danger'
									)
								}
							/>
						) : null}
						<div class="container form-backrd">
							<div class="row ml-4 mr-4 pt-4" key={this.state.inputKey}>
								<div class="form-group d-flex col-xl-12 xs-d-block ">
									<label class="col-xl-6">Current Password:*</label>
									<Textbox
										// tabIndex="1" // Optional.[String or Number].Default: none.
										id={'CurrentPassword'} // Optional.[String].Default: "". Input ID.
										classNameInput="form-control"
										classNameWrapper="col-xl-6"
										customStyleWrapper={{
											padding: 0
										}}
										value={CurrentPassword}
										name="CurrentPassword"
										type="password"
										// value={name}
										disabled={false}
										placeholder="**********"
										validate={validate}
										validationCallback={(res) =>
											this.setState({ hasCurrentPasswordError: res, validate: false })}
										onChange={(name, e) => this.handleInputChange(e, name)}
										onBlur={(e) => {}}
										validationOption={{
											name: 'Current Password', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
											check: true, // Optional.[Bool].Default: true. To determin if you need to validate.,
											required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
											type: 'string',
											max: 16,
											min: 6
										}}
									/>
								</div>
								<div class="form-group d-flex col-xl-12 xs-d-block ">
									<label class="col-xl-6">New Password:*</label>
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

								<div class="submit_btn mt-5 mb-5">
									<button type="submit" class="btn btn-primary btn-style" onClick={this.validateForm}>
										Submit
									</button>
								</div>
							</div>
						</div>
					</div>
					<input type="submit" style={{ display: 'none' }} />
				</form>
				<Footer />
			</div>
		);
	}
}

export default ManageAccount;
