var express = require('express');
// var getDB = require('../DB/DB');
var router = express.Router();
var {Account} = require('../DB/Schema');
var {getFinTechNum, getBalance, getAccountBalance} = require('../API/index');

/* GET users listing. */
router.post('/register', async function(req, res){
    // let db = await getDB();
    // let dbo = db.db("money");
    let {accno, code, name} = req.body;
    let {seqno, acctoken, _id:uid} = req.session.user;

    let find = await Account.findOne({'code' : code, 'accno' : accno});
    if(find !== null){
        return res.json({success : false, msg:'이미 등록한 계좌 입니다.'});
    }

    let finTechNum = await getFinTechNum(seqno, acctoken, code, accno);

    if(!finTechNum) {
        return res.json({success : false, msg: "없는 계좌 입니다. 다시 입력해주세요"});
    }

    // dbo.collection("accounts").insertOne({'accno' : accno, 'code':code, 'name' : name, 'uid': uid, 'finTechNum' : finTechNum}, function(err, resp){
    //     if(err) res.json({success:false, msg:'오류'});
    //     else res.json({success:true, msg:'등록 완료'});
    //     db.close();
    // });
    let account = new Account({'accno' : accno, 'code':code, 'name' : name, 'uid': uid, 'finTechNum' : finTechNum});
    account.save().then(()=> res.json({success:true, msg:'등록 완료'}));
});

router.get('/lists', async function(req, res){
    // let db = await getDB();
    // let dbo = db.db("money");
    let uid = req.session.user._id;

    let accounts = await Account.find({'uid':{$eq:uid}});
    if(accounts === undefined){
        return res.json({success:false, msg:'계좌가 없습니다. 계좌를 등록하세요'});
    }
    for(account of accounts){
        let result = await getBalance(req.session.user.acctoken, account.finTechNum);
        account.money = result * 1;
    }
    res.json({success: true, data:accounts});
});

router.get("/history/:finTechNum", async function(req, res) {
    let finTechNum = req.params.finTechNum;
    let data = await getAccountBalance(req.session.user.acctoken, finTechNum);
    res.json({data:data});
});

router.get('/delete/:finTechNum', async function(req, res) {
    
})

module.exports = router;
