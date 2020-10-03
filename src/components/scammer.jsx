import React, { Component } from 'react'


import TableContainer from '../containers/table_container'
import ScammerDetailContainer from '../containers/scammer_detail_container'
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";



class Scammer extends Component {

    render(){
        return(
                  
            <ScammerDetailContainer id={this.props.match.params.id} className="container"/>
    )
    }
    
}


export default Scammer