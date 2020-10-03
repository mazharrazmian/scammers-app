
export default function user(state={},action){

    if (action.type == "registered") {
        localStorage.setItem('token',action.payload.token);
        return {...state, 'user_details': action.payload.user,'token':localStorage.getItem('token'),'is_authenticated':true,'is_loading':false}

    }

    else if ( action.type == "login" ){
        localStorage.setItem('token',action.payload.token)
        return {
            ...state,is_authenticated: true, token : action.payload.token,is_loading : false,
            user_details : action.payload.user,
        }
    }

    else if( action.type == "logout" ){
        localStorage.setItem("token",null);
        return {
            ...state,'is_authenticated' : false, 'token' : localStorage.getItem('token'), 'is_loading' : false
        }
    }

    else if (action.type == "auth_error"){
        localStorage.setItem('token',null);
        return {...state,token:null,is_authenticated:false,is_loading:false,user_details:null}
    }

    else if(action.type == 'user_loaded'){
        return {...state,is_authenticated:true,is_loading:false,user_details:action.payload}
    }

    else{
        return state;
    }


}