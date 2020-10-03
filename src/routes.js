import { Switch, Route } from 'react-router-dom';
import React, {Component} from 'react';
import Homepage from './components/homepage';
import Scammer from './components/scammer';
import ScammerCreate from './components/scammer_create'
import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import Logout from './components/logout'
import {store} from './index'
import Alerts from './components/alerts'
import PrivateRoute from './components/reusable/private_routes'
import {get_user} from './actions/index'

class Routes extends Component {

    componentDidMount() {
        console.log("ROUTES COMPONENT MOUNTED")
        store.dispatch(get_user())
    }

        render(){
            return(
                <div>                
                <Navbar />
                <Alerts/>
                <Switch>
                    <Route path="/" exact component={Homepage}/>
                    <PrivateRoute path="/scammer/create" exact component={ScammerCreate} />
                    <Route path="/scammer/:id" exact component={Scammer}/>
                    <Route path="/auth/register" exact component={Register}></Route>
                    <Route path="/auth/login" exact component={Login}></Route>
                    <Route path="/auth/logout" exact component={Logout}></Route>
                    
                </Switch>
                </div>
            )
        }
}

export default Routes;