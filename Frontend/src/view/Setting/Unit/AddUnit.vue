<template>
    <div>
        <div class="header flex align-center between">
            <div class="flex align-center">
                <div class="btn-icon-2 m-r-16" @click="back">
                    <div class="icon-back"></div>
                </div>
                <div class="title">Thêm đơn vị</div>
            </div>
            <div class="flex align-center">
                <cc-button class="m-r-12" type="secondary" @click="back">Hủy</cc-button>
                <cc-button @click="save">Lưu</cc-button>
            </div>
        </div>
        <div>
            <cc-group title="Thông tin chung">
                <cc-row>
                    <cc-col w="15">
                        Tên đơn vị
                    </cc-col>
                    <cc-col w="30" class="m-r-60">
                        <cc-input v-model="organization.OrganizationUnitName"></cc-input>
                    </cc-col>
                    <cc-col w="15">
                        Đơn vị cha
                    </cc-col>
                    <cc-col w="30">
                        <cc-organization-unit v-model="organization.ParentID" @childCode="setCCCOde"></cc-organization-unit>
                    </cc-col>
                </cc-row>
                 <cc-row>
                    <cc-col w="15">
                        Địa chỉ
                    </cc-col>
                    <cc-col w="30">
                        <cc-input v-model="organization.Address"></cc-input>
                    </cc-col>
                </cc-row>
            </cc-group>
            <cc-group title="Ghi chú" class="m-t-24">
                <cc-row>
                    <cc-col w="35">
                        <cc-input v-model="organization.Note"></cc-input>
                    </cc-col>
                </cc-row>
            </cc-group>
        </div>
    </div>
</template>
<script>
import OrganizationUnitAPI from "@/api/Components/OrganizationUnitAPI.js";
export default {
    data(){
        return{
            organization: {
                OrganizationUnitID: null,
                OrganizationUnitName: null,
                ParentID: null,
                Address: null,
                Code: null,
                Status: 0,
                Note: null,
                TenantID: "e806ada4-8745-11eb-aa29-18dbf2054f66"
            }
        }
    },
    methods: {
        back(){
            this.$emit("close",false);
        },
        async save(){
            if(this.organization.ParentID){
                this.organization.ParentID = [...this.organization.ParentID].join("");
            }
            else{
                this.organization.ParentID = 0;
            }
            var res = await OrganizationUnitAPI.Insert(this.organization);
            if(res.data && res.data.Success){
                this.$emit("close", true);
            }
            else{
                console.log();
            }
        },
        setCCCOde(val){
            this.organization.Code = val;
        }
    }
}
</script>
<style lang="scss" scoped>
.header{
    margin-bottom: 16px;
    .title{
        font-size: 24px;
        font-weight: 500;
    }
}
</style>