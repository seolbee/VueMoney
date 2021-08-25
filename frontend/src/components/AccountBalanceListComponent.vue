<template>
    <div>
        <div class="container" :class="account.icon.split('.')[0]">
            <navigator/>
            <div class="account">
                <div class="top">
                    <div class="acc_name">{{account.name}}</div>
                    <div class="acc_num">{{account.num}}</div>
                    <!-- <div class="acc_num">{{account.accno}}</div> -->
                </div>
                <div class="bottom">
                    <div class="usage_price">
                        <p class="name">총 소비 금액</p>
                        <p class="price"><font-awesome-icon :icon="['fa', 'caret-down']" class="icon"/>{{usage_total.toLocaleString()}}</p>
                    </div>
                    <div class="add_price">
                        <p class="name">들어온 금액</p>
                        <p class="price"><font-awesome-icon :icon="['fa', 'caret-up']" class="icon"/>{{add_total.toLocaleString()}}</p>
                    </div>
                    <div class="balance">
                        <p class="name">잔액</p>
                        <p class="price">{{account.money.toLocaleString()}}</p>
                    </div>
                </div>
            </div>
            <div class="usage_list">
                <loading v-if="data.length == 0"/>
                <div class="usage" v-for="(usage, index) in data" :key="index" :class="{'down' : usage.inout_type === '출금', 'up' : usage.inout_type === '입금'}">
                    <div class="icons">
                        <font-awesome-icon :icon="['fa',`caret-${usage.inout_type === '출금' ? 'down' : 'up'}`]"></font-awesome-icon>
                    </div>
                    <div class="content">
                        <p name="market">{{usage.branch_name}}</p>
                        <p class="span">{{usage.print_content}}</p>
                    </div>
                    <div class="more">
                        <p class="price">{{usage.inout_type === '출금' ? '-' : '+'}} {{(usage.tran_amt *= 1).toLocaleString()}}원</p>
                        <p class="date">{{usage.tran_date.substring(4,6)}}월 {{usage.tran_date.substring(6, 8)}}일</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- <navigator></navigator> -->
    </div>
</template>
<script>
import navigator from '@/components/section/NavigatorComponent';
import Loading from '@/components/section/LoadingComponent';
import axios from 'axios';
export default {
    props:['account'],
    components:{
        'navigator' : navigator,
        'loading' : Loading
    },
    data(){
        return {
            data : [
                {
                    tran_date: '20210701',
                    tran_time: '123201',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '문구',
                    tran_amt: '400',
                    after_balance_amt: '182121',
                    branch_name: '교보핫트랙스(주)'
                },
                {
                    tran_date: '20210702',
                    tran_time: '170401',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '10500',
                    after_balance_amt: '171621',
                    branch_name: '토스'
                },
                {
                    tran_date: '20210702',
                    tran_time: '174101',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '식/음료',
                    tran_amt: '17000',
                    after_balance_amt: '154621',
                    branch_name: '베스킨라빈스'
                },
                {
                    tran_date: '20210702',
                    tran_time: '174301',
                    inout_type: '입금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '3400',
                    after_balance_amt: '158021',
                    branch_name: '토스'
                },
                {
                    tran_date: '20210702',
                    tran_time: '174302',
                    inout_type: '입금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '3400',
                    after_balance_amt: '161421',
                    branch_name: '토스'
                },
                {
                    tran_date: '20210702',
                    tran_time: '174401',
                    inout_type: '입금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '3400',
                    after_balance_amt: '164821',
                    branch_name: '토스'
                },
                {
                    tran_date: '20210702',
                    tran_time: '174501',
                    inout_type: '입금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '3400',
                    after_balance_amt: '168221',
                    branch_name: '토스'
                },
                {
                    tran_date: '20210702',
                    tran_time: '183001',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '의류/액세서리',
                    tran_amt: '2000',
                    after_balance_amt: '166221',
                    branch_name: '(주)엔캣서현역점'
                },
                {
                    tran_date: '20210702',
                    tran_time: '184001',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '여가/문화',
                    tran_amt: '22000',
                    after_balance_amt: '144221',
                    branch_name: '셜록홈즈서현점'
                },
                {
                    tran_date: '20210703',
                    tran_time: '140701',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '580',
                    after_balance_amt: '143641',
                    branch_name: 'DEGICASTEA'
                },
                {
                    tran_date: '20210705',
                    tran_time: '173801',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '12000',
                    after_balance_amt: '131641',
                    branch_name: '토스'
                },
                {
                    tran_date: '20210705',
                    tran_time: '174401',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '여가/문화',
                    tran_amt: '3000',
                    after_balance_amt: '128641',
                    branch_name: '욜로피씨서'
                },
                {
                    tran_date: '20210705',
                    tran_time: '175001',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '식/음료',
                    tran_amt: '2000',
                    after_balance_amt: '126641',
                    branch_name: '욜로피씨서'
                },
                {
                    tran_date: '20210706',
                    tran_time: '181401',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '식/음료',
                    tran_amt: '6500',
                    after_balance_amt: '120141',
                    branch_name: '맘스터치분당서현점'
                },
                {
                    tran_date: '20210706',
                    tran_time: '181430',
                    inout_type: '입금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '10000',
                    after_balance_amt: '130141',
                    branch_name: '농협'
                },
                {
                    tran_date: '20210706',
                    tran_time: '185201',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '식/음료',
                    tran_amt: '400',
                    after_balance_amt: '129741',
                    branch_name: '비어앤크림서현점'
                },
                {
                    tran_date: '20210712',
                    tran_time: '091801',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '15500',
                    after_balance_amt: '114241',
                    branch_name: '선물하기(쿠)카카오'
                },
                {
                    tran_date: '20210712',
                    tran_time: '134901',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '2500',
                    after_balance_amt: '111741',
                    branch_name: '토스'
                },
                {
                    tran_date: '20210712',
                    tran_time: '222701',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '여가/문화',
                    tran_amt: '8000',
                    after_balance_amt: '2',
                    branch_name: '분당점'
                },
                {
                    tran_date: '20210715',
                    tran_time: '154501',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '식/음료',
                    tran_amt: '16000',
                    after_balance_amt: '87741',
                    branch_name: '라화방'
                },
                {
                    tran_date: '20210717',
                    tran_time: '125001',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '여가/문화',
                    tran_amt: '3000',
                    after_balance_amt: '84741',
                    branch_name: '메가박스중앙(주)동'
                },
                {
                    tran_date: '20210719',
                    tran_time: '090401',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '기타',
                    tran_amt: '9900',
                    after_balance_amt: '74841',
                    branch_name: '통신판매_NICEP'
                },
                {
                    tran_date: '20210719',
                    tran_time: '175801',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '여가/문화',
                    tran_amt: '7000',
                    after_balance_amt: '67841',
                    branch_name: '메가박스(제휴)'
                },
                {
                    tran_date: '20210722',
                    tran_time: '083801',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '식/음료',
                    tran_amt: '3000',
                    after_balance_amt: '64841',
                    branch_name: '메가박스중앙(주)영'
                },
                {
                    tran_date: '20210722',
                    tran_time: '104501',
                    inout_type: '출금',
                    tran_type: '증빙거래',
                    print_content: '여가/문화',
                    tran_amt: '30000',
                    after_balance_amt: '34841',
                    branch_name: '메가박스중앙(주)영'
                }
            ],
            usage_total : 0,
            add_total : 0
        }
    },
    computed : {
        // usage_total() {
        //     let prices = this.data.filter(f=> f.inout_type=="출금").map(m=> m.tran_amt *= 1);
        //     return prices.reduce((initValue, currentValue)=> initValue + currentValue);
        // },
        // add_total(){
        //     let prices = this.data.filter(f=> f.inout_type=="입금").map(m=> m.tran_amt *= 1);
        //     return prices.reduce((initValue, currentValue)=> initValue + currentValue);
        // }
    },
    async mounted(){
        let data = await axios.get(`/bank/history/${this.account.finTechNum}`);
        this.data = data.data.data;
        this.data.reverse();

        let prices = this.data.filter(f=> f.inout_type=="출금").map(m=> m.tran_amt *= 1);
        this.usage_total = prices.reduce((initValue, currentValue)=> initValue + currentValue);
        prices = this.data.filter(f=> f.inout_type=="입금").map(m=> m.tran_amt *= 1);
        this.add_total = prices.reduce((initValue, currentValue)=> initValue + currentValue);
    }
}
</script>
<style scoped>
    .container{
        height: 100vh;
    }

    .container.kb{
        background-color: rgb(209, 207, 203);
    }

    .container.ibk{
        background-color:skyblue;
    }

    .container.nh {
        background-color: #53ce70;
    }

    .container.suheub {
        background-color:#9dccf7;
    }

    .container.dg {
        background-color: #96b9de;
    }

    .container.bnk {
        background-color: #ffb5b5;
    }

    .container.shinhan {
        background-color:#48a6d1;
    }

    .container.woolee {
        background-color: #8ae0f9;
    }

    .container.kbank {
        background-color: #ff7893;
    }
    
    .container.kakao {
        background-color: #ffe812;
    }

    .container.hana {
        background-color: #95b1b1;
    }

    .account{
        padding: 10px 20px 30px 20px;
    }

    .account > .top{
        padding-bottom: 20px;
    }

    .container.kb > .account > .top {
        border-bottom: 1px solid #aaa;
    }

    .container.ibk > .account > .top {
        border-bottom: 1px solid #6dbada;
    }

    .container.nh > .account > .top {
        border-bottom: 1px solid #3bad56;
    }

    .container.suheub > .account > .top {
        border-bottom :1px solid #8dbbe4;
    }

    .container.dg > .account > .top {
        border-bottom: 1px solid #768fa9;
    }
    
    .container.bnk > .account > .top {
        border-bottom: 1px solid #d48d8d;
    }

    .container.shinhan > .account > .top {
        border-bottom: 1px solid #488faf;
    }

    .container.woolee > .account > .top {
        border-bottom: 1px solid #6fc5de;
    }

    .container.kbank > .account > .top {
        border-bottom : 1px solid #d65670;
    }

    .container.kakao > .account > .top {
        border-bottom: 1px solid #ab9b0e;
    }

    .container.hana > .account > .top {
        border-bottom : 1px solid #7b9292;
    }

    .account > .top > .acc_name{
        font-size: 14px;
        color: rgb(245,245,245);
    }

    .account > .top > .acc_num{
        font-size: 1.5em;
        color: white;
    }

    .container.kakao > .account > .top > .acc_name{
        color: #333;
    }

    .container.kakao > .account > .top > .acc_num {
        color: black;
    }

    .account > .bottom{
        display: flex;
        justify-content: space-between;
        padding-top: 20px;
        align-items: flex-end;
    }

    .account > .bottom > div > .name {
        font-size: 13px;
        color: rgb(245,245,245);
    }

    .account > .bottom > div > .price {
        font-size: 18px;
        color: white;
    }

    .container.kakao > .account > .bottom > div > .name {
        color: #333;
    }

    .container.kakao > .account > .bottom > div > .price {
        color: black;
    }

    /* .account > .bottom > .usage_price{
        color: red;
    } */

    .account > .bottom > .usage_price > .price > .icon, .account > .bottom > .add_price > .price > .icon{
        margin-right: 10px;
        /* color: red; */
    }

    .account > .bottom > .add_price > .name{
        text-align: center;
    }

    .account > .bottom > .balance > .name{
        text-align: right;
    }

    .usage_list{
        background-color: white;
        border-radius: 30px 30px 0 0;
        min-height: 70%;
        padding: 20px 30px;
        display: grid;
        grid-auto-rows: 50px;
        gap: 20px 0;
    }
    
    .usage{
        display: grid;
        grid-template-columns: 15% 50% 35%;
        text-align: center;
        line-height: 50px;
    }

    .usage > .icons{
        border-radius: 15px;
        font-size: 18px;
    }

    .usage.down > .icons{
        background-color: #ffc9c9;
        color: red;
    }

    .usage.up > .icons{
        background-color: #b7ffcc;
        color: green;
    }

    .usage > .content{
        line-height: 1.5;
        text-align: left;
        padding-left: 10px;
    }

    .usage > .content > .span{
        color: #999;
        font-size: 12px;
    }

    /* .usage > .content > .market{
    } */

    .usage > .more{
        text-align:right;
        line-height: 1.5;
    }

    .usage > .more > .date{
        font-size: 12px;
        color: #999;
    }

    .usage > .more > .price{
        font-size: 18px;
    }

    .usage.down > .more > .price{
        color: red;
        font-weight: bold;
    }

    .usage.up > .more > .price{
        color: #2dd65e;
        font-weight: bold;
    }
</style>