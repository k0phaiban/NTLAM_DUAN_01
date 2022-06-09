<template>
    <div class="body-personal">
        <div class="body-content">
            <div class="header flex">
                <div class="flex">
                    <div class="tilte">Đơn vị hiện tại</div>
                </div>
                <div class="flex">
                    <cc-input class="m-r-12" width="200px" icon="icon-search" placeholderInput="Tìm kiếm tài liệu"></cc-input>
                    <cc-button type="primary m-r-12" icon="icon-plus-white" @click="openAddFile">Tải tệp</cc-button>
                    <input type="file" ref="file" style="display: none" @change="choseFile">
                    <cc-button type="primary m-r-12" icon="icon-plus-white" @click="openAddFolder">Tạo thư mục</cc-button>
                    <cc-icon type="primary-border m-r-12" icon="icon-filter" @handleClick="openFilter()"></cc-icon>
                    <div class="flex type">
                        <div class="type-show" :class="[{'active': typeshow == 1}]" @click="typeshow = 1">
                            <div class="icon-list-block"></div>
                        </div>
                        <div class="type-show" :class="[{'active': typeshow == 2}]" @click="typeshow = 2">
                            <div class="icon-list-dote"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content" v-if="typeshow == 1">
                <div v-for="(item,index) in dataSource" :key="index" class="item">
                    <div class="item-folder" @click="showPreviewFile(item)">
                        <div class="flex btn-hover">
                            <cc-icon class="btn-none m-r-8" type="circle" icon="icon-export" @handleClick="downloadFile(item)"></cc-icon>
                            <cc-icon class="btn-none" type="circle" icon="icon-delete" @handleClick="confirmDelete(item)"></cc-icon>
                        </div>
                        <div class="flex justify-center m-b-16">
                            <img v-if="item.TypeFile == 'Folder'" class="img-folder" src="@/assets/image/icon-file.png"/>
                            <img v-if="item.TypeFile == 'Word'" class="img-folder" src="@/assets/image/icon-word.png"/>
                            <img v-if="item.TypeFile == 'Excel'" class="img-folder" src="@/assets/image/icon-excel.png"/>
                            <img v-if="item.TypeFile == 'Pdf'" class="img-folder" src="@/assets/image/icon-pdf.png"/>
                        </div>
                        <div class="flex justify-center text-center">
                            <span class="overflow" :title="item.FileName">{{item.FileName}}</span>
                        </div>
                        <div class="flex justify-center text-secondary">
                            {{item.Size}}(kb)
                        </div>
                        <div class="flex justify-center text-secondary">
                            {{formatDate(item.CreatedDate)}}
                        </div>
                    </div>
                </div>
                <cc-loading v-show="loading" width="40"></cc-loading>
            </div>
            <div class="content-list" v-if="typeshow == 2">
                <ccTable 
                    :listHeader="listHeader" 
                    :dataSource="dataSource"
                    @clickEdit="openEdit"
                    @clickDelete="confirmDelete"
                    @clickDownload="downloadFile">
                    <template #CreatedDate="{data}">
                        {{formatDate(data.CreatedDate)}}
                    </template>
                </ccTable>
                <cc-loading v-show="loading" width="40"></cc-loading>
            </div>
        </div>
        <PopupUploadFile 
            v-if="activePopup" 
            v-model="activePopup" 
            @save="afterSave" 
            :listFolder="listFolder" 
            :organizationUnitID="organizationUnitID"
            :organizationUnitNam="organizationUnitName">
        </PopupUploadFile>
        <AddFolder v-if="activeAddFolder"  @save="afterSave" v-model="activeAddFolder" :listFolder="listFolder"></AddFolder>
        <Preview v-if="showPreview" v-model="showPreview" :src="srcLink"></Preview>
        <PopupShowFile v-if="showFind" v-model="showFind"></PopupShowFile>
    </div>
</template>
<script>
import PopupUploadFile from "./PopupUploadFile.vue";
import AddFolder from "../../Personal/AddFolder.vue";
import FileAPI from '@/api/Components/FileAPI.js';
import Preview from '../../Base/Preview.vue';
import PopupShowFile from './PopupShowFile.vue';
export default {
    components: {
        PopupUploadFile,
        AddFolder,
        Preview,
        PopupShowFile
    },
    data(){
        return{
            typeshow: 1,
            listHeader: [
                {
                    DataField: "FileName",
                    Alignment: "left",
                    Caption: "Tên tệp",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "CreatedDate",
                    Caption: "Ngày tạo",
                    Alignment: "center",
                    DataTyle: "date",
                    MinWidth: 150
                },
                {
                    DataField: "TypeFile",
                    Caption: "Loại file",
                    Alignment: "center",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "Note",
                    Caption: "Ghi chú",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "Size",
                    Caption: "Kích thước",
                    DataTyle: "text",
                    MinWidth: 150
                },
            ],
            listFolder: [],
            dataSource: [],
            activePopup: false,
            fileName: null,
            size: null,
            fileResponse: null,
            activeAddFolder: false,
            loading: false,
            srcLink: null,
            showPreview: false,
            showFind: false
        }
    },
    created(){
        this.getFilePersonal();
    },
    methods: {
        uploadFile(){
            this.$refs.file.click();
        },
        openAddFile(){
            this.activePopup = true;
        },
        openAddFolder(){
            this.activeAddFolder = true;
        },
        choseFile(event){
            let fd = new FormData();
            fd.append('file',event.target.files[0])
            this.file = fd;
            this.fileName = event.target.files[0].name;
            this.size = event.target.files[0].size + "kb";
            let me = this;
            FileAPI.UploadFile(this.file).then(res => {
                if(res.data && res.data.Success){
                    me.fileResponse = res.data.Data;
                    me.activePopup = true;
                }
            }).catch(e => {});
        },
        getFilePersonal(){
            var me = this;
            let param = {
                TenantID: this.$store.getters.tenantID,
                EmployeeID: this.$store.getters.employeeID
            }
            this.loading = true;
            FileAPI.GetPersonal(param).then(res => {
                this.loading = false;
                if(res.data && res.data.Success){
                    me.dataSource = res.data.Data;
                    me.listFolder = me.dataSource.filter(x => x.TypeFile == "Folder");
                }
            });
        },
        afterSave(){
            this.activePopup = false;
            this.activeAddFolder = false;
            this.getFilePersonal();
        },
        downloadFile(data){
            window.location.assign(data.Path);
        },
        confirmDelete(data){
            this.$popup.confirmDelete("Xóa thư mục", "Bạn có chắc chắn muốn xóa thư mục <strong>" + data.FileName + "</strong> không?",this.deleteFile,data)
        },
        async deleteFile(data){
            var me = this;
            var res = await FileAPI.Delete(data.FileID);
            if(res.data && res.data.Success){
                me.getFilePersonal();
            }
            else{

            }
        },
        formatDate(date){
            var todayTime = new Date(date);
            var month = todayTime.getMonth() + 1;
            var day = todayTime.getDate();
            var year = todayTime.getFullYear();
            return month + "/" + day + "/" + year;
        },
        showPreviewFile(item){
            this.srcLink = item.Path;
            this.showPreview = true;
        },
        openFilter() {
            this.showFind = true;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var-color.scss';
.body-personal{
    width: 100%;
    height: 100%;
    .body-content{
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 233px;
        padding: 0 24px 24px 24px;
        .header{
            display: flex;
            align-items: center;
            
            padding: 12px 0px;
            justify-content: space-between;
            .tilte{
                font-weight: 500;
                font-size: 18px;
            }
        }
        .content{
            position: relative;
            display: flex;
            flex-wrap: wrap;
            height: calc(100% - 68px);
            overflow: auto;
            .item{
                .item-folder{
                    padding: 16px;
                    width: 180px;
                    height: auto;
                    background-color: #ffffff;
                    margin: 0 24px 24px 0;
                    border-radius: 8px;
                    border: 1px solid #ffffff;
                    .img-folder{
                        width: 100px;
                        height: 80px;
                    }
                    .btn-hover{
                        height: 36px;
                        margin-bottom: 4px;
                        justify-content: flex-end;
                        .btn-none{
                            display: none;
                            float: right;
                        }
                    }
                    &:hover{
                        border: 1px solid $primary-hover;
                        cursor: pointer;
                        .btn-none{
                            display: flex !important;
                            float: right;
                        }
                    }
                }
            }
        }
    }
    .content-list{
        position: relative;
        display: flex;
        flex-wrap: wrap;
        height: calc(100% - 68px) !important;
        height: auto;
        overflow: auto;
        .item{
            height: 48px;
            margin: 0px 8px 4px 0px;
            .item-folder-list{
                align-items: center;
                width: 480px;
                height: 48px;
                padding: 0 8px;
                border-radius: 4px;
                background-color: #ffffff;
                border: 1px solid #ffffff;
                .img-folder{
                    width: 28px;
                    height: 28px;
                }
                .text-name{
                    width: 200px;
                    text-overflow: ellipsis;
                    justify-content: left;
                }
                &:hover{
                    border: 1px solid $primary-hover;
                    background-color: #d7e2ff !important;
                    cursor: pointer;
                    .btn-none{
                        display: flex !important;
                        float: right;
                    }
                }
            }
        }
    }
    .type{
        border-radius: 4px;
        background-color: #c1c1c1;
        .active{
            background-color: #ffffff;
        }
    }
    .type-show{
        width: 36px;
        height: 36px;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .overflow{
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>