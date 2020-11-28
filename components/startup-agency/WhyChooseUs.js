import Link from 'next/link';
import React, { Component } from 'react';

export class WhyChooseUs extends Component {
    render() {
        return (
            <section className="why-choose-us-area ptb-120">
                <div className="container">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-6 col-md-12">
                            <div className="why-choose-us-img">
                                <img src={require("../../images/1.jpg")} className="front-img" alt="img" />
                                <img src={require("../../images/2.jpg")} className="back-img" alt="img" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12">
                            <div className="why-choose-us-content">
                                <div className="section-title">
                                    <span>WHy Choose Us</span>
                                    <h2>We Are Creative, Designers & Developers change to CARA Goals</h2>
                                </div>
                                <p>The Caribbean American Restaurant Association is focused and dedicated to the enhancement and successes of the Caribbean culture in the food service industry in New York City. CARA services as a collective voice for hospitality businesses and strives to protect the prosperity of our members. CARA intends to fight to reverse current N.Y.C. and N.Y.S. policies that target hospitality businesses and disproportionately targets and jeopardize Caribbean American hospitality businesses. We want to empower you to achieve even more success than you thought possible because we assuredly understand the cultural challenges you face in NYC.</p>


                                <Link href="/about"><a href="#" className="btn btn-primary">About Us</a></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default WhyChooseUs;
