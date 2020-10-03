import React, { Component } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {login} from '../actions'
import {Redirect} from 'react-router-dom'

class LoginContainer extends Component {
    
    constructor(props){
        super(props)

        this.state = {
            'email' : '',
            'password' : '',
            'is_authenticated' : false,
        }
    }
    

    componentDidMount() {
        console.log(this.props.user)
    }
        
    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.user.is_authenticated && this.props.user.is_authenticated){
            this.setState({
                is_authenticated : true,
            })
        }
    }
    
    

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.login(this.state)
        this.setState({
            'email' : '',
            'password' : '',
            'is_authenticated' : false,
        })
    }

    render() {
        
        if (this.state.is_authenticated == true){
            return <Redirect to="/auth/login" />
        }
        else {
            return (
                <div>
    
            <form onSubmit={this.handleSubmit}>
            <label>
              Email:
              <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
            </label>
            <label>
              Password:
              <input type="text" name="password" type="password" value={this.state.password} onChange={this.handleChange} />
            </label>
            <input type="submit" value="Submit" />
            </form>
    
                </div>
            )
        }
        }
       
}

function mapStateToProps(state) {
    console.log(state.user)
    return {
        user : state.user,
        errors : state.errors,
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ login }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)