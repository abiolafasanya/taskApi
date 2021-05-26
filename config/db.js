const mongoose = require('mongoose');
require('dotenv').config()

const url = 'mongodb+srv://book:book@cluster0.8ubhm.mongodb.net/bookdb?retryWrites=true&w=majority'
const MONGO_URL = process.env.MONGO_URL || url

const db = async () =>{
    try {
        await mongoose.connect(MONGO_URL,
            {
                useNewUrlParser: true, 
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            console.log(`MongoDb Connected!`)
    } 
    catch (err) {
        console.log(`Failed to Connect ~ MongoDb!, ERROR: ${err.message}`)
    }
}

module.exports = db()