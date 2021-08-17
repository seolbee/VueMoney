<template>
    <div class="use_list">
        <div class="use">
            <img src="../../assets/icons/burger.png" alt="img" class="icon"/>
            <p>식/음료</p>
            <p>20,000원</p>
        </div>
        <div class="use">
            <img src="../../assets/icons/millennial.png" alt="img" class="icon"/>
            <p>여가/문화</p>
            <p>10,000원</p>
        </div>
        <div class="use">
            <img src="../../assets/icons/pencil.png" alt="img" class="icon"/>
            <p>문구</p>
            <p>400원</p>
        </div>
        <div class="use">
            <img src="../../assets/icons/toys.png" alt="img" class="icon"/>
            <p>완구</p>
            <p>12,000원</p>
        </div>
        <div class="use">
            <img src="../../assets/icons/wardrobe.png" alt="img" class="icon"/>
            <p>의류</p>
            <p>12,000원</p>
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
        padding: 20px;
        height: 420px;
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
        width: 90%;
    }

    .use > p{
        text-align: center;
        font-size: 16px;
    }
</style>