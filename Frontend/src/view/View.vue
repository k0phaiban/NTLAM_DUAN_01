<template>
    <div>
        <navbar></navbar>
        <div class="body">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import navbar from '../layout/navbar/index';
export default {
    components: {
        navbar
    }
}
</script>
<style lang="scss" scoped>
.body{
    padding: 0px;
    position: absolute;
    top: 60px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: #f5f5f5;
  }
</style>