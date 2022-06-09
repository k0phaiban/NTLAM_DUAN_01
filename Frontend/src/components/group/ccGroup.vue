<template>
    <div class="cc-group">
        <div class="header">
            <slot name="header">{{title}}</slot>
        </div>
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.cc-group{
    height: auto;
    padding: 24px;
    border-radius: 8px;
    background: #ffffff;
    .header{
        margin-bottom: 24px;
        font-weight: 500;
        font-size: 20px;
    }
}
</style>