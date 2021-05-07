import React, { Component } from 'react';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import {auth,createUserProfileDocument} from '../firebase/firebase.utils'
import Router from 'next/router'
import StatusAlert, { StatusAlertService } from 'react-status-alert';
import 'react-status-alert/dist/status-alert.css';
import PhoneInput from 'react-phone-number-input/input'

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
        const {displayName,email,password,address,cell,restaurant} = this.state
        try {
            const {user} = await auth.createUserWithEmailAndPassword(
                email,
                password
            );
            await createUserProfileDocument(user,{displayName,address,cell,restaurant});
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
            const alertId = StatusAlertService.showSuccess("Thank you for registering with Caribbean American Restaurant Association. Please check your email for confirmation.");
              console.log('complete')
              
            this.setState({
                displayName: '',
                email: '',
                password : '',
                address: '',
                cell: '',
                restaurant: '',
            })
            setTimeout(() => { Router.push('/notice-board')  }, 5000);
              })
              .catch(function(error) {
                 alert("Error")
               });
            
        } catch (error) {
            const alertId = StatusAlertService.showError("Could not Signup. Please try again later");
            console.error(error)
        }
    }
    handleCell = (value) => {
        this.setState({cell: value})
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
                                                <PhoneInput
                                                placeholder="Enter phone number"
                                                value={this.state.cell}
                                                name="cell"
                                                country="US"
                                                className="form-control"
                                                // pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}"
                                                // max="10"
                                                onChange={this.handleCell}/>
                                                    {/* <input type="text"  value={this.state.cell} pattern="(?:\(\d{3}\)|\d{3})[- ]?\d{3}[- ]?\d{4}" name="cell" onChange={this.handleChange} placeholder="Cell Number (xxx) xxx-xxxx" required /> */}
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
                <div className="article-content p-4 m-4">
                    <h3 style={{textAlign:"center"}}><img src={require("../images/restaurant week.png")} width="200px" height="auto"/></h3>
                    <p>
                        <h5 style={{color:"green",textDecoration:"underline"}}>SIGN-UP IN FOUR SIMPLE STEPS</h5>
                        <span style={{fontWeight:"bold",fontSize:"18px"}}>STEP 1: REGISTRATION ONLINE</span>
                        
                        <br/>
                        Visit the Caribbean American Restaurant Association website and complete digital registration
                        using the ‘Join’ link at <a href="http://www.linkcaranow.org">Linkcaranow/</a>
                        <br/>
                        Note: Your registration provides complimentary inclusion to Deh Abroad Village, a free
                        information portal containing an inventory of businesses for the Caribbean diaspora.
                        <br/><br/>
                        <span style={{fontWeight:"bold",fontSize:"18px"}}>STEP 2: DOWNLOAD ‘BICKLE MEALS’ APP</span>
                       <br/>
                        
                        All order transactions for restaurant week will be done through Bickle Meals App. Your restaurant
                        will be provided a tablet and there are no setup charges.
                        <br/>
                        Note: There is a 15% charge per transaction
                        <br/><br/>
                        <span style={{fontWeight:"bold",fontSize:"18px"}}> STEP 3: SUBMIT YOUR SPECIAL MENU – <a href="mailto:orders@bicklemeals.com">orders@bicklemeals.com</a></span>
                       <br/>
                        Several weeks before the start of Restaurant Week, Caribbean American Restaurant Association
                        will contact you to obtain the special menu option to advertise. These include:
                        <br/>
                        • Weekly specials of specific items<br/>
                        • prix-fixe menus ($40)<br/>
                        • Pick your courses, prices, and dining services for the campaign.<br/><br/>
                        <span style={{fontWeight:"bold",fontSize:"18px"}}> STEP 4: PROMOTE</span>
                        <br/>
                        Promote event to customers, staff and the broader community by acknowledging your
                        participation with flyers, posters, and/or videos provided by Caribbean American Restaurant
                        Association.
                    </p>
                </div>
            <StatusAlert/>
                <Footer />
            </React.Fragment>
        );
    }
}

export default index;
