<template>
    <div>
        <navbar></navbar>
        <sidebar></sidebar>
        <div class="cc-body">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import navbar from "./navbar";
import sidebar from "./sidebar";
export default {
    components: {
        navbar,
        sidebar
    }
}
</script>
<style lang="scss" scoped>
.cc-body{
    position: absolute;
    top: 60px;
    left: 220px;
    bottom: 0px;
    right: 0px;
    padding: 16px 24px 24px 24px;
    background-color: #F5F5F5;
    overflow: auto;
}
</style>