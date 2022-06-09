<template>
    <div class="cc-organization-unit">
        <div v-if="type == 1" class="h-100">
            <div class="organization-header m-b-12">
                <div class="f-title">Đơn vị</div>
                <div>
                    <cc-button @click="openAdd">Thêm</cc-button>
                </div>
            </div>
            <div style="height: calc(100% - 48px);">
                <ccTreeList
                    keyField="OrganizationUnitID"
                    parentKey="ParentID"
                    :listHeader="listHeader" 
                    :dataSource="dataSource"
                    @clickDelete="deleteUnit"
                >
                    <template #Status="{data}">
                        <div class="flex align-center">
                            <span class="cc-status m-r-8"></span>
                            <span v-if="data.Status == 0">Đang hoạt động</span>
                            <span v-else>Không hoạt động</span>
                        </div>
                    </template>
                </ccTreeList>
            </div>
        </div>
        <AddUnit v-if="type == 2" @close="getAll"></AddUnit>
    </div>
</template>
<script>
import AddUnit from "./AddUnit";
import OrganizationUnitAPI from "@/api/Components/OrganizationUnitAPI.js";
export default {
    components: {
        AddUnit
    },
    data(){
        return{
            listHeader: [
                {
                    DataField: "OrganizationUnitName",
                    Caption: "Tên đơn vị",
                    DataTyle: "text",
                    Alignment: "left"
                },
                {
                    DataField: "Address",
                    Caption: "Địa chỉ",
                    DataTyle: "text",
                    Alignment: "left"
                },
                {
                    DataField: "Note",
                    Caption: "Ghi chú",
                    DataTyle: "text",
                    Alignment: "left"
                },
                {
                    DataField: "Status",
                    Caption: "Trạng thái",
                    DataTyle: "text",
                    Alignment: "left"
                }
            ],
            dataSource: null,
            type: 1
        }
    },
    methods: {
        openAdd(){
            this.type = 2;
        },
        async getAll(){
            this.type = 1;
            let me = this;
            var res = await OrganizationUnitAPI.GetAll();
            if(res.data && res.data.Success){
                me.dataSource = res.data.Data;
            }
        },
        deleteUnit(item){
            this.$popup.confirmDelete("Xóa thư mục", "Bạn có chắc chắn muốn xóa thư mục <strong>" + item.OrganizationUnitName + "</strong> không?",this.deleteFile,item);
        },
        deleteFile(){
            var me = this;
            OrganizationUnitAPI.Delete(item.OrganizationUnitID).then(res => {
                if(res.data && res.data.Success){
                    me.getAll();
                }
            });
        }
    },
    async created(){
        await this.getAll();
    }
}
</script>
<style lang="scss" scoped>
.cc-organization-unit{
    height: 100%;
    .organization-header{
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .cc-status{
        display: block;
        width: 8px;
        height: 8px;
        border-radius: 50px;
        background-color: green;
    }
}
</style>