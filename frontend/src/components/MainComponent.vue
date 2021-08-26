<template>
    <div>
        <div class="background">
            <navigator :className="'main'"/>
            <div class="container">
                <loading v-if="users.length == 0"/>
                <h1>계좌</h1>
                <div class="accounts">
                    <div class="accountment_box" @touchstart="swipe_start($event)" @touchend="swipe_stop($event)">
                        <div class="accountment_container" ref="container">
                            <div class="accountment" v-for="(user, index) in users" :key="index" :class="user.icon.split('.')[0]" @click="usageView">
                                <div class="top">
                                    <img :src="require(`../assets/logos/${user.icon}`)" alt="img">
                                    <p class="name">{{user.name}}</p>
                                </div>
                                <p class="acc_num">{{user.accno}}</p>
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
                <use-list :finTechNum="users[active].finTechNum" v-if="users.length != 0 && active != users.length"/>
                <!-- <use-list/> -->
            </div>
        </div>
        <!-- <navigator></navigator> -->
    </div>
</template>
<script>
import navigator from '@/components/section/NavigatorComponent';
import UseList from '@/components/section/UseListComponent';
import Toast from '@/components/section/ToastMessageComponent';
import Loading from '@/components/section/LoadingComponent';
import axios from 'axios';
export default {
    components:{
        'navigator':navigator,
        'use-list' :UseList,
        'toast' : Toast,
        'loading' : Loading
    },
    data(){
        return{
            users:[
                // {
                //     name : 'KB국민은행',
                //     money : 5700,
                //     num : '1234567890',
                //     icon : 'kb.png'
                // },
                // {
                //     name : 'IBK기업은행',
                //     money : 5800,
                //     num : '1234567890',
                //     icon : 'ibk.png'
                // },
                // {
                //     name : 'NH농협은행',
                //     money : 5900,
                //     num : '1234567890',
                //     icon : 'nh.png'
                // },
                // {
                //     name : '수협은행',
                //     money : 6000,
                //     num : '1234567890',
                //     icon : 'suheub.png'
                // },
                // {
                //     name : '대구은행',
                //     money : 6100,
                //     num : '1234567890',
                //     icon : 'dg.png'
                // },
                // {
                //     name : '부산은행',
                //     money : 6200,
                //     num : '1234567890',
                //     icon : 'bnk.png'
                // },
                // {
                //     name : '경남은행',
                //     money : 6300,
                //     num : '1234567890',
                //     icon : 'bnk.png'
                // },
                // {
                //     name : '신한은행',
                //     money : 6400,
                //     num : '1234567890',
                //     icon : 'shinhan.png'
                // },
                // {
                //     name : '우리은행',
                //     money : 6500,
                //     num : '1234567890',
                //     icon : 'woolee.png'
                // },
                // {
                //     name : 'KBANK은행',
                //     money : 6600,
                //     num : '1234567890',
                //     icon : 'kbank.png'
                // },
                // {
                //     name : 'kakao뱅크',
                //     money : 6700,
                //     num : '1234567890',
                //     icon : 'kakao.png'
                // }
                // ,
                // {
                //     name : '하나은행',
                //     money : 6800,
                //     num : '1234567890',
                //     icon : 'hana.png'
                // }

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
        },
        usageView(){
            this.$router.push({name:'accountHistory-page', params:{account:{...this.users[this.active]}}});
        }
    },
    async mounted(){
        let res = await axios.get('/bank/lists');
        let bank_list = this.$store.getters.getBanks;
        this.users = res.data.data.map(x=> {
            let bank = bank_list.find(b => b.code == x.code);
            x.icon = bank.src;
            x.money *= 1;
            return x;
        });
    }
}
</script>
<style scoped>

    .background{
        background-color: #5BE7CA;
        /* padding-top: 100px; */
    }

    .container {
        /* background-color: #fafffd; */
        background-color: #fff;
        border-radius: 30px 30px 0 0;
        width: 100%;
        margin-top: 10px;
    }
    .container > h1{
        padding: 20px 30px;
        padding-bottom: 0px;
    }

    .accounts{
        height: 240px;
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

    .accountment > .acc_num{
        font-size: 15px;
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

    .accountment.suheub{
        background-color:#9dccf7;
        color: white;
    }

    .accountment.dg{
        background-color:#96b9de;
        color: white;
    }

    .accountment.bnk{
        background-color: #ffb5b5;
        color: white;
    }

    .accountment.shinhan{
        background-color:#48a6d1;
        color: white;
    }

    .accountment.woolee{
        background-color: #8ae0f9;
        color: white;
    }

    .accountment.kbank{
        background-color: #ff7893;
        color: white;
    }

    .accountment.kakao{
        background-color: #ffe812;
        color: black;
    }

    .accountment.hana{
        background-color: #95b1b1;
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