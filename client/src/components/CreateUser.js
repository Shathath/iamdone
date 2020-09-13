import React, {useRef, useState} from 'react';
import axios from 'axios';

import {withRouter} from 'react-router-dom';

const svgStyle = {
            marginTop: "0px",
            marginBottom:"10px",
            borderRadius: "50%",
            border:"2px dotted #acb0ac",
            padding: "10px"
}
const setLabel = {
    textAlign:"left"
}
const profilePic = {
     width:"60px",
     height:"60px",
     marginBottom:"10px",
     borderRadius: "50%",
     border:"2px dotted #acb0ac",
     backgroundSize:"contain",
    padding:"2px"
     
}

function CreateUser(props){
    const setImageRef = useRef(null)
    const [error, setError] = useState(false);
    const [name,setName] = useState('')
    const [position,setPosition] = useState('');
    const [gender,setGender] = useState();
    const [email,setEmail] = useState('')
    const [phone,setPhone] = useState('')
    const [dob,setDob] = useState('')
    const [password,setpassword] = useState('')
    const [isImageLoaded,setImageLoaded] = useState(false)
    const [imageFile,setImageFile] = useState(null)
   // const [error,setError] = useState('')

    const sumbitData = (e) => {
        e.preventDefault();
        console.log(name,password,email)
        if(!name || !password || !email){
            return setError('Enter all mandatory fields')
        }
        
        var config = {
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        };
        const data = new FormData();
        data.append('name',name)
        data.append('email',email)
        data.append('password',password)
        data.append('position',position)
        data.append('gender',gender)
        data.append('avatar',imageFile)    
        
        axios
          .post("http://localhost:5000/createuser", data)
          .then((response) => {
            console.log(response.data);
            console.log(props.history)
            props.history.replace('/users')
           
          })
          .catch((error) => {
            setError(error.message);
          });
      };

    const handleChangevalue = (e)=>{
         if(e.target.name == 'name'){
             setName(e.target.value)
         }
         else if(e.target.name === 'email'){
             
             setEmail(e.target.value)
         }
         else if(e.target.name==='position'){
             
             setPosition(e.target.value)
         }
         else if(e.target.name === 'gender'){
            
             setGender(e.target.value)
         }
         else if(e.target.name === 'phone'){
             
             setPhone(e.target.value)
         }
         else if(e.target.name === 'password'){
             
              setpassword(e.target.value)
         }
         else {
             console.log('DOb calling')
             setDob(e.target.value)
         }
         console.log(password)
    }
    const handleUplaodImage = (e)=>{
        console.log('Calling')
        setImageRef.current.click()
    }
    const previewImage = (e)=>{
        setImageLoaded(true)
        
        setImageFile(e.target.files[0])
        const imagPreview = new FileReader()
        //document.getElementById('profilepic').files[0]
        imagPreview.readAsDataURL(document.getElementById("uploadbutton").files[0]);

        imagPreview.onload = function (event) {
            document.getElementById("uploadpreview").src = event.target.result;
            
            
        };
    }

   
    return(
        <div className='container' style={{backgroundColor:"#fff",marginTop:"50px",padding:"30px"}}>
        <form enctype="multipart/form-data">
            <div className='form-group row'>
               
                <div className="col-sm-2">
                    {!isImageLoaded ? 
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-user" 
                style={svgStyle} width="50" height="50" viewBox="0 0 24 24" 
                stroke-width="1.5" stroke="#acb0ac" fill="none" 
                stroke-linecap="round" 
                stroke-linejoin="round"
                onClick={handleUplaodImage}>
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </svg> :
                   <img id='uploadpreview' style={profilePic}/>
                    }
                <input id='uploadbutton' className='form-control' ref={setImageRef} onChange={previewImage} type='file' style={{height:"0px","visibility":"hidden"}} />
                </div>
                <div className="col-sm-2">
                    <label className="col-form-label" style={setLabel}>Upload a Picture</label>
                </div>
                
            </div>
            <div className="form-group row">
                <label for="inputEmail3" className="col-sm-2 col-form-label" style={setLabel}>Name</label>
                <div className="col-sm-10">
                <input type="name" className="form-control" id="inputEmail3" placeholder="Name" name='name' onChange={handleChangevalue} />
                </div>
            </div>
            <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label" style={setLabel}>Email</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputPassword3" placeholder="email" name='email' onChange={handleChangevalue}/>
                </div>
            </div>
            <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label" style={setLabel}>Password</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputPassword3" placeholder="Password" name='password' onChange={handleChangevalue}/>
                </div>
            </div>
            <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label" style={setLabel}>Position</label>
                <div className="col-sm-10">
                <input type="text" className="form-control" id="inputPassword3" placeholder="email" name='position' onChange={handleChangevalue} />
                </div>
            </div>
            <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label" style={setLabel}>Gender</label>
                <div className="col-sm-1">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="male" name='gender' onChange={handleChangevalue}/>
                    <label className="form-check-label" for="inlineRadio1">Male</label>
                </div>
                </div>
                <div className="col-sm-1">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="female" name="gender" onChange={handleChangevalue} />
                    <label className="form-check-label" for="inlineRadio1">Female</label>
                </div>
                </div>
            </div>
            <div className="form-group row">
                <label for="inputPassword3" className="col-sm-2 col-form-label" style={setLabel}>DoB</label>
                <div className="col-sm-10">
                <input type="date" className="form-control" id="inputPassword3" name='dob' onChange={handleChangevalue} />
                </div>
            </div>
            
            
            <div className="form-group row">
                <div className="col-sm-10">
                <button type="submit" className="btn btn-primary" onClick={sumbitData}>Create</button>
                </div>
            </div>
</form>

        </div>
    )
    }


export default withRouter(CreateUser)

