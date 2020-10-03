import {scammer_create} from '../actions/index'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


class ScammerCreateContainer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          'first_name' : '',
          'last_name' : '',
          'phone' : '',
          'address' : '',
          'title' : '',
          'details' : '',
          'file' : [],
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


    onFileChange = (event) => {
        this.setState({
            'file' : event.target.files,
        });
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.scammer_create(this.state);
    }

  
    render() {
      return (
        <div className="container">

        <form onSubmit={this.handleSubmit}>
          <div className="row">

          
          <div className="input-field col m6 s12">
          <label htmlFor="first_name"> First Name </label>
            <input type="text" id="first_name" name="first_name" value={this.state.first_name} onChange={this.handleChange} />
          </div>
         
         <div className="input-field col m6 s12">
          <label htmlFor="last_name">
            Last Name:
            </label>
          <input type="text" id="last_name" name="last_name" value={this.state.last_name} onChange={this.handleChange} />
          </div>    
          </div>

       <div className="row">
            
      <div className="input-field col l6 s12 m12">

          <label htmlFor="phone">
            Phone:
            </label>
            <input className="validate" required="" aria-required="true" type="text" id="phone" name="phone" value={this.state.phone} onChange={this.handleChange} />
            <span className="helper-text" data-error="wrong">Must not be longer than 13 characters</span>
      </div>     
               
      <div className="input-field col l6 s12 m12">
          <label htmlFor="title">
          Incident title
            </label>
            <input id="title" type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            <span className="helper-text" data-error="wrong">e.g Harrasment/Property/Freelancing etc</span>

     </div>
     </div>     
     <div className="input-field col">
          <label htmlFor="address">
            Address:
          </label>
            <input id="address" type="text" name="address" value={this.state.address} onChange={this.handleChange} />
            </div>
     <div className="input-field col s12">
          <textarea id="textarea1" className="materialize-textarea" name="details" value={this.state.details} onChange={this.handleChange}></textarea>
          <label htmlFor="textarea1">Enter all the details about the scam</label>
        </div>
     
     <div className="file-field input-field">
          <div className="btn"> 
            <span>File</span>
            <input id="images" type="file" multiple name="file" onChange={this.onFileChange} />
            </div>
            <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload any relevent pictures" />
        <span className="helper-text" data-error="wrong">Only images are supported</span>

      </div>
      </div>
      <div className="row">

      <button className="col s12 l8 offset-l2 btn waves-effect waves-light indigo" type="submit" name="action">Submit
      </button>
      </div>        
        </form>
       
        </div>
      );
    }
  }



  function mapStateToProps(state) {
    return {
        response: state.create_response,
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ scammer_create }, dispatch)

}

export default connect(mapStateToProps, mapDispatchToProps)(ScammerCreateContainer)