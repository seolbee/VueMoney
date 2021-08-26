<template>
    <div class="background">
        <div class="container">
            <!-- <router-link to="/register">회원가입</router-link>
            <router-link to="/login">로그인</router-link> -->
            <p class="box">로그아웃</p>
        </div>
    </div>
</template>
<script>
export default {
    components : {
    },
    data(){
        return {
            
        }
    },
    mounted() {

    }
}
</script>
<style scoped>
    .background{
        position: fixed;
        background-color: rgba(0,0,0,.5);
        /* width: 100%; */
        /* height: 100%; */
        height: 100vh;
        width: 100vw;
        top: 0;

    }

    .container{
        width: 50%;
        background-color: rgb(245,245,245);
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        /* display: flex;
        flex-direction: column;
        justify-content: flex-end; */

    }

    .box{
        border-top: 1px solid #ddd;
        padding: 10px;
        text-align: right;
    }
</style>