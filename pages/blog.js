import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {firestore,auth} from '../firebase/firebase.utils'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
import firebase from 'firebase/app';

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
        tags: [],
        content: "",
        tag: ""
    }
    handleChange = event => {
        const {name,value} = event.target;
        // console.log(value);
        this.setState({[name]: value})
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
        firestore.collection("blog")
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
        firestore.collection("blog").add({
            title: that.state.name,
            content: that.state.content,
            tags: that.state.tags,
            slug: `/blog/${encodeURI(that.state.title.toLowerCase())}`,
            image: that.state.imageUrl
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
                        <h1>News</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>News</li>
                        </ul>
                    </div>
                </div>    
                <section className="blog-area ptb-120">
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
                        
                        <div className="row">
                        {
                         this.state.visits.length>0 ?
                         this.state.visits.map(item=>(    
                            <div className="col-lg-4 col-md-6">
          
                                <div className="single-blog-post">
                                    <div className="blog-image">
                                        <a href="#"><img src={item.image ? item.image : require("../images/blog-image/1.jpg")} alt="image" /></a>
                                    </div>

                                    <div className="blog-post-content">
                                        <h3><a href="#">{item.title}</a></h3>
                                        <Link href={`${item.slug}`}><a className="read-more-btn">Read More<i className="icofont-double-right"></i></a></Link>
                                    </div>
                                </div>

                         
                            </div>
                            ))
                    :   <a href="#" class="list-group-item list-group-item-action active"></a>
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
            <label htmlFor="recipient-name" className="col-form-label">Content</label>
            <input type="text" value={this.state.content} onChange={this.handleChange} name='content' className="form-control" id="recipient-name"/>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Tags</label>
            <input type="text" value={this.state.tag} onChange={this.handleChange} name='tag' className="form-control" id="recipient-name"/>
            <button type="button" onClick={()=>{this.state.tags.push(this.state.tag);this.setState({tag:""})}}>Add Tag</button>
          </div>
          <div className="form-group">
            <label htmlFor="recipient-name" className="col-form-label">Image</label>
            <input type="file" value={this.state.image} onChange={this.handleImage} name='image' className="form-control" id="recipient-name"/>
          </div>
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
