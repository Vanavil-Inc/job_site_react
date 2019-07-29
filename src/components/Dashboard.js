import React, { Component } from 'react';
import axios from "axios";
import _ from 'lodash';


class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
        }
        this.renderJobSeekerDeatils = this.renderJobSeekerDeatils.bind(this);
    }


    componentDidMount() {
        this.userDetails();   
    }

    userDetails(){
       
        let data = {
            UserId : localStorage.getItem('UserId'),
            token : localStorage.getItem('token')
        }
        let UserType = localStorage.getItem('UserType');

        console.log(data);
        console.log("UserType" + UserType);
        let Config = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        };

        if(UserType == "999"){

            axios.post("http://34.229.17.37:8081/api/getonejobseeker", data, Config)
            .then((response)=> {
            console.log(response.data.result);
            
            this.setState({
                    jobseekerList: response.data.result,
                });
            })
            .catch((err)=> {
                console.log(err);
            })
        } else {
            axios.post("http://34.229.17.37:8081/api/getalljobseeker", data, Config)
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

    renderJobSeekerDeatils(){
       
        return _.map(this.state.jobseekerList, list => {
            return(
                <tr>
                    <td>{list.UserName}</td>
                    <td>{list.PrimarySkills}</td>
                    <td>{list.CurrentEmp}</td>
                    <td>{list.ExpInYear}</td>
                    <td>{list.ExpInMonth}</td>
                    <td>{JSON.stringify(list.Status)}</td>
                 </tr>
            );

        });
    }


    render(){

        return(
            <div class="container section">
                <table class="table table-bordered w-100">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>PrimarySkills</th>
                            <th>Current Empolyment</th>
                            <th>Experience Years</th>
                            <th>Experience Months</th>
                            <th>Status</th>
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