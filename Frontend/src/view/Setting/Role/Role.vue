<template>
<div style="height: 100%">
    <div v-if="!showDetail" class="role-view">
        <div class="header">
            <div class="title">
                <span>Vai trò</span>
            </div>
            <div class="flex">
                <cc-input class="m-r-12" width="250px" icon="icon-search" placeholderInput="Tìm kiếm vai trò"></cc-input>
                <cc-button type="primary" icon="icon-plus-white" @click="openAdd">Thêm</cc-button>
            </div>
        </div>
        <div class="table-show" v-show="!loading">
            <cc-table
                :listHeader="listHeader"
                :dataSource="dataSource"
                :showDownload="false"
                @rowClick="rowClick"
                @clickDelete="confirmDeleteRole"
            >
            </cc-table>
        </div>
        <cc-loading v-show="loading" width="40"></cc-loading>
    </div>
    <AddRole v-if="showDetail" @close="showDetail = false" @save="GetRole" :roleMaster="role"></AddRole>
</div>
</template>
<script>
import AddRole from './AddRole.vue';
import RoleAPI from '@/api/Components/RoleAPI.js';
export default {
    components: { 
        AddRole
     },
    data(){
        return{
            open: false,
            content: "",
            openContent: false,
            inputFile: null,
            listHeader: [
                {
                    DataField: "RoleName",
                    Caption: "Tên vai trò"
                },
                {
                    DataField: "Note",
                    Caption: "Ghi chú"
                }
            ],
            dataSource: [],
            type: 1,
            showDetail: false,
            loading: false,
            role: null
        }
    },
    async created(){
        var check = this.$checkPermission.checkPermission("Role", "View", this);
        if(!check){
            this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
        }
        await this.GetRole();
    },
    methods: {
        openAdd(){
            this.role = null;
            this.showDetail = true;
        },
        rowClick(e){
            this.role = e;
            this.showDetail = true;
        },
        async GetRole(){
            try{
                this.showDetail = false;
                this.loading = true;
                var res = await RoleAPI.GetAll();
                if(res.data && res.data.Success){
                    this.loading = false;
                    this.dataSource = res.data.Data;
                }
            }
            catch(e){
                console.log(e);
            }
        },
        confirmDeleteRole(data){
            this.$popup.confirmDelete("Xóa vai trò", "Bạn có chắc chắn muốn xóa vai trò <strong>" + data.RoleName + "</strong> không?",this.deleteFile,data);
        },
        async deleteFile(data){
            var check = this.$checkPermission.checkPermission("Role", "Delete", this);
            if(!check){
                this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
            }
            var res = await RoleAPI.DeleteRole(data.RoleID);
            if(res.data && res.data.Success){
                this.GetRole();
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.role-view{
    height: 100%;
    .header{
        height: 36px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
        .title{
            font-size: 18px;
            font-weight: 500;
        }
    }
    .table-show{
        height: calc(100% - 60px);
    }
}
</style>