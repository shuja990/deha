import React, { Component } from 'react';
import VisibilitySensor from "react-visibility-sensor";
import dynamic from 'next/dynamic';
import Link from 'next/link';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop:true,
    nav:false,
    dots:true,
    smartSpeed: 2000,
    animateOut: 'slideOutDown',
    autoplayHoverPause:true,
    animateIn: 'fadeInUp',
    items:1,
    autoplay:true,
    navText: [
        "<i class='icofont-arrow-left'></i>",
        "<i class='icofont-arrow-right'></i>"
    ]
}

export class Banner extends Component {

    state = {
        display: false
    }

    componentDidMount(){ 
        this.setState({ display: true }) 
    }

    render() {
        return (
            <React.Fragment>
            {this.state.display ? <OwlCarousel 
                className="home-slides startup-agency-home owl-carousel owl-theme"
                {...options}
            >
                <div className="main-banner item-bg1">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="row h-100 align-items-center">
                                    <div className="col-lg-8 col-md-12">
                                        <div className="hero-image">
                                            <img src={require("../../images/startup-agency-slider/1.jpg")} alt="image" />
                                        </div>
                                    </div>
                                    
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="col-lg-4 col-md-12">
                                                {/* <div className="hero-content"> */}
                                                    <h1
                                                        className={
                                                            isVisible ? "animated fadeInDown" : ''
                                                        }
                                                    >
                                                        1st Portal For Caribbean Restaurants
                                                    </h1>
                                                    <Link href="/signup"><a 
                                                        href="#"
                                                        className={`
                                                            btn btn-primary ${isVisible ? "animated fadeInDown" : ''}
                                                        `}
                                                    >
                                                        Join For Free
                                                    </a></Link>
                                                {/* </div> */}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-banner item-bg2">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="row h-100 align-items-center">
                                    <div className="col-lg-8 col-md-12">
                                        <div className="hero-image">
                                            <img src={require("../../images/startup-agency-slider/2.jpg")} alt="image" />
                                        </div>
                                    </div>
                                    
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="col-lg-4 col-md-12">
                                                {/* <div className="hero-content"> */}
                                                    <h1
                                                        className={
                                                            isVisible ? "animated fadeInDown" : ''
                                                        }
                                                    >
                                                        Our Industry - Our Culture - Your Champion
                                                    </h1>
                                                    <Link href="/signup"><a 
                                                        href="#"
                                                        className={`
                                                            btn btn-primary ${isVisible ? "animated fadeInDown" : ''}
                                                        `}
                                                    >
                                                        Join For Free
                                                    </a></Link>
                                                {/* </div> */}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="main-banner item-bg3">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="row h-100 align-items-center">
                                    <div className="col-lg-8 col-md-12">
                                        <div className="hero-image">
                                            <img src={require("../../images/startup-agency-slider/3.jpg")} alt="image" />
                                        </div>
                                    </div>
                                    
                                    <VisibilitySensor>
                                        {({ isVisible }) => (
                                            <div className="col-lg-4 col-md-12">
                                                {/* <div className="hero-content"> */}
                                                    <h1
                                                        className={
                                                            isVisible ? "animated fadeInDown" : ''
                                                        }
                                                    >
                                                        Our Industry - Our Culture - Your Champion
                                                    </h1>
                                                    <Link href="/signup"><a 
                                                        href="#"
                                                        className={`
                                                            btn btn-primary ${isVisible ? "animated fadeInDown" : ''}
                                                        `}
                                                    >
                                                        Join For Free
                                                    </a></Link>
                                                {/* </div> */}
                                            </div>
                                        )}
                                    </VisibilitySensor>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OwlCarousel> : ''}
            </React.Fragment>
        );
    }
}

export default Banner;
