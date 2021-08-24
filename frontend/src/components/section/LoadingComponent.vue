<template>
    <div class="loading">
        <font-awesome-icon icon="circle-notch" class='fa-spin'></font-awesome-icon>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
    .loading{
        position:absolute;
        width: 100%;
        height: 100vh;
        background-color: white;
        font-size: 60px;
        z-index: 3;
        border-radius: 30px;
        text-align: center;
        line-height: 80vh;
        color: #eee;
    }
</style>