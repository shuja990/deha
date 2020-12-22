import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {auth} from '../firebase/firebase.utils'
import Router from 'next/router'

export class index extends Component {
    state={
        email: '',
        password : '',
    }
    handleChange = event => {
        const {name,value} = event.target;
        this.setState({[name]: value})
    }
    handleSubmit = async event => {
        event.preventDefault();
        const {email,password} = this.state;
        try {
            await auth.signInWithEmailAndPassword(email,password);
            Router.push('/')
            this.setState({email:'',password:''})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount(){
        if(auth.email){
            Router.push('/')
        }
    }
    render() {
        return (
            <React.Fragment>
                <Navbar />
                <div className="page-title-area item-bg1">
                    <div className="container">
                        <h1>Login</h1>
                        <ul>
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>Login</li>
                        </ul>
                    </div>
                </div>

                <section className="login-area ptb-120">
                    <div className="container">
                        <div className="row h-100 align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="login-image">
                                    <img src={require("../images/marketing.png")} alt="image" />
                                </div>
                            </div>

                            <div className="col-lg-6 col-md-12">
                                <div className="login-form">
                                    <h3>Welcome Back!</h3>
                                    <p>Please login to your account.</p>
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="email" onChange={this.handleChange} value={this.state.email} name="email" className="form-control" placeholder="Email" />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="password" onChange={this.handleChange} value={this.state.password} name="password" className="form-control" placeholder="Password" />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-check">
                                                    <input type="checkbox" className="form-check-input" id="checkme" />
                                                    <label className="form-check-label" for="checkme">Keep me Login</label>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 text-right">
                                                <p className="forgot-password"><a href="#">Forgot Password?</a></p>
                                            </div>

                                            <div className="col-lg-12">
                                                <button type="submit" className="btn btn-primary">Login Now!</button>
                                                <br />
                                                <span>New User? <a href="signup.html">Sign Up!</a></span>
                                            </div>
                                        </div>
                                    </form>
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
