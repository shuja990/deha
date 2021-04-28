import React, { Component } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Banner from '../components/startup-agency/Banner';
import Boxes from '../components/startup-agency/Boxes';
import WhyChooseUs from '../components/startup-agency/WhyChooseUs';
import Services from '../components/startup-agency/Services';
import About from '../components/startup-agency/About';
import Works from '../components/startup-agency/Works';
import Feedback from '../components/startup-agency/Feedback';
import HowWeWork from '../components/startup-agency/HowWeWork';
import Team from '../components/startup-agency/Team';
import Features from '../components/startup-agency/Features';
import Skills from '../components/startup-agency/Skills';
import Funfacts from '../components/startup-agency/Funfacts';
import Blog from '../components/startup-agency/Blog';
import Partner from '../components/startup-agency/Partner';
import Contact from '../components/startup-agency/Contact';
import Router from 'next/router'

export class index extends Component {

    showModal = () => {
        document.getElementById("exampleModal").style.display = "block"
    }
    componentDidMount(){
        document.getElementById("exampleModal").style.display = "block"
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <Banner /> 
                <About />
                <WhyChooseUs />
                {/* <Services /> */}
                {/* <Works /> */}
                {/* <Feedback /> */}
                {/* <HowWeWork /> */}
                {/* <Team /> */}
                {/* <Features /> */}
                {/* <Skills /> */}
                {/* <Funfacts /> */}
                {/* <Blog /> */}
                <div className="modal" id="exampleModal" style={{overflow:"scroll"}}tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" style={{maxWidth:"950px"}} role="document">
    <div className="modal-content">
      <div className="modal-header">
        {/* <h5 className="modal-title" id="exampleModalLabel">Add New Link</h5> */}
        <button type="button" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          {/* <img src={}/> */}
          {/* <img src={}/> */}
        <picture>
            <source 
                media="(min-width: 650px)"
                srcset={require("../images/modal-lp.jpeg")}/>
            <source 
                media="(min-width: 465px)"
                srcset={require("../images/modal-mb.jpeg")}/>
            <img src={require("../images/modal-lp.jpeg")} 
            alt="Caribbean Restaurant Week"/>
            </picture>

       </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary" onClick={()=>Router.push('/signup')} data-dismiss="modal">Click here to Register</button>
      </div>
    </div>
  </div>
</div>

                <Boxes />

                <Partner />

                <Contact />

                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
