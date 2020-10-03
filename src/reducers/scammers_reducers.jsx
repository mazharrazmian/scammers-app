const initialState = {
    scammersList : [],
    filteredList : false,
    lower_limit : 0,
    upper_limit : 10,
}

export default function scammers(state=initialState,action){
    if (action.type == "get_scammers_list"){
        console.log(state)
        return {...state,scammersList:state.scammersList.concat(action.payload),filteredList:false,}
    }

    else if( action.type == "get_scammer_detail" ){
        return {...state,scammerDetail:action.payload}
    }

    else if (action.type == "get_scammers_filtered"){
        return {...state,filteredList:true,scammersList:action.payload}
    }

    else if (action.type == "reset_filter"){
        return {...state,filteredList:false,scammersList:[]};
    }

    else if ( action.type == "scammer_create" ){
        console.log(action.payload)
        return {...state,create_response:action.payload}
    }
    else if (action.type == "get_scammers_count"){
        console.log(action.payload)
        return {...state, scammers_count: action.payload}
    }

    else if (action.type == "increase_limit"){
        return {...state,lower_limit:state.upper_limit,upper_limit:state.upper_limit+10}
    }

    else if (action.type == "reset_limit"){
        return {...state,lower_limit:0,upper_limit:10}
    }

    else{
        return state;
    }
}


