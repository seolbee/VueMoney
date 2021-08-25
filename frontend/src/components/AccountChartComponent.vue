<template>
    <div class="container">
        <navigator/>
        <div class="chart_box">
            <div class="chart">
                <chart :usage_total="usage_total" :total="total"/>
            </div>
            <div class="usage_box">
                <p class="name">{{name}}</p>
                <p class="usage_total">{{usage_total.toLocaleString()}}원</p>
            </div>
        </div>
        <div class="usage_list">
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
</template>
<script>
import navigator from '@/components/section/NavigatorComponent';
import Chart from '@/components/section/ChartComponent';
export default {
    components:{
        'chart' : Chart,
        'navigator' : navigator
    },
    props:['data', 'total', 'name'],
    data(){
        return {
            usage_total : 0
        }
    },
    created(){
        this.usage_total = this.data.map(m=> m.tran_amt).reduce((initvalue, currentvalue)=> initvalue + currentvalue);
    }
}
</script>
<style scoped>
    .container{
        background-color: #fafcfe;
    }
    
    .chart_box{
        display: flex;
        align-items: center;
        /* color: white; */
    }

    .usage_box {
        padding-left: 20px;
    }

    .usage_box > .name{
        font-size: 18px;
        color: #555;
    }

    .usage_box > .usage_total {
        font-size: 25px;
    }

    .usage_list{
        background-color: white;
        height: 70%;
        padding: 15px;
        display: grid;
        border-radius: 30px 30px 0px 0px;
        /* grid-auto-rows: 50px; */
        /* gap: 15px 0; */
        /* box-shadow: 0px -2px 1px 0px #fafcfe; */
    }
    
    .usage{
        display: grid;
        grid-template-columns: 15% 50% 35%;
        text-align: center;
        line-height: 50px;
        /* background-color: rgba(255,255,255, .9); */
        padding: 15px 18px;
        /* border-radius: 5px; */
        /* box-shadow: 0px 0px 1px 0px rgba(0,0,0,.1); */
        border-bottom: 1px solid #eee;
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