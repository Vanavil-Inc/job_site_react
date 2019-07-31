import React, { Component } from 'react';
import axios from "axios";
import _ from 'lodash';
import { Link } from "react-router-dom";

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            UserType : localStorage.getItem('UserType')
         }
        this.renderJobSeekerDeatils = this.renderJobSeekerDeatils.bind(this);
        this.removeDetails = this.removeDetails.bind(this);
    }

    componentDidMount() {
        this.userDetails();   
    }

    userDetails(){
       
        let data = {
            UserId : localStorage.getItem('UserId'),
            token : localStorage.getItem('token')
        }

        console.log(data);
        let Config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        if(this.state.UserType == "999"){

            axios.post("http://localhost:8081/api/getonejobseeker", data, Config)
            .then((response)=> {
            // console.log(response.data.result);
            this.setState({
                    jobseekerList: response.data.result,
                });
            })
            .catch((err)=> {
                console.log(err);
            })
        } else {
            let data = {
                UserId : localStorage.getItem('empId'),
                token : localStorage.getItem('token')
            }
    
            axios.post("http://localhost:8081/api/getalljobseeker", data, Config)
            .then((response)=> {
            console.log(response);
            this.setState({
                    jobseekerList: response.data.result,
                });
            })
            .catch((err)=> {
                console.log(err);
            })
        }
    }

    editProfile(UserId){
        localStorage.setItem("UserId", UserId)
    }
    


    removeDetails(UserId){
        const data = {
            UserId : UserId
        }
        console.log(data);
        let Config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post("http://localhost:8081/api/deletejobseeker", data, Config)
            .then((response)=> {
            console.log(response);
            if(response.data.success){
               this.userDetails()
            }
            })
            .catch((err)=> {
                console.log(err);
            })
    }

    renderJobSeekerDeatils(){                        
        return _.map(this.state.jobseekerList, list => {
            // console.log(list.UserId)
            return(
                <tr>
                    <td>{list.UserName}</td>
                    <td>{list.PrimarySkills}</td>
                    <td>{list.CurrentEmp}</td>
                    <td>{list.ExpInYear}</td>
                    <td>{list.ExpInMonth}</td>
                    <td class={list.Status=="Active" ? "status-active" :"status-inactive"}>{list.Status}</td>
                    <td>
                   <Link to="/editprofile" ><button type="submit" class="btn btn-primary mr-2 mb-2 edit-btn" 
                   onClick={()=>this.editProfile(list.UserId)}>
                         Edit
                    </button></Link> 
                         {/* Employer*/}
                   {this.state.UserType ==="999"?                                                
                      null  :
                      <button type="submit" class="btn btn-primary mb-2" onClick={()=>this.removeDetails(list.UserId)}>
                         Delete
                      </button>                                 
                   }
                    </td>
                 </tr>
            );

        });
    }


    render(){

        return( 
            <div class="container section">
                <h5 class="mb-3 mt-4 text-uppercase">{this.state.UserType === "999" ? "List of Profiles":"List of Registered Job Seekers"}</h5>
                <table class="table table-bordered w-100">
                    <thead class="text-center"> 
                        <tr>
                            <th>Name</th>
                            <th>Primary Skills</th>
                            <th>Current Empolyment</th>
                            <th>Experience Years</th>
                            <th>Experience Months</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderJobSeekerDeatils()}
                    </tbody>
                </table>
            </div>
        );

    }
    
}

export default Dashboard;