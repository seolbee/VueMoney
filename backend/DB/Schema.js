const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    'id' : {type:String, required:true, unique:true},
    'name' : {type:String, required:true}, 
    'password' : {type:String, required:true}, 
    'seqno' : {type:String, required:true}, 
    'acctoken' : {type:String, required:true}, 
    'reftoken' : {type:String, required:true}
}, {
    timestamps:true
}, {
    collection : 'users'
});

const accountSchema = new mongoose.Schema({
    'accno' : {type:String, required:true},
    'code': {type:String, required:true}, 
    'name' : {type:String, required:true}, 
    'uid': {type:String, required:true}, 
    'finTechNum' : {type:String, required:true},
    'money' : {type:Number, default: 0}
}, {
    timestamps:true
}, {
    collection : 'accounts'
});

module.exports = {
    User : mongoose.model('User', userSchema),
    Account : mongoose.model('Accounts', accountSchema)
}