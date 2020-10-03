import React, { Component }  from 'react';
import { connect } from 'react-redux';
import {logout} from '../actions'
import { bindActionCreators } from 'redux'


class Logout extends Component {
    
    componentWillMount() {
        this.props.logout()
    }
    

    render() {
        
        return(
            <div>       

                <h1>Logged out successfully</h1>


            </div>
    )
    
}

    
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ logout }, dispatch)

}


export default connect(null,mapDispatchToProps)(Logout)