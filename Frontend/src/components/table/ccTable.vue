<template>
    <div class="cc-table">
        <DxDataGrid
            :data-source="dataSource"
            :remote-operations="false"
            :allow-column-reordering="false"
            :row-alternation-enabled="false"
            :show-borders="true"
            :columnAutoWidth="true"
            :hoverStateEnabled="true"
            height="100%"
            @rowClick="rowClick"
        >
            <DxColumn
                v-if="buttonMore"
                cell-template="button-more"
                :fixed="true"
                width="50"
            />
            <DxSelection
                select-all-mode="page"
                show-check-boxes-mode="always"
                mode="multiple"
                :fixed="true"
                width="50"
                />
            <DxColumn
                v-for="(item,index) in listHeader"
                :key="index"
                :data-field="item.DataField"
                :caption="item.Caption"
                :width="item.width"
                :min-width="item.MinWidth"
                :fixed="item.Fixed ? item.Fixed : false"
                cell-template="cell-template"
                :alignment="item.Alignment ? item.Alignment : 'left'"
            />
            <DxColumn
                width="50"
                :fixed="true"
                fixed-position="right"
                cell-template="btn-edit"
                v-if="showEdit"
            />
            <DxColumn
                width="50"
                :fixed="true"
                fixed-position="right"
                cell-template="btn-download"
                v-if="showDownload"
            />
            <DxColumn
                width="50"
                :fixed="true"
                fixed-position="right"
                cell-template="btn-delete"
            />
            <template #btn-edit="{data}">
                <div class="btn-icon-3 btn-none" @click="clickEdit(data)">
                    <div class="icon-edit"></div>
                </div>
            </template>
            <template #cell-template="{data}">
               <slot :name="data.column.dataField" :data="data.data">{{data.data[data.column.dataField]}}</slot>
            </template>
            <template #btn-delete="{data}">
                <div class="btn-icon-3 btn-none" @click="clickDelete(data)">
                    <div class="icon-delete"></div>
                </div>
            </template>
            <template #button-more>
                <div class="btn-more">
                    <div class="icon-three-dot"></div>
                </div>
            </template>
            <template #btn-download="{data}">
                <div class="btn-icon-3 btn-none" @click="clickDownload(data)">
                    <div class="icon-export"></div>
                </div>
            </template>
        </DxDataGrid>
    </div>
</template>
<script>
import {
  DxDataGrid,
  DxColumn,
  DxSelection
} from 'devextreme-vue/data-grid';
export default {
    components: {
        DxDataGrid,
        DxColumn,
        DxSelection
    },
    props: {
        listHeader: {
            type: Array,
            default: ()=>[]
        },
        dataSource: { 
            type: Array,
            default: ()=>[]
        },
        buttonMore: {
            type: [String,Boolean],
            default: false
        },
        showEdit: {
            type: [String,Boolean],
            default: false
        },
        showDownload: {
            type: [String,Boolean],
            default: false
        },
    },
    data(){
        return{

        }
    },
    methods: {
        test(data){
        },
        /**
         * Hàm bắt sự kiện sửa tại dòng
         */
        clickEdit(data){
            this.$emit("clickEdit", data.data);
        },
        /**
         * Hàm bắt sự kiện sửa tại dòng
         */
        clickDelete(data){
            event.stopPropagation();
            this.$emit("clickDelete", data.data);
        },
        /**
         * Hàm tải xuống
         */
        clickDownload(data){
            this.$emit("clickDownload", data.data);
        },
        rowClick(data){
            this.$emit("rowClick", data.data);
        }
    }
}
</script>
<style lang="scss">
.cc-table{
    height: 100%;
    .dx-datagrid-rowsview .dx-row{
        height: 48px;
        border-top: 1px solid #dddddd !important;
        border-bottom: none;
    }
    .dx-datagrid-borders > .dx-datagrid-headers{
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border: none;
        background-color: #ffffff;
        .dx-datagrid-table {
            height: 50px;
        }
    }
    .dx-datagrid{
        border-radius: 8px;
    }
    .dx-datagrid-borders > .dx-datagrid-rowsview{
        border: none;
    }

    .dx-datagrid-rowsview .dx-row > td{
        border: none;
        padding: 0px 12px;
        color: #000000;
        vertical-align: middle;
    }
    .dx-datagrid-headers .dx-datagrid-table .dx-row > td{
        border: none;
        padding: 0px 12px;
        color: #000000;
        font-weight: 500;
        vertical-align: middle;
        &:hover{
            border-right: 1px solid #dddddd;
        }
    }
    .dx-datagrid-headers .dx-datagrid-table .dx-row > td:last-child{
        border: none !important;
    }
    .dx-datagrid-checkbox-size .dx-checkbox-icon{
        width: 20px;
        height: 20px;
        border-radius: 4px;
        &:hover{
            border: 1px solid #0075FF;
        }
    }
    .dx-datagrid-checkbox-size.dx-checkbox-checked .dx-checkbox-icon{
        font-size: 14px;
    }
    .dx-checkbox-checked .dx-checkbox-icon{
        color:  #0075FF;
    }
    .dx-datagrid-rowsview .dx-selection.dx-row:not(.dx-row-focused) > td {
        background-color: #EBF4FF;
    }
    .dx-datagrid .dx-datagrid-rowsview .dx-data-row td.dx-pointer-events-none{
        border-left: none;
    }
    .dx-datagrid .dx-datagrid-rowsview .dx-freespace-row td.dx-pointer-events-none{
        border-left: none;
    }
    .cc-table .dx-datagrid-rowsview .dx-row{
        &:hover{
            .hover-block{
                display: flex;
            }
        }
    }
    .hover-block{
        display: none;
    }
    .dx-datagrid-checkbox-size.dx-checkbox-indeterminate .dx-checkbox-icon{
        font-size: 10px;
    }
    .cc-table .dx-datagrid-borders > .dx-datagrid-rowsview{
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
    }
    .dx-datagrid-headers .dx-datagrid-content{
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
    }
    .dx-datagrid .dx-datagrid-content-fixed .dx-datagrid-table.dx-datagrid-table-fixed .dx-row td.dx-pointer-events-none{
        border-right: none !important;
    }
    .dx-row.dx-data-row.dx-column-lines.dx-state-hover{
        background-color: #EBF4FF;
    }
    .btn-none{
        display: none;
    }
    .btn-more{
        width: 32px;
        height: 32px;
        align-items: center;
        display: flex;
        justify-content: center;
        border-radius: 50px;
        cursor: pointer;
        &:hover{
            box-shadow: 0 0 10px rgba(0,0,0,.175);
            background-color: #ffffff;
        }
    }
    .dx-state-hover{
        .btn-none{
            display: flex !important;
        }
    }
    .dx-scrollable-container {
        height: 101%;
    }
}
</style>