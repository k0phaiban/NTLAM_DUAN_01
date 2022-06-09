<template>
    <div>
        <cc-popup 
            v-model="value"
            :width="900"
            title="Thông tin thư mục"
            @close="close">
            <div class="preview">
                <iframe class="iframe-preview"  :src="src"></iframe>
            </div>
        </cc-popup>
    </div>
</template>
<script>
import FileAPI from '@/api/Components/FileAPI.js';
export default {
    props: {
        value:{
            type: [String,Boolean],
            default: false
        },
        src: {
            type: String,
            default: null
        }
    },
    data(){
        return{
            loading: false
        }
    },
    methods: {
        close(){
            this.$emit("input",false);
        },
    }
}
</script>
<style lang="scss" scoped>
.preview{
    height: 500px;
    .iframe-preview{
        width: 100%;
        height: 100%;
    }
}
</style>