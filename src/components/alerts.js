import React, { Component, Fragment } from 'react'
import {withAlert} from 'react-alert'
import { connect } from 'react-redux'
class Alerts extends Component {

    componentDidUpdate(prevProps, prevState){
       const { alert , error, message} = this.props;
        
       if (prevProps.error != error){
        
        for (const key in error){
            alert.error(`${key} : ${error[key]} `)
         }
 
       }
       
       
       if (prevProps.message != message){
        if (message != null && message != '')
       {
        alert.success(message)
       }
       
       }
        
        
    }


    render() {
        return <Fragment />
    }
}

function mapStateToProps(state){
    return {
        'error' : state.errors.msg,
        'message' : state.message.msg,
    }
}

export default connect(mapStateToProps)(withAlert()(Alerts));