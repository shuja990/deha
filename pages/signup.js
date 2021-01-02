import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {auth,createUserProfileDocument} from '../firebase/firebase.utils'
import Router from 'next/router'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';

export class index extends Component {
    state={
        displayName: '',
        email: '',
        password : '',
        address: '',
        cell: '',
        restaurant: ''
    }
    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]: value})
    }
    componentDidMount(){
        if(auth.currentUser){
            Router.push('/')
        }
    }
    handleSubmit = async event => {
        event.preventDefault();
        const that = this
        const {displayName,email,password,address,cell,restaurant,userName} = this.state
        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserProfileDocument(user,{displayName,address,cell,restaurant,userName});
            // const router = useRouter()
            fetch("https://us-central1-deha-d254a.cloudfunctions.net/api/register",{
                method:'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: that.state.displayName,
                    email: that.state.email,
                    address: that.state.address,
                    phone: that.state.cell,
                    restaurant: that.state.restaurant,
                })
              })
              .then(respone=>respone.json())
              .then(res =>{
              console.log('complete')
              })
              .catch(function(error) {
                 alert("Error")
               });
            Router.push('/')
            this.setState({
                displayName: '',
                email: '',
                password : '',
                address: '',
                cell: '',
                restaurant: '',
                userName: ''
            })
        } catch (error) {
            const alertId = StatusAlertService.showError("Could not Signup. Please try again later");
            console.error(error)
        }
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Join</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Signup</li>
                        </ul>
                    </div>
                </div>

                <section className="signup-area ptb-120">
                    <div className="container">
                        <div className="row h-100 align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="signup-form">
                                    <h3>Create your Account</h3>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                        <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="email" className="form-control" value={this.state.email} name="email" onChange={this.handleChange} placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="password" className="form-control" value={this.state.password} name="password" onChange={this.handleChange} placeholder="Password" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" value={this.state.displayName} name="displayName" onChange={this.handleChange} placeholder="Restaurant Owner Name" />
                                                </div>
                                            </div>
                                      


                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" value={this.state.restaurant} name="restaurant" onChange={this.handleChange} placeholder="Restaurant" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" value={this.state.address} name="address" onChange={this.handleChange} placeholder="Address" />
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="number" className="form-control" value={this.state.cell} name="cell" onChange={this.handleChange} placeholder="Cell Number" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="checkme" />
                                                    <label className="form-check-label" htmlFor="checkme">Keep me Login</label>
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <button type="submit" className="btn btn-primary">Signup Now!</button>
                                                <br />
                                                <span>Already a registered user? <a href="login.html">Login!</a></span>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="signup-image">
                                    <img src={require("../images/marketing1.png")} alt="image" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            <StatusAlert/>
                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
