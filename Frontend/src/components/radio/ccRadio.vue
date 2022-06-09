<template>
    <div>
        <DxRadioGroup
            :items="dataSource"
            :value="value"
            :layout="layout"
            @valueChanged="changeValue"
          />
    </div>
</template>
<script>
import DxRadioGroup from 'devextreme-vue/radio-group';
export default {
    components: {
        DxRadioGroup
    },
    props: {
        value: {
            type: [String,Number],
            default: null
        },
        dataSource: {
            type: Array,
            default: () => []
        },
        layout: {
            type: String,
            default: "horizontal"
        }
    },
    methods: {
        changeValue(e){
            this.$emit("input", e.value);
            this.$emit("changed", e.value);
        }
    }
}
</script>
<style lang="scss">

</style>