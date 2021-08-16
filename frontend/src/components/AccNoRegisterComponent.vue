<template>
    <div>
        <h3>{{name}}의 계좌번호를 입력하세요</h3>
        <form @submit.prevent="getAccountment" method="post">
            <div class="input_box" :class="{'active' : active }">
                <img :src="require(`asset/logos/${src}`)" alt="img"/>
                <input type="text" v-model="accno" @focus="focus()" @blur="blur()">
            </div>
            <button>계좌 등록</button>
        </form>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    props:{
        code:{
            type:String
        },
        name:{
            type:String           
        },
        src : {
            type:String
        }
    },
    data(){
        return {
            accno:'',
            active : false
        }
    },
    methods:{
        async getAccountment(){
            let accno = this.accno;
            if(accno.trim() === "") return false;
            let code = this.code;
            let name = this.name;
            let res = await axios.post('/bank/register', {code, name, accno});
            alert(res.data.msg);
            if(res.data.success) this.$router.push('/');
        },
        focus(){
            this.active = true;
        },
        blur(){
            this.active = false;
        }
    },
    mounted(){
    }
}
</script>
<style scoped>
    div{
        padding: 30px 20px;
        position: relative;
        height: 100%;
    }

    form{
        padding: 10px 0;
    }

    .input_box{
        display: flex;
        border-bottom: 2px solid #aaa;
        width: 100%;
        padding: 10px;
    }

    .input_box > input{
        border: none;
        padding-left: 15px;
        font-size: 20px;
        width: 100%;
    }

    .input_box.active{
        border-bottom: 2px solid #2fdab8;
    }

    .input_box > img{
        width: 8%;
    }

    button{
        position: absolute;
        bottom: 63px;
        left: 0;
        width: 100%;
        font-size: 20px;
        padding: 10px 13px;
        background-color: #5be7c4;
        color: white;
    }
</style>