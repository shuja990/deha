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
        added: false,
        restaurant : '',
        name:'',
        email:'',
        cell:'',
        address:''
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
        if(auth.currentUser.email==="info@linkcaranow.org"){
          firestore.collection("users")
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
          firestore.collection("users").where("email", "==", auth.currentUser.email)
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
  permitEmail = () => {
      let c = []
    firestore.collection("visits")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let cd = doc.data()
            let currentDate = new Date()
            let expire = new Date(cd.date)
            let days = Math.floor((Date.UTC(expire.getFullYear(), expire.getMonth(), expire.getDate()) - Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) ) /(1000 * 60 * 60 * 24))
            console.log(days);
            if(days===60){
                c.push(cd)
                // console.log(cd);
            }
            // console.log(c);
        });
        let s = []
        c.forEach(element => {
            s.push(element.email)
        });
        fetch("https://us-central1-deha-d254a.cloudfunctions.net/api/permit",{
            method:'post',
						headers: {'Content-Type': 'application/json'},
						body: JSON.stringify({
              email:s
						})
          })
          .then(respone=>respone.json())
          .then(res =>{
          console.log('complete')
          })
          .catch(function(error) {
             console.log(error);
           });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  
  }
    addVisit = () => {
        const that = this;
        let docId = ""
        firestore.collection("users").where('email','==',that.state.email).get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(async function(doc) {
                // c.push(doc.data())
                docId = doc.id;
            });
            var washingtonRef = firestore.collection("users").doc(docId)
        return washingtonRef.update({
            displayName:that.state.name,
            restaurant:that.state.restaurant,
            email:that.state.email,
            cell:that.state.cell,
            address:that.state.address
        })
        .then(function() {
    			const alertId = StatusAlertService.showSuccess('Thank you for Caribbean American Restaurant Association.');
                  that.setState({added:true})
        })
        .catch(function(error) {
    			const alertId = StatusAlertService.showError('An error occured while updating. Thank you for Caribbean American Restaurant Association.');
        });
        
        })
        .catch(function(error) {
            const alertId = StatusAlertService.showError('An error occured while updating. Thank you for Caribbean American Restaurant Association.');
        });
    }
    showModal = () => {
        document.getElementById("exampleModal").style.display = "block"
    }
    render() {
        if(auth.currentUser!==null){
            if(auth.currentUser.email==="info@linkcaranow.org"){
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Users</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Users</li>
                        </ul>
                    </div>
                </div>              
                <section className="contact-area ptb-120">
                    <div className="container">
<button type="button" className="btn btn-primary" data-toggle="modal" onClick={this.permitEmail} data-target="#exampleModal">Send Permit Reminder</button>

                    <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Restaurant</th>
      <th scope="col">Address</th>
      <th scope="col">Phone</th>
      <th scope="col">Email</th>
      <th scope="col">Edit</th>
    </tr>
  </thead>
  <tbody>
      {this.state.visits.map((item,idx) => (
          <tr>
          <th scope="row">{idx+1}</th>
          <td>{item.displayName}</td>
          <td>{item.restaurant}</td>
          <td>{item.address}</td>
          <td>{item.cell}</td>
          <td>{item.email}</td>
          <td onClick={()=>{this.setState({name:item.displayName,restaurant:item.restaurant,address:item.address,cell:item.cell,email:item.email});this.showModal()}}>Edit</td>
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
        <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
        <button type="button" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Name</label>
            <input type="text" value={this.state.name} required onChange={this.handleChange} name='name' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Restaurant</label>
            <input type="text" value={this.state.restaurant} required onChange={this.handleChange} name='restaurant' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Address</label>
            <input type="text" value={this.state.address} required onChange={this.handleChange} name='address' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Phone No</label>
            <input type="text" value={this.state.cell} required onChange={this.handleChange} name='cell' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label" >Email</label>
            <input type="text" value={this.state.email} required disabled onChange={this.handleChange} name='email' className="form-control" id="recipient-name"/>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" onClick={()=>{ document.getElementById("exampleModal").style.display = "none"}} data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={()=>{this.addVisit(); document.getElementById("exampleModal").style.display = "none"}}>Update User</button>
      </div>
    </div>
  </div>
</div>
<StatusAlert/> 
                <Footer />
            </React.Fragment>
        );
    }
    else{
        return <div/>
    }
}
else{
    return <div/>
}
}
}

export default index;
