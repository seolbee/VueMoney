<template>
    <transition v-if="show" @after-enter="showAlert" @leave="cancelAlert">
        <p>{{this.msg}}</p>
    </transition>
</template>
<script>
export default {
    props:['msg', 'show'],
    methods : {
        showAlert(el){
            el.style.bottom="70px";
        },
        cancelAlert(el){
            el.style.bottom="-70px";
        }
    }
}
</script>
<style scoped>
    p{
        background-color: #444;
        color: white;
        position: fixed;
        bottom: -70px;
        text-align: center;
        padding: 15px 10px;
        border-radius: 30px;
        width: 80%;
        left: 50%;
        transform: translateX(-50%);
        /* opacity: 0.9; */
        font-size: 15px;
        transition: all 0.5s;
    }
</style>