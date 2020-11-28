import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export class index extends Component {
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Blog</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Blog</li>
                        </ul>
                    </div>
                </div>

                <section className="blog-area ptb-120">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4 col-md-6">
                                <div className="single-blog-post">
                                    <div className="blog-image">
                                        <a href="#"><img src={require("../images/blog-image/1.jpg")} alt="image" /></a>

                                        <div className="post-tag">
                                            <a href="#">Restuarant</a>
                                        </div>
                                    </div>

                                    <div className="blog-post-content">
                                        <span className="date">25 Feb, 2019</span>
                                        <h3><a href="#">The Most Popular New top Business Apps</a></h3>
                                        <Link href="/blog-details"><a href="#" className="read-more-btn">Read More <i className="icofont-double-right"></i></a></Link>
                                    </div>
                                </div>
                            </div>

                            
                            <div className="col-lg-12 col-md-12">
                                <div className="pagination-area">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item"><a className="page-link" href="#"><i className="icofont-double-left"></i></a></li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            {/* <li className="page-item"><a className="page-link" href="#">2</a></li> */}
                                            {/* <li className="page-item"><a className="page-link" href="#">3</a></li> */}
                                            <li className="page-item"><a className="page-link" href="#"><i className="icofont-double-right"></i></a></li>
                                        </ul>
                                    </nav>
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
