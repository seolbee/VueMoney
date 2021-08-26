<template>
    <canvas ref="canvas" width="200" height="200"></canvas>
</template>
<script>
export default {
    props:['usage_total', 'total'],
    data(){
        return {
            ctx : null,
            percent: 60,
            t : null
        }
    },
    methods: {
        drawGraph(c){
            this.ctx.beginPath();
            this.ctx.fillStyle="#f7fafc";
            this.ctx.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, this.$refs.canvas.width * 0.4, -Math.PI / 2, Math.PI * 3/2);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle="#5be7c4";
            this.ctx.moveTo(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2);
            this.ctx.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, this.$refs.canvas.width * 0.4, -Math.PI / 2, -Math.PI / 2 + (c *Math.PI * 2 / 100));
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.beginPath();
            this.ctx.fillStyle="#fafcfe";
            this.ctx.arc(this.$refs.canvas.width / 2, this.$refs.canvas.height / 2, this.$refs.canvas.width * 0.3, -Math.PI / 2, Math.PI * 3/2);
            this.ctx.closePath();
            this.ctx.fill();

            this.ctx.fillStyle="#5be7c4";
            this.ctx.font = "30px Arial";
            this.ctx.textAlign="center";
            this.ctx.textBaseline="middle";
            this.ctx.fillText(`${Math.ceil(this.percent)}%`, this.$refs.canvas.width / 2, this.$refs.canvas.height / 2);
        },
        animateGraph(){
            let c = 0;
            clearInterval(this.t);
            this.t = setInterval(()=>{
                c += this.percent / (2000/100);
                if(c >= this.percent){
                    c = this.percent;
                    clearInterval(this.t);
                }
                this.ctx.clearRect(0,0,this.$refs.canvas.width, this.$refs.canvas.height);
                this.drawGraph(c);
                // if(this.$refs.canvas.width == this.$refs.canvas.height){
                //     this.circleGraph(c);
                // } else{
                //     this.blockGraph(c);
                // }
            }, 2000/100)
        }
    },
    mounted(){
        this.ctx = this.$refs.canvas.getContext('2d');
        this.percent = this.usage_total / this.total * 100;
        // this.drawGraph();
        this.animateGraph();
    } 
}
</script>
<style scoped>

</style>