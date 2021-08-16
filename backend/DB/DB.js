const url = require('./credential');
const {MongoClient} = require('mongodb');
const client = new MongoClient(url, {
    useUnifiedTopology:true
});

async function getDB(){
    let db = null;
    try {
        db = await client.connect();
    } catch (error) {
        console.log(err.stack);
    }
    return db;
}

module.exports = getDB;