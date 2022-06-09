<template>
    <div>
        <DxPopup
            class="popup-base"
            :visible="value"
            :drag-enabled="false"
            :close-on-outside-click="false"
            :show-title="true"
            :width="width"
            :height="height"
            :title="title"
            @hidden="closePopup"
        >
            <div class="content-popup">
                <slot></slot>
            </div>
        </DxPopup>
    </div>
</template>
<script>
import { DxPopup } from 'devextreme-vue/popup';
export default {
    components: {
        DxPopup
    },
    props: {
        value: {
            type: [String,Boolean],
            default: false
        },
        title: {
            type: String,
            default: ""
        },
        width: {
            type: [Number,String],
            default: 400
        },
        height: {
            type: [Number,String],
            default: "auto"
        },
    },
    methods: {
        closePopup(){
            this.$emit('input', false);
            this.$emit('close',false);
        }
    }
}
</script>
<style lang="scss">
.dx-overlay-shader{
    background-color: rgba(128,128,128,.5) !important;
}
.dx-popup-title{
    padding: 16px 24px;
    font-weight: 500;
    font-size: 20px;
}
.dx-popup-flex-height .dx-popup-content{
    font-size: 16px;
    padding: 8px;
}
.content-popup{
    padding: 4px 16px 4px 16px;
}
.dx-popup-wrapper .dx-state-focused.dx-overlay-content{
    border: none !important;
}
</style>