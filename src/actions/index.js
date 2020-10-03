import axios from 'axios'

const URL = 'https://scammers-backend.herokuapp.com/api'


function handle_error(error,dispatch){

    const errs = {
        msg : error.response.data,
        status : error.response.status,
    }

    dispatch({
        type : 'get_errors',
        payload : errs,
    })  

}




export function scammers_list(lower_limit,upper_limit){
    return function(dispatch,getState){
        const request = axios.get(`${URL}/scammers?lower_limit=${lower_limit}&upper_limit=${upper_limit}`)
                .then(response => dispatch({
                    type : 'get_scammers_list',
                    payload : response.data,
                }))
                

    }

    
}

export function reset_filter(){
    return function(dispatch,getState){
        dispatch({
            type: 'reset_filter',
        })
    }
}



export function scammers_filter(data){
    return function(dispatch,getState){
        let formData = new FormData()
        let query_string='?'
        for (const key in data){
            console.log(key)
            console.log(data[key])
            formData.append(key,data[key])
            query_string = query_string.concat(key,'=',data[key],'&')

        }
 
        axios.get(`${URL}/scammers/filter${query_string}`).then(
            function(response) {
                dispatch({
                    type : "get_scammers_filtered",
                    payload : response.data,
                })
            }
        ).catch(function(error){
            handle_error(error,dispatch)
        })
        

    }
    
   
}


export function scammer_detail(id){

    return function(dispatch,getState){

        axios.get(`${URL}/scammers/${id}`)
        .then(response => dispatch({
            type : "get_scammer_detail",
            payload : response.data,
        })).catch(function(error){
            handle_error(error,dispatch)
        })
    }

   
}


export function scammer_create(data){

    return function(dispatch,getState){
        const formData = new FormData();

    for (const key in data) {
        if (key != 'file'){
            formData.append(key,data[key])   
        }
             
        }
        for (let i = 0; i < data['file'].length; i++) {
            formData.append(`images[${i}]`, data.file[i])
        }
        

    const token = getState().user.token;

    const config = {
        headers : {
            'Authorization' : `Token ${token}`,
            "Content-Type": "multipart/form-data",
        }
    }

    const response = axios.post(
        `${URL}/scammers/create`,formData,config
    ).then(res => {
        dispatch({
            type : 'scammer_create',
            payload : res.data,
        })
        dispatch(create_message("Scammer added to our database succesfully."))
    }).catch(function(error){
        console.log(error.response.data)
        handle_error(error,dispatch)
    })

    }

    
}


export function register(data){
    return function(dispatch){
        const formData = new FormData();

    for (const key in data) {
        formData.append(key,data[key])        
        }

     axios.post(
        `${URL}/auth/register`,formData,
    ).then(
        function(response){
            dispatch({
                type : 'registered',
                payload : response.data,
            })
            dispatch(create_message("You account has been created"))
        }
        
        ).catch(
        function(error){
            handle_error(error,dispatch)
            
        }
    )
    
    }

}

export function login(data){
    console.log(data)
    return function(dispatch){
        const formData = new FormData();

    for (const key in data) {
        formData.append(key,data[key])        
        }

     axios.post(
        `${URL}/auth/login`,formData,
    ).then(
        function(response){
            dispatch({
                type : 'login',
                payload : response.data,
            })
            dispatch({
                type : 'create_message',
                payload : "Logged in succesfully"
            })
            
        }
        
        ).catch(
        function(error){
            handle_error(error,dispatch)
            dispatch({
                type : 'auth_error'
            })
            
        }
    )
    
    }

}



export function logout(){

    return function(dispatch,getState){

        const token = localStorage.getItem('token');

        let config = {
            headers : {
                'Authorization' : `Token ${token}`
            }
        }


    axios.post(`${URL}/auth/logout`,null,config).then(res => dispatch({
        type: 'logout',
        payload : "Logged out successfully"
    })).catch(function(error){
        localStorage.setItem('token',null)
        handle_error(error,dispatch);
        dispatch({
            type: 'auth_error',
        })
    })
    }

    
}


export const get_user = () => (dispatch,getState) => {

    const token = localStorage.getItem('token');
    console.log(token)
    let config = {
        headers : {
            'Authorization' : `Token ${token}`
        }
    }

    axios.get(`${URL}/auth/user`,config).then(res => dispatch({
        type: 'user_loaded',
        payload : res.data,
    })).catch(function(error){
        dispatch({
            type : 'auth_error'
        })
    })


}


export function scammers_count(){
    return function(dispatch,getState){
        
        
        axios.get(`${URL}/scammers/scammers_count`)
        .then(response => dispatch({
            type : "get_scammers_count",
            payload : response.data.scammers_count,
        })).catch(function(error){
            handle_error(error,dispatch)
        })
    }
}


export function create_message(msg){
    return function(dispatch,getState){

        dispatch({
            type : 'create_message',
            payload : msg,
        })

    }
}


export function increase_limit(){
    return function(dispatch,getState){
        dispatch({
            type: 'increase_limit'
        })
    }
}


export function reset_limit(){
    return function(dispatch,getState){
        dispatch({
            type : 'reset_limit'
        })
    }
}