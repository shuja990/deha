import React, { Component } from 'react';
import Link from 'next/link';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemPanel,
    AccordionItemButton
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

export class index extends Component {
    state = {
        data : [
            {
                title: "Are all the services on CARA free?",
                content: "Yes, all services on CARA are free."
              },
              {
                title: "Do I need a liquor license to become a member?",
                content: "No, you don't need a liquor license to a member."
              },
              {
                title: "Do I need to have employees to be a member?",
                content: "No, you don't need employees to be a member."
              },
              {
                title: "How do I sign up more than one location?",
                content: "Sign up each restaurant location individually"
              },
              {
                  title:'Is it ok for a member to have a private phone conversation?',
                  content:'Yes, you can call our number listed under contact'
              },
              {
                  title:'Is my password information secure?',
                  content:'Yes, your password is secure. If you forget your password there is an option to rest it.'
              },
              {
                  title:'Will my information be sold or given to other entity?',
                  content:'No, we will not sell or give away your information.'
              }
        ]
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>FAQ</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>FAQ</li>
                        </ul>
                    </div>
                </div>

                <section className="faq-area ptb-120">
			        <div className="container">
				        <div className="faq-accordion">
                        <Accordion>
                            {
                                this.state.data.map(item=>(
                                    <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        {item.title}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p className="accordion-content">{item.content}.</p>
                                </AccordionItemPanel>
                            </AccordionItem>
                           
                                ))
                            }
                        </Accordion>
                        </div>

                        {/* <div className="faq-contact">
                            <h3>Ask Your Question</h3>
                            <form>
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input type="text" placeholder="Name" className="form-control" />
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <input type="email" placeholder="Email" className="form-control" />
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <input type="text" placeholder="Subject" className="form-control" />
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <div className="form-group">
                                            <textarea name="message" cols="30" rows="6" placeholder="Message" className="form-control" />
                                        </div>
                                    </div>
                                    
                                    <div className="col-lg-12 col-md-12">
                                        <button className="btn btn-primary" type="submit">Submit Now!</button>
                                    </div>
                                </div>
                            </form>
                        </div> */}
                    </div>
                </section>

                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
