const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        trim:true,
        minlength:7,
        validate(value){

           //  if(value.length<6){
           //     throw new Error("password can't be less than six characters")
           //  }
            const isContainPassword = value.toLowerCase().includes('password');
            if(!!isContainPassword){
                throw new Error("password can't be named as password")
            }
            //const isPaswordContainName = value.includes(name);
        }
    },
    email:{
        type:String,
        require:true,
        trim: true,
        unique:true,
        validate(value){
            console.log(validator.isEmail(value));
            if(!validator.isEmail(value)){
               throw new Error('Please provide valid email address');
               
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            require:true
            }
    }]
},{
    timestamps:true
})
userSchema.virtual('tasks',{
    ref:'Tasks',
    localField: '_id',
    foreignField:'owner'
})

userSchema.methods.generateAuthToken = async function(){
       const user = this;
     //  console.log(user._id.toString())
       const token = jwt.sign({_id:user._id.toString()},'rahman');
       user.tokens = user.tokens.concat({token})
       return token;
}
userSchema.statics.LoginAccess = async function(email,password){    
    
    const user = this;
   // console.log("Email",email)
    const loginUser = await Users.findOne({email:email});
   
    
    const hashedpassword = await bcrypt.hash(password,8)
    //console.log("Hashed password",hashedpassword);
   // console.log(loginUser.password)
    const ispasswordMatch = await bcrypt.compare(password,loginUser.password);
    //console.log("passsowrd",ispasswordMatch)
    if(!ispasswordMatch){
      //  console.log("Password matched",ispasswordMatch)
        throw new Error("Username or Password is not Correct")
    }
    return loginUser

   
}
userSchema.pre('save',async function(next){
    const user = this;
    //console.log('inside save')
    if(user.isModified('password')){
         user.password = await bcrypt.hash(user.password,8);
    }

    next();
})
const Users = mongoose.model('Users',userSchema);

module.exports = Users;