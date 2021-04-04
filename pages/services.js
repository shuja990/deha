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
                                        <i className="icofont-education"></i>
                                    </div>
                                    <h3>Educate</h3>
                                    <p style={{color:"black"}}>Educate CARA members on ever-changing COVID-19 guidelines and restrictions.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-brand-designfloat"></i>
                                    </div>
                                    <h3>Assistance</h3>
                                    <p style={{color:"black"}}>Link to COVID-19 financial assistance info about loans/grants from Government and Private Corporations.</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-stock-mobile"></i>
                                    </div>
                                    <h3>Advocacy</h3>
                                    <p style={{color:"black"}}>Ensure our members are not visited disproportionally by enforcements agencies.</p>
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
                                    <h3>ENFORCEMENT AGENCY VISITS</h3>
                                    <p>Ability to log all agency visit information</p>
                                </div>
                            </div>

                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-delivery-time"></i>
                                    </div>
                                    <h3>PERMITS AND LICENSES</h3>
                                    <p>Ability to log permits and licenses information</p>
                                </div>
                            </div>
                            
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>WORKFORCE DEVELOPMENT</h3>
                                    <p>Free zoom training for staff and Manager-- Staff customer service development- will post schedules</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>OWNERS BUSINESS EDUCATION</h3>
                                    <p>Free zoom training for owners--- business structure education, financial management, and planning---will post schedules</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>DISCOUNT AND OFFERINGS</h3>
                                    <p>List of top 5 vendors, suppliers, distributors--full list in portal</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>CARA ONGOING FOCUS</h3>
                                    <p><Link href="/login">Free Membership</Link></p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>AWARENESS</h3>
                                    <p>Created or partner on events..meetings..boards..round tables..</p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>EXPERTISE</h3>
                                    <p><Link href="/</p>">List of partners..supporters..participants in panels</Link></p>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-6">
                                <div className="single-services-box">
                                    <div className="icon">
                                        <i className="icofont-pie-chart"></i>
                                    </div>
                                    <h3>RESEARCH AND INSIGHT</h3>
                                    <p>Info on black/Caribbean surveys..studies..research..</p>
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
