import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {auth,firestore} from '../firebase/firebase.utils'
export class index extends Component {
    state = {
        visits: [],
        agency: '',
        date: ''
    }
    handleChange = event => {
        const {name,value} = event.target;
        console.log(value);
        this.setState({[name]: value})
    }
    componentDidMount(){
      const that = this;
      let c = [];
      if(auth.currentUser!==null){
      firestore.collection("agency").where("email", "==", auth.currentUser.email)
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
  }
    addVisit = () => {
        const that = this;
        firestore.collection("agency").add({
            agency:that.state.agency,  
            date: that.state.date,
            email : auth.currentUser.email
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
                        <h1>Enforcement Agency Visits</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Enforcement Agency Visits</li>
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
      <th scope="col">Agency Name</th>
      <th scope="col">Date</th>
    </tr>
  </thead>
  <tbody>
      {this.state.visits.map((item,idx) => (
          <tr>
          <th scope="row">{idx}</th>
          <td>{item.agency}</td>
          <td>{item.date}</td>
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
        <h5 className="modal-title" id="exampleModalLabel">Add New Visit</h5>
        <button type="button" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Date</label>
            <input type="date" value={this.state.date} onChange={this.handleChange} name='date' className="form-control" id="recipient-name"/>
          </div>
          <label for="sel1">Select list:</label>
            <select class="form-control" id="sel1" value={this.state.agency} onChange={this.handleChange} name='agency'>
                <option>State Liquor Authority (SLA)</option>
                <option>Police Department</option>
                <option>Health Department</option>
                <option>Police Department</option>
                <option>Building Department</option>
                <option>Fire Department</option>
            </select>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>{this.addVisit(); document.getElementById("exampleModal").style.display = "none"}}>Add Entry</button>
      </div>
    </div>
  </div>
</div>
                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
