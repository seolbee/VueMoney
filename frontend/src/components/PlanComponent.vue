<template>
    <div>
        <calendar></calendar>
        <navigator></navigator>
    </div>
</template>
<script>
import CalendarComponent from '@/components/section/CalendarComponent';
import navigator from '@/components/section/NavigatorComponent';
export default {
    components : {
        'calendar':CalendarComponent,
        'navigator':navigator
    }
}
</script>
<style scoped>

</style>