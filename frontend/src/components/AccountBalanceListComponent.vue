<template>
    <div>
        <navigator></navigator>
    </div>
</template>
<script>
import navigator from '@/components/section/NavigatorComponent';
export default {
    props:['data'],
    components:{
        'navigator' : navigator
    },
    mounted(){

    }
}
</script>
<style scoped>

</style>