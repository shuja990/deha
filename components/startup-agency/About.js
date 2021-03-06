import React, { Component } from 'react';
import Link from '../../utils/ActiveLink'
export class About extends Component {
    render() {
        return (
            <section className="cta-about">
                <div className="container-fluid p-0">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="cta-about-image">
                                <img src={require("../../images/cta-about.jpg")} alt="cta-image" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6">
                            <div className="cta-about-content ptb-120">
                                <div className="section-title">
                                    <span>About Us</span>
                                    <h2>CARIBBEAN AMERICAN RESTAURANT ASSOCIATION, Inc. (CARA)</h2>
                                    <h3>Our Industry. Our Culture. Your Champion.</h3>
                                </div>
                                <p>In October 2020 the Deh Abroad Corporation created Caribbean American Restaurants Association Inc. (CARA), to advocate for and leverage Caribbean American hospitality businesses, provide resources, and eliminate adverse actions that have historically affected them. CARA will effectively work to navigate the needs of our Caribbean hospitality business owners ensuring equality while protecting our culture. CARA is the ONLY Caribbean advocacy group focused on delivering hospitality industry benefits, services, and solutions.</p>

                                <Link href="/contact"><a href="#" className="btn btn-primary">Let's Talk</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default About;
