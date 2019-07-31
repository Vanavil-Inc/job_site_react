import React, { Component } from "react";
import axios from "axios";
import { isEmail, isEmpty, isLength, isContainWhiteSpace,isValidNumber } from '../validation/validator';
import { Redirect } from 'react-router';

class RegisterJobseeker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      ExpInMonth: "0 Months",
      ExpInYear: "0 Years",
      UserType:"999",
      chkbx_overtime: true,
      chkbx_accom: true,
      chkbx_air_tkt: true,
      Status: "Active",
      DocDirPath:""
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let { formData } = this.state;
    formData[name] = value;

    this.setState({
      formData: formData
    });
  };
 
  handleExp(e) {
    if (e.target.id === "ExpInYear") {
      this.setState({
        ExpInYear: e.target.value
       });
    } else {
      this.setState({
        ExpInMonth: e.target.value
       });
    }
  }
  handleJobType(e) {
    if (e.target.id === "over-time") {
        this.setState({
         chkbx_overtime: e.target.checked ? true : false
        });
    } else if (e.target.id === "accomodation") {
        this.setState({
          chkbx_accom: e.target.checked ? true : false
        });
    } else {
        this.setState({
         chkbx_air_tkt: e.target.checked ? true : false
        });
      }
    }

  onFileUpload = e =>{
    console.log(e.target.files[0])
    this.setState({
      DocDirPath: e.target.files[0].name
    })
  }
  registerJobseeker = e => {
    e.preventDefault();
    const { formData } = this.state;
    formData["UserType"] = this.state.UserType;
    formData["ExpInYear"] = this.state.ExpInYear;
    formData["ExpInMonth"] = this.state.ExpInMonth;
    formData["OverTime"] = this.state.chkbx_overtime;
    formData["Accommodation"] = this.state.chkbx_accom;
    formData["AirTicket"] = this.state.chkbx_air_tkt;
    formData["Status"] = this.state.Status;
    formData["DocDirPath"] = this.state.DocDirPath;

    let Config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post("http://localhost:8081/api/jobseeker", formData, Config)
      .then((response) => {
        console.log(response);
        console.log("success" + response.data.success);
        this.setState({
          success : response.data.success
        })
        if(response.data.success){
            this.setState({
              toLogin: true
            })
          } else {
            this.setState({
              responseMsg : response.data.message
            })
            window.scrollTo(0, 0)
          }
      })
      .catch(error => {
        console.log(error);
      });
    console.log(formData);
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

  render() {
    if (this.state.toLogin === true) {
      return <Redirect to='/' />
    }
    // const { errors, formSubmitted } = this.state;
    return (
      <form onSubmit={this.registerJobseeker}>
      
        <div class="row ml-4 mr-4">
        {this.renderError()}
          <div class="form-group d-flex col-xl-12 xs-d-block">
            <label class="col-xl-6">User ID / Hand Phone Number:*</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="UserId" 
              placeholder="Enter 8 digit hand phone number"
              onChange={this.handleInputChange}
              name="UserId"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Password:*</label>
            <input
              type="password"
              class="form-control col-xl-6"
              id="Password"
              placeholder="**********"
              onChange={this.handleInputChange}
              name="Password"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Confirm Password:*</label>
            <input
              type="password"
              class="form-control col-xl-6"
              id="confpwd"
              placeholder="**********"
              name="confpwd"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Full Name:*</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="UserName"
              placeholder="Employer User's Name"
              onChange={this.handleInputChange}
              name="UserName"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">E-mail Address:</label>
            <input
              type="email"
              class="form-control col-xl-6"
              id="email"
              placeholder="ex: myname@eaxmple.com"
              onChange={this.handleInputChange}
              name="email"
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Address:</label>
            <textarea
              type="text"
              class="form-control col-xl-6"
              rows="3"
              id="Address"
              placeholder=""
              onChange={this.handleInputChange}
              name="Address"
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Country:</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="Country"
              placeholder=""
              onChange={this.handleInputChange}
              name="Country"
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Primary Skills:</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="PrimarySkills"
              placeholder=""
              onChange={this.handleInputChange}
              name="PrimarySkills"
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Additional Skills:</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="AdditionalSkills"
              placeholder=""
              onChange={this.handleInputChange}
              name="AdditionalSkills"
            />
          </div>
          <div class="form-group d-flex col-xl-12 col-sm-12 xs-d-block ">
            <label class="col-xl-6 col-sm-6">Other Skills:</label>
            <div class="d-block col-xl-6 col-sm-6 xs-d-block pl-0">
            <input
              type="text"
              class="form-control col-xl-3 col-sm-3 oth-skills"
              id="OtherSkills"
              placeholder=""
              onChange={this.handleInputChange}
              name="OtherSkills"
            />
              <div class="row col">
              <label class="mr-2 mt-1">Upload file:</label>
                <input type="file" id="myFile" name="DocDirPath" onChange={this.onFileUpload}/>
               </div>
            </div>
          </div>
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
            <input
              type="text"
              class="form-control col-xl-6"
              id="CurrentEmp"
              placeholder=""
              onChange={this.handleInputChange}
              name="CurrentEmp"
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Current Salary:</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="CurrentSal"
              placeholder=""
              onChange={this.handleInputChange}
              name="CurrentSal"
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Expected Salary:</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="ExpSal"
              placeholder=""
              onChange={this.handleInputChange}
              name="ExpSal"
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block ">
            <label class="col-xl-6">Joining Date:</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="JoinDate"
              placeholder=""
              onChange={this.handleInputChange}
              name="JoinDate"
            />
          </div>

          <div class="col-12 d-flex ml-3 mt-2 w-100 xs-d-block">
            <div class="form-check col-xl-4">
              <label class="form-check-label">
                <input type="checkbox" id="over-time" class="form-check-input" value=""
                onChange={(e) => this.handleJobType(e)} />
                Prefer Over-time
              </label>
            </div>
            <div class="form-check col-xl-4">
              <label class="form-check-label">
                <input type="checkbox" id="accomodation" class="form-check-input" value="" 
                onChange={(e) => this.handleJobType(e)}/>
                Required Accommodation
              </label>
            </div>
            <div class="form-check col-xl-4">
              <label class="form-check-label">
                <input type="checkbox" id="air-ticket" class="form-check-input"
                 value="" onChange={(e) => this.handleJobType(e)} />
                Air-ticket by Agency
              </label>
            </div>
          </div>
          <div class="submit_btn mt-5 mb-5">
            <button type="submit" class="btn btn-primary btn-style">
              Submit
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default RegisterJobseeker;
