import React, { Component } from 'react';
import slider_01 from '../assets/slider_01.jpg'
import slider_02 from '../assets/slider_02.jpg'
import slider_03 from '../assets/slider_03.jpg'
import slider_04 from '../assets/slider_04.jpg'
import slider_05 from '../assets/slider_05.jpg'
import Login from './Login'
import Header from './Header'
import Footer from './Footer'

class Home extends Component {
    constructor() {
        super();
        this.state = {
            success : localStorage.getItem('success'),
         }
    }

	render() {
console.log("SUCCESS VALUES :" +this.state.success)
    const LoginView =  this.state.success ? "" : <Login/>;
    
	return (
        <div class="container-fluid section">
            <Header/>
            {LoginView}

                <div id="carousel" class="carousel slide" data-ride="carousel">
                    <ul class="carousel-indicators">
                        <li data-target="#carousel" data-slide-to="0" class="active"></li>
                        <li data-target="#carousel" data-slide-to="1"></li>
                        <li data-target="#carousel" data-slide-to="2"></li>
                        <li data-target="#carousel" data-slide-to="3"></li>
                        <li data-target="#carousel" data-slide-to="4"></li>
                    </ul>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src={slider_05} alt="Los Angeles" width="100%" height="100%"/>
                        <div class="carousel-caption">
                            <h3>Los Angeles</h3>
                            <p>We had such a great time in LA!</p>
                        </div>   
                    </div>
                    <div class="carousel-item">
                        <img src={slider_01} alt="Chicago" width="100%" height="100%"/>
                        <div class="carousel-caption">
                            <h3>Chicago</h3>
                            <p>Thank you, Chicago!</p>
                        </div>   
                    </div>
                    <div class="carousel-item">
                    <img src={slider_02} alt="New York" width="100%" height="100%"/>
                        <div class="carousel-caption">
                            <h3>New York</h3>
                            <p>We love the Big Apple!</p>
                        </div>   
                    </div>
                    <div class="carousel-item">
                    <img src={slider_03} alt="New York" width="100%" height="100%"/>
                        <div class="carousel-caption">
                            <h3>New York</h3>
                            <p>We love the Big Apple!</p>
                        </div>   
                    </div>
                    <div class="carousel-item">
                    <img src={slider_04} alt="New York" width="100%" height="100%"/>
                        <div class="carousel-caption">
                            <h3>New York</h3>
                            <p>We love the Big Apple!</p>
                        </div>   
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carousel" data-slide="prev">
                    <span class="carousel-control-prev-icon"></span>
                </a>
                <a class="carousel-control-next" href="#carousel" data-slide="next">
                    <span class="carousel-control-next-icon"></span>
                </a>
            </div>
            <Footer/>
        </div>
			
	    );
	}
 }

export default Home;
