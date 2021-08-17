<template>
    <div class="calendar_box">
        <div class="top">
            <font-awesome-icon :icon="['fa', 'angle-left']" @click="prevMonth(date)"></font-awesome-icon>
            <p class="cal_name">{{this.month}}월</p>
            <font-awesome-icon :icon="['fa', 'angle-right']" @click="nextMonth(date)"></font-awesome-icon>
        </div>
        <transition name="slide">
            <div class="calendar">
                <div class="day_box">
                    <p>S</p>
                    <p>M</p>
                    <p>T</p>
                    <p>W</p>
                    <p>T</p>
                    <p>F</p>
                    <p>S</p>
                </div>
                <div class="date_box">
                    <p v-for="(date, index) in dates" :class="{'prevDate' : index <= prevDay, 'nextDate': index > nextDay, 'date': index > prevDay && index <= nextDay, 'today' : (index == active) }" :key="index" @click="focusDate(index)"><span :class="{active : index == active}"></span>{{date}}</p>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data(){
        return {
            dates : [],
            prevDay: 0,
            nextDay: 0,
            active : 0,
            date: new Date(),
            toMonth: null,
            toDates: 0,
        }
    },
    methods:{
        getCalendar(){
            let preLast = new Date(this.year, this.month-1, 0);
            let thisLast = new Date(this.year, this.month, 0);

            let PLDate = preLast.getDate();
            let PLDay = preLast.getDay();
            this.prevDay = PLDay === 6 ? -1 : PLDay;

            let TLDate = thisLast.getDate();
            let TLDay = thisLast.getDay();

            let prevDates = [];
            let thisDates = [];
            let nextDates = [];

            thisDates = [...Array(TLDate + 1).keys()].slice(1);
            this.toDates = thisDates.length;
            if(PLDay !== 6) for(let i = 0; i<PLDay + 1; i++){prevDates.unshift(PLDate - i)};
            for(let i = 1; i < 7 - TLDay; i++){nextDates.push(i)};
            this.dates = prevDates.concat(thisDates, nextDates);
            this.nextDay = this.dates.length-(7 - TLDay);
            this.active = this.toMonth == this.date.getMonth()+1 ? this.date.getDate() + this.prevDay : this.prevDay+1;
        },
        focusDate(index){
            if(index <= this.prevDay || index > this.nextDay) return;
            this.active = index;
        },
        prevMonth(date){
            this.date = new Date(Date.parse(date) - 1000 * 3600 * 24 * this.toDates);
            this.getCalendar();
        },
        nextMonth(date){
            console.log(date);
            this.date = new Date(Date.parse(date) + 1000 * 3600 * 24 * this.toDates);
            this.getCalendar();
        }
    },
    computed:{
        today(){
            return this.date.getDate() + this.prevDay;
        },
        // toMonth(){
        //     let d = new Date();
        //     return d.getMonth() + 1;
        // }
        month(){
            return this.date.getMonth() + 1;
        },
        year(){
            return this.date.getFullYear();
        }
    },
    mounted(){
        this.toMonth = this.date.getMonth() + 1;
        this.getCalendar();
    }
}
</script>
<style scoped>
    .calendar_box{
        font-family: 'Poppins', sans-serif;
        position: relative;
        z-index: 1;
    }
    .cal_name{
        font-size: 28px;
        color: #354843;
    }

    .top{
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        padding-top: 30px;
        align-items: center;
    }

    .top svg{
        font-size: 35px;
        color: #e7f1ef;
    }
    .calendar{
        padding: 0 30px;
        padding-top: 20px;
    }

    .calendar > div{
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        box-shadow: 0px 3px 1px 0px rgba(0,0,0, .03);
    }

    .calendar > .day_box{
        grid-auto-rows: calc(480 / 7);
    }

    .calendar > div > p{
        text-align: center;
        line-height: 50px;
        font-size: 18px;
        color: #b2b7b6;
        font-weight: 600;
    }

    .calendar > .date_box{
        grid-auto-rows: 50px;
    }

    .calendar > .date_box > p{
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
    }

    .calendar > .date_box > .prevDate, .calendar > .date_box > .nextDate{
        color: #e5f1ef;
    }

    .calendar > .date_box > .date{
        color: #2fdab8;
        position: relative;
    }

    .today{
        color: white !important;
    }

    .today > span.active{
        background-color: #2fdab8;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }
</style>