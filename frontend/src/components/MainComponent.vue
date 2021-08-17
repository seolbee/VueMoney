<template>
    <div>
        <div class="background">
            <div class="container">
                <h1>계좌 내역</h1>
                <div class="accounts">
                    <div class="accountment_box" @touchstart="swipe_start($event)" @touchend="swipe_stop($event)">
                        <div class="accountment_container" ref="container">
                            <div class="accountment" v-for="(user, index) in users" :key="index" :class="user.icon.split('.')[0]">
                                <div class="top">
                                    <img :src="require(`../assets/logos/${user.icon}`)" alt="img">
                                    <p class="name">{{user.name}}</p>
                                </div>
                                <p class="acc_num">{{user.num}}</p>
                                <p class="acc_money">{{user.money.toLocaleString()}}원</p>
                            </div>
                            <div class="accountment_plus">
                                <router-link to="/account/bank">
                                    <font-awesome-icon :icon="['fa', 'plus']"></font-awesome-icon>
                                </router-link>
                            </div>
                        </div>
                    </div>
                    <div class="page_icon">
                        <div class="circle" v-for="(user, index) in users" :key="index" :class="{'active' : active == index}" @click="changeAccount(index)"></div>
                        <div class="circle" :key="users.length" :class="{'active' : users.length == active}" @click="changeAccount(users.length)"></div>
                    </div>
                </div>
                <use-list/>
            </div>
        </div>
        <navigator></navigator>
    </div>
</template>
<script>
import navigator from '@/components/section/NavigatorComponent';
import UseList from '@/components/section/UseListComponent';
// import axios from 'axios';
export default {
    components:{
        'navigator':navigator,
        'use-list' :UseList
    },
    data(){
        return{
            users:[
                {
                    name : 'KB국민은행',
                    money : 5700,
                    num : '1234567890',
                    icon : 'kb.png'
                },
                {
                    name : 'IBK기업은행',
                    money : 5800,
                    num : '1234567890',
                    icon : 'ibk.png'
                },
                {
                    name : 'NH농협은행',
                    money : 5900,
                    num : '1234567890',
                    icon : 'nh.png'
                }

            ],
            resX : 0,
            x: 0,
            active : 0
        }
    },
    methods:{
        swipe_start(e){
            this.x = e.changedTouches[0].clientX;
        },
        swipe_stop(e){
            this.resX = this.x - e.changedTouches[0].clientX;
            if(this.resX > 0){
                this.active = this.active < this.users.length ? this.active + 1 : this.users.length;
            } else if(this.resX < 0){
                this.active = this.active > 0 ? this.active - 1 : 0;
            }
            this.$refs.container.style.left = `-${this.active * 360}px`;
        // },
        // leave(el, done){
        //     if(this.resX > 0){
        //         this.active += 300;
        //     } else if(this.resX < 0){
        //     }
        //     el.style.transform = `translateX(${this.active}px)`;
        //     done();
        // },
        // enter(el, done){
        //     if(this.resX > 0){
        //         this.active += 300;
        //     } else if(this.resX < 0){

        //     }
        //     el.style.transform = `translateX(${this.active}px)`;
        //     done();
        },
        changeAccount(index){
            this.active = index;
            this.$refs.container.style.left = `-${this.active * 360}px`;
        }
    },
    async mounted(){
        // let res = await axios.get('/bank/lists');
        // this.users = res.data.data;
        // console.log(this.users);
    }
}
</script>
<style scoped>

    .background{
        background-color: #5BE7CA;
        padding-top: 100px;
    }

    .container {
        /* background-color: #fafffd; */
        background-color: #fff;
        border-radius: 30px;
        width: 100%;
    }
    .container > h1{
        padding: 20px;
    }

    .accounts{
        height: 250px;
        position: relative;
    }

    .accountment_box{
        width: 360px;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        /* justify-content: center; */
        position: relative;
        /* margin-bottom: 30px; */
        margin: auto;
    }

    .accountment_container{
        display: flex;
        height: 100%;
        width: auto;
        align-items: center;
        transition: all 0.5s;
        position:absolute;
        left: 0;
    }

    .accountment_plus{
        /* display: inline-block; */
        /* position: absolute; */
        z-index: 1;
        width: 300px;
        height: 200px;
        border-radius: 30px;
        border: 1.5px dashed #aaa;
        font-size: 50px;
        margin: 0 30px;
    }

    .accountment_plus > *{
        width: 100%;
        height: 100%;
        color: #ccc;
        display: flex;
        justify-content: center;
        align-items:center;
    }

    .accountment{
        /* position: absolute; */
        width: 300px;
        height: 200px;
        padding: 20px;
        background-color: #5BE7CA;
        border-radius: 30px;
        margin: 0 30px;
        position: relative;
    }

    .accountment > .top{
        display: flex;
        align-items: center;
        margin-bottom: 5px;
    }

    .accountment > .top >  img{
        width: 30px;
    }

    .accountment > .top > .name{
        padding-left: 10px;
        font-size: 18px;
    }

    .accountment > .acc_money{
        position: absolute;
        right: 25px;
        bottom: 20px;
    }

    .accountment.kb{
        background-color: rgb(209, 207, 203);
        color: white;
    }

    .accountment.ibk{
        background-color:skyblue;
        color: white;
    }

    .accountment.nh{
        background-color: #53ce70;
        color: white;
    }

    .active{
        display: block;
    }

    .page_icon{
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .circle{
        width: 8px;
        height: 8px;
        background-color: #eee;
        border-radius: 50%;
        margin: 0 3px;
    }

    .circle.active{
        background-color:#5BE7CA;
    }
</style>