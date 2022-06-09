<template>
    <div class="view-employee-detail">
        <div class="header flex align-center between">
            <div class="flex align-center">
                <div class="btn-icon-2 m-r-16" @click="back">
                    <div class="icon-back"></div>
                </div>
                <div class="title">Thêm nhân viên</div>
            </div>
            <div class="flex align-center">
                <cc-button class="m-r-12" type="secondary" @click="back">Hủy</cc-button>
                <cc-button @click="save" :loading="loading">Lưu</cc-button>
            </div>
        </div>
        <div class="view-info">
            <cc-group>
                <cc-row>
                    <cc-col w="100" class="avatar-block">
                        <img v-if="employee.Avatar" class="avatar" :src="employee.Avatar" @click="uploadAvatar"/>
                        <div v-else class="avatar" @click="uploadAvatar">
                            <div class="icon-user-big"></div>
                        </div>
                        <input type="file" accept="image/png, image/jpeg" ref="file" style="display: none" @change="choseFile">
                    </cc-col>
                </cc-row>
                 <!-- <cc-row>
                    <cc-col w="15">
                        Địa chỉ
                    </cc-col>
                    <cc-col w="30">
                        <cc-input v-model="organization.Address"></cc-input>
                    </cc-col>
                </cc-row> -->
            </cc-group>
            <cc-group title="Thông tin nhân viên" class="m-t-24">
                <cc-row>
                    <cc-col w="15">
                        Tên nhân viên
                    </cc-col>
                    <cc-col w="30" class="m-r-60">
                        <cc-input v-model="employee.EmployeeName"></cc-input>
                    </cc-col>
                    <cc-col w="15">
                        Mã nhân viên
                    </cc-col>
                    <cc-col w="30">
                        <cc-input v-model="employee.EmployeeCode"></cc-input>
                    </cc-col>
                </cc-row>
                <cc-row>
                    <cc-col w="15">
                        Giới tính
                    </cc-col>
                    <cc-col w="30" class="m-r-60">
                        <cc-select-box v-model="employee.Gender" :dataSource="listGender"
                        @selected="selectedGender"></cc-select-box>
                    </cc-col>
                    <cc-col w="15">
                        Ngày sinh
                    </cc-col>
                    <cc-col w="30">
                        <cc-date v-model="employee.BirthDay"></cc-date>
                    </cc-col>
                </cc-row>
                <cc-row>
                    <cc-col w="15">
                        Số điện thoại
                    </cc-col>
                    <cc-col w="30" class="m-r-60">
                        <cc-input v-model="employee.Phone"></cc-input>
                    </cc-col>
                    <cc-col w="15">
                        Email
                    </cc-col>
                    <cc-col w="30">
                        <cc-input v-model="employee.Email"></cc-input>
                    </cc-col>
                </cc-row>
                <cc-row>
                    <cc-col w="15">
                        Đơn vị
                    </cc-col>
                    <cc-col w="30" class="m-r-60">
                        <cc-organization-unit v-model="employee.OrganizationUnitID" @selected="selectedOrg"></cc-organization-unit>
                    </cc-col>
                    <cc-col w="15">
                        Chức vụ
                    </cc-col>
                    <cc-col w="30">
                        <cc-input v-model="employee.JobPoisitionName" ></cc-input>
                    </cc-col>
                </cc-row>
                <cc-row>
                    <cc-col w="15">
                        Địa chỉ
                    </cc-col>
                    <cc-col w="30" class="m-r-60">
                        <cc-input v-model="employee.Address"></cc-input>
                    </cc-col>
                    <cc-col w="15">
                        Ghi chú
                    </cc-col>
                    <cc-col w="30">
                        <cc-input v-model="employee.Note"></cc-input>
                    </cc-col>
                </cc-row>
                <cc-row v-if="employeeMaster != null">
                    <cc-col w="15">
                        Trạng thái
                    </cc-col>
                    <cc-col w="30" class="m-r-60">
                        <cc-select-box v-model="employee.Status"
                        :dataSource="listStatus"
                        displayField="StatusName"
                        valueField="StatusID"></cc-select-box>
                    </cc-col>
                </cc-row>
            </cc-group>
        </div>
    </div>
</template>
<script>
import EmployeeAPI from "@/api/Components/EmployeeAPI.js";
import FileAPI from '@/api/Components/FileAPI.js';
export default {
    props:{
        employeeMaster: {
            type: Object,
            default: null
        }
    },
    data(){
        return{
            listGender : ["Nam","Nữ", "Khác"],
            employee: {
                EmployeeCode: null,
                EmployeeName: null,
                Avatar: null,
                Gender: null,
                Email: null,
                BirthDay: null,
                Note: null,
                Phone: null,
                Address: null,
                OrganizationUnitID: null,
                OrganizationUnitName: null,
                JobPoisitionID: null,
                JobPoisitionName: null,
                Status: 1
            },
            loading: false,
            isEdit: false,
            listStatus: [
                {
                    StatusID: 0,
                    StatusName: "Không hoạt động"
                },
                {
                    StatusID: 1,
                    StatusName: "Đang hoạt động"
                }
            ]
        }
    },
    watch: {
        employeeMaster: {
            handler(val){
                if(val){
                    this.employee = val;
                    this.isEdit = true;
                }
            },
            immediate: true
        }
    },
    methods: {
        selectedGender(val){
            this.employee.Gender = val;
        },
        selectedOrg(val){
            this.employee.OrganizationUnitID = val.OrganizationUnitID;
            this.employee.OrganizationUnitName = val.OrganizationUnitName;
        },
        back(){
            this.$emit("close",false);
        },
        async save(){
            this.loading = true;
            if(this.isEdit){
                var res = await EmployeeAPI.Update(this.employee);
                this.loading = false;
                if(res.data && res.data.Success){
                    this.$emit("save", true);
                }
            }
            else{
                var res = await EmployeeAPI.Insert(this.employee);
                this.loading = false;
                if(res.data && res.data.Success){
                    this.$emit("save", true);
                }
            }
        },
        uploadAvatar(){
            this.$refs.file.click();
        },
        choseFile(event){
            let fd = new FormData();
            fd.append('file',event.target.files[0])
            let me = this;
            FileAPI.UploadFile(fd).then(res => {
                if(res.data && res.data.Success){
                    me.employee.Avatar = res.data.Data.Path;
                }
            }).catch(e => {});
        },
    }
}
</script>
<style lang="scss" scoped>
.view-employee-detail{
    height: 100%;
    overflow: auto;
    .view-info{
        height: calc(100% - 60px);
        overflow: auto;
    }
}
.header{
    margin-bottom: 16px;
    .title{
        font-size: 24px;
        font-weight: 500;
    }
}
.avatar{
    width: 100px;
    height: 100px;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
}
.avatar-block{
    justify-content: center;
    display: flex;
}
</style>