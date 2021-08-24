<template>
    <div>
        <div class="chart_box">
            <div class="chart">
                <chart/>
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
import Chart from '@/components/section/ChartComponent';
export default {
    components:{
        'chart' : Chart
    },
    props:['data'],
    mounted(){
        console.log(this.data);
    }
}
</script>
<style scoped>
    .chart_box{

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