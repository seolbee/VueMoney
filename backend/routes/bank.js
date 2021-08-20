var express = require('express');
var getDB = require('../DB/DB');
var router = express.Router();
var {getUseCode, getFinTechNum, getBalance, getAccountBalance} = require('../API/index');

/* GET users listing. */
router.post('/register', async function(req, res){
    let db = await getDB();
    let dbo = db.db("money");
    let {accno, code, name} = req.body;
    let {seqno, acctoken, _id:uid} = req.session.user;

    let account = await dbo.collection("accounts").findOne({'code' : code, 'accno' : accno});
    if(account !== undefined){
        db.close();
        return res.json({success : false, msg:'이미 등록한 계좌 입니다.'});
    }

    let finTechNum = await getFinTechNum(seqno, acctoken, code, accno);

    dbo.collection("accounts").insertOne({'accno' : accno, 'code':code, 'name' : name, 'uid': uid, 'finTechNum' : finTechNum}, function(err, resp){
        if(err) res.json({success:false, msg:'오류'});
        else res.json({success:true, msg:'등록 완료'});
        db.close();
    });
});

router.get('/lists', async function(req, res){
    let db = await getDB();
    let dbo = db.db("money");
    let uid = req.cookies['user'];

    let accounts = await dbo.collection('accounts').find({'uid':{$eq:uid}}).toArray();
    if(accounts === undefined){
        return res.json({success:false, msg:'계좌가 없습니다. 계좌를 등록하세요'});
    }
    for(account of accounts){
        account.money = await getBalance(req.session.user.acctoken, account.finTechNum);
    }

    res.json({success: true, data:accounts});
    db.close();
});

router.get("/history/:finTechNum", async function(req, res){
    
});

module.exports = router;
