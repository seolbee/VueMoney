<template>
    <div>
        <h1>로그인</h1>
        
        <form @submit.prevent="login" method="post">
            <div class="input-box">
                <label for="#">아이디</label>
                <input type="text" name="id" v-model="user.id" :class="{'active' : active == 1, 'error' : is_user.id == -1 , 'complete' : is_user.id == 1}" @focus="focusing(1)" @blur="nonfocusing">
            </div>
            <div class="input-box">
                <label for="#">비밀번호</label>
                <input type="password" name="password" v-model="user.password" :class="{'active' : active == 2, 'error' : is_user.password == -1, 'complete' : is_user.password == 1}" @focus="focusing(2)" @blur="nonfocusing">
            </div>
            <button>로그인</button>
        </form>
    </div>
</template>
<script>
import Toast from '@/components/section/ToastMessageComponent'
import axios from 'axios';
export default {
    components : {
        'toast' : Toast
    },
    data(){
        return {
            user : {
                id : '',
                password : ''
            },
            is_user:{
                id: 0,
                password:0
            },
            active:0,
            msg : '',
            show : false
        }
    },
    methods:{
        login(){
            axios.post("/auth/login", this.user).then(res=>{
                this.msg = res.data.msg;
                this.show = true;

                setTimeOut(()=>{
                    this.show = false;
                }, 3000);
                setTimeOut(()=>{
                    if(res.data.success) {
                        this.$store.commit("setUser", res.data.user);
                        this.$router.push("/");
                    }
                }, 5000);
            });
        },
        focusing(a){
            this.active = a;
        },
        nonfocusing(){
            this.active = 0;
        }
    },
    watch:{
        user : {
            deep:true,
            handler(n, o){
                let id_reg = new RegExp(/[a-z0-9]{5}/, "gi");
                if(this.active == 1 && id_reg.test(this.user.id.trim())) this.is_user.id = 1;
                else if(this.active == 1) this.is_user.id = -1;

                if(this.active == 2 && this.user.password.trim().length >= 5) this.is_user.password = 1;
                else if(this.active == 2) this.is_user.password = -1;
            }
        }
    }
}
</script>
<style scoped>
div{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content:center;
    width: 100vw;
    height: 100vh;
}

form{
    width: 80%;
    padding: 0 20px;
}
.input-box {
    margin: 10px 0;
    position: relative;
    padding: 10px 0;
    height: 100px;
    width: 100%;
}

.input-box > label {
    display: block;
    font-size: 13px;
    text-align: left;
    margin-left: 10px;
    margin-bottom: 10px;
    width: 100%;
    font-weight: bold;
}

.input-box > input{
    background-color: #e4f7f4;
    padding: 10px;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    width: 100%;
    color: #163530;
    margin: 5px 0;
    transition: all 0.5s;
    height: 40px;
}

.input-box > input::placeholder {
    color: #bad1cc;
    font-size: 15px;
}

button{
    background-color: #2fdab8;
    border-radius: 25px;
    color: white;
    padding: 10px 15px;
    width: 100%;
    font-size: 18px;
}

input.active, input.complete{
    background-color: #fff;
    border: 1px solid #2fdab8;
    box-shadow: 0px 0px 0px 3px rgb(41 183 154 / 38%);
}

input.error{
    background-color: white;
    border: 1px solid red;
    box-shadow: 0px 0px 0px 3px #ff5050ab;
}
</style>