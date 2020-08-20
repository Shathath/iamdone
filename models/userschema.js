const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema;

const userSchema = new Schema({
     name: {
          type: String,
          required: true,
          trim: true
     },
     email: {
          type: String,
          required: true,
          unique: true,
          trim: true

     },
     password: {
          type: String,
          required: true,
          trim: true
     },
     avatar: {
          type: Buffer
     },
     avatartype: {
          type: String
     },
     token: {
          type: String,
          trim: true
     },
     unreadcount: {
          type: Number,
          default: 0,
     }
})
userSchema.methods.generateAuthToken = async () => {
     //console.log(email)
     const user = this;
     //const user = await User.findOne({email});

     // console.log(User.findOne({email}))
     console.log("id", user)
     const userid = user._id.toString();
     const token = jwt.sign({ _id: userid }, 'welcome');
     user.token = token
     //  console.log("TOKEN",user.token)
     return user.token;

}
userSchema.statics.findUserCredentials = async ({ email, password }) => {
     //console.log(email)
     if (!email || !password) throw new Error('Enter all Fields')
     const user = await User.findOne({ email });
     if (!user) {
          throw new Error('Unable to login')
     }
     const isMatch = await bcrypt.compare(password, user.password);

     console.log("match", isMatch)
     if (!isMatch) {
          throw new Error('Email or Password is wrong')
     }
     const { name } = user;
     return user;

}

userSchema.pre('save', async function () {
     const user = this;
     //console.log(this.password);

     console.log("SAVE")
     const hashedpassword = await bcrypt.hash(user.password, 8);
     user.password = hashedpassword;

})

module.exports = User = mongoose.model('Users', userSchema);