import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
// import Link from './../utils/ActiveLink';

export class index extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Our Services</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Our Services</li>
                        </ul>
                    </div>
                </div>

                <section className="services-area ptb-120">
                    <div className="container">
                        <div className="row">
                            <h3>AREAS OF IMMEDIATE FOCUS DURING COVID-19 PANDEMIC:</h3>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>Educate</h3>
                                    <p>Educate CARA members on ever-changing COVID-19 guidelines and restrictions.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-brand-designfloat"></i>
                                    </div>
                                    <h3>Assistance</h3>
                                    <p>Focus on assisting members with COVID-19 compliance, resource availability, and financial stimulus eligibility to ensure support once available.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-stock-mobile"></i>
                                    </div>
                                    <h3>Advocacy</h3>
                                    <p>Advocate for changes for unbiased treatment towards Caribbean American businesses.</p>
                                </div>
                            </div>
                            </div>
                            <h2>CARA ONGOING FOCUS</h2>
                            <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-live-support"></i>
                                    </div>
                                    <h3>FREE MEMBERSHIP</h3>
                                    <p><Link href="/signup"><a className="">Sign up on website</a></Link></p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-travelling"></i>
                                    </div>
                                    <h3>Advocacy & Education</h3>
                                    <p>Protect and advance the Caribbean American food service industry in NYC/NYS.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-delivery-time"></i>
                                    </div>
                                    <h3>Awareness</h3>
                                    <p>Present the positive impact of the Caribbean American hospitality industry throughout NYC</p>
                                </div>
                            </div>
                            
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>Expertise </h3>
                                    <p>Serve as the preferred knowledge resource for the Caribbean American Diaspora.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>Workforce and development </h3>
                                    <p>We will train future employees, advancing the skills of current employees, and communicating the value of restaurant employment to people nationwide.</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>Research and insight</h3>
                                    <p>We will continually conduct industry research to help our members stay ahead of the game. We work to get you in front of trends before they emerge. </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
