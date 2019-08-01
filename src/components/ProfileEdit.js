import React, { Component } from "react";
import axios from "axios";
import { Redirect } from 'react-router';
import Header from './Header'
import Footer from './Footer'

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {},
      UserType : localStorage.getItem('UserType'),
      UserId : localStorage.getItem('UserId'),
      Status : "Active"
    };
    console.log("profile cons"+this.state.UserType);
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
      this.setState({
        Status: e.target.value
       });
       console.log(this.state.Status);
  }
  updateJobseeker = e => {
    e.preventDefault();
    const { formData } = this.state;
    formData["UserId"] = this.state.UserId;
    formData["UserType"] = this.state.UserType;
    formData["Status"] = this.state.Status;

    console.log(this.state.Status);
    
    let Config = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*"
      }
    };

    axios.post("http://34.229.17.37:8081/api/updatejobseeker", formData, Config)
      .then((response) => {
        if(response.data.success){
            this.setState({
                toDashboard: true
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
    <div>
        <Header/>
      <form onSubmit={this.updateJobseeker}>
      <div class="container section">
        <div class="text-center innerpage_heading mb-3">
            <h5 class="title">Profile Edit</h5>
        </div>
        <div class="container form-backrd">
        {this.state.UserType === "999" ? 
            <div class="row ml-4 mr-4">
                {this.renderError()}
                <div class="form-group d-flex col-xl-12 xs-d-block mt-5">
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
                <div class="submit_btn mt-5 mb-5">
                    <button type="submit" class="btn btn-primary btn-style">
                    Submit
                    </button>
                </div>
            </div>
            : <div class="row ml-4 mr-4">
                   <div class="form-group d-flex col-xl-12 xs-d-block mt-4">
                        <label class="col-xl-6">Status:</label>
                            <select
                                class="form-control col-xl-6"
                                onChange={(e) => this.handleExp(e)}>
                                <option value="Active" selected>
                                     Active
                                </option>
                                <option value="Inactive">Inactive</option>
                            </select>
                     </div>
                    <div class="submit_btn mt-5 mb-5">
                        <button type="submit" class="btn btn-primary btn-style">
                        Submit
                        </button>
                    </div>
                </div>}
            </div>
        </div>
      </form>
      <Footer/>
      </div>
    );
  }
}

export default ProfileEdit;
