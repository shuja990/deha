import React, { Component } from 'react';
import Link from 'next/link';

export class Contact extends Component {
    render() {
        return (
            <section className="contact-cta-area ptb-120">
                <div className="container">
                    <div className="contact-cta-content">
                        <div className="section-title">
                            <span>Get in Touch</span>
                            <h2>Want To Work With Us? Let's Talk About The Future of Community!</h2>
                        </div>

                        <p>We focus on assisting members with COVID-19 compliance, resource availability, and financial stimulus eligibility to ensure support once available.</p>
                        <Link href="/contact">
                            <a className="btn btn-primary wow fadeInUp">Contact Us</a>
                        </Link>
                    </div>
                </div>

                <div class="shape13">
                    <img src={require("../../images/shapes/13.png")} alt="shape" />
                </div>
                <div class="shape18">
                    <img src={require("../../images/shapes/18.png")} alt="shape" />
                </div>
                <div class="shape19">
                    <img src={require("../../images/shapes/19.png")} alt="shape" />
                </div>
                <div class="shape20 rotateme">
                    <img src={require("../../images/shapes/20.png")} alt="shape" />
                </div>
                <div class="shape21">
                    <img src={require("../../images/shapes/21.png")} alt="shape" />
                </div>
                <div class="shape22">
                    <img src={require("../../images/shapes/22.png")} alt="shape" />
                </div>
            </section>
        );
    }
}

export default Contact;
