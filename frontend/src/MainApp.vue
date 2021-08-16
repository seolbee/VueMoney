<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    name:"MainApp",
    methods:{
        // refresh: async function(){
        //     await this.$http.post('/auth/session');
        // }
    }
}
</script>
<style scoped>
    div{
        /* width:480px; */
        height: 100%;
        /* background-color: #fafffd; */
        overflow-y:hidden;
    }
</style>