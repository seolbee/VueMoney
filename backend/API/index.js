const request = require('request');
const code = 'M202112953U';

function getUseCode(){
    let num = Math.floor(Math.random() * 1000000000);
    let ranNum = '000000000' + num;
    ranNum = ranNum.substring(ranNum.length, ranNum.length - 9);
    return code + ranNum;
}

function getFinTechNum(user_seq_no, token, code, accno){
    let options = {
        url : 'https://testapi.openbanking.or.kr/v2.0/account/list',
        methods : 'GET',
        headers : {
            'Authorization' : 'Bearer ' + token
        },
        qs : {
            'user_seq_no' : user_seq_no,
            'include_cancel_yn' : 'Y',
            'sort_order' : 'D'
        }
    };
    return new Promise((resolve, reject) => {
        request(options, (err, res, body)=>{
            let result =  JSON.parse(body);
            let list = [];
            list = result.res_list;
            let account = list.find(x=> x.bank_code_std == code && x.account_num_masked.substring(0, x.account_num_masked.length - 3) == accno.substring(0, accno.length - 3));
            // list.forEach(x=> {
            //     console.log(x.bank_code_std == code, x.account_num_masked.substring(0, x.account_num_masked.length - 3) == accno.substring(0, accno.length - 3));
            // });
            // console.log(account);
            console.log(account);
            if(account === undefined) resolve(false);
            else resolve(account.fintech_use_num);
        });
    });
    // request(options, (err, res, body)=>{
    //     let result =  JSON.parse(body);
    //     let list = [];
    //     list = result.res_list;
    //     let account = list.find(x=> x.bank_code_std == code && x.account_num_masked.substring(0, x.account_num_masked.length - 3) == accno.substring(0, accno.length - 3));
    //     console.log(account);
    // });
}

// console.log(getFinTechNum('1100773662', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzczNjYyIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MzYxODMxNzMsImp0aSI6IjgwN2ZlZGRlLTA1NDAtNDllZC1hZTlhLTA2YzM3YmYwMjJiZiJ9.zzZ6Bh0FOHkw0cMVNzpkBFIM7gwNHe6m5aT02J0Cq8A', '004', '60440101251590'));

// console.log(getUseCode());

function getBalance(token, fintech_use_num){
    let use_code = getUseCode();
    console.log(use_code);
    let date = new Date();
    let dtime = `${date.getFullYear()}${format(date.getMonth() + 1)}${format(date.getDate())}${format(date.getHours())}${format(date.getMinutes())}${format(date.getSeconds())}`;
    let options = {
        url : 'https://testapi.openbanking.or.kr/v2.0/account/balance/fin_num',
        methods:'GET',
        headers:{
            'Authorization' : 'Bearer ' + token
        },
        qs : {
            'bank_tran_id' : use_code,
            'fintech_use_num' : fintech_use_num,
            'tran_dtime' : dtime
        }
    }

    return new Promise((resolve, reject)=>{
        request(options, (err, res, body)=>{

            let result = JSON.parse(body);
            resolve(result.balance_amt);
        });
    });
    // request(options, (err, res, body)=>{

    //     let result = JSON.parse(body);
    //     console.log(result);
    // });
}

function getAccountBalance(token, fintech_use_num){
    let date = new Date();
    let dtime = `${date.getFullYear()}${format(date.getMonth() + 1)}${format(date.getDate())}${format(date.getHours())}${format(date.getMinutes())}${format(date.getSeconds())}`;
    let options = {
        url : 'https://testapi.openbanking.or.kr/v2.0/account/transaction_list/fin_num',
        methods : 'GET',
        headers : { 
            'Authorization' : 'Bearer ' + token
        },
        qs : {
            'bank_tran_id' : getUseCode(),
            'fintech_use_num' : fintech_use_num,
            'inquiry_type' : 'A',
            'inquiry_base' : 'D',
            'from_date' : '20160712',
            'to_date' : '20210815',
            'sort_order' : 'D',
            'tran_dtime' : dtime
        }
    };

    return new Promise((resolve, reject)=>{
        request(options, (err, res, body)=>{
            let result = JSON.parse(body);
            let list = result.res_list;
            list = list.filter(x=> x.print_content!= '오픈상여금');
            resolve(list);
        });
    });
}

// getAccountBalance('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzczNjYyIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MzYxODMxNzMsImp0aSI6IjgwN2ZlZGRlLTA1NDAtNDllZC1hZTlhLTA2YzM3YmYwMjJiZiJ9.zzZ6Bh0FOHkw0cMVNzpkBFIM7gwNHe6m5aT02J0Cq8A', '120211295388932265533577');

function format(value){
    let val = '00' + value;
    return val.substring(val.length, val.length - 2);
}

module.exports = {
    getUseCode,
    getBalance,
    getAccountBalance,
    getFinTechNum
}