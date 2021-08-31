const express = require('express');
const router = express.Router();
const {User} = require('../DB/Schema');

router.post('/register', async function(req, res) {
    // let db = await getDB();
    // let dbo = db.db('money');
    let {id} = req.body;
    let find = await User.findOne({'id' : id});
    if(find !== null){
        res.json({success:false, msg:'이미 있는 아이디 입니다.'});
        return;
    }
    // dbo.collection('users').insertOne({'id' : id, 'name' : name, 'password' : password, 'seqno' : seqno, 'acctoken' : acctoken, 'reftoken' : reftoken}, function(err, resp){
    //     if(err) res.json({success:false, msg:'회원가입 오류'});
    //     else res.json({success:true, msg:'회원가입 성공'});
    //     db.close();
    // });
    let user = new User(req.body);
    user.save().then(()=> {
        res.json({success:true, msg:'회원가입 성공'});
    })
});

router.post('/login', async function(req, res){
    // let db = await getDB();
    // let dbo = db.db('money');
    let {id, password} = req.body;
    // let user = await dbo.collection('users').findOne({'id' : id});
    // if(user === undefined){
    //     res.json({success : false, msg : '없는 아이디 입니다.'});
    //     db.close();
    //     return;
    // }
    let find = await User.findOne({'id' : id});
    if(find === null) {
        res.json({success : false, msg : '없는 아이디 입니다.'});
        return;
    }
    // let resp = await dbo.collection('users').findOne({'id' : id, 'password':password});
    let user = await User.findOne({'id' : id, 'password' : password});
    if(user == null) return res.json({success:false, msg:'아이디 또는 비밀번호가 잘못되었습니다.'});
    req.session.user = user;
    res.cookie('user', user._id, { httpOnly: true, secure : true });
    req.session.save(()=>{
        res.json({success : true, msg:'로그인 성공', user:user});
    });
});

router.post('/authNum', async function(req, res){
    
});

router.get('/logout', function(req, res){
    req.session.destroy();
    res.json({'success' : true});
});

module.exports = router;