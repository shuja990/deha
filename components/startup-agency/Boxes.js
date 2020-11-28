import React, { Component } from 'react';

export class Boxes extends Component {
    render() {
        return (
            <section className="boxes-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-box">
                                <div className="icon">
                                    <i className="icofont-dart"></i>
                                </div>
                                <h3>Advocacy</h3>
                                <p>Advocate for changes for unbiased treatment towards Caribbean American businesses.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-box black-color">
                                <div className="icon">
                                    <i className="icofont-handshake-deal"></i>
                                </div>
                                <h3>Research and Insight</h3>
                                <p>We will continually conduct industry research to help our members stay ahead of the game. We work to get you in front of trends before they emerge</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6 offset-lg-0 offset-md-3">
                            <div className="single-box">
                                <div className="icon">
                                    <i className="icofont-pie-chart"></i>
                                </div>
                                <h3>Business Promotion to SEO Ranking</h3>
                                <p>See assist restaurants on focusing on the correct use of keywords. They are not only the main ingredient in any good SEO recipe but also the best way to reach users who want to eat what you offer and are located close to you.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Boxes;
