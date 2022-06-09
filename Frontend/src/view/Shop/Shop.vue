<template>
    <div class="shop">
        <div class="header">
            <div class="header-left">
                <h2>Danh sách cách loại thuốc hiện có tại cửa hàng</h2>
            </div>
            <div class="header-right">
                <cc-button type="primary-border m-r-12" icon="icon-export" @click="exportData">Xuất khẩu</cc-button>
                <cc-button type="primary-border m-r-12" icon="icon-import">Nhập khẩu</cc-button>
                <cc-button type="primary" icon="icon-plus-white">Thêm</cc-button>
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
            ],
            dataSource: [
                {
                    ProductID: 1,
                    ProductName: "Thuốc 1",
                    ProductType: "Thuốc giảm đau",
                    Supplier: "VNG",
                    Quantity: 100,
                    Price: 100000
                },
                {
                    ProductID: 2,
                    ProductName: "Thuốc 1",
                    ProductType: "Thuốc giảm đau",
                    Supplier: "VNG",
                    Quantity: 100,
                    Price: 100000
                },
                {
                    ProductID: 3,
                    ProductName: "Thuốc 1",
                    ProductType: "Thuốc giảm đau",
                    Supplier: "VNG",
                    Quantity: 100,
                    Price: 100000
                },
                {
                    ProductID: 4,
                    ProductName: "Thuốc 1",
                    ProductType: "Thuốc giảm đau",
                    Supplier: "VNG",
                    Quantity: 100,
                    Price: 100000
                },
                {
                    ProductID: 5,
                    ProductName: "Thuốc 1",
                    ProductType: "Thuốc giảm đau",
                    Supplier: "VNG",
                    Quantity: 100,
                    Price: 100000
                }
            ],
            loading: false
        }
    },
    created(){
        ProductsAPI.GetAll().then(res => {
            this.dataSource = res.data;
        });
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