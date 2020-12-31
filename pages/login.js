import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {auth} from '../firebase/firebase.utils'
import Router from 'next/router'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
export class index extends Component {
    state={
        email: '',
        password : '',
        forgot: false,
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
    forgotPassoword = e => {
        e.preventDefault();
        const that = this
        auth.sendPasswordResetEmail(this.state.email).then(function() {
            StatusAlertService.showSuccess('Email has been sent to you to reset your password. Thank you for Caribbean American Restaurant Association.');
            that.setState({email:''})            
        }).catch(function(error) {
            const alertId = StatusAlertService.showError('Sorry, your Email could not be found. Thank you for Caribbean American Restaurant Association.');

        });
      }
    render() {
        if(this.state.forgot===false){
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
                                                <p className="forgot-password"><a onClick={()=>this.setState({forgot:true})}>Forgot Password?</a></p>
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
                <StatusAlert/> 

                <Footer />
            </React.Fragment>
        );
        }
        else{
            return(
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
                                    <p>Please enter your Email.</p>
                                    <form onSubmit={this.forgotPassoword}>
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <input type="email" onChange={this.handleChange} value={this.state.email} name="email" className="form-control" placeholder="Email" />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 text-right">
                                                <p className="forgot-password"><a href="/login">Back to Login</a></p>
                                            </div>

                                            <div className="col-lg-12">
                                                <button type="submit" className="btn btn-primary">Forgot Password</button>
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
                <StatusAlert/> 

                <Footer />
            </React.Fragment>
            );
        }
    }
}

export default index;
