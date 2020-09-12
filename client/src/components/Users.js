import React, {useEffect, useState} from 'react';
import axios from 'axios'
import '../styles/user.css'

const UserOne  = (props)=>{
    const {data} = props;
    console.log(props,data)
    
    return data.map((value)=>{
        function arraytobase64(buffer) {
            
            var binary = '';
    
            var bytes = [].slice.call(new Uint8Array(buffer));
            bytes.forEach((b) => binary += String.fromCharCode(b));
            var arrayto64 = window.btoa(binary);
            

            var base64 = `data:image/jpeg;base64,${arrayto64}`
            //console.log("Base64", base64)
            return base64    
        }
        
        return(<div className='user-card'>
            <div className='user-card-header'>
                   <div className='user-profile-pic'>
                       {value.avatar ?
                        <img src={arraytobase64(value.avatar.data)} /> : 
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" width="100" height="100" viewBox="0 0 24 24" stroke-width="1" stroke="#acb0ac" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <path stroke="none" d="M0 0h24v24H0z"/>
  <circle cx="12" cy="7" r="4" />
  <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
</svg>
                       
                        }
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