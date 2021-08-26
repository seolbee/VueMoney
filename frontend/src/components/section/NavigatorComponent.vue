<template>
    <div class="navigator" :class="this.class">
        <!-- <div class="icon-box" @click="onClick(0)" :class="{active : nav == 0}">
            <router-link to="/"><font-awesome-icon :icon="['fas', 'home']"></font-awesome-icon></router-link>
        </div>
        <div class="icon-box" @click="onClick(1)" :class="{active : nav == 1}">
            <router-link to="/plan"><font-awesome-icon :icon="['fas', 'calendar-plus']"></font-awesome-icon></router-link>
        </div>
        <div class="icon-box" @click="onClick(2)" :class="{active : nav == 2}">
            <router-link to="/settings"><font-awesome-icon :icon="['fas', 'cog']"></font-awesome-icon></router-link>
        </div> -->
        <div class="icon-box" @click="goBack()">
            <font-awesome-icon :icon="['fas', 'angle-left']"></font-awesome-icon>
        </div>
        <div class="icon-box" @click="setShow(true)">
            <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon>
        </div>
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
    props:['class'],
    data(){
        return {

        }
    },
    methods:{
        goBack(){
            this.$router.go(-1);
        }, 
        setShow(value){
            
        }
    }
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

    .navigator{
        display: flex;
        justify-content: space-between;
        align-items : center;
        padding: 10px 20px;
        /* box-shadow: 0 1px 3px 0px rgba(0,0,0,.1); */
    }

    .navigator > .icon-box{
        font-size: 25px;
        color : #d8e0df;
    }

    .main {
        justify-content :flex-end;
    }

    .main > .icon-box{
        color: white;
    }

    .main > .icon-box:nth-child(1){
        display: none;
    }
</style>