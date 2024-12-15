const mongoose = require('mongoose');

function Connect(){
    mongoose.connect('mongodb://127.0.0.1:27017/chat').then(()=> {
        console.log("Connect To MongoDb")
    }).catch((err) => {
        console.log(err)
    })
}
module.exports = Connect;