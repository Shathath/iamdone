import React, {useEffect, useState} from 'react';
import axios from 'axios'
import '../styles/user.css'

const UserOne  = (props)=>{
    const {data} = props;
    console.log(props,data)
    return data.map((value)=>{
        console.log(value)
        return(<div className='user-card'>
            <div className='user-card-header'>
                   <div className='user-profile-pic'>
                       <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="50" height="50" viewBox="0 0 24 24" stroke-width="2.5" stroke="#acb0ac" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z"/>
                            <circle cx="12" cy="7" r="4" />
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                        </svg>
                    </div>
            </div>
            <div className='user-name'>{value.name}</div>
            <div className='user-position'></div>
        </div>
    )
        
    
    })
}
    

function Users(){
    const [users,setUsers] =  useState([]);
    const [error,setError]= useState('')
    useEffect(()=>{
        axios.get('http://localhost:5000/allUsers').then((response)=>{
            
            setUsers(response.data.users)
            console.log(response.data)
        }).catch((error)=>{
            setError(error.message)
        })
    },[])
    console.log("Users",users)
    
        return <UserOne data={users}/>;

 
}

export default Users;