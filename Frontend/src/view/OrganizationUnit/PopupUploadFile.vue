<template>
    <div>
        <cc-popup 
            v-model="value"
            :width="500"
            title="Thông tin tệp"
            @close="close">
            <cc-row>
                <cc-col w="40">
                    Chọn tệp từ
                </cc-col>
                <cc-col w="60">
                    <cc-radio :dataSource="optionFiles" v-model="optionValue" @changed="changeTypeChose"></cc-radio>
                </cc-col>
            </cc-row>
            <cc-row v-if="optionValue == 'Tải lên'">
                <cc-col w="40">
                    Chọn tệp
                </cc-col>
                <cc-col w="60">
                    <button class="btn-chose" @click="uploadChoseFile">Chọn tệp từ máy tính</button>
                    <input type="file" ref="file" style="display: none" @change="choseFile">
                </cc-col>
            </cc-row>
            <cc-row v-if="optionValue == 'Tải lên'">
                <cc-col w="40">
                    Tên tệp
                </cc-col>
                <cc-col w="60">
                    <cc-input v-model="file.FileName" :disabled="true"></cc-input>
                </cc-col>
            </cc-row>
            <cc-row v-if="optionValue == 'Cá nhân'">
                <cc-col w="40">
                    Chọn tệp
                </cc-col>
                <cc-col w="60">
                    <cc-select-box v-model="file.FileID" :dataSource="listFile"
                        displayField="FileName"
                        valueField="FileID"
                        @selected="selectedFile"></cc-select-box>
                </cc-col>
            </cc-row>
            <cc-row>
                <cc-col w="40">
                    Kích thước(kb)
                </cc-col>
                <cc-col w="60">
                    <cc-input v-model="file.Size" :disabled="true"></cc-input>
                </cc-col>
            </cc-row>
            <cc-row>
                <cc-col w="40">
                    Thư mục cha
                </cc-col>
                <cc-col w="60">
                    <cc-select-box v-model="file.ParentID"
                        :dataSource="listFolder"
                        displayField="FileName"
                        valueField="FileID"></cc-select-box>
                </cc-col>
            </cc-row>
            <cc-row>
                <cc-col w="40">
                    Ghi chú
                </cc-col>
                <cc-col w="60">
                    <cc-input :height="72" v-model="file.NoteOrganizationUnit"></cc-input>
                </cc-col>
            </cc-row>
            <div class="footer">
                <cc-button type="primary" @click="uploadFile" :loading="loading">
                    Tải lên
                </cc-button>
            </div>
        </cc-popup>
    </div>
</template>
<script>
import FileAPI from '@/api/Components/FileAPI.js';
import CcSelectBox from '../../components/select-box/ccSelectBox.vue';
import CcRadio from '../../components/radio/ccRadio.vue';
export default {
    props: {
        value:{
            type: [String,Boolean],
            default: false
        },
        fileName: {
            type: String,
            default: null
        },
        size: {
            type: String,
            default: null
        },
        listFolder: {
            type: Array,
            default: () => []
        },
        organizationUnitID: {
            type: Number,
            default: null
        },
        organizationUnitName: {
            type: String,
            default: null
        }
    },
    data(){
        return{
            loading: false,
            optionFiles: ["Tải lên", "Cá nhân"],
            optionValue: "Tải lên",
            file: {
                FileName: null,
                Note: null,
                TypeFile: "Folder",
                TenantID: null,
                CreatedBy: null,
                Size: null,
                OrganizationUnitID: null,
                OrganizationUnitName: null,
                NoteOrganizationUnit: null
            },
            fileResponse: null,
            listFile: [],
            dataSource: []
        }
    },
    created(){
        this.getFilePersonal();
    },
    methods: {
        selectedFile(val){
            this.file = val;
        },
        selectOrg(val){
            this.organizationUnitID = val.OrganizationUnitID;
            this.organizationUnitName = val.OrganizationUnitName;
        },
        uploadChoseFile(){
            this.$refs.file.click();
        },
        choseFile(event){
            let fd = new FormData();
            fd.append('file',event.target.files[0])
            let me = this;
            FileAPI.UploadFile(fd).then(res => {
                if(res.data && res.data.Success){
                    me.file = res.data.Data;
                }
            }).catch(e => {});
        },
        close(){
            this.$emit("input",false);
        },
        uploadFile(){
            var me = this;
            this.file.TenantID = this.$store.getters.tenantID;
            this.file.CreatedBy = this.$store.getters.employeeID;
            this.loading = true;
            if(this.optionValue == "Tải lên"){
                this.file.OrganizationUnitID = this.organizationUnitID;
                this.file.OrganizationUnitName = this.organizationUnitName;
                FileAPI.Insert(this.file).then(res => {
                    me.loading = false;
                    if(res.data && res.data.Success){
                        me.$emit("save",true);
                    }
                });
            }
            else{
               this.file.OrganizationUnitID = this.organizationUnitID;
               this.file.OrganizationUnitName = this.organizationUnitName;
                FileAPI.Update(this.file).then(res => {
                    me.loading = false;
                    if(res.data && res.data.Success){
                        me.$emit("save",true);
                    }
                });
            }
        },
        getFilePersonal(){
            var me = this;
            let param = {
                TenantID: this.$store.getters.tenantID,
                EmployeeID: this.$store.getters.employeeID,
            }
            FileAPI.GetPersonal(param).then(res => {
                if(res.data && res.data.Success){
                    me.dataSource = res.data.Data;
                    me.listFile = me.dataSource.filter(x => x.TypeFile != "Folder");
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var-color.scss';
.chose-file{
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.footer{
    float: right;
}
.btn-chose{
    width: 100%;
    height: 36px;
    border: 1px solid #dddddd;
    border-radius: 4px;
    padding: 0px 16px;
    outline: none;
    color: #9a9a9a;
    text-align: left;
    &:active{
        border: 1px solid $primary-hover;
    }
}
</style>