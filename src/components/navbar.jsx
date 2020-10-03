import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import scammer1 from '../static/images/scammer1.png'
import '../static/css/navbar.css'
class Navbar extends Component {

    componentDidMount(){
    var nav_elems = document.querySelectorAll('.sidenav');
    var nav_instances = M.Sidenav.init(nav_elems, {});
    
    }

    render() {    
        let navbar;
        if (this.props.user.is_authenticated){
            navbar = (
            <div>

            
            <nav className="indigo">
                <div className="nav-wrapper">
                <a href="/" class="brand-logo center"><i class="large material-icons">dashboard</i>Scammers</a>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="left hide-on-med-and-down blue-text">
                    <li> <Link to="/">Homepage</Link> </li>
                    <li><Link to="/scammer/create">Add a scammer now</Link></li>
                    <li><Link to="/auth/logout">Logout</Link></li>
               
                    </ul>
               
               </div>
            </nav>

            <ul className="sidenav" id="mobile-demo">
            <li> <Link to="/">Homepage</Link> </li>
            <li><Link to="/scammer/create">Add a scammer now</Link></li>
            <li><Link to="/auth/logout">Logout</Link></li>
            </ul>
            </div>
            )
        }

        else{
            navbar = (
                <div>

            
                <nav className="indigo">
                    <div className="nav-wrapper">
                    <a href="/" class="brand-logo center"><i class="large material-icons">dashboard</i>Scammers</a>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                        <ul className="left hide-on-med-and-down">
                        <li> <Link to="/">Homepage</Link> </li>
                        <li><Link to="/auth/register">Register</Link></li>
                        <li><Link to="/auth/login">Login</Link></li>
                   
                        </ul>
                   
                   </div>
                </nav>
    
                <ul className="sidenav" id="mobile-demo">
                <li> <Link to="/">Homepage</Link> </li>
                <li><Link to="/auth/register">Register</Link></li>
                <li><Link to="/auth/login">Login</Link></li>
                </ul>
                </div>
            )
        } 
        return ( 
            <div>
                {navbar}
            </div>
        )
    }

}

function mapStateToProps(state){
    return {
        'user' : state.user
    }
}






export default connect(mapStateToProps)(Navbar)