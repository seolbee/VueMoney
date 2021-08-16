<template>
    <div>
        <h1>설정 페이지</h1>
        <router-link to="/register">회원가입</router-link>
        <router-link to="/login">로그인</router-link>
        <navigator></navigator>
    </div>
</template>
<script>
import navigator from '@/components/section/NavigatorComponent';
export default {
    components : {
        'navigator':navigator
    }
}
</script>
<style scoped>

</style>