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
import {firestore,auth} from '../firebase/firebase.utils'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
export class index extends Component {
    state = {
        data : [
        ],
        title: "",
        content:""
    }
    componentDidMount(){
        const that = this;
        let c = [];
        firestore.collection("faq")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            c.push(doc.data())
        });
        that.setState({data:c})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]: value})
    }
    addVisit = () => {
        const that = this;
        firestore.collection("faq").add({
            title: that.state.title,
            content: that.state.content,
        })
        .then(function(docRef) {
    			const alertId = StatusAlertService.showSuccess('Thank you for Caribbean American Restaurant Association.');

            console.log("Document written with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }
    showModal = () => {
        document.getElementById("exampleModal").style.display = "block"
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
                    {auth.currentUser!==null
                       ? <div>
                           {auth.currentUser.email === "info@linkcaranow.org"
                           ?
                           <button type="button" className="btn btn-primary" data-toggle="modal" onClick={this.showModal} data-target="#exampleModal">Add Entry</button>
                            : null
                         }
                       </div>
                          : <div></div>
                      }
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
                <div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add New FAQ</h5>
        <button type="button" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Title</label>
            <input type="text" value={this.state.title} onChange={this.handleChange} name='title' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Content</label>
            <input type="text" value={this.state.content} onChange={this.handleChange} name='content' className="form-control" id="recipient-name"/>
          </div>
          </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>{this.addVisit(); document.getElementById("exampleModal").style.display = "none"}}>Add Entry</button>
      </div>
    </div>
  </div>
</div>
<StatusAlert/>
                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
