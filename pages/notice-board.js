import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {auth,firestore} from '../firebase/firebase.utils'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
export class index extends Component {
    state= {
        name:'',
        email: '',
        phone: '',
        restaurant:'',
        message: '',
        visits: []
    }
    handleChange = event => {
        const {name,value} = event.target;
        console.log(value);
        this.setState({[name]: value})
    }
    componentDidMount(){
        const that = this;
        let c = [];
        // console.log(auth.email);
        firestore.collection("notice")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            c.push(doc.data())
        });
        that.setState({visits:c})
        // console.log(auth.email);

    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
    addVisit = (e) => {
        e.preventDefault();
        const that = this;
        firestore.collection("notice").add({
            // name: that.state.name,
            email: auth.currentUser.email,
            // phone: that.state.phone,
            message: that.state.message,
            restaurant: that.state.restaurant,
            date: new Date().toDateString()
        })
        .then(function(docRef) {
          const alertId = StatusAlertService.showSuccess('Thank you for messaging Caribbean American Restaurant Association.');
          fetch("https://us-central1-deha-d254a.cloudfunctions.net/api/action",{
            method:'post',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
              email: auth.currentUser.email,
              restaurant: that.state.restaurant,
              action: `Added to Notice Board ${that.state.message}`
						})
          })
          .then(respone=>respone.json())
          .then(res =>{
          console.log('complete')
          })
          .catch(function(error) {
             alert("Error")
           }); 
          that.setState({
                name:'',
        email: '',
        phone: '',
        restaurant:'',
        message: ''
            })
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
    }

    render() {
        console.log(auth.currentUser);
        if(auth.currentUser!==null){
            if(auth.currentUser.email==="info@linkcaranow.org"){
                return (
                    <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Notice Board</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Notice Board</li>
                        </ul>
                    </div>
                </div>            
                <section className="contact-area ptb-120">
                    <div className="container">
{/* <button type="button" className="btn btn-primary" data-toggle="modal" onClick={this.showModal} data-target="#exampleModal">Add Entry</button> */}

                    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      {/* <th scope="col">Owner Name</th> */}
      <th scope="col">Restaurant</th>
      <th scope="col">Message</th>
      <th scope="col">Date Created</th>
    </tr>
  </thead>
  <tbody>
      {this.state.visits.map((item,idx) => (
          <tr>
          <th scope="row">{idx+1}</th>
          {/* <td>{item.name}</td> */}
          <td>{item.restaurant}</td>
          <td>{item.message}</td>
          <td>{item.date}</td>
        </tr>
      ))}
  </tbody>
</table>
                    </div>
                </section>
<StatusAlert/> 

                <Footer />
            </React.Fragment>

                )
            }
            else {
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Notice Board</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Notice Board</li>
                        </ul>
                    </div>
                </div>                
                <section className="contact-area ptb-120">
                    <div className="container">
                        <div className="section-title">
                            <span>Notice Board</span>
                            <h2>Add any issues you are facing here</h2>
                        </div>

                        <div className="row h-100 justify-content-center align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <form id="contactForm" onSubmit={this.addVisit}>
                                    <div className="row">
                                        {/* <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <input name="name" value={this.state.name} onChange={this.handleChange} type="text" className="form-control" required={true} data-error="Please enter your name" placeholder="Name" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div> */}

                                        {/* <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} className="form-control" required={true} data-error="Please enter your email" placeholder="Email" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div> */}

                                        {/* <div className="col-lg-12 col-md-6">
                                            <div className="form-group">
                                                <input name="phone" value={this.state.phone} onChange={this.handleChange} type="text" className="form-control" placeholder="Phone" />
                                            </div>
                                        </div> */}

                                        <div className="col-lg-12 col-md-6">
                                            <div className="form-group">
                                                <input type="text" name="restaurant" value={this.state.restaurant} onChange={this.handleChange} className="form-control" placeholder="Restaurant" />
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <div className="form-group">
                                                <textarea name="message" name="message" value={this.state.message} onChange={this.handleChange} className="form-control" id="message" cols="30" rows="5" required data-error="Write your issue" placeholder="Your Message" />
                                                <div className="help-block with-errors"></div>
                                            </div>
                                        </div>

                                        <div className="col-lg-12 col-md-12">
                                            <button type="submit" className="btn btn-primary">Send Message</button>
                                            <div id="msgSubmit" className="h3 text-center hidden"></div>
                                            <div className="clearfix"></div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="ptb-120 pt-0">
                    <div className="container">
{/* <button type="button" className="btn btn-primary" data-toggle="modal" onClick={this.showModal} data-target="#exampleModal">Add Entry</button> */}

                    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      {/* <th scope="col">Owner Name</th> */}
      <th scope="col">Restaurant</th>
      <th scope="col">Message</th>
      <th scope="col">Date Created</th>
    </tr>
  </thead>
  <tbody>
      {this.state.visits.map((item,idx) => {
          if(item.email === auth.currentUser.email) 
      return(
          <tr>
          <th scope="row">{idx+1}</th>
          {/* <td>{item.name}</td> */}
          <td>{item.restaurant}</td>
          <td>{item.message}</td>
          <td>{item.date}</td>
        </tr>
      )
    
    }
      )
      }
  </tbody>
</table>
                    </div>
                </section>
                <StatusAlert/> 

                <Footer />
            </React.Fragment>
        );
        }
    }
    else{
        return(
            <React.Fragment>
            <Navbar />
            <div className="page-title-area item-bg1">
                <div className="container">
                    <h1>Notice Board</h1>
                    <ul>
                        <li>
                            <Link href="/">
                                <a>Home</a>
                            </Link>
                        </li>
                        <li>Notice Board</li>
                    </ul>
                </div>
            </div>   
            <div>
                <h3>You Need to be Signed in to access this page</h3>
            </div>
            <StatusAlert/> 

            <Footer/>
            </React.Fragment>     
        )
    }
    }
}

export default index;
