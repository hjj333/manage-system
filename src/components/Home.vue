<template>
    <div class="home">
        <div class="container">
            <h1 class="title">前端vue</h1>
            <p class="lead">好好学习,天天向上</p>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.home {
    width: 100%;
    height: 100%;
    background: url('../assets/images/showcase.png') no-repeat
}
.container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding-top: 100px;
    background-color: rgba(0,0,0,0.7);
    text-align: center;
    color: white
}
.title {
    font-size: 30px;
}
.lead {
    margin-top: 50px;
    font-size: 22px;
}
</style>