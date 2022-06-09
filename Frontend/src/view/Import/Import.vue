<template>
    <div class="shop">
        <div class="header">
            <div class="header-left">
                <h2>Danh sách hoạt động xuất kho và nhập kho</h2>
            </div>
            <div class="header-right">
                <div class="flex justify-center m-r-12">
                    <div class="flex justify-center m-r-12 align-center"  style="width: 100px">Từ ngày</div> 
                    <ccDate style="width: 150px"></ccDate>
                </div>
                <div class="flex justify-center m-r-12">
                    <div class="flex justify-center m-r-12 align-center"  style="width: 100px">Đến ngày </div>
                    <ccDate style="width: 150px" class="m-r-12"></ccDate>
                </div>
                <cc-button type="primary-border m-r-12" icon="icon-export" @click="exportData">Xuất khẩu</cc-button>
            </div>
        </div>
        <div class="content">
            <ccTable 
                :listHeader="listHeader" 
                :dataSource="dataSource">
                <!-- <template #CreatedDate="{data}">
                    {{formatDate(data.CreatedDate)}}
                </template> -->
            </ccTable>
            <cc-loading v-show="loading" width="40"></cc-loading>
        </div>
    </div>
</template>
<script>
import ProductsAPI from '@/api/Components/ProductAPI.js' ;
export default {
    data(){
        return {
            listHeader: [
                {
                    DataField: "ProductCode",
                    Alignment: "left",
                    Caption: "Mã thuốc",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "ProductName",
                    Alignment: "left",
                    Caption: "Tên thuốc",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "ProductType",
                    Alignment: "left",
                    Caption: "Loại thuốc",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "Supplier",
                    Alignment: "left",
                    Caption: "Nhà cung cấp",
                    DataTyle: "text",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "Quantity",
                    Alignment: "left",
                    Caption: "Số lượng",
                    DataTyle: "number",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "Price",
                    Alignment: "left",
                    Caption: "Đơn giá",
                    DataTyle: "money",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "Price",
                    Alignment: "left",
                    Caption: "Trạng thái",
                    DataTyle: "money",
                    Fixed: true,
                    MinWidth: 150
                },
                {
                    DataField: "Price",
                    Alignment: "left",
                    Caption: "Ngày nhập/xuất kho",
                    DataTyle: "money",
                    Fixed: true,
                    MinWidth: 150
                },
            ],
            dataSource: [],
            loading: false
        }
    },
    created(){
        // ProductsAPI.GetAll().then(res => {
        //     this.dataSource = res.data;
        // });
    },
    methods:{
        exportData(){
            window.open('http://localhost:3000/products/export');
            // ProductsAPI.Export().then(res => {
            //     window.location.assign(res.data)
            // });
        }
    }
}
</script>
<style lang="scss">
.shop{
    height: calc(100% - 32px);
    padding: 16px 24px;
    .header{
        height: 52px;
        display: flex;
        justify-content: space-between;
        .header-left{
            height: 36px;
            display: flex;
            align-items: center;
        }
        .header-right{
            height: 36px;
            display: flex;
            align-items: center;
        }
    }
    .content{
        height: calc(100% - 52px);
    }
}
</style>