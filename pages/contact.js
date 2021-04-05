import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
import PhoneInput from 'react-phone-number-input/input'

export class index extends Component {
    state = {
        name:"",
        email:"",
        restuarant:"",
        phone:"",
        message:""
    }
    handleChange = event => {
        const {name,value} = event.target;
        // console.log(value);
        this.setState({[name]: value})
    }
    handleSubmit = e => {
        e.preventDefault();
        const that = this
        fetch("https://us-central1-deha-d254a.cloudfunctions.net/api/contact",{
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: that.state.email,
              restaurant: that.state.restaurant,
              phone: that.state.phone,
              name: that.state.name,
              message:that.state.message
						})
          })
          .then(respone=>respone.json())
          .then(res =>{
          const alertId = StatusAlertService.showSuccess('Thank you for messaging Caribbean American Restaurant Association. We will get back to you as soon as possible.”');
          console.log('complete')
          })
          .catch(function(error) {
             alert("Error")
           }); 
          
    }
    handleCell = (value) => {
        this.setState({phone: value})
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Contact Us</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Contact Us</li>
                        </ul>
                    </div>
                </div>

                <section className="contact-info-area pt-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="contact-info-box">
                                    <div className="icon">
                                        <i className="icofont-email"></i>
                                    </div>
                                    <h3>Email</h3>
                                    <p><a href="#">info@linkcaranow.org</a></p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="contact-info-box">
                                    <div className="icon">
                                        <i className="icofont-google-map"></i>
                                    </div>
                                    <h3>Address</h3>
                                    <p>3510 Church Ave, Brooklyn, NY 11203</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                                <div className="contact-info-box">
                                    <div className="icon">
                                        <i className="icofont-phone"></i>
                                    </div>
                                    <h3>Telephone</h3>
                                    <p><a href="#">(212) 641-0482</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="contact-area ptb-120">
                    <div className="container">
                        <div className="section-title">
                            <span>Contact Us</span>
                            <h2>Get In Touch With Us</h2>
                        </div>

                        <div className="row h-100 justify-content-center align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <img src={require("../images/marketing.png")} alt="image" />
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <form id="contactForm" onSubmit={this.handleSubmit}>
                                    <div className="row">
                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.handleChange} required={true} data-error="Please enter your name" placeholder="Name" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <input type="email" className="form-control" name="email" value={this.state.email} onChange={this.handleChange} required={true} data-error="Please enter your email" placeholder="Email" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-6">
                                            <div className="form-group">
                                            <PhoneInput
                                                placeholder="Enter phone number"
                                                value={this.state.phone}
                                                name="phone"
                                                country="US"
                                                className="form-control"
                                                // pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
                                                // max="10"
                                                onChange={this.handleCell}/>
                                                {/* <input type="number" className="form-control" name="phone" value={this.state.phone} onChange={this.handleChange} placeholder="Phone" /> */}
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-6">
                                            <div className="form-group">
                                                <input type="text" className="form-control" name="restuarant" value={this.state.restuarant} onChange={this.handleChange} placeholder="Restaurant" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <textarea name="message" className="form-control" name="message" value={this.state.message} onChange={this.handleChange} id="message" cols="30" rows="5" required data-error="Write your message" placeholder="Your Message" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <button type="submit" className="btn btn-primary">Send Message</button>
                                            <div id="msgSubmit" className="h3 text-center hidden"></div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <StatusAlert/>
                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
