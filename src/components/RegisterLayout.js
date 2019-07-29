import React, { Component } from "react";
import RegisterEmployer from "./RegisterEmployer";
import RegisterJobseeker from "./RegisterJobseeker";

class RegisterLayout extends Component {
  constructor(props) {
    super(props);
    this.handleRegisterType = this.handleRegisterType.bind(this);

    this.state = {
      switchStatus: false
    };
  }

  handleRegisterType(e) {
    if(e.target.id === "jobSeeker"){
      this.setState({
        switchStatus: !this.state.switchStatus
      });
    } else {
      this.setState({
        switchStatus: !this.state.switchStatus
      });
    }
  }

  render() {
    const view = this.state.switchStatus ? (
      <RegisterEmployer />
    ) : (
      <RegisterJobseeker />
    );
    console.log("==render=" + this.state.switchStatus);

    return (
      <div class="container section">
        <div class="text-center innerpage_heading mb-3">
          <h5 class="title">Registration</h5>
        </div>
        <div class="container form-backrd">
          <div class="row xs-reg-type">
            <label class="col mt-4 ml-5 font-weight-bold">
              Registration Type
            </label>
            <div class="registertype_section col mt-4 ">
              <div class="form-check col">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    id="jobSeeker"
                    class="form-check-input chk-type"
                    checked={this.state.switchStatus ? false : true}
                    onChange={(e) => this.handleRegisterType(e)}
                  />
                  <h6 class="checkbox-txt font-weight-normal">Job Seeker</h6>
                </label>
              </div>
              <div class="form-check col">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    id="employer"
                    class="form-check-input chk-type"
                    checked={this.state.switchStatus ? true : false}
                    onChange={(e) => this.handleRegisterType(e)}
                  />
                  <h6 class="checkbox-txt font-weight-normal">Employer</h6>
                </label>
              </div>
            </div>
          </div>

          <div>
            <hr />
          </div>
          <small class="text-muted ml-5 mb-3 d-block">* Mandatory fields</small>
          <div>{view}</div>
        </div>
      </div>
    );
  }
}

export default RegisterLayout;
