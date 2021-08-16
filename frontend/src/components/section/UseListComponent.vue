<template>
    <div>
        <h1>사용 내역</h1>
        <div class="use_list">
            <div class="use">
                <img src="../../assets/icons/burger.png" alt="img" class="icon"/>
                <p>식/음료</p>
                <p>2,000원</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    .use_list{
        display:grid;
        grid-auto-rows: 70px;
        margin: 10px 0;
    }

    .use{
        display: grid;
        grid-template-columns: 15% 35% 40%;
        line-height: 50px;
        gap:10px;
        padding: 10px;
        border-bottom: 1px solid #eef;
    }

    .use > img{
        width: 100%;
    }

    .use > p{
        text-align: center;
        font-size: 16px;
    }
</style>