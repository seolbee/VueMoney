<template>
    <div class="background" v-if="show">
        <div class="container">
            <!-- <router-link to="/register">회원가입</router-link>
            <router-link to="/login">로그인</router-link> -->
            <div class="top">
                <p><span @click="setShow(false)">&times;</span></p>
            </div>
            <div class="menu">
                <p class="box">계정탈퇴</p>
                <p class="box">고객센터</p>
                <p class="box">로그아웃</p>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props:["show"],
    methods : {
        setShow(value){
            this.$emit("setShow", value);
        }, 
        async logout(){
            let res = await axios.get("/auth/logout");
            this.$store.commit('setUser', null);
        }
    },
    mounted() {

    }
}
</script>
<style scoped>
    .background{
        position: fixed;
        background-color: rgba(0,0,0,.3);
        /* width: 100%; */
        /* height: 100%; */
        height: 100vh;
        width: 100vw;
        top: 0;
        z-index: 5;

    }

    .container{
        width: 50%;
        background-color: rgb(250,250,250);
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        box-shadow: 0px 0px 2px 1px rgba(0,0,0,.1);
    }

    .top > p{
        text-align: right;
        padding: 10px 10px;
        font-size: 25px;
        color: #aaa;
    }

    .menu{
        background-color: white;
        border-top: 1px solid #eee;
    }

    .box{
        border-bottom: 1px solid #eee;
        padding: 15px 10px;
        text-align: right;
    }
</style>