<template>
    <div>
        <div class="background">
            <div class="container">
                <h1>계좌 내역</h1>
                <div class="accountment_box" @touchstart="swipe_start($event)" @touchend="swipe_stop($event)">
                    <div class="accountment_container" ref="container">
                        <div class="accountment" v-for="(user, index) in users" :key="index">
                            <p class="acc_money">{{user.money}}원</p>
                            <p class="acc_num">{{user.num}}</p>
                        </div>
                        <div class="accountment_plus">
                            <router-link to="/account/bank">
                                <font-awesome-icon :icon="['fa', 'plus']"></font-awesome-icon>
                            </router-link>
                        </div>
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
import axios from 'axios';
export default {
    components:{
        'navigator':navigator,
        'use-list' :UseList
    },
    data(){
        return{
            users:[
                // {
                //     name : '조한슬',
                //     money : '5700',
                //     num : '1234567890'
                // },
                // {
                //     name : '조한슬',
                //     money : '5800',
                //     num : '1234567890'
                // },
                // {
                //     name : '조한슬',
                //     money : '5900',
                //     num : '1234567890'
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
    div{
        width: 100%;
        height: 100vh;
    }

    .background{
        width: 100%;
        height: 100%;
        background-color: #5BE7CA;
        padding-top: 100px;
    }

    .container {
        background-color: #fafffd;
        border-radius: 30px;
        padding: 25px;
    }

    .container > h1 {
        margin-bottom: 20px;
    }

    .accountment_box{
        width: 100%;
        height: 30%;
        overflow: hidden;
        padding: 10px;
        display: flex;
        align-items: center;
        /* justify-content: center; */
        position: relative;
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
    }

    .active{
        display: block;
    }
</style>