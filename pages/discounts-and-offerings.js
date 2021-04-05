import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {firestore,auth} from '../firebase/firebase.utils'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
import firebase from 'firebase/app';
import Select from 'react-dropdown-select'
export class index extends Component {
    state = {
        visits: [],
        name: '',
        title: '',
        email: '',
        phone: '',
        link:'',
        image:'',
        progress: '',
        imageUrl: '',
        description: '',
        category:'',
        position: 0,
        selectedCategory: 'Restaurant Depot',
        options: [{label:"Restaurant Depot",value:"Restaurant Depot"},{label:"Accountant" ,value:"Accountant"},{label:"Attorney" ,value:"Attorney"}]
    }
    handleChange = event => {
        const {name,value} = event.target;
        // console.log(value);
        this.setState({[name]: value})
    }
    handleSelect = value =>{
        let pos = this.state.visits.map(function(e) { return e.category; }).indexOf(value[0].value);
        this.setState({selectedCategory:value,position:pos})
    }
    handleImage = event => {
      const {value,name} = event.target
      const that = this
      this.setState({[name]: value})
      var fil = event.target.files[0]
      var storageRef = firebase.storage().ref();
      var uploadTask = storageRef.child('images/' + fil.name).put(fil);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
              alert('Upload Paused')
              break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
              // alert(`File is Uploading ${progress}%`);
              that.setState({progress:progress})
              break;
          }
      }, function(error) {
      switch (error.code) {
          case 'storage/unauthorized':
          alert('Upload Failed')
          break;
          case 'storage/canceled':
              alert('Upload Failed')
          break;
          case 'storage/unknown':
              alert('Upload Failed')
          break;
      }
      }, function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
          that.setState({imageUrl:downloadURL},()=>{
    			const alertId = StatusAlertService.showSuccess('Image Uploaded Successfully');
          })
      });
      });
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
        let pos = c.map(function(e) { return e.category; }).indexOf("Restaurant Depot");
        that.setState({visits:c,position:pos})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
    addVisit = () => {
        const that = this;
        let docId = '';
        let visits = 
        firestore.collection("discount").where("category","==",that.state.category)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            docId = doc.id;
            let c = doc.data()
            visits = c.discounts
            // console.log(c);
            visits.push({
                title: that.state.name,
                link: that.state.link,
                image: that.state.imageUrl,
                description: that.state.description
            })
            // console.log(visits);
            firestore.collection("discount").doc(docId).set({
                discounts: visits,
                category: that.state.category
            })
            .then(function(docRef) {
                    const alertId = StatusAlertService.showSuccess('Thank you for Caribbean American Restaurant Association.');
    
                // console.log("Document written with ID: ", docRef.id);
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
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
                <section className="blog-area ptb-120">
                    <div className="container">
                    {auth.currentUser!==null
                       ? <div>
                           {auth.currentUser.email === "shujaali1234@gmail.com"
                           ?
                           <button type="button" className="btn btn-primary" data-toggle="modal" onClick={this.showModal} data-target="#exampleModal">Add Entry</button>
                            : null
                         }
                       </div>
                          : <div></div>
                      }
                      <div className="form-group">
                      <Select
                        placeholder="Search Category"
                        // multi
                        // noDataRenderer={this.customNoDataRenderer}
                        onChange={(value) => this.handleSelect(value)}
                        values={[{label:"Restaurant Depot",value:"Restaurant Depot"}]}
                        options={this.state.options}
                        />
                        </div>
                        <div className="row">
                        {
                         this.state.visits.length>0 ?
                         this.state.visits[this.state.position].discounts.map(item=>(   
                            <div className="col-lg-4 col-md-6">
           
                                <div className="single-blog-post" style={{boxShadow:"none"}}>
                                    <div className="blog-image" style={{border:"1px solid black"}}>
                                        <a href="#"><img src={item.image ? item.image : require("../images/blog-image/1.jpg")} alt="image" /></a>
                                    </div>

                                    <div className="blog-post-content">
                                        <h3><a href="#">{item.title}</a></h3>
                                        <p>{item.description}</p>
                                        <Link href={item.link}><a href="#" className="read-more-btn">Check it out<i className="icofont-double-right"></i></a></Link>
                                    </div>
                                </div>
                           
                         
                            </div>
     ))
     :   <a href="#" class="list-group-item list-group-item-action active">No Discounts and Offerings Found</a>
        }
                            
                            {/* <div className="col-lg-12 col-md-12">
                                <div className="pagination-area">
                                    <nav aria-label="Page navigation">
                                        <ul className="pagination justify-content-center">
                                            <li className="page-item"><a className="page-link" href="#"><i className="icofont-double-left"></i></a></li>
                                            <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                            <li className="page-item"><a className="page-link" href="#">2</a></li>
                                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                                            <li className="page-item"><a className="page-link" href="#"><i className="icofont-double-right"></i></a></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div> */}
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
          <div className="form-group">
            <label htmlFor="description" className="col-form-label">Description</label>
            <input type="text" value={this.state.description} onChange={this.handleChange} name='description' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Image</label>
            <input type="file" value={this.state.image} onChange={this.handleImage} name='image' className="form-control" id="recipient-name"/>
          </div>
          <label for="sel1">Select Category:</label>
            <select class="form-control" id="sel1" value={this.state.category} onChange={this.handleChange} name='category'>
                <option>Restaurant Depot</option>
                <option>Accountant</option>
                <option>Attorney</option>

            </select>
          <progress id="file" value={this.state.progress} max="100">{this.state.progress}</progress>
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
