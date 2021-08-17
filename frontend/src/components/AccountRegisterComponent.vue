<template>
    <div class="container">
        <h1>계좌등록</h1>
        <transition name="slide">
            <router-view></router-view>
        </transition>
        <!-- <navigator></navigator> -->
    </div>
</template>
<script>
import navigator from './section/NavigatorComponent';
export default {
    components:{
        navigator
    }
}
</script>
<style scoped>
    .container{
        height: 100vh;
        overflow:hidden;
        position: relative;
    }
    
    h1{
        padding: 10px;
    }
</style>