const express = require('express');
const router = express.Router();
const getDB = require('../DB/DB');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

router.post('/register', async function(req, res) {
    let db = await getDB();
    let dbo = db.db('money');
    let {id, name, password, seqno, acctoken, reftoken} = req.body;
    let user = await dbo.collection('users').findOne({'id' : id});
    if(user !== undefined){
        res.json({success:false, msg:'이미 있는 아이디 입니다.'});
        db.close();
        return;
    }
    dbo.collection('users').insertOne({'id' : id, 'name' : name, 'password' : password, 'seqno' : seqno, 'acctoken' : acctoken, 'reftoken' : reftoken}, function(err, resp){
        if(err) res.json({success:false, msg:'회원가입 오류'});
        else res.json({success:true, msg:'회원가입 성공'});
        db.close();
    });
});

router.post('/login', async function(req, res){
    let db = await getDB();
    let dbo = db.db('money');
    let {id, password} = req.body;
    let user = await dbo.collection('users').findOne({'id' : id});
    if(user === undefined){
        res.json({success : false, msg : '없는 아이디 입니다.'});
        db.close();
        return;
    }
    let resp = await dbo.collection('users').findOne({'id' : id, 'password':password});
    req.session.user = resp;
    res.cookie('user', resp._id, { httpOnly: true, secure : true });
    req.session.save(()=>{
        res.json({success : true, msg:'로그인 성공', user:resp});
        db.close();
    })
});

router.post("/session", async function(req, res){
    console.log(req.cookies['users']);
    let uid = req.cookies['user'];
    let db = await getDB();
    let dbo = db.db('money');
    uid = new ObjectId(uid);
    let user = await dbo.collection('users').findOne({'_id' : uid});
    db.close();
    req.session.user = user;
    req.session.save();
});

module.exports = router;