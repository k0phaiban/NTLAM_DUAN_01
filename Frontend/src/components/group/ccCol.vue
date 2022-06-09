<template>
    <div class="cc-col flex align-center"
        :style="{'width': w + '%'}"
    >
        <slot></slot>
    </div>
</template>
<script>
export default {
    props: {
        w: {
            Type: [String,Number],
            default: 1
        }
    },
    data() {
        return{
            
        }
    },
    watch: {

    },
    methods: {

    }
}
</script>
<style lang="scss" scoped>
.cc-col{
    font-size: 14px;
}
</style>