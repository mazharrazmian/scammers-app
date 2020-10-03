
const initialState = {
    msg : '',
    status : null,
}



export default function errors(state=initialState,action){
    if (action.type == "get_errors"){
        console.log("GET ERORRS REDUCER EXECUTED ")
        console.log(action.payload.msg)
        return {...state,msg:action.payload.msg,status:action.payload.status}
    }
    else {
        return state
    }
}


