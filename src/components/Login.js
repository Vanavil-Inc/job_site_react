import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AuthService from './AuthService';
import { Textbox, Textarea, Checkbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			formData: {},
			UserId: '',
			Password: '',
			hasPasswordError: true,
			hasUserIdError: true,
			isexpired: false
		};
		this.validateLogin = this.validateLogin.bind(this);
		this.login = this.login.bind(this);
		this.Auth = new AuthService();
	}

	toggleValidating(validate) {
		this.setState({ validate });
	}

	validateLogin(e) {
		e.preventDefault();
		this.toggleValidating(true);
		const { hasUserIdError, hasPasswordError } = this.state;
		if (!hasUserIdError && !hasPasswordError) {
			e.preventDefault();
			this.login(e);
		}
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

	login = (e) => {
		e.preventDefault();

		const { formData } = this.state;
		formData['deviceWidth'] = window.innerWidth;

		// console.log('fomrdata ' + JSON.stringify(formData));
		// console.log('formData ' + formData.UserId);

		this.Auth
			.login(formData.UserId, formData.Password, formData.deviceWidth)
			.then((res) => {
				console.log(res);
				this.setState({
					success: res.success
				});
				if (res.success) {
					this.setState({
						toDashboard: true
					});
				} else {
					this.setState({
						responseMsg: res.message
					});
				}
			})
			.catch((err) => {
				console.log(err);
			});
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

	render() {
		const { UserId, Password, validate } = this.state;
		if (this.state.toDashboard === true) {
			return <Redirect to="/dashboard" />;
		}

		return (
			<div class="container">
				<form onSubmit={this.validateLogin}>
					<div class="row login_form mb-4">
						{this.renderError()}
						<div class="form-group mr-3 phone_input">
							<label class="mb-2 mr-2">Phone Number:</label>
							<Textbox
								// tabIndex="1" // Optional.[String or Number].Default: none.
								id={'UserId'} // Optional.[String].Default: "".  Input ID.
								classNameInput="form-control pl-2"
								customStyleWrapper={{
									padding: 0
								}}
								value={UserId}
								name="UserId"
								type="number"
								minLength={8}
								maxLength={12}
								// value={name}
								disabled={false}
								placeholder="Enter Phone Number"
								validate={validate}
								validationCallback={(res) => this.setState({ hasUserIdError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'Phone Number', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
									check: true, // Optional.[Bool].Default: true. To determin if you need to validate.,
									required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
									type: 'string',
									max: 12,
									min: 8
								}}
							/>
						</div>
						<div class="form-group mr-2 pass_input">
							<label class="mb-2 mr-2">Password:</label>
							<Textbox
								// tabIndex="1" // Optional.[String or Number].Default: none.
								id={'Password'} // Optional.[String].Default: "".  Input ID.
								classNameInput="form-control pl-2"
								customStyleWrapper={{
									padding: 0
								}}
								value={Password}
								name="Password"
								type="password"
								// value={name}
								disabled={false}
								placeholder="Enter Password"
								validate={validate}
								validationCallback={(res) => this.setState({ hasPasswordError: res, validate: false })}
								onChange={(name, e) => this.handleInputChange(e, name)}
								onBlur={(e) => {}}
								validationOption={{
									name: 'Password', // Optional.[String].Default: "". To display in the Error message. i.e Please enter your ${name}.
									check: true, // Optional.[Bool].Default: true. To determin if you need to validate.,
									required: true, // Optional.[Bool].Default: true. To determin if it is a required field.
									type: 'string'
								}}
							/>
						</div>
						<div class="form-group form-check mb-2 chkbox_rem">
							<Checkbox
								tabIndex="5" //Optional.[String or Number].Default: none.
								id={'remember'} //Optional.[String].Default: "".  Input ID.
								name={'remember'} //Optional.[String].Default: "". Input name
								value="remember" //Required.[String].Default: "".
								checked={false} //Required.[Bool].Default: false.
								disabled={false} //Optional.[Bool].Default: false.
								//validate={validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
								classNameInputBox="form-check-input mb-0"
								classNameWrapper=""
								validationCallback={(res) =>
									this.setState({
										hasAgreementError: res,
										validate: false
									})} //Optional.[Func].Default: none. Return the validation result.
								// onChange={(e) => this.handleRegisterType(e)}  //Required.[Func].Default: () => {}. Will return the value.
								labelHtml={
									<div class="form-check-label mr-3" style={{ marginTop: 8 }}>
										Remember Me
									</div>
								}
								validationOption={{
									name: 'agreement', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
									check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
									required: false //Optional.[Bool].Default: true. To determin if it is a required field.
								}}
							/>
						</div>
						<button type="submit" class="btn btn-primary btn-style" onClick={this.validateLogin}>
							Submit
						</button>
					</div>
					<input type="submit" style={{ display: 'none' }} />
				</form>
			</div>
		);
	}
}

export default Login;
