<template>
    <p enter-active="showAlert" ref="alert">{{this.msg}}</p>
</template>
<script>
export default {
    props:{
        msg:String
    },
    methods : {
        showAlert(){
            this.$refs.alert.style.bottom="70px";
        }
    }
}
</script>
<style scoped>
    p{
        background-color: #555;
        color: white;
        position: fixed;
        bottom: -70px;
        width: 80%;
        text-align: center;
        padding: 15px 0;
        border-radius: 30px;
        left: 50%;
        transform: translateX(-50%);
        /* opacity: 0.9; */
        font-size: 15px;
        transition: all 0.5s;
    }
</style>