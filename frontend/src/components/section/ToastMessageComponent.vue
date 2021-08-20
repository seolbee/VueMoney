<template>
    <transition v-if="show" @after-enter="showAlert" @leave="cancelAlert">
        <p>{{this.msg}}</p>
    </transition>
</template>
<script>
export default {
    props:['msg', 'show'],
    methods : {
        showAlert(el, done){
            el.style.bottom="70px";
            done();
        },
        cancelAlert(el){
            el.style.bottom="-70px";
            done();
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
        width: 60%;
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