import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {firestore,auth} from '../firebase/firebase.utils'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
export class index extends Component {
    state = {
        visits: [],
        name: '',
        title: '',
        email: '',
        restaurant: '',
        phone: '',
        comments:''
    }
    handleChange = event => {
        const {name,value} = event.target;
        console.log(value);
        this.setState({[name]: value})
    }
    componentDidMount(){
        const that = this;
        let c = [];
        firestore.collection("staff")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            c.push(doc.data())
        });
        that.setState({visits:c})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
    addVisit = () => {
        const that = this;
    			const alertId = StatusAlertService.showSuccess('Thank you for Caribbean American Restaurant Association.');
        firestore.collection("staff").add({
            name: that.state.name,
            email: that.state.email,
            phone: that.state.phone,
            title: that.state.title,
            restaurant: that.state.restaurant,
            date: new Date().toDateString(),
            comments:this.state.comments
        })
        .then(function(docRef) {
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
                        <h1>Staff Customer Service Development</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Staff Customer Service Development</li>
                        </ul>
                    </div>
                </div>              
                <section className="contact-area ptb-120">
                    <div className="container">
                       
                           <button type="button" className="btn btn-primary" data-toggle="modal" onClick={this.showModal} data-target="#exampleModal">Add Entry</button>
                      
                    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Restaurant</th>
      <th scope="col">Name</th>
      <th scope="col">Title</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Date</th>
      <th scope="col">Comments</th>
      
    </tr>
  </thead>
  <tbody>
      {this.state.visits.map((item,idx) => (
          <tr>
          <th scope="row">{idx}</th>
          <td>{item.restaurant}</td>
          <td>{item.name}</td>
          <td>{item.title}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.date}</td>
          <td>{item.comments}</td>

        </tr>
      ))}
  </tbody>
</table>
                    </div>
                </section>
<div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add New Employee</h5>
        <button type="button" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Name</label>
            <input type="text" value={this.state.name} onChange={this.handleChange} name='name' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Title</label>
            <input type="text" value={this.state.title} onChange={this.handleChange} name='title' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Email</label>
            <input type="email" value={this.state.email} onChange={this.handleChange} name='email' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Phone</label>
            <input type="number" value={this.state.phone} onChange={this.handleChange} name='phone' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Restaurant</label>
            <input type="text" value={this.state.restaurant} required onChange={this.handleChange} name='restaurant' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Comments</label>
            <input type="text" value={this.state.comments} required onChange={this.handleChange} name='comments' className="form-control" id="recipient-name"/>
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
