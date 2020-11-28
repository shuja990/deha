import React, { Component } from 'react';
import Link from '../../utils/ActiveLink'
export class Cta extends Component {
    render() {
        return (
            <section className="cta-area ptb-120 bg-08071c">
                <div className="container">
                    <div className="cta-content">
                        <span>LOOKING FOR RESOURCES?</span>
					    <h2>Get The Best For Your Restaurant</h2>
                        <p>We focus on assisting members with COVID-19 compliance, resource availability, and financial stimulus eligibility to ensure support once available.</p>
                        <Link href="/contact"><a href="#" className="btn btn-primary wow fadeInUp">Contact Us</a></Link>
                    </div>
                </div>

                <div className="shape5">
                    <img src={require("../../images/shapes/5.png")} alt="shape" />
                </div>
                <div className="shape7">
                    <img src={require("../../images/shapes/7.png")} alt="shape" />
                </div>
                <div className="shape9 rotateme">
                    <img src={require("../../images/shapes/9.png")} alt="shape" />
                </div>
                <div className="shape14 rotateme">
                    <img src={require("../../images/shapes/14.png")} alt="shape" />
                </div>
                <div className="shape15 rotateme">
                    <img src={require("../../images/shapes/15.png")} alt="shape" />
                </div>
            </section>
        );
    }
}

export default Cta;
