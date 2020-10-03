import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Scammer from '../components/scammer'
import {connect} from 'react-redux'
import {scammers_list} from '../actions/index'
import {scammers_count,increase_limit,reset_limit} from '../actions/index'
import {bindActionCreators} from 'redux'
import Search from '../components/search'
import {store} from '../index.js'

//Needed to store the 'lower_limit' and 'upper_limit' state of the component in redux store to make the limits consistent
// with the scammersList array, keeping the limits inside the component would refresh the limits on unmount, but not the
//scammersList array, which caused problems in the scrolling behaviour.

class TableContainer extends Component{

    constructor(props){
        super(props);
    }

componentWillMount() {
    if (store.getState().scammers.scammersList && store.getState().scammers.scammersList.length == 0){
        this.props.scammers_list(this.props.lower_limit,this.props.upper_limit);
        
    }
    this.props.scammers_count()
    
}

componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
    console.log("COMPONENT DID MOUNT")
}

componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
    
}

//Check if the user switched from filtering to normal view.
//Update the state to reset the lower and upper limit for scrolling behaviour
componentDidUpdate(prevProps, prevState) {
    if (prevProps.filtered == true && this.props.filtered == false){
        console.log("COMPONENT DID UPDATE")
        //this.setState({
          //  lower_limit : 0,
            //upper_limit : 20,
             //}, () => {
               // this.props.scammers_list(this.state.lower_limit,this.state.upper_limit);   
             //}
        //);

        this.props.reset_limit()
        console.log(this.props.lower_limit)
        console.log(this.props.upper_limit)
        
    }

    if (prevProps.upper_limit > this.props.upper_limit){
        this.props.scammers_list(this.props.lower_limit,this.props.upper_limit)
    }

}




listenToScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight && 
        this.props.scammers.scammers_count > this.props.upper_limit ) {
        // Do load more content here!
       // this.setState(prevState => ({
         //   lower_limit: prevState.upper_limit,
           // upper_limit : prevState.upper_limit+10,
          //}));
          //console.log(this.state.upper_limit)
            this.props.increase_limit()

          this.props.scammers_list(this.props.lower_limit,this.props.upper_limit);   
    }
  }


render() {
    let tdata = null;
    
    if (this.props.scammers.scammersList && this.props.scammers.scammersList.length > 0){
        tdata = this.props.scammers.scammersList.map((e)=>
        {
            
            return (
             <tr key={e.id} id={e.id}>
             <td>{e.full_name}</td>
             <td>{e.phone}</td>
             <td>{e.title}</td>
             
              <td> <Link to={`/scammer/${e.id}`}>Show details </Link> </td>
             </tr>
             
            )
             
        }    
        
     )
    }
    else{
         tdata = null;
    }
    


    return(
        <div>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone Number</th>
                    <th>Title</th>
                    <th>Details</th>
                    </tr>
             </thead>
            <tbody>
                {tdata}
             </tbody>
        </table>
        </div>
    )
}


}
function mapStateToProps(state){
    return {
        scammers: state.scammers,
        user : state.user,
        filtered : state.scammers.filteredList,
        lower_limit : state.scammers.lower_limit,
        upper_limit : state.scammers.upper_limit,
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({scammers_list,scammers_count,increase_limit,reset_limit},dispatch)
     
}

export default connect(mapStateToProps,mapDispatchToProps)(TableContainer)