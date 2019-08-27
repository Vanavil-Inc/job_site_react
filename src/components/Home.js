import React, { Component } from 'react';
import slider_01 from '../assets/slider_01.jpg';
import slider_02 from '../assets/slider_02.jpg';
import slider_03 from '../assets/slider_03.jpg';
import slider_04 from '../assets/slider_04.jpg';
import slider_05 from '../assets/slider_05.jpg';
import eat from '../assets/eat.png';
import hdb from '../assets/hdb.png';
import holiday from '../assets/holiday.png';
import hpb from '../assets/hpb.png';
import mom from '../assets/mom.png';
import mrt from '../assets/mrt.png';

import Login from './Login';
import Header from './Header';
import Footer from './Footer';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			success: localStorage.getItem('success')
		};
    }
    
    componentDidMount(){
		document.title = "Singapore Jobs & Pass, Work permits - FIRST TEAM CONSULTANTS PTE. LTD"
	}

	render() {
		console.log('SUCCESS VALUES :' + this.state.success);
		const LoginView = this.state.success ? '' : <Login />;

		return (
			<div class="container-fluid">
				<Header />
				{LoginView}

				<div id="carousel" class="carousel slide" data-ride="carousel">
					<ul class="carousel-indicators">
						<li data-target="#carousel" data-slide-to="0" class="active" />
						<li data-target="#carousel" data-slide-to="1" />
						<li data-target="#carousel" data-slide-to="2" />
						<li data-target="#carousel" data-slide-to="3" />
						<li data-target="#carousel" data-slide-to="4" />
					</ul>
					<div class="carousel-inner carouselbtm ">
						<div class="carousel-item active">
							<img src={slider_05} alt="Los Angeles" width="100%" height="100%" />
							<div class="carousel-caption">
								<h3>@Current Job Openings in Civil Construtions, </h3>
								<p>Transport and Hotels</p>
								<button type="submit" class="btn btn-primary mb-4">
									Apply
								</button>
							</div>
						</div>
						<div class="carousel-item">
							<img src={slider_01} alt="Chicago" width="100%" height="100%" />
							<div class="carousel-caption">
								<h3>@Current Job Openings in Hotel management, </h3>
								<p>Transport and Hotels</p>
								<button type="submit" class="btn btn-primary mb-4">
									Apply
								</button>
							</div>
						</div>
						<div class="carousel-item">
							<img src={slider_02} alt="New York" width="100%" height="100%" />
							<div class="carousel-caption">
								<h3>@Current Job Openings in Driving, </h3>
								<p>Transport</p>
								<button type="submit" class="btn btn-primary mb-4">
									Apply
								</button>
							</div>
						</div>
						<div class="carousel-item">
							<img src={slider_03} alt="New York" width="100%" height="100%" />
							<div class="carousel-caption">
								<h3>@Current Job Openings in Civil Construtions, </h3>
								<p>Transport and Hotels</p>
								<button type="submit" class="btn btn-primary mb-4">
									Apply
								</button>
							</div>
						</div>
						<div class="carousel-item">
							<img src={slider_04} alt="New York" width="100%" height="100%" />
							<div class="carousel-caption">
								<h3>@Current Job Openings in Civil Construtions, </h3>
								<p>Transport and Hotels</p>
								<button type="submit" class="btn btn-primary mb-4">
									Apply
								</button>
							</div>
						</div>
					</div>
					<a class="carousel-control-prev" href="#carousel" data-slide="prev">
						<span class="carousel-control-prev-icon" />
					</a>
					<a class="carousel-control-next" href="#carousel" data-slide="next">
						<span class="carousel-control-next-icon" />
					</a>
				</div>
				<div class="container">
					<div class="row">
						<div class="col-md-4 col-sm-6">
							<div class="custom-module">
								<h4>Who We are</h4>
								<p>
									First Team Consultants is most successful agency in Singapore. We understand the
									importance of employing a professionally trained and highly qualified workforce. Our
									multicultural, dedicated team of experienced recruitment consultants is on hand
									around the clock to assist with your needs.
								</p>
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
							<div class="custom-module">
								<h4>Our Recruitments</h4>
								<ul class="list-style-2">
									<li>
										<i class="fa fa-star mr-3" /> Permanent Placement
									</li>
									<li>
										<i class="fa fa-star mr-3" /> Immediate Replacement
									</li>
									<li>
										<i class="fa fa-star mr-3" /> Contract Staffing
									</li>
									<li>
										<i class="fa fa-star mr-3" /> Work Pass Services
									</li>
									<li>
										<i class="fa fa-star mr-3" /> HR Consulting
									</li>
									<li>
										<i class="fa fa-star mr-3" /> HR Outsource Services
									</li>
								</ul>
							</div>
						</div>
						<div class="col-md-4 col-sm-6">
							<div class="custom-module">
								<h4>Our Industry</h4>
								<div class="skills">
									<span>Civil Construtions</span>
									<div class="progress mb-3">
										<div class="progress-bar w-100" role="progressbar" data-transitiongoal="100" />
									</div>
									<span>Transport & Logistics</span>
									<div class="progress mb-3">
										<div class="progress-bar w-75" role="progressbar" data-transitiongoal="60" />
									</div>
									<span>Hotels and Cleaning</span>
									<div class="progress mb-3">
										<div class="progress-bar w-50" role="progressbar" data-transitiongoal="50" />
									</div>
									<span>Others</span>
									<div class="progress mb-3">
										<div class="progress-bar w-75" role="progressbar" data-transitiongoal="70" />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="container-fluid home-content mt-5">
					<div class="container row home-first">
						<div class="section-title text-center mt-5 mb-5">
							<h3>Why First Team </h3>
							<p>
								Our Consultants seek out, establish and cultivate business relationships to ensure
								profitable growth for our clients. The strength of our team lies in our thorough
								awareness of the Singapore and asian markets, and the ability to pinpoint specific
								trends and use that knowledge to ensure success.{' '}
							</p>
						</div>
					</div>
					<div class="container row home-first mb-5">
						<div class="col-lg-4 col-md-12">
							<div class="service-box">
								<h3>Our Recruitment Process</h3>
								<p>It is very clean and transparent to both employers and job seekers. </p>
							</div>
						</div>

						<div class="col-lg-4 col-md-12">
							<div class="service-box">
								<h3>Easy and Fast</h3>
								<p>
									We have highley standard work flow and process the offers ASAP and apply pass and
									insurance quickly one by one.
								</p>
							</div>
						</div>

						<div class="col-lg-4 col-md-12">
							<div class="service-box">
								<h3>No Worries</h3>
								<p>
									We try to solve the pass holders difficulties in works and also help them to find
									the replacements.{' '}
								</p>
							</div>
						</div>
					</div>
					<div class="row">
						<div class="container my-4">
							<div class="text-center mb-5">
								<h3>Important Links</h3>
							</div>
							<div
								id="multi-item-example"
								class="carousel slide carousel-multi-item"
								data-ride="carousel"
							>
								<ol class="carousel-indicators">
									<li data-target="#multi-item-example" data-slide-to="0" class="active" />
									<li data-target="#multi-item-example" data-slide-to="1" />
									<li data-target="#multi-item-example" data-slide-to="2" />
								</ol>
								<div class="carousel-inner" role="listbox">
									<div class="carousel-item active">
										<div class="row">
											<div class="col-md-4">
												<div class="card mb-2">
													<a href="https://www.mom.gov.sg/">
														<img
															class="card-img-top"
															src={mom}
															alt="Ministry of Manpower"
														/>
														<div class="card-body">
															<h4 class="card-title">Ministry of Manpower</h4>
														</div>
													</a>
												</div>
											</div>

											<div class="col-md-4 clearfix d-none d-md-block">
												<div class="card mb-2">
													<a href="https://www.hdb.gov.sg">
														<img
															class="card-img-top"
															src={hdb}
															alt="Housing & Development Board"
														/>
														<div class="card-body">
															<h4 class="card-title">Housing & Development Board</h4>
														</div>
													</a>
												</div>
											</div>

											<div class="col-md-4 clearfix d-none d-md-block">
												<div class="card mb-2">
													<a href="https://www.hpb.gov.sg/">
														<img
															class="card-img-top"
															src={hpb}
															alt="Health Promotion Board"
														/>
														<div class="card-body">
															<h4 class="card-title">Health Promotion Board</h4>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
									{/* second list */}
									<div class="carousel-item">
										<div class="row">
											<div class="col-md-4">
												<div class="card mb-2">
													<a href="https://www.mom.gov.sg/newsroom/press-releases/2018/0404-public-holidays-for-2019">
														<img
															class="card-img-top"
															src={holiday}
															alt="Singapore Public Holidays"
														/>
														<div class="card-body">
															<h4 class="card-title">Singapore Public Holidays</h4>
														</div>
													</a>
												</div>
											</div>
											<div class="col-md-4 clearfix d-none d-md-block">
												<div class="card mb-2">
													<a href="https://www.lta.gov.sg/content/ltaweb/en/public-transport.html">
														<img class="card-img-top" src={mrt} alt="Public Transport" />
														<div class="card-body">
															<h4 class="card-title">Public Transport</h4>
														</div>
													</a>
												</div>
											</div>
											<div class="col-md-4 clearfix d-none d-md-block">
												<div class="card mb-2">
													<a href="https://www.tripadvisor.in/Restaurants-g2146379-zfp16-Little_India_Singapore.html">
														<img class="card-img-top" src={eat} alt="Where to Eat" />
														<div class="card-body">
															<h4 class="card-title">Where to Eat</h4>
														</div>
													</a>
												</div>
											</div>
										</div>
									</div>
								</div>
								{/* <Control Buttons> */}
								<div class="controls-top text-center mt-4 mb-5">
									<a class="btn-floating mr-4" href="#multi-item-example" data-slide="prev">
										<i class="fa fa-chevron-left" />
									</a>
									<a class="btn-floating" href="#multi-item-example" data-slide="next">
										<i class="fa fa-chevron-right" />
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Home;
