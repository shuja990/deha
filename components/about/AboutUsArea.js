import React, { Component } from 'react';

export class AboutUsArea extends Component {
    render() {
        return (
            <section className="about-us-area ptb-120">
                <div className="container">
                    <div className="row h-100 align-items-center">
                        <div className="col-lg-8">
                            <div className="about-us-content">
                                <div className="section-title">
                                    <h2>CARIBBEAN AMERICAN RESTAURANT ASSOCIATION, Inc. (C.A.R.A.) 	</h2>
                                </div>
                                <p>Our Industry. Our Culture. Your Champion.</p>

                                <div className="row m-0">
                                    <div className="col-lg-12 col-md-12 col-sm-12 p-0">
                                        <div className="single-about-box">
                                            <h3>About Us</h3>
                                            <p>In October 2020 the Deh Abroad Corporation created Caribbean American Restaurants Association Inc. (CARA), to advocate for and leverage Caribbean American hospitality businesses, provide resources, and eliminate adverse actions that have historically affected them. CARA will effectively work to navigate the needs of our Caribbean hospitality business owners ensuring equality while protecting our culture. CARA is the ONLY Caribbean advocacy group focused on delivering hospitality industry benefits, services, and solutions. </p>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 p-0">
                                        <div className="single-about-box">
                                            <h3>CARA Goals</h3>
                                            <p>The Caribbean American Restaurant Association is focused and dedicated to the enhancement and successes of the Caribbean culture in the food service industry in New York City. CARA services as a collective voice for hospitality businesses and strives to protect the prosperity of our members. CARA intends to fight to reverse current N.Y.C. and N.Y.S. policies that target hospitality businesses and disproportionately targets and jeopardize Caribbean American hospitality businesses. We want to empower you to achieve even more success than you thought possible because we assuredly understand the cultural challenges you face in NYC.</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 col-md-12 col-sm-12 p-0">
                                        <div className="single-about-box">
                                            <h3>COVID-19</h3>
                                            <p>The devastating effects of the COVID-19 pandemic exposed the barriers Caribbean American business owners’ face and more specifically Caribbean restaurant owners.  CARA understands Caribbean American restaurants and their very unique cultural differences compared to other communities. However, the insensitivity towards Caribbean culture creates more opportunity for enforcements visits by NYC enforcement agencies which result in detrimental outcomes. Excessive visits leads to unnecessary summonses which leads to some businesses closing.
                                            Without new intervention to collaborate with NYC government, Caribbean American hospitality businesses will continue to suffer with disproportionate outcomes. New COVID-19 regulations and laws determine how your restaurant operates and how well our hospitality culture succeeds. That’s where CARA comes in, to take on the fight so you can focus on what matters most for your growth and prosperity for your business.
                                            Services
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4">
                            <div className="about-us-image">
                                <img src={require("../../images/about2.jpg")} alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default AboutUsArea;
