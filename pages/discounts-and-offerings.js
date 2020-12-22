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
    addVisit = () => {
        const that = this;
        firestore.collection("visits").add({
            agency:that.state.agency,
            date: that.state.date,
            email : auth.email
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
                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
