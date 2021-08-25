<template>
    <div class="use_list">
        <!-- <div class="use">
            <img src="../../assets/icons/burger.png" alt="img" class="icon"/>
            <p>식/음료</p>
            <p>20,000원</p>
        </div>
        <div class="use">
            <img src="../../assets/icons/millennial.png" alt="img" class="icon"/>
            <p>여가/문화</p>
            <p>10,000원</p>
        </div>
        <div class="use">
            <img src="../../assets/icons/pencil.png" alt="img" class="icon"/>
            <p>문구</p>
            <p>400원</p>
        </div>
        <div class="use">
            <img src="../../assets/icons/wardrobe.png" alt="img" class="icon"/>
            <p>의류</p>
            <p>12,000원</p>
        </div> -->
        <div class="use" v-for="(use, index) in use_list" :key="index" @click="showBalnce(use.name)">
            <img :src="require(`../../assets/icons/${use.img}`)" alt="img" class="icon"/>
            <p>{{use.name}}</p>
            <p>{{use.price.toLocaleString()}}원</p>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props : {
        finTechNum:String
    },
    data(){
        return {
            use_list : [
                {
                    img : 'burger.png',
                    name:'식/음료',
                    price : 0
                },
                {
                    img : 'millennial.png',
                    name:'여가/문화',
                    price : 0
                },
                {
                    img : 'pencil.png',
                    name : '문구',
                    price : 0
                },
                {
                    img : 'wardrobe.png',
                    name : '의류/액세서리',
                    price : 0
                },
                {
                    img : 'more.png',
                    name : '기타',
                    price : 0
                }
            ],
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
            ]
        }
    },
    methods : {
        showBalnce(name) {
            let filter = this.data.filter(x=> x.print_content == name && x.inout_type === "출금");
            let total = this.data.filter(x=> x.inout_type==="출금").map(m=> m.tran_amt * 1).reduce((initvalue, currentvalue)=> initvalue + currentvalue);
            this.$router.push({name : 'usageHistory-page', params:{data:filter, total:total, name : name}});
        },
        async getStatistics() {
            // let res = await axios.get(`/bank/history/${this.finTechNum}`);
            // this.data = res.data.data;
            // console.log(this.data);
            this.use_list.forEach(x=>{
                let filter = this.data.filter(f=> f.print_content == x.name && f.inout_type === "출금").map(m => m.tran_amt *= 1);
                if(filter.length !== 0) x.price = filter.reduce((initValue, currentValue)=> initValue + currentValue);
            });
            this.use_list.sort((a, b)=>b.price - a.price);
        }
    },
    mounted(){
        // console.log(this.finTechNum);
        this.getStatistics();
    }
}
</script>
<style scoped>
    .use_list{
        display:grid;
        grid-auto-rows: 70px;
        padding: 10px;
    }

    .use{
        display: grid;
        grid-template-columns: 15% 40% 40%;
        line-height: 50px;
        gap:10px;
        padding: 10px;
        border-bottom: 1px solid #eef;
    }

    .use > img{
        width: 90%;
    }

    .use > p{
        text-align: center;
        font-size: 16px;
    }
</style>