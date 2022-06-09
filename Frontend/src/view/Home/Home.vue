<template>
    <div class="home">
        <div class="header">
            <div>
                <span class="title">Danh sách thư mục đã tải lên</span>
            </div>
            <div>
                <cc-button type="primary" @click="open = true">Upload File</cc-button>
            </div>
        </div>
        <div class="table">
            <cc-table
                :listHeader="listHeader"
                :dataSource="dataSource"

            >
                <template #Download="{data}">
                    <div class="custom" @click="download(data)">Tải xuống</div>
                </template>
                <template #Content="{data}">
                    <div class="custom" @click="openContentRow(data)">Nội dung</div>
                </template>
            </cc-table>
        </div>
        <UploadFile v-model="open" @close="getAllFile" :type="type"></UploadFile>
        <ContentFile v-model="openContent" :content="content"></ContentFile>
    </div>
</template>
<script>
import FileUpload from '@/api/FileUpload.js';
import UploadFile from "./UploadFile.vue";
import ContentFile from "./Content.vue";
export default {
    components:{
        UploadFile,
        ContentFile
    },
    data(){
        return{
            open: false,
            content: "",
            openContent: false,
            inputFile: null,
            listHeader: [
                {
                    dataField: "FileName",
                    caption: "Tên file"
                },
                {
                    dataField: "Type",
                    caption: "Loại file"
                },
                {
                    dataField: "Size",
                    caption: "Kích thước (byte)"
                },
                {
                    dataField: "Content",
                    caption: "Nội dung",
                    
                },
                {
                    dataField: "Download",
                    caption: "Tải file",
                    
                }
            ],
            dataSource: [],
            type: 1
        }
    },
    methods: {
        async getAllFile(){
            try{
                var res = await FileUpload.GetAll();
                if(res.data && res.data.Success){
                    this.dataSource = res.data.Data;
                }
            }
            catch(e){
                console.log(e);
            }
        },
        download(data){
            window.location.assign(data.Path);
        },
        openContentRow(data){
            /* if(data.Type == "JPG"){
                this.type = 2;
            }
            else if(data.Type == "XLSX"){
                this.type = 3;
            }
            else{
                this.type = 1;
            } */
            this.content = JSON.parse(data.Content);
            this.openContent = true;
        }
    },
    async created(){
        await this.getAllFile();
    }
}
</script>
<style lang="scss" scoped>
.home{
    height: 100%;
    .header{
        height: 40px;
        width: 100%;
        margin-bottom: 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .title{
            font-weight: 700;
            font-size: 20px;
        }
    }
    .table{
        height: calc(100% - 56px);
    }
}
.custom{
    font-style: italic;
    color: #0075FF;
    cursor: pointer;
}
</style>