<template>
    <div class="cc-button">
        <button
            :class="['btn-common','btn-' + type,{'btn-icon': icon != null}]"
            @click="handleClick"
        >
            <div v-if="icon != null" :class="[icon, 'm-r-8']"></div>
            <slot v-show="!loading"></slot>
            <cc-loading v-show="loading" bdTopColor="#ffffff"></cc-loading>
        </button>
    </div>
</template>
<script>
import ccLoading from '../loading/ccLoading.vue';
export default {
  components: { ccLoading },
    name: 'ccButton',
    props: {
        type: {
            Type: String,
            default: "primary"
        },
        icon: {
            Type: String,
            default: null
        },
        loading: {
            type: [String,Boolean],
            default: false
        },
    },
    methods: {
        handleClick(){
            this.$emit("click");
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var-color.scss';
.cc-button{
    position: relative;
}
.btn-common{
    position: relative;
    height: 36px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: center; 
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    outline: none;
    min-width: 80px;
    width: auto;
    cursor: pointer;
}
.btn-icon{
    padding: 0 12px !important;
}
.btn-primary{
    color: #ffffff;
    background-color: $primary;
    border: none;
    &:hover{
        background-color: $primary-hover;
    }
    &:active{
        background-color: $primary-active;
    }
}
.btn-secondary{
    color: #000000;
    background-color: #ffffff;
    border: none;
    &:hover{
        background-color: #e0e0e0;
    }
    &:active{
        background-color: #d0d0d0;
    }
}
.btn-secondary-border{
    color: #000000;
    background-color: #ffffff;
    border: 1px solid #e0e0e0;
    &:hover{
        border: 1px solid #e0e0e0;
        background-color: #e0e0e0;
    }
    &:active{
        border: 1px solid #d0d0d0;
        background-color: #d0d0d0;
    }
}
.btn-delete{
    color: #ffffff;
    background-color: #ff1212;
    border: none;
    &:hover{
        background-color: #fa6161;
    }
    &:active{
        background-color: #ff0000;
    }
}
.btn-primary-border{
    color: #000000;
    background-color: #ffffff;
    border: 1px solid $primary;
    color:$primary;
    &:hover{
        background-color: #d6ecff;
    }
    &:active{
        background-color:#cae6ff;
    }
}
</style>
