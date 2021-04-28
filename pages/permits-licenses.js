import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {auth,firestore} from '../firebase/firebase.utils'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
export class index extends Component {
    state = {
        visits: [],
        agency: 'State Liquor Authority (SLA)',
        date: '',
        restaurant:'',
        added: false
    }
    handleChange = event => {
        const {name,value} = event.target;
        // console.log(value);
        this.setState({[name]: value})
    }
    componentDidMount(){
        const that = this;
        let c = [];
        if(auth.currentUser!==null){
          if(auth.currentUser.email==="shujaali1234@gmail.com"){
            firestore.collection("visits")
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
          else{
            firestore.collection("visits").where("email", "==", auth.currentUser.email)
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
    }
    addVisit = () => {
      let datse = new Date(this.state.date).toDateString()
        const that = this;
        firestore.collection("visits").add({
            agency:that.state.agency,
            date: datse,
            email : auth.currentUser.email,
            restaurant: that.state.restaurant,
            datee : new Date().toDateString()
        })
        .then(function(docRef) {
    			const alertId = StatusAlertService.showSuccess('Thank you for Caribbean American Restaurant Association.');
          fetch("https://us-central1-deha-d254a.cloudfunctions.net/api/action",{
            method:'post',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
              email: auth.currentUser.email,
              restaurant: that.state.restaurant,
              action: `Added Permit ${that.state.agency}`
						})
          })
          .then(respone=>respone.json())
          .then(res =>{
          console.log('complete')
          })
          .catch(function(error) {
             alert("Error")
           });
          that.setState({added:true})

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
      console.log(this.state.visits);
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Permits and Licenses</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Permits and Licenses</li>
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
      <th scope="col">License Name</th>
      <th scope="col">Restaurant</th>
      <th scope="col">Expiration Date</th>
      <th scope="col">Date Created</th>

    </tr>
  </thead>
  <tbody>
      {this.state.visits.map((item,idx) => (
          <tr>
          <th scope="row">{idx+1}</th>
          <td>{item.agency}</td>
          <td>{item.restaurant}</td>
          <td>{item.date}</td>
          <td>{item.datee}</td>

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
        <h5 className="modal-title" id="exampleModalLabel">Add Permits and Licenses</h5>
        <button type="button" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Expiration Date</label>
            <input type="date" required value={this.state.date} onChange={this.handleChange} name='date' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Restaurant</label>
            <input type="text" value={this.state.restaurant} required onChange={this.handleChange} name='restaurant' className="form-control" id="recipient-name"/>
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
