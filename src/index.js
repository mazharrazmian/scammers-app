
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {Provider as AlertProvider} from 'react-alert';
import AlertTemplate from 'react-alert-template-basic'; 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk'
import Routes from './routes'
import Alerts from './components/alerts'
import rootReducer from './reducers/index';
import get_user from './actions/index'
//const createStoreWithMiddleware = applyMiddleware(promiseMiddleware)(createStore)
const middleware = [promiseMiddleware,thunkMiddleware]
export const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)


//Alert Options

const alertOptions = {
timeout : 6000,
position : 'top center',
}


ReactDOM.render(
    <Provider store={store}> 
    <AlertProvider template={AlertTemplate} {...alertOptions}>
        
        <BrowserRouter>
            <Routes/>
        </BrowserRouter>
        
    </AlertProvider>
    </Provider>
, document.getElementById('root'));




