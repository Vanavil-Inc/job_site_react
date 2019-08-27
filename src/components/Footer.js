import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

class Footer extends Component {
	render() {
		return (
			<footer class="page-footer font-small blue">
				<div class="container text-center">
					<div class="row">
						<div class="col-md-12">
							<Link to="/">
								{' '}
								<img class="img-responsive" src={logo} alt="" />{' '}
							</Link>
							<p>
								Email: <a href="mailto:#">pp@ftc.com.sg</a>
							</p>
							<p>Phone: +65 3151 010105</p>
							<p>Fax : +65 3151 010106</p>
							<ul class="list-inline social-links">
								<li class="mr-2">
									<a href="https://www.facebook.com/dtserp">
										<i class="fa fa-facebook" />
									</a>
								</li>
								<li>
									<a href="https://twitter.com/dtserp">
										<i class="fa fa-twitter" />
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>

				<div class="footer-copyright text-center mb-5 py-3">
					Copyrights © 2019 All Rights Reserved by
					<Link to="/"> FIRST TEAM CONSULTANTS PTE. LTD</Link>
				</div>
			</footer>
		);
	}
}

export default Footer;
