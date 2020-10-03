const initialState = {
    msg : ''
}


export default function message(state=initialState,action){

    if (action.type == "create_message"){
        return {...state,msg:action.payload}
    }
    else {
        return initialState
    }

}