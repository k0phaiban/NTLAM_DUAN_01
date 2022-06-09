<template>
    <div>
        <DxCheckBox
            :text="text"
            :disabled="disabled"
            v-model="valueX"
            @valueChanged="valueChanged"
        />
    </div>
</template>
<script>
import 'devextreme/dist/css/dx.light.css';
import DxCheckBox from 'devextreme-vue/check-box';
export default {
    components: {
        DxCheckBox
    },
    props: {
        value: {
            type: Boolean,
            default: false
        },
        text: {
            type: String,
            default: null
        },
        disabled: {
            type: [String, Boolean],
            default: false
        }
    },
    data() {
        return {
            checkBoxValue: null,
            valueX: false
        };
    },
    watch: {
        value: {
            handler(val){
                this.valueX = val;
            },
            immediate: true
        }
    },
    methods: {
        valueChanged(e){
            this.$emit("input", this.value);
            this.$emit("changed", this.value);
        }
    }
}
</script>
<style lang="scss">
.dx-checkbox-icon {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}
.dx-checkbox{
    width: 100%;
    margin-right: 8px;

}
</style>