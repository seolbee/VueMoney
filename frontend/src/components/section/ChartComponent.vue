<template>
    <canvas ref="canvas" width="200" height="200"></canvas>
</template>
<script>
export default {
    props:['usage_total', 'total'],
    data(){
        return {
            ctx : null,
            percent: 60
        }
    },
    methods: {
        drawGraph(){
            this.ctx.beginPath();
            this.ctx.fillStyle="#fbfcff";
            this.ctx.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, this.$refs.canvas.width * 0.4, -Math.PI / 2, Math.PI * 3/2);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle="#5be7c4";
            this.ctx.moveTo(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2);
            this.ctx.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, this.$refs.canvas.width * 0.4, -Math.PI / 2, -Math.PI / 2 + (this.percent *Math.PI * 2 / 100));
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle="#fff";
            this.ctx.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, this.$refs.canvas.width * 0.3, -Math.PI / 2, Math.PI * 3/2);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.fillStyle="#5be7c4";
            this.ctx.font = "30px Arial";
            this.ctx.textAlign="center";
            this.ctx.textBaseline="middle";
            this.ctx.fillText(`${Math.ceil(this.percent)}%`, this.$refs.canvas.width / 2, this.$refs.canvas.height / 2);
        }
    },
    mounted(){
        this.ctx = this.$refs.canvas.getContext('2d');
        this.percent = this.usage_total / this.total * 100;
        this.drawGraph();
    } 
}
</script>
<style scoped>

</style>