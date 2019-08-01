import React, { Component } from "react";
import Header from './Header'
import Footer from './Footer'

class Contact extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
    <div>
        <Header/>
      <div class="container section">
        <div class="text-center innerpage_heading mb-3">
          <h5 class="title">Contact</h5>
        </div>
      </div>
      <Footer/>
      </div>
    );
  }
}

export default Contact;
