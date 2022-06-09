<template>
    <div>
        <cc-popup 
            v-model="value"
            :width="900"
            title="Lọc nâng cao"
            @close="close">
            <div class="preview">
                <div class="header m-b-12">
                    <div class="m-b-12">
                        <cc-input v-model="searchInput" class="m-r-12" width="400px" icon="icon-search" placeholderInput="Nhập văn bản cần tìm" @handlekeyup="searchFile"></cc-input>
                    </div>
                    <div class="title">
                        <i>Tìm kiếm toàn văn tất cả tệp có trong các thư mục, các địng dạng đang hỗ trợ tìm kiếm: Word, Excel</i>
                    </div>
                </div>
                <div class="content">
                    <div v-for="(item,index) in listFile" :key="index" class="item">
                        <div class="item-folder">
                            <div class="flex btn-hover">
                                <cc-icon class="btn-none m-r-8" type="circle" icon="icon-export" @handleClick="downloadFile(item)"></cc-icon>
                                <!-- <cc-icon class="btn-none" type="circle" icon="icon-delete" @handleClick="confirmDelete(item)"></cc-icon> -->
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
            </div>
        </cc-popup>
    </div>
</template>
<script>
import FileAPI from '@/api/Components/FileAPI.js';
export default {
    props: {
        value:{
            type: [String,Boolean],
            default: false
        },
    },
    data(){
        return{
            loading: false,
            listFile: [],
            searchInput: ""
        }
    },
    methods: {
        close(){
            this.$emit("input",false);
        },
        searchFile(val){
            this.loading = true;
            var me = this;
            FileAPI.SearchPersonal(val).then(res => {
                me.loading = false;
                if(res.data && res.data.Success){
                    me.listFile = res.data.Data;
                }
            }).catch(e =>{
                console.log(e);
            })
        },
        formatDate(date){
            var todayTime = new Date(date);
            var month = todayTime.getMonth() + 1;
            var day = todayTime.getDate();
            var year = todayTime.getFullYear();
            return month + "/" + day + "/" + year;
        },
        downloadFile(data){
            window.location.assign(data.Path);
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/styles/var-color.scss';
.preview{
    height: 500px;
    .header{
        .title {
            font-size: 12px;
            color: #212121;
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
                    width: 240px;
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
</style>