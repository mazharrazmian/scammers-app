import { combineReducers } from 'redux';
import scammers from './scammers_reducers';
import user from './user_reducers';
import errors from './errors_reducers'
import message from './messages_reducers'
const rootReducer = combineReducers({
    scammers,
    user,
    errors,
    message,
})
export default rootReducer;