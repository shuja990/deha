import React, { Component } from 'react';
import { withRouter } from 'next/router';
import { connect } from 'react-redux';
import Link from '../../utils/ActiveLink';
import SearchForm from './SearchForm';
import SideDrawer from './SideDrawer';
import {auth} from '../../firebase/firebase.utils'
import { Router } from 'next/router';
export class Navbar extends Component {
    _isMounted = false;

    state = {
        drawer: false,
        searchForm: false,
        collapsed: true,
    };

    toggleNavbar = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    handleSearchForm = () => {
        this.setState( prevState => {
            return {
                searchForm: !prevState.searchForm
            };
        });
    }

    handleDrawer = () => {
        this.setState( prevState => {
            return {
                drawer: !prevState.drawer
            };
        });
    }

    componentDidMount() {
        this._isMounted = true;
        let elementId = document.getElementById("navbar");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {

        let { pathname } = this.props.router;
        console.log(pathname);
        let { products } = this.props;
        const { collapsed } = this.state;
        const classOne = collapsed ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
        const classTwo = collapsed ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';
        let layOutCls = '';
        if (pathname == '/creative-blog'){
            layOutCls = 'p-relative';
        }

        return (
            <header id="header">
                <div id="navbar" className={`artflex-nav ${layOutCls}`}>
                    <div className="container">
                    {
                    pathname === "/" ?
                <h6 style={{color:"red",textAlign:"center",zIndex:"5"}}><a style={{zIndex:"6",color:"red",textAlign:"center"}} target="_blank" rel="nooppener norefferer" href="https://www1.nyc.gov/site/sbs/businesses/covid19-business-outreach.page">NY COVID-19 RESOURCES AND ASSISANTANCE CLICK HERE</a></h6>
                    : null
                }
                        <nav className="navbar navbar-expand-md navbar-light">
                            <Link href="/">
                                <a className="navbar-brand">
                                    <img width="300px" src={require("../../images/logo.png")} alt="logo" />
                                </a>
                            </Link>

                            <button 
                                onClick={this.toggleNavbar} 
                                className={classTwo}
                                type="button" 
                                data-toggle="collapse" 
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                                aria-expanded="false" 
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className={classOne} id="navbarSupportedContent">
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item"><a href="#" className="nav-link"><Link activeClassName="active" href="/">
                                                    <a className="nav-link">Home</a>
                                                </Link></a>
                                    </li>
                                    <li className="nav-item">
                                                    <Link activeClassName="active" href="/about-us">
                                                        <a className="nav-link">About Us</a>
                                                    </Link>
                                                </li>
                            <li className="nav-item">
                        <Link activeClassName="active" href="/services">
                            <a className="nav-link">Services</a>
                        </Link>
                    </li>
                   
                                    {/* <li className="nav-item">
                                        <a href="#" className="nav-link">Pages <i className="icofont-simple-down"></i>
                                    </a>
                                        <ul className="dropdown_menu">
                                            <li className="nav-item">
                                                <a href="#" className="nav-link">About</a>
                                                <ul className="dropdown_menu">
                                                    
                                                    <li className="nav-item">
                                                        <Link activeClassName="active" href="/about-me">
                                                            <a className="nav-link">About Me</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>

                                            <li className="nav-item">
                                                <a href="#" className="nav-link">Team</a>
                                                <ul className="dropdown_menu">
                                                    <li className="nav-item">
                                                        <Link activeClassName="active" href="/team">
                                                            <a className="nav-link">Team</a>
                                                        </Link>
                                                    </li>

                                                    <li className="nav-item">
                                                        <Link activeClassName="active" href="/team-details">
                                                            <a className="nav-link">Team Details</a>
                                                        </Link>
                                                    </li>
                                                </ul>
                                            </li>
                                            
                                            
                                           

                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/coming-soon">
                                                    <a className="nav-link">Coming Soon</a>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/error">
                                                    <a className="nav-link">404 Error</a>
                                                </Link>
                                            </li>
                                            
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/faq">
                                                    <a className="nav-link">FAQ</a>
                                                </Link>
                                            </li>

                                           
                                        </ul>
                                    </li> */}
                                   
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/faq">
                                                    <a className="nav-link">FAQ</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/blog">
                                                    <a className="nav-link">News</a>
                                                </Link>
                                            </li>
                                            {/* <li className="nav-item">
                                                <Link activeClassName="active" href="/blog">
                                                    <a className="nav-link">Blog</a>
                                                </Link>
                                            </li> */}
                                             <li className="nav-item">
                                                <Link activeClassName="active" href="/contact">
                                                    <a className="nav-link">Contact</a>
                                                </Link>
                                            </li>
                                            {
                                                auth.currentUser===null ?
                                                <>
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/signup">
                                                    <a className="nav-link">Join</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/login">
                                                    <a className="nav-link">Login</a>
                                                </Link>
                                            </li>
                                            </>:
                                            <>
                       
                                            {/* {auth.currentUser==="shujaali1234@gmail.com" ? */}

                                            {/* : null */}
                                            {/* } */}
                                            </>
                                            }


                                    {/* <li className="nav-item">
                                        <a href="#" className="nav-link">Blog <i className="icofont-simple-down"></i></a>
                                        <ul className="dropdown_menu">
                                          
                                            
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/blog-details">
                                                    <a className="nav-link">Blog Details</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li> */}

                                    {/* <li className="nav-item">
                                        <a href="#" className="nav-link">Portfolio <i className="icofont-simple-down"></i></a>
                                        <ul className="dropdown_menu">
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/portfolio">
                                                    <a className="nav-link">Portfolio</a>
                                                </Link>
                                            </li>
                                            
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/portfolio-details">
                                                    <a className="nav-link">Portfolio Details</a>
                                                </Link>
                                            </li>
                                        </ul>
                                    </li> */}
                                   
                                    {auth.currentUser!==null ?
                                    <li className="nav-item">
                                        <Link href="/My Account">
                                            <a 
                                                className="nav-link"
                                                onClick={e => e.preventDefault()}
                                            >
                                                My Account <i className="icofont-simple-down"></i>
                                            </a>
                                        </Link>
                                        <ul className="dropdown_menu">
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/notice-board">
                                                    <a className="nav-link">Notice Board</a>
                                                </Link>
                                            </li>
                                            
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/enforcement-agency-visits">
                                                    <a className="nav-link">Enforcement Agency Visits</a>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/resources">
                                                    <a className="nav-link">Resources</a>
                                                </Link>
                                            </li>

                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/permits-licenses">
                                                    <a className="nav-link">Permits & Licenses</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/staff-customer-service-development">
                                                    <a className="nav-link">Staff Customer Service Development</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/owner-education">
                                                    <a className="nav-link">Owner Education</a>
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link activeClassName="active" href="/discounts-and-offerings">
                                                    <a className="nav-link">Discounts and Offerings</a>
                                                </Link>
                                            </li>
                                            {
                                                auth.currentUser.email==="info@linkcaranow.org"?
                                                <>
                                                <li className="nav-item">
                                                    <Link activeClassName="active" href="/users">
                                                        <a className="nav-link">Users</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                {/* <Link activeClassName="active" onClick={()=>auth.signOut()}> */}
                                                    <a className="nav-link" onClick={()=>{auth.signOut();window.location.reload(false)}}>Logout</a>
                                                {/* </Link> */}
      
                                            </li>
                                                </>
                                                :
                                                <>
                                                <li className="nav-item">
                                                    <Link activeClassName="active" href="/users">
                                                        <a className="nav-link">Profile</a>
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                {/* <Link activeClassName="active" onClick={()=>auth.signOut()}> */}
                                                    <a className="nav-link" onClick={()=>{auth.signOut();window.location.reload(false)}}>Logout</a>
                                                {/* </Link> */}
      
                                            </li>
                                                </>
                                            }
                                        </ul>
                                    </li>
                                    :null
                                    }
                                    {/* <li className="nav-item">
                                        <Link activeClassName="active" href="/contact">
                                            <a className="nav-link">Contact</a>
                                        </Link>
                                    </li> */}
                                </ul>

                                <div className="others-option">
                                    <ul>
                                        {/* <li>
                                            <span 
                                                className="search-popup-icon"
                                                onClick={this.handleSearchForm}
                                            >
                                                <i className="icofont-ui-search"></i>
                                            </span>
                                        </li> */}

                                        {/* <li>
                                            <Link href="/cart">
                                                <a className="cart-icon">
                                                    <i className="icofont-bag"></i>
                                                    <span>{products.length}</span>
                                                </a>
                                            </Link>
                                        </li> */}

                                        <li onClick={this.handleDrawer}>
                                            <div className="side-menu">
                                                <span className="bar-1"></span>
                                                <span className="bar-2"></span>
                                                <span className="bar-3"></span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <SearchForm onClick={this.handleSearchForm} active={this.state.searchForm ? 'active' : ''} />
                    <SideDrawer onClick={this.handleDrawer} show={this.state.drawer ? 'show' : ''} />
                </div>
            </header>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        products: state.addedItems
    }
}

export default withRouter(connect(mapStateToProps)(Navbar));