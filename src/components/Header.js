import React, { Component } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

class Header extends Component {
  render() {
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
                  <Link class="nav-link" to="/">
                    Recent Jobs
                  </Link>
                </li>
                <li class="nav-item mr-5">
                  <Link class="nav-link" to="/registration">
                    Registration
                  </Link>
                </li>
                <li class="nav-item mr-5">
                  <Link class="nav-link" to="/">
                    Contact
                  </Link>
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
