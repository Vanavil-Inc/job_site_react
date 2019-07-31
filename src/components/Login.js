import React, { Component } from "react";
import {
  isEmail,
  isEmpty,
  isLength,
  isContainWhiteSpace
} from "../validation/validator";
import axios from "axios";
import { Redirect } from "react-router";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
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

  login = e => {
    e.preventDefault();

    const { formData } = this.state;

    let Config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };


    axios.post("http://34.229.17.37:8081/api/emplogin", formData, Config)
      .then((response) => {
        console.log(response);
        this.setState({
          success: response.data.success
        })
        if(response.data.success){
          localStorage.setItem("success", response.data.success)
          localStorage.setItem("empId", response.data.result[0].UserId);
          localStorage.setItem("UserType", response.data.result[0].UserType);
          localStorage.setItem("token", response.data.result[0].token);
          localStorage.setItem("UserName", response.data.result[0].UserName);
           this.setState({
              toDashboard : true
           })
        } else {
          this.setState({
            responseMsg : response.data.message
          })
          
        }
        
      })
      .catch(error => {
        console.log(error);
      });

      axios.post("http://34.229.17.37:8081/api/jslogin", formData, Config)
      .then((response) => {
        console.log(response);
        // console.log(this.state.success)
        this.setState({
          success: response.data.success,
          authUser: response.data.result[0].token
        })
        if(response.data.success){
          localStorage.setItem("success", response.data.success)
          localStorage.setItem("UserId", response.data.result[0].UserId);
          localStorage.setItem("UserType", response.data.result[0].UserType);
          localStorage.setItem("token", response.data.result[0].token);
          localStorage.setItem("UserName", response.data.result[0].UserName);
           this.setState({
              toDashboard : true
           })
        } else {
          this.setState({
            responseMsg : response.data.message
          })
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
        <div className="alert alert-danger error-message-login ml-n1">
            <strong>{this.state.responseMsg}</strong>
        </div>
      );
    }
  }


  render() {

    if (this.state.toDashboard === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div class="container">
        <form onSubmit={this.login}>
          <div class="row login_form">
          {this.renderError()}
            <div class="form-group mr-2 phone_input">
              <label class="mb-2 mr-2">Phone Number:</label>
              <input
                type="text"
                class="form-control"
                id="UserId"
                placeholder="Enter Phone Number"
                name="UserId"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div class="form-group mr-2 pass_input">
              <label class="mb-2 mr-2">Password:</label>
              <input
                type="password"
                class="form-control"
                id="Password"
                placeholder="Enter password"
                name="Password"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div class="form-group form-check mb-2 chkbox_rem">
              <label class="form-check-label mr-3">
                <input
                  class="form-check-input mb-0"
                  type="checkbox"
                  name="remember"
                />
                Remember Me
              </label>  
            </div>
            <button type="submit" class="btn btn-primary btn-style">
                Submit
            </button>
           
          </div>
        </form>    
      </div>
    );
  }
}

export default Login;
