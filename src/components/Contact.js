import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { Textbox, Textarea, Select, Checkbox } from 'react-inputs-validation';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import AlertComponent from './Alert';
import AuthService from './AuthService';

class Contact extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {},
			UserId: '',
			UserName: '',
			email: '',
			TypeOfService: '',
			Message: '',
			validate: false,
			hasTypeOfServiceError: true,
			hasUserIdError: true,
			hasMessageError: true,
			hasUserNameError: true,
			hasEmailError: true
		};
		this.validateForm = this.validateForm.bind(this);
		this.conatactSubmit = this.conatactSubmit.bind(this);
		this.alert = React.createRef();
		this.Auth = new AuthService();
	}

	componentDidMount(){
		document.title = "Job Portal - Contact"
	}

	toggleValidating(validate) {
		this.setState({ validate });
	}

	validateForm(e) {
		e.preventDefault();
		this.toggleValidating(true);
		const { hasUserIdError, hasMessageError, hasTypeOfServiceError, hasEmailError, hasUserNameError } = this.state;
		if (!hasUserIdError && !hasMessageError && !hasTypeOfServiceError && !hasUserNameError && !hasEmailError) {
			e.preventDefault();
			confirmAlert({
				customUI: ({ onClose }) => {
					return (
						<div className="react-confirm-alert-body w-100">
							<h6 class="text-center mb-4 text-dark font-weight-bold">
								Are you sure you want to Submit?
							</h6>
							<div class="text-center">
								<button class="mr-4 btn btn-secondary" onClick={onClose}>
									Cancel
								</button>
								<button
									class="btn btn-primary"
									onClick={() => {
										this.conatactSubmit(e);
										onClose();
									}}
								>
									Send
								</button>
							</div>
						</div>
					);
				}
			});
			//this.registerJobseeker(e);
		}
	}

	triggerAlert() {
		this.alert.current.enableMessageView();
	}

	handleInputChange = (event) => {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		let { formData } = this.state;
		formData[name] = value;

		this.setState({
			formData: formData
		});
	};

	conatactSubmit = (e) => {
		e.preventDefault();
		const { formData } = this.state;

		let Config = {
			headers: {
				'Content-Type': 'application/json;charset=UTF-8',
				'Access-Control-Allow-Origin': '*'
			}
		};

		axios
			.post(`${this.Auth.domain}/contact`, formData, Config)
			.then((response) => {
				console.log(response);
				this.setState({
					success: true,
					successResp: response.data.success,
					responseMsg: response.data.message,
					inputKey: Date.now()
				});
				this.triggerAlert();
				window.scrollTo(0, 0);
			})
			.catch((error) => {
				console.log(error);
			});
		console.log(formData);
	};

	render() {
		const { UserId, Message, UserName, email, TypeOfService, validate } = this.state;
		return (
			<div>
				<Header />
				<form onSubmit={this.validateForm}>
					<div class="container section">
						<div class="text-center innerpage_heading mb-3">
							<h5 class="title">Contact</h5>
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
						<div class="container form-backrd">
							<div class="row ml-4 mr-4">
								<small class="text-muted ml-4 mt-4 d-block">* Mandatory fields</small>

								<div class="form-group d-flex col-xl-12 xs-d-block ">
									<label class="col-xl-6 mt-4">Name:*</label>
									<Textbox
										id={'UserName'}
										classNameInput="form-control mt-4"
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
										validationCallback={(res) =>
											this.setState({ hasUserNameError: res, validate: false })}
										onChange={(name, e) => this.handleInputChange(e, name)}
										onBlur={(e) => {
											console.log(e);
										}}
										validationOption={{
											name: 'Name',
											check: true,
											required: true,
											type: 'string'

											//msgOnError: "Error",
										}}
									/>
								</div>
								<div class="form-group d-flex col-xl-12 xs-d-block">
									<label class="col-xl-6 ">Phone Number:*</label>
									<Textbox
										id={'UserId'}
										classNameInput="form-control "
										classNameWrapper="col-xl-6"
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
										validationCallback={(res) =>
											this.setState({ hasUserIdError: res, validate: false })}
										onChange={(name, e) => this.handleInputChange(e, name)}
										onBlur={(e) => {
											console.log(e);
										}}
										validationOption={{
											name: 'Phone Number',
											check: true,
											required: true,
											type: 'string',
											max: 8,
											min: 8
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
										validationCallback={(res) =>
											this.setState({ hasEmailError: res, validate: false })}
										onChange={(name, e) => this.handleInputChange(e, name)}
										onBlur={(e) => {
											console.log(e);
										}}
										validationOption={{
											name: 'Email',
											check: true,
											required: false,
											type: 'string'
											/* customFunc: (email) => {
                        const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (reg.test(String(email).toLowerCase())) {
                          return true;
                        } else {
                          return 'Enter a valid email address';
                        }
                      } */

											//msgOnError: "Error",
										}}
									/>
								</div>
								<div class="form-group d-flex col-xl-12 xs-d-block ">
									<label class="col-xl-6">Type Of Service:</label>
									<Textbox
										id={'TypeOfService'}
										classNameInput="form-control"
										classNameWrapper="col-xl-6"
										customStyleWrapper={{
											padding: 0
										}}
										name="TypeOfService"
										type="text"
										value={TypeOfService}
										disabled={false}
										placeholder=""
										validate={validate}
										validationCallback={(res) =>
											this.setState({ hasTypeOfServiceError: res, validate: false })}
										onChange={(name, e) => this.handleInputChange(e, name)}
										onBlur={(e) => {
											console.log(e);
										}}
										validationOption={{
											name: 'Type Of Service',
											check: true,
											required: false,
											type: 'string'

											//msgOnError: "Error",
										}}
									/>
								</div>
								<div class="form-group d-flex col-xl-12 xs-d-block ">
									<label class="col-xl-6">Message:*</label>
									<Textarea
										id={'Message'}
										classNameInput="form-control"
										classNameWrapper="col-xl-6"
										customStyleWrapper={{
											padding: 0
										}}
										name="Message"
										type="text"
										value={Message}
										disabled={false}
										placeholder=""
										validate={validate}
										validationCallback={(res) =>
											this.setState({ hasMessageError: res, validate: false })}
										onChange={(name, e) => this.handleInputChange(e, name)}
										onBlur={(e) => {
											console.log(e);
										}}
										validationOption={{
											name: 'Message',
											check: true,
											required: true,
											type: 'string'

											//msgOnError: "Error",
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

export default Contact;
