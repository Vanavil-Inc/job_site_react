import React, { Component } from 'react';
import RegisterEmployer from './RegisterEmployer';
import RegisterJobseeker from './RegisterJobseeker';
import Header from './Header';
import Footer from './Footer';
import { Checkbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';

class RegisterLayout extends Component {
	constructor(props) {
		super(props);
		this.handleRegisterType = this.handleRegisterType.bind(this);

		this.state = {
      switchStatus: false,
      adminType: localStorage.getItem('UserType'),
      pageType: localStorage.getItem('PAGETYPE')
		};
	}

  componentDidMount(){
		document.title = "Job Portal - Registration"
  }
  
	handleRegisterType = (e) => {
		const target = e.target;
		// const value = target.value;
		// const name = target.name;
		// console.log(value);
		if (e.target === 'JobSeeker') {
			this.setState({
				switchStatus: !this.state.switchStatus
			});
		} else {
			this.setState({
				switchStatus: !this.state.switchStatus
			});
		}
	};

	render() {
		const view = this.state.switchStatus ? <RegisterEmployer /> : <RegisterJobseeker />;

		return (
			<div>
				<Header />
				<div class="container section">
        {(this.state.adminType==='001' && this.state.pageType==="REGISTER")|| this.state.pageType==="REGISTER"?
					<div class="text-center innerpage_heading mb-3">
						<h5 class="title">Registration</h5>
					</div> : <div class="text-center innerpage_heading mb-3">
						<h5 class="title">Profile Edit</h5>
					</div>}
					<div class="container form-backrd">
						<div class="row xs-reg-type">
							<label class="col mt-4 ml-5 font-weight-bold">Registration Type</label>
							<div class="registertype_section col mt-3 ">
								<Checkbox
									tabIndex="5" //Optional.[String or Number].Default: none.
									id={'jobSeeker'} //Optional.[String].Default: "".  Input ID.
									name={'jobSeeker'} //Optional.[String].Default: "". Input name
									value="jobSeeker" //Required.[String].Default: "".
									checked={this.state.switchStatus ? false : true} //Required.[Bool].Default: false.
									disabled={false} //Optional.[Bool].Default: false.
									//validate={validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
									classNameInputBox="form-check-input chk-type"
									classNameWrapper="form-check col"
									validationCallback={(res) =>
										this.setState({
											hasAgreementError: res,
											validate: false
										})} //Optional.[Func].Default: none. Return the validation result.
									onChange={(e) => this.handleRegisterType(e)} //Required.[Func].Default: () => {}. Will return the value.
									labelHtml={
										<div class="form-check-label" style={{ marginTop: 8 }}>
											JobSeeker
										</div>
									}
									validationOption={{
										name: 'agreement', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
										check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
										required: false //Optional.[Bool].Default: true. To determin if it is a required field.
									}}
								/>
								<Checkbox
									tabIndex="5" //Optional.[String or Number].Default: none.
									id={'employer'} //Optional.[String].Default: "".  Input ID.
									name={'employer'} //Optional.[String].Default: "". Input name
									value="employer" //Required.[String].Default: "".
									checked={this.state.switchStatus ? true : false} //Required.[Bool].Default: false.
									disabled={false} //Optional.[Bool].Default: false.
									//validate={validate} //Optional.[Bool].Default: false. If you have a submit button and trying to validate all the inputs of your form at once, toggle it to true, then it will validate the field and pass the result via the "validationCallback" you provide.
									classNameInputBox="form-check-input chk-type"
									classNameWrapper="form-check col"
									validationCallback={(res) =>
										this.setState({
											hasAgreementError: res,
											validate: false
										})} //Optional.[Func].Default: none. Return the validation result.
									onChange={(e) => this.handleRegisterType(e)} //Required.[Func].Default: () => {}. Will return the value.
									labelHtml={
										<div class="form-check-label" style={{ marginTop: 8 }}>
											Employer
										</div>
									}
									validationOption={{
										name: 'employer', //Optional.[String].Default: "". To display in the Error message. i.e Please check the ${name}.
										check: false, //Optional.[Bool].Default: true. To determin if you need to validate.
										required: false //Optional.[Bool].Default: true. To determin if it is a required field.
									}}
								/>
							</div>
						</div>

						<div>
							<hr />
						</div>
						<small class="text-muted ml-5 mb-3 d-block">* Mandatory fields</small>
						<div>{view}</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default RegisterLayout;
