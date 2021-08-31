<template>
    <div>
        <h1>회원가입</h1>
        
        <form @submit.prevent="register" method="post" ref="form">
            <div class="input-box">
                <label for="#">아이디</label>
                <input type="text" name="id" v-model="user.id" :class="{'active' : active == 1, 'error' : is_user.id == -1, 'complete' : is_user.id == 1}" @focus="focusing(1)" @blur="nonfocusing">
                <p v-show="is_user.id == -1">아이디는 최소 5자 최대 10자 입니다.</p>
            </div>
            <div class="input-box">
                <label for="#">이름</label>
                <input type="text" name="text" v-model="user.name" :class="{'active' : active == 2, 'error' : is_user.name == -1, 'complete' : is_user.name == 1}" @focus="focusing(2)" @blur="nonfocusing">
                <p v-show="is_user.name == -1">이름은 최소 2자에서 최대 10자입니다.</p>
            </div>
            <div class="input-box">
                <label for="#">비밀번호</label>
                <input type="password" name="password" v-model="user.password" :class="{'active' : active == 3, 'error' : is_user.password == -1, 'complete' : is_user.password == 1}" @focus="focusing(3)" @blur="nonfocusing">
                <p v-show="is_user.password == -1">비밀번호는 최소 5자입니다.</p>
            </div>
            <div class="input-box">
                <label for="#">비밀번호 확인</label>
                <input type="password" name="password_confirm" v-model="user.passwordc" :class="{'active' : active == 4, 'error' : is_user.passwordc == -1, 'complete' : is_user.passwordc == 1}" @focus="focusing(4)" @blur="nonfocusing">
                <p v-show="is_user.passwordc == -1">비밀번호 확인은 비밀번호와 같아야 합니다.</p>
            </div>
            <button class="btn">회원가입</button>
        </form>
        <toast :show="show" :msg="msg"/>
    </div>
</template>
<script>
import ToastMsg from '@/components/section/ToastMessageComponent';
import axios from 'axios';
export default {
    components : {
        'toast' : ToastMsg
    },
    data(){
        return {
            user : {
                id : '',
                name: '',
                password : '',
                passwordc: '',
                seqno:'1100773662',
                acctoken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzczNjYyIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MzYxODMxNzMsImp0aSI6IjgwN2ZlZGRlLTA1NDAtNDllZC1hZTlhLTA2YzM3YmYwMjJiZiJ9.zzZ6Bh0FOHkw0cMVNzpkBFIM7gwNHe6m5aT02J0Cq8A',
                reftoken : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzczNjYyIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MzYzNzg3MDAsImp0aSI6IjliZDdiZTkxLTkxMWItNDAzYy1hYmIyLWM1N2M0NWU4ZjE3MiJ9.qvuS6SYXXDHANTnTc4a7G07puBonXSPrYVjUO_Ud-xY'
            },
            is_user:{
                id: 0,
                name:0,
                password:0,
                passwordc:0
            },
            active:0,
            show:false,
            msg:''
        }
    },
    methods:{
        async register(){
            if(this.user.id.trim() === "" || this.user.name.trim() === "" || this.user.password.trim() === "" || this.user.passwordc.trim() === ""){
                this.is_user.id = -1;
                this.is_user.name = -1;
                this.is_user.password = -1;
                this.is_user.passwordc = -1;
            }
            if(this.is_user.id === -1 || this.is_user.name === -1 || this.is_user.password === -1 || this.is_user.passwordc === -1) {
                this.msg = "잘못 입력된 값이 있습니다. 확인해보세요";
                this.show = true;
                setTimeout(()=>this.show = false, 1500);
                return;
            };
            let res = await axios.post('/auth/register', this.user);
            this.msg = res.data.msg;
            this.show = true;
            setTimeout(()=> this.show = false, 1500);
            setTimeout(()=>{if(res.data.success) this.$router.push('login')}, 2000);
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
                let id_reg = new RegExp(/^[a-z0-9]{5,10}$/, "gi");
                if(this.active == 1 && id_reg.test(this.user.id.trim())) this.is_user.id = 1;
                else if(this.active == 1) this.is_user.id = -1;

                let name_reg = new RegExp(/^[a-z0-9ㄱ-횧]{1,10}$/, "gi");
                if(this.active == 2 && name_reg.test(this.user.name.trim())) this.is_user.name = 1;
                else if(this.active == 2) this.is_user.name = -1;

                if(this.active == 3 && this.user.password.trim().length >= 5) this.is_user.password = 1;
                else if(this.active == 3) this.is_user.password = -1;

                if(this.active == 4 && (this.user.passwordc.trim().length >= 5 && this.user.passwordc.trim() === this.user.password.trim()) ) this.is_user.passwordc = 1;
                else if(this.active == 4) this.is_user.passwordc = -1;
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
    /* padding: 0 0px; */
    width: 80%;
    padding: 0 20px;
}
.input-box {
    /* margin: 10px 0; */
    position: relative;
    /* padding: 10px 0; */
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
    box-shadow: 0px 0px 0px 3px #2fdab86e;
}

input.error{
    background-color: white;
    border: 1px solid red;
    box-shadow: 0px 0px 0px 3px rgba(255, 0, 0, 0.404);
}

.input-box > p{
    width: 100%;
    text-align:left;
    font-size: 14px;
    color: red;
    font-weight: bold;
}
</style>

//user_seq_no : 1100773662
//access_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzczNjYyIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MzU1MTQ3MDAsImp0aSI6IjI0MmMwNjk1LTNhYjMtNDFmMS1hYzdiLTkxNDEwNTVmMWJiMCJ9.OfVMMnes7dxD7inc1wBz85GDr0A_Abrd1SyGN0v2fnM
//refresh_token : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiIxMTAwNzczNjYyIiwic2NvcGUiOlsiaW5xdWlyeSIsImxvZ2luIiwidHJhbnNmZXIiXSwiaXNzIjoiaHR0cHM6Ly93d3cub3BlbmJhbmtpbmcub3Iua3IiLCJleHAiOjE2MzYzNzg3MDAsImp0aSI6IjliZDdiZTkxLTkxMWItNDAzYy1hYmIyLWM1N2M0NWU4ZjE3MiJ9.qvuS6SYXXDHANTnTc4a7G07puBonXSPrYVjUO_Ud-xY