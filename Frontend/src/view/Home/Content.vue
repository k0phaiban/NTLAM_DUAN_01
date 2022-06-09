<template>
    <div>
        <cc-popup 
            v-model="value"
            :width="500"
            title="Chọn file"
            @close="close">
            <div class="content">
                <div class="chose-file" v-if="type = 1">
                    {{content}}
                </div>
                <img v-if="type = 2" class="image" src="content">
            </div>
        </cc-popup>
    </div>
</template>
<script>
export default {
    props: {
        value:{
            type: [String,Boolean],
            default: false
        },
        content: {
            type: Array,
            default: () => []
        },
        type:{
            type: Number,
            default: 1
        }
    },
    data(){
        return{
            file: []
        }
    },
    methods: {
        close(){
            this.$emit('input', false);
        },
    }
}
</script>
<style lang="scss" scoped>
.chose-file{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.footer{
    float: right;
}
.content{
    overflow: auto;
}
</style>