<template>
    <div class="body-organization-unit">
        <sidebar :type="3" :dataSourceFile="listFolder"  :value="folderSelected.FileID" @selectedFile="selectedFolder" @quickSearch="quickSearch"></sidebar>
        <div class="body-content">
            <div class="header flex">
                <div class="flex">
                    <div class="tilte" :title="folderSelected.FileName">{{folderSelected.FileName}}</div>
                </div>
                <div class="flex">
                    <cc-input class="m-r-12" width="200px" icon="icon-search" placeholderInput="Tìm kiếm tài liệu"></cc-input>
                    <cc-organization-unit width="250px" class="m-r-12" v-model="organizationUnitID" @selected="selectOrg"></cc-organization-unit>
                    <cc-button type="primary m-r-12" icon="icon-plus-white" @click="openAddFile">Tải tệp</cc-button>
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
                <cc-loading v-show="loading" width="40"></cc-loading>
            </div>
            <div class="content" v-if="typeshow == 1">
                <div v-for="(item,index) in dataSource" :key="index" class="item">
                    <div class="item-folder" @click="showPreviewFile(item)">
                        <div class="flex btn-hover">
                            <cc-icon class="btn-none m-r-12" type="circle" icon="icon-export"></cc-icon>
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
                            {{item.Size}}
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
                    @clickDelete="confirmDelete">
                </ccTable>
            </div>
        </div>
        <AddFolder 
            v-if="activeAddFolder"  
            @save="afterSave" 
            v-model="activeAddFolder" 
            :listFolder="listFolder"
            :organizationUnitID="organizationUnitID"
            :organizationUnitNam="organizationUnitName">
        </AddFolder>
        <PopupUploadFile 
            v-if="activePopup" 
            v-model="activePopup" 
            @save="afterSave" 
            :listFolder="listFolder" 
            :organizationUnitID="organizationUnitID"
            :organizationUnitNam="organizationUnitName">
        </PopupUploadFile>
        <PopupShowFile v-if="showFind" v-model="showFind"></PopupShowFile>
    </div>
</template>
<script>
import sidebar from "../../layout/sidebar";
import FileAPI from '@/api/Components/FileAPI.js';
import AddFolder from "./AddFolder";
import PopupUploadFile from "./PopupUploadFile";
import OrganizationUnitAPI from "@/api/Components/OrganizationUnitAPI.js";
import PopupShowFile from './PopupShowFile.vue';
export default {
    components: {
        sidebar,
        AddFolder,
        PopupUploadFile,
        PopupShowFile
    },
    data(){
        return{
            typeshow: 1,
            dataSource: [],
            listHeader: [
                {
                    DataField: "FileName",
                    Caption: "Tên tệp",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "OrganizationUnitName",
                    Caption: "Đơn vị",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "CreatedBy",
                    Caption: "Người tạo",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "CreatedDate",
                    Caption: "Ngày tạo",
                    DataTyle: "date",
                    MinWidth: 150
                },
                {
                    DataField: "TypeFile",
                    Caption: "Loại file",
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
            activeAddFolder: false,
            listFolder: [],
            activePopup: false,
            organizationUnitID: null,
            organizationUnitName: null,
            loading: false,
            listOrg: [],
            listData: [],
            folderSelected: {
                FileID: 0,
                FileName: "Tất cả"
            },
            showFind: false
        }
    },
    watch: {
        organizationUnitID: {
            handler(val){
                this.getFilePersonal();
            }
        }
    },
    created(){
        var check = this.$checkPermission.checkPermission("OrganizationUnit", "View", this);
        if(!check){
            this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
            this.$router.push("/home/personal");
        }
        this.getAllOrg();
        this.getFilePersonal();
    },
    methods: {
        getFilePersonal(){
            var me = this;
            let param = {
                TenantID: this.$store.getters.tenantID,
                EmployeeID: this.$store.getters.employeeID,
                OrganizationUnitID: this.organizationUnitID
            }
            this.loading = true;
            FileAPI.GetPersonal(param).then(res => {
                this.loading = false;
                if(res.data && res.data.Success){
                    me.listData = res.data.Data;
                    me.dataSource = me.listData.filter(x => x.ParentID == me.folderSelected.FileID);
                    me.listFolder = me.listData.filter(x => x.TypeFile == "Folder");
                }
            });
        },
        selectOrg(val){
            this.organizationUnitID = val.OrganizationUnitID;
            this.organizationUnitName = val.OrganizationUnitName;
        },
        openAddFile(){
            var check = this.$checkPermission.checkPermission("OrganizationUnit", "Add", this);
            if(!check){
                this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
                return;
            }
            this.activePopup = true;
        },
        openAddFolder(){
            var check = this.$checkPermission.checkPermission("OrganizationUnit", "Add", this);
            if(!check){
                this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
                return;
            }
            this.activeAddFolder = true;
        },
        afterSave(){
            this.activePopup = false;
            this.activeAddFolder = false;
            this.getFilePersonal();
        },
        async getAllOrg(){
            var res = await OrganizationUnitAPI.GetAll();
            if(res.data && res.data.Success){
                this.listOrg = res.data.Data;
                this.organizationUnitID = this.listOrg[0].OrganizationUnitID;
                this.organizationUnitName = this.listOrg[0].OrganizationUnitName;
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
            if(item.TypeFileEnum == 0){
                this.folderSelected = item;
                this.dataSource = this.listData.filter(x => x.ParentID == this.folderSelected.FileID);
            }
            else{
                this.srcLink = item.Path;
                this.showPreview = true;
            }
        },
        selectedFolder(val){
            if(val == null){
                this.folderSelected = {
                    FileID: 0,
                    FileName: "Tất cả"
                }
                this.dataSource = this.listData.filter(x => x.ParentID == 0);
            }
            else{
                this.folderSelected = val;
                this.dataSource = this.listData.filter(x => x.ParentID == val.FileID);
            }
        },
        quickSearch(val){
            if(!val){
                this.folderSelected = {
                    FileID: 0,
                    FileName: "Tất cả"
                }
                this.dataSource = this.listData.filter(x => x.ParentID == 0);
            }
        },
        confirmDelete(data){
            var check = this.$checkPermission.checkPermission("OrganizationUnit", "Delete", this);
            if(!check){
                this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
                return;
            }
            this.$popup.confirmDelete("Xóa thư mục", "Bạn có chắc chắn muốn xóa thư mục <strong>" + data.FileName + "</strong> không?",this.deleteFile,data)
        },
        openFilter() {
            this.showFind = true;
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var-color.scss';
.body-organization-unit{
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
                width: 180px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                cursor: pointer;
            }
        }
        .content{
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