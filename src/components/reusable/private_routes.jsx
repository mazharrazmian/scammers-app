import React from 'react'
import { Component } from 'react'
import {Route, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
const PrivateRoute = ({component: Component, user, ...rest}) => {

return (
    <Route {...rest}

    render = {props=> {

        if (!user.is_authenticated){
            return <Redirect to="/auth/login" />
        }

        else {
            return <Component {...props} />    
        }


        
    }}

    />
)

}


const mapStateToProps = (state) => ({
    user : state.user,
})

export default connect(mapStateToProps)(PrivateRoute)