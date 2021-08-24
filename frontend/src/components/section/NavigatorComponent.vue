<template>
    <div class="navigator">
        <!-- <div class="icon-box" @click="onClick(0)" :class="{active : nav == 0}">
            <router-link to="/"><font-awesome-icon :icon="['fas', 'home']"></font-awesome-icon></router-link>
        </div>
        <div class="icon-box" @click="onClick(1)" :class="{active : nav == 1}">
            <router-link to="/plan"><font-awesome-icon :icon="['fas', 'calendar-plus']"></font-awesome-icon></router-link>
        </div>
        <div class="icon-box" @click="onClick(2)" :class="{active : nav == 2}">
            <router-link to="/settings"><font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon></router-link>
        </div> -->
        
    </div>    
</template>
<script>
export default {
    // data(){
    //     return {
    //         nav : 0
    //     }
    // },
    // methods:{
    //     onClick(no){
    //         this.nav = no;
    //     }
    // },
    // mounted(){
    //    if(this.$router.history.current.path ==="/plan") this.nav = 1;
    //    else if(this.$router.history.current.path === "/settings") this.nav = 2;
    // }
}
</script>
<style scoped>
    /* .navigator{
        background-color: #fff;
        display: flex;
        justify-content: space-around;
        height: 50px;
        align-items: center;
        position: fixed;
        bottom: 0px;
        border-top: 1px solid rgb(250,250,250);
        width: 100%;
    }

    .navigator > .icon-box > *{
        color: #ccc;
        font-size: 25px;
    }

    .navigator > .icon-box.active > *{
        color: #5be7c4;
    } */
</style>