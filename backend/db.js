const mongoose = require('mongoose');
// const GridFsStream = require('gridfs-stream');
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = async () => {
    try{
    await mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("connected to mongo successfully");
}catch(error){
        console.error('Error connecting to MongoDB:', error);
    }
}

// const conn = mongoose.connection;
// const gfs = GridFsStream(conn.db, mongoose.mongo)

module.exports = connectToMongo;