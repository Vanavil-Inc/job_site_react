import React, { Component } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      UserName : localStorage.getItem('UserName')
     }    
     console.log(" HEADER CONSTRU");
  }

  logout = (onClick) =>{
    this.setState({UserName:""})
    localStorage.clear() ;
  }
  
  render() {
    // this.forceUpdate();
  //  const UserName = localStorage.getItem('UserName')
    console.log("  HEADER RENDER"+this.props.UserName);
    console.log("User name:  "+localStorage.getItem('UserName'))
    return (
      <header className="header">
        <div class="container">
          <nav class="navbar navbar-expand-lg navbar-light">
            <div class="header-logo">
              <Link to="/">
                <img class="img-responsive" src={logo} alt="" />
              </Link>
            </div>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon" />
            </button>

            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="nav navbar-nav ml-auto">
                <li class="nav-item active mr-5">
                  <Link class="nav-link" to="/">
                    Home <span class="sr-only">(current)</span>
                  </Link>
                </li>
                <li class="nav-item mr-5">
                  <Link class="nav-link" to="/recentjobs">
                    Recent Jobs
                  </Link>
                </li>
                <li class="nav-item mr-5">
                  <Link class="nav-link" to="/registration">
                    Registration
                  </Link>
                </li>
                <li class="nav-item mr-5">
                  <Link class="nav-link" to="/contact">
                    Contact
                  </Link>
                </li>
                  <li class={this.state.UserName == null ? "d-none" : "nav-item dropdown"}>
                    <a class="nav-link dropdown-toggle text-capitalize" href="/" id="navbardrop" data-toggle="dropdown">
                      {this.state.UserName}
                    </a>
                    <div class="dropdown-menu">
                      <a class="dropdown-item" href="/" onClick={this.logout}>Logout</a>
                    </div>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;
