<template>
    <div>
        <cc-popup 
            v-model="value"
            :width="500"
            title="Chọn file"
            @close="close">
            <div class="chose-file">
                <input type="file" @change="previewFiles">
            </div>
            <div class="footer">
                <cc-button type="primary" @click="uploadFile">Tải lên</cc-button>
            </div>
        </cc-popup>
    </div>
</template>
<script>
import FileUpload from '@/api/FileUpload.js';
export default {
    props: {
        value:{
            type: [String,Boolean],
            default: false
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
        previewFiles(event) {
            let fd = new FormData();
            fd.append('file',event.target.files[0])
            this.file = fd;
        },
        uploadFile(){
            let me = this;
            FileUpload.Upload(this.file).then(res => {
                me.$emit("input", false);
                me.$emit("close", false);
            }).catch(e => {});
        }
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
</style>