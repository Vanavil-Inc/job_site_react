import React, { Component } from 'react';
import logo from '../assets/logo.png';
import { NavLink, Link } from 'react-router-dom';

class Header extends Component {
	constructor() {
		super();
		this.state = {
			UserName: localStorage.getItem('UserName'),
			UserId: localStorage.getItem('UserId'),
			UserType: localStorage.getItem('UserType')
		};
		console.log(' HEADER CONSTRU');
	}

	logout = (onClick) => {
		this.setState({ UserName: '' });
		localStorage.clear();
	};

	// jobseeker profile edit and manage account (For Employer only manage account)
	editProfile(UserId) {
		localStorage.setItem('UserId', UserId);
  }
  
  registerAdmin(type) {
		localStorage.setItem('PAGETYPE', type);
  }

  

	render() {
		const activeStyle = { color: '#1a2e46', borderBottom: '5px solid #1a2e46', fontWeight: 'bold' };
		// console.log('User name:  ' + localStorage.getItem('UserName'));
		return (
			<header className="header">
				<div class="container">
					<nav class="navbar navbar-expand-lg navbar-light">
						<div class="header-logo">
							<NavLink to="/">
								<img class="img-responsive" src={logo} alt="" />
							</NavLink>
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
							<ul class="nav navbar-nav">
								<li class={this.state.UserName == null ? 'active nav-item  mr-4' : 'nav-item  mr-4'}>
									<NavLink class="nav-link" to="/" exact activeStyle={activeStyle}>
										Home <span class="sr-only">(current)</span>
									</NavLink>
								</li>
								<li class={this.state.UserName == null ? 'd-none' : ' nav-item mr-4'}>
									<NavLink class="nav-link" to="/dashboard" exact activeStyle={activeStyle}>
										Dashboard
									</NavLink>
								</li>
								<li class={this.state.UserType === "001" ? 'd-none' : ' nav-item mr-4'}>
									<NavLink class="nav-link" to="/recentjobs" exact activeStyle={activeStyle}>
										Recent Jobs
									</NavLink>
								</li>
								<li class={this.state.UserName == null ? 'nav-item mr-4' : 'd-none'}>
									<NavLink class="nav-link" to="/registration" exact activeStyle={activeStyle}  onClick={() => this.registerAdmin("REGISTER")}>
										Registration
									</NavLink>
								</li>
								<li class="nav-item mr-4">
									<NavLink class="nav-link" to="/contact" exact activeStyle={activeStyle}>
										Contact
									</NavLink>
								</li>
								<li class={this.state.UserName == null ? 'd-none' : 'nav-item dropdown'}>
									<NavLink
										class="nav-link dropdown-toggle text-capitalize loggedUser"
										to=""
										id="navbardrop"
										data-toggle="dropdown"
									>
										{this.state.UserName}
									</NavLink>
                  <div class="dropdown-menu">                    
                      {this.state.UserType == '001'?
                          <div>
                          <NavLink
                              class="dropdown-item"
                              to="/recentjobs">
                              Job Post
                            </NavLink>
                            <a
                              class="dropdown-item"
                              href="/registration"
                              onClick={() => this.registerAdmin("REGISTER")}
                            >
                              Register
                            </a>
                            <a
                              class="dropdown-item"
                              href="/registration"
                              onClick={() => this.registerAdmin("PROFILEEDIT")}
                            >
                              Profile Edit
                            </a>
                            <NavLink
                              class="dropdown-item"
                              to="/registration"
                            >
                              CRM
                            </NavLink>
                            </div>
                          : null}
                    {this.state.UserType == '999' ?
                      <NavLink
                        class= "dropdown-item"
                        to="/editprofile"
                        onClick={() => this.editProfile(this.state.UserId)}
                      >
                        Profile
                      </NavLink>
                    :null }

                  {this.state.UserType != '001' ?
										<NavLink
											class="dropdown-item"
											to="/manage-account"
											onClick={() => this.editProfile(this.state.UserId)}
										>
											Manage account
										</NavLink>: null}
										<a class="dropdown-item" href="/" onClick={this.logout}>
											Logout
										</a>
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
