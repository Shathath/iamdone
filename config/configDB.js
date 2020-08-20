// const mongodb =  require('mongodb');
// const MongoClient = mongodb.MongoClient

// const connectionURL = 'mongodb://127.0.0.1:27017'
// const tododapp = 'todoapp';

// MongoClient.connect(connectionURL,{useNewUrlParser:true ,useUnifiedTopology:true},(error,client)=>{
//     if(error){
//          console.log("Not able to connect")
//     }
//     console.log("connected Successfully")
//     const db = client.db(tododapp);
//     const retvalue = db.collection('todos').insertOne({
//         description:"DO something",
//         title:'Interview Preparation'
//     })
//     console.log(typeof retvalue);
// })

const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/taskmanaagement',{ useNewUrlParser: true,useUnifiedTopology:true},(error,client)=>{
    if(error){
        console.log("Not connected")
    }
    console.log("connected")
})