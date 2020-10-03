import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {register} from '../actions'


const URL = 'http://localhost:8000/api'
class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            'first_name' : '',
            'last_name' : '',
            'email' : '',
            'password' : '',
        }
    }
    

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });
    }

    handleSubmit = (event) => {
        event.preventDefault(); 
        this.props.register(this.state)
    }

    render() {
        return (
            <div>

        <form onSubmit={this.handleSubmit}>
        <label>
          First Name:
          <input type="text" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
        </label>
        <label>
          Last Name:
          <input type="text" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={this.state.email} onChange={this.handleChange} />
        </label>
        <label>
          Password:
          <input type="text" type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
        </form>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user : state.user,
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ register }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(Register)