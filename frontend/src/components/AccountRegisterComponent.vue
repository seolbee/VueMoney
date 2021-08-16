<template>
    <div>
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
    div{
        overflow-x:hidden;
    }
    
    h1{
        padding: 10px;
    }
</style>