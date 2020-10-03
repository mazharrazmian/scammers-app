import {scammer_create} from '../actions/index'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {scammers_filter} from '../actions/index'
import {scammers_list} from '../actions/index'
import {reset_filter} from '../actions/index'
class SearchContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          'phone' : '',
      }

    }
  


    componentWillMount() {
        console.log(this.props)
    }
    

    handleChange = (event) => {
        this.setState({
            [event.target.name] : event.target.value,
        });

       
        

    }


 
    handleSubmit = (event) => {
        event.preventDefault();
        //Check if the user has reset the filters, if he has, call reset_filter() function to reset the scammers state
        if (this.state.phone == '' || this.state.phone== null){
          this.props.reset_filter()
          
        }
        else{
          this.props.scammers_filter(this.state);
        }
        
    }

  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <table>
          <tbody>  
        <tr>
          <td>          
          <div className="input-field">
          <i className="material-icons prefix">phone</i>
          <input id="phone" type="text" placeholder="Search by phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
          </div>
          </td>
        
        <td>
        <button type="submit" className="btn indigo">Submit</button>
        </td>
        </tr>
        </tbody>
        </table>
        </form>
      );
    }
  }



  function mapStateToProps(state) {
    return {
        response: state.create_response,
        errors : state.errors,
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ scammers_filter, reset_filter, scammers_list }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer)