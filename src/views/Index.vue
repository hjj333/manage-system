<template>
    <div class="index">
        <Head></Head>
        <Left></Left>
        <div class="rightContainer">
          <router-view></router-view>
        </div>
    </div>
</template>
<script>
import Head from '../components/Head'
import Left from '../components/Left'
export default {
    components: {
        Head,
        Left
    }
}
</script>
<style>
.index {
    width: 100%;
    height: 100%;
}
.rightContainer {
    position: relative;
    top: 0;
    left: 180px;
    width: calc(100% - 180px);
    height: 100%;
    overflow: auto;
}
</style>
