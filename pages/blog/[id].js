import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import {firestore} from '../../firebase/firebase.utils'
export class index extends Component {
    state = {
        post: {
            tags: [],
            content:""
        },
        monthNames : ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ]
        // content:""
    }
    componentDidMount(){
        const that = this;
        let c = {};
        firestore.collection("blog")
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            let d = doc.data()
            if(d.slug === window.location.pathname){
                c = d
            }
        });
        that.setState({post:c})
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
    }
    render() {
        // console.log(window.location);
        console.log(this.state.post);
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>{this.state.post.title}</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog">
                                    <a>News</a>
                                </Link>
                            </li>
                            <li>{this.state.post.title}</li>
                        </ul>
                    </div>
                </div>

                <section className="blog-details-area ptb-120 p-3 m-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12">
                                <div className="blog-details">
                                    <div className="article-img">
                                        <img src={this.state.post.image ? this.state.post.image : require("../../images/blog-image/1.jpg")} alt="blog-details" />
                                        <div className="date">{this.state.post.date} <br /> {this.state.monthNames[this.state.post.month]}</div>
                                    </div>
                                    
                                    <div className="article-content">
                                        <ul className="category">
                                            {/* {
                                                this.state.post.tags.map(item=>(
                                                    <li><a href="#">{item}</a></li>
                                                ))
                                            } */}
                                        </ul>
                                        <h3>{this.state.post.title}</h3>
                                        <p dangerouslySetInnerHTML={{__html: this.state.post.content}}></p>
                                    </div>
                                </div>
                               </div>

                        </div>
                    </div>
                </section>

                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
