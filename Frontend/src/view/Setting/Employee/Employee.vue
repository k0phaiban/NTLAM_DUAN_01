<template>
    <div class="employee-view">
        <div v-if="!showDetail" style="height: 100%">
            <div class="header">
                <div>
                    <span class="title">Danh sách nhân viên</span>
                </div>
                <div class="flex">
                    <cc-input class="m-r-12" width="250px" icon="icon-search" placeholderInput="Tìm kiếm nhân viên"></cc-input>
                    <cc-button type="primary " icon="icon-plus-white" @click="openAdd">Thêm</cc-button>
                </div>
            </div>
            <div class="view-table" v-show="!loading">
                <ccTable 
                    :listHeader="listHeader" 
                    :dataSource="dataSource"
                    :showDownload="false"
                    :showEdit="true"
                    @clickEdit="rowEdit"
                    @clickDelete="confirmDelete">
                    <template #BirthDay="{data}">
                        {{formatDate(data.BirthDay)}}
                    </template>
                    <template #EmployeeName="{data}">
                        <div class="flex align-center">
                            <cc-avatar class="m-r-8" :employee="data"></cc-avatar>{{data.EmployeeName}}
                        </div>
                    </template>
                </ccTable>
            </div>
            <cc-loading v-show="loading" width="40"></cc-loading>
        </div>
        <AddEmployee v-if="showDetail" @close="closeForm" @save="getAll" :employeeMaster="employee"></AddEmployee>
    </div>
</template>
<script>
import AddEmployee from "./AddEmployee.vue";
import EmployeeAPI from "@/api/Components/EmployeeAPI.js"
export default {
    components: {
        AddEmployee
    },
    data(){
        return{
            dataSource: [],
            listHeader: [
                {
                    DataField: "EmployeeCode",
                    Caption: "Mã nhân viên",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "EmployeeName",
                    Caption: "Tên nhân viên",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "OrganizationUnitName",
                    Caption: "Đơn vị",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "JobPoisionName",
                    Caption: "Chức vụ",
                    DataTyle: "date",
                    MinWidth: 150
                },
                {
                    DataField: "BirthDay",
                    Caption: "Ngày sinh",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "Gender",
                    Caption: "Giới tính",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "Phone",
                    Caption: "SĐT",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "Email",
                    Caption: "Email",
                    DataTyle: "text",
                    MinWidth: 150
                },
                {
                    DataField: "Status",
                    Caption: "Trạng thái",
                    DataTyle: "text",
                    MinWidth: 150
                }
            ],
            showDetail: false,
            loading: false,
            employee: null
        }
    },
    created() {
        debugger
        var check = this.$checkPermission.checkPermission("Employee", "View", this);
        if(!check){
            this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
            this.$router.push("/home/Unit");
        }
        this.getAll();
    },
    methods: {
        rowEdit(data){
            this.employee = data;
            this.showDetail = true;
        },
        openAdd(){
        var check = this.$checkPermission.checkPermission("Employee", "Add", this);
        if(!check){
            this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
        }    
            this.showDetail = true;
        },
        closeForm(){
            this.showDetail = false;
        },
        async getAll(){
            this.employee = null;
            this.showDetail = false;
            this.loading = true;
            var res = await EmployeeAPI.GetAll();
            if(res.data && res.data.Success){
                this.dataSource = res.data.Data;
            }
            this.loading = false;
        },
        confirmDelete(data) {
            var check = this.$checkPermission.checkPermission("Employee", "Delete", this);
            if(!check){
                this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
            }
            this.$popup.confirmDelete("Xóa nhân viên", "Bạn có chắc chắn muốn xóa nhân viên <strong>" + data.EmployeeName + "</strong> không?",this.deleteFile,data)
        },
        formatDate(date){
            if(date){
                var todayTime = new Date(date);
                var month = todayTime.getMonth() + 1;
                var day = todayTime.getDate();
                var year = todayTime.getFullYear();
                return month + "/" + day + "/" + year;
            }
            return null;
        },
        async deleteFile(data){
            var me = this;
            var res = await EmployeeAPI.Delete(data.EmployeeID);
            if(res.data && res.data.Success){
                me.getAll();
            }
            else{

            }
        }
    }
}
</script>
<style lang="scss" scoped>
.employee-view{
    height: 100%;
    .header{
        display: flex;
        align-items: center;
        padding: 0 0 12px 0;
        justify-content: space-between;
        .title{
            font-size: 18px;
            font-weight: 500;
        }
    }
    .view-table{
        height: calc(100% - 60px);
    }
}
</style>