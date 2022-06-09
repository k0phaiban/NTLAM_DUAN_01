<template>
    <div>
        <button
            :class="['btn-common','btn-' + type]"
            @click="handleClick"
        >
            <div :class="icon"></div>
        </button>
    </div>
</template>
<script>
export default {
    name: 'ccButton',
    props: {
        type: {
            Type: String,
            default: "primary"
        },
        icon: {
            Type: String,
            default: "add-white"
        }
    },
    methods: {
        handleClick(){
            this.$emit("handleClick");
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var-color.scss';
.btn-common{
    height: 36px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center; 
    border-radius: 4px;
    outline: none;
    width: 36px;
    cursor: pointer;
}
.btn-circle{
    color: #ffffff;
    background-color: #ffffff;
    border: none;
    border-radius: 50px;
    &:hover{
        background-color: #f1f1f1;
    }
    &:active{
        background-color: #f1f1f1;
    }
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
.btn-primary-border{
    color: #ffffff;
    background-color: #ffffff;
    border: 1px solid #DDDDDD;
    &:hover{
        border: 1px solid $primary;
    }
    &:active{
        border: 1px solid $primary;
    }
}
</style>
