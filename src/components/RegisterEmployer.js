import React, { Component } from "react";
import {
  isEmail,
  isEmpty,
  isLength,
  isContainWhiteSpace,
  isValidNumber
} from "../validation/validator";
import axios from "axios";
import { Redirect } from 'react-router';

class RegisterEmployer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      UserType:"002",
      Status : true
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

  register = e => {
    e.preventDefault();
    const { formData } = this.state;
    formData["UserType"] = this.state.UserType;
    formData["Status"] = this.state.Status;

    let Config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios
      .post("http://34.229.17.37:8081/api/registeruser", formData, Config)
      .then((response) => {
        console.log(response);
        console.log("success" + response.data.success);
        this.setState({
          success : response.data.success
        })
        if(this.state.success === true){
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
        <div className="alert alert-danger error-message">
            <strong>{this.state.responseMsg}</strong>
        </div>
      );
    }
  }

  render() {
    if (this.state.toLogin === true) {
      return <Redirect to='/' />
    }
    return (
      <form onSubmit={this.register}>
       {this.renderError()}
        <div class="row ml-4 mr-4">
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
          <div class="form-group d-flex col-xl-12 xs-d-block">
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
          <div class="form-group d-flex col-xl-12 xs-d-block">
            <label class="col-xl-6">Name of the Organisation:*</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="Organisation"
              placeholder=""
              onChange={this.handleInputChange}
              name="Organisation"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block">
            <label class="col-xl-6">MOM Registration Number:*</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="MOM"
              placeholder=""
              onChange={this.handleInputChange}
              name="MOM"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block">
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
          <div class="form-group d-flex col-xl-12 xs-d-block">
            <label class="col-xl-6">E-mail Address:*</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="email"
              placeholder="ex: myname@eaxmple.com"
              onChange={this.handleInputChange}
              name="email"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block">
            <label class="col-xl-6">Address:*</label>
            <textarea
              type="text"
              class="form-control col-xl-6"
              rows="5"
              id="Address"
              placeholder=""
              onChange={this.handleInputChange}
              name="Address"
              required
            />
          </div>
          <div class="form-group d-flex col-xl-12 xs-d-block">
            <label class="col-xl-6">Country:</label>
            <input
              type="text"
              class="form-control col-xl-6"
              id="Country"
              placeholder=""
              onChange={this.handleInputChange}
              name="Country"
              required
            />
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
export default RegisterEmployer;
