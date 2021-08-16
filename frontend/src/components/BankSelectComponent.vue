<template>
    <div>
        <h3>은행을 선택해주세요</h3>
        <div class="bank_box">
            <template v-for="(bank, index) in banks" >
                <div class="bank" :key="index" @click="next(index)">
                    <img :src="require(`asset/logos/${bank.src}`)" alt="img" class="logo"/>
                    <p>{{bank.name}}</p>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            banks:[
                {
                    code:'002',
                    name:'KDB산업은행',
                    src:'kdb.png'
                },
                {
                    code:'003',
                    name:'IBK기업은행',
                    src:'ibk.png'
                },
                {
                    code:'004',
                    name:'KB국민은행',
                    src:'kb.png'
                }
            ]
        }
    },
    methods:{
        next(index){ 
            this.$router.push({name:'accno-page', params:{...this.banks[index]}});
        }
    }
}
</script>
<style scoped>
    div{
        padding: 30px 20px;
    }

    .bank_box {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-auto-rows: repeat(3, 1fr);
        gap: 20px;
        padding: 10px 0;
    }

    .bank_box > .bank{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgb(248,248,248);
        padding: 10px;
        border-radius: 10px;
        transition: all 0.5s;
    }

    .bank_box > .bank > img{
        width: 30%;
    }

    .bank_box > .bank > p{
        font-size: 14px;
        padding-top: 10px;
    }

    .bank:hover{
        background-color: rgb(230,230,230);
    }
</style>