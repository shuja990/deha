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
        phone: '',
        link:'',
    }
    handleChange = event => {
        const {name,value} = event.target;
        console.log(value);
        this.setState({[name]: value})
    }
    componentDidMount(){
        const that = this;
        let c = [];
        firestore.collection("discount")
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
        firestore.collection("discount").add({
            title: that.state.name,
            link: that.state.link,
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
                        <h1>Discounts and Offerings</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Discounts and Offerings</li>
                        </ul>
                    </div>
                </div>              
                <section className="contact-area ptb-120">
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
                      <h1>Discounts and Offerings</h1>
                     <div class="list-group">
                       {
                         this.state.visits.length>0 ?
                         this.state.visits.map(item=>(
                           <a href={item.link} class="list-group-item list-group-item-action">{item.title}</a>
                         ))
                        :  <a href="#" class="list-group-item list-group-item-action active">No Discounts and Offerings Found
                    </a>
                       }
              
                  </div>
                    </div>
                </section>
<div className="modal" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Add New Link</h5>
        <button type="button" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Title</label>
            <input type="text" value={this.state.name} onChange={this.handleChange} name='name' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Link</label>
            <input type="text" value={this.state.link} onChange={this.handleChange} name='link' className="form-control" id="recipient-name"/>
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
