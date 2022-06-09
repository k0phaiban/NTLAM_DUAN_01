<template>
    <div class="cc-navbar">
        <div class="block-left">
            <div class="app-store">
                <div class="icon-chocolate2"></div>
            </div>
            <img class="logo m-r-12" src="@/assets/icon/sidebar/logo-2.png"/>
            <div class="f-logo pointer m-r-24">
                Quản lý nhà thuốc
            </div>
            <div v-for="(item,index) in listHeader" :key="index">
                <div class="item-navbar m-r-16 pointer" :class='{"active": item.Active}' @click="changeRoute(item)">
                    {{item.Name}}
                </div>
            </div>
        </div>
        <div class="block-right">
            <div class="ico-notify m-r-8" title="Thông báo">
                <!-- <div :class="isNotify?'icon-notify-active':'icon-notify'" @click="toggleNotify()">
                    <div class="number-noitify">
                        1
                    </div>
                </div> -->
                <div v-if="isNotify" class="notify-detail">
                    <cc-group>
                            <cc-row>
                                <cc-col w="100" class="avatar-block justify-center">
                                    <!-- <img v-if="employee.Avatar" class="avatar" :src="employee.Avatar"/> -->
                                    <div class="avatar flex">
                                        <div class="avatar-employee"></div>
                                        <div>
                                            <span class="f-bold">Vũ Thị Linh </span> thắc mắc về phiếu lương tháng 5/2021
                                        </div>
                                    </div>
                                </cc-col>
                            </cc-row>
                        </cc-group>
                </div>
            </div>
            <div class="ico-notify m-r-12" title="Help">
                <div class="icon-help"></div>
            </div>
            <div class="profile">
                <img class="logo m-r-24" src="@/assets/icon/sidebar/user.svg" @click="toggleProfile()"/>
                <div v-if="isOpen" class="detail-profile">
                    <div>
                        <cc-group>
                            <cc-row>
                                <cc-col w="100" class="avatar-block justify-center">
                                    <!-- <img v-if="employee.Avatar" class="avatar" :src="employee.Avatar"/> -->
                                    <div class="avatar">
                                        <div class="icon-user-big"></div>
                                    </div>
                                </cc-col>
                            </cc-row>
                             <cc-row>
                                <cc-col w="100" class="justify-center">
                                    Linh Linh
                                </cc-col>
                            </cc-row>
                            <cc-row>
                                <cc-col w="100" class="justify-center">
                                    linhdemo99@gmail.com
                                </cc-col>
                            </cc-row>
                            <cc-row>
                                <cc-col w="100">
                                    <cc-input :value="'Linh Linh'"></cc-input>
                                </cc-col>
                            </cc-row>
                            <cc-row>
                                <cc-col w="100">
                                    <div class="flex align-center pointer" @click="changePassword()">
                                        <cc-icon type="m-r-12" icon="icon-edit"></cc-icon> <span style="margin-left: 15px">Đổi mật khẩu</span>
                                    </div>
                                </cc-col>
                            </cc-row>
                            <cc-row>
                                <cc-col w="100" @click="signout()">
                                    <div class="flex align-center pointer" @click="signout()">
                                        <cc-icon type="m-r-12" icon="icon-singout"></cc-icon> <span style="margin-left: 15px">Đăng xuất</span>
                                    </div>
                                </cc-col>
                            </cc-row>
                        </cc-group>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
import CcButton from '../../components/button/ccButton.vue';
import ccRow from '../../components/group/ccRow.vue';
export default {
    data(){
        return{
            listHeader: [
                // {
                //     ID: 1,
                //     Name: "Đơn vị",
                //     Router: "/organization-unit",
                //     Active: true,
                //     SubCode: "OrganizationUnit"
                // },
                // {
                //     ID: 2,
                //     Name: "Cá nhân",
                //     Router: "/personal",
                //     Active: false,
                //     SubCode: "Personal"
                // },
                // {
                //     ID: 3,
                //     Name: "Chia sẻ",
                //     Router: "/share",
                //     Active: false,
                //     SubCode: "Shared"
                // },
                // {
                //     ID: 4,
                //     Name: "Thiết lập",
                //     Router: "/setting",
                //     Active: false,
                //     SubCode: "Setting"
                // }
                {
                    ID: 1,
                    Name: "Cửa hàng",
                    Router: "/shop",
                    Active: true,
                    SubCode: "Shop"
                },
                {
                    ID: 3,
                    Name: "Đơn hàng",
                    Router: "/order",
                    Active: false,
                    SubCode: "Order"
                },
                {
                    ID: 2,
                    Name: "Kho hàng",
                    Router: "/warehouse",
                    Active: false,
                    SubCode: "Warehouse"
                },
                {
                    ID: 4,
                    Name: "Nhập/Xuất kho",
                    Router: "/import",
                    Active: false,
                    SubCode: "Import"
                },
                {
                    ID: 5,
                    Name: "Báo cáo",
                    Router: "/report",
                    Active: false,
                    SubCode: "Report"
                }
            ],
            isOpen:false,
            isNotify: false
        }
    },
    mounted(){
        var fullpath = this.$route.fullPath;
        this.listHeader.forEach(item => {
            if(fullpath.indexOf(item.Router) != -1){
                item.Active = true;
            }
            else{
                item.Active = false;
            }
        })
    },
    methods:{
        /**
         * Đổi router - cvcuong
         */
        changeRoute(item){
            // if(item.SubCode != "Setting"){
            //     var check = this.$checkPermission.checkPermission(item.SubCode, "View", this);
            //     if(!check){
            //         this.$showToast.checkAvailability("error","Bạn không có quyền thực hiện chức năng này");
            //         return;
            //     }
            // }
            this.isOpen = false;
            this.isNotify = false;
            localStorage.removeItem("sidebarActive");
            this.listHeader.forEach(ele => {
                if(ele.ID == item.ID){
                    ele.Active = true;
                }
                else{
                    ele.Active = false;
                }
            })
            this.$router.push("/home" + item.Router);
        },
        toggleProfile() {
            this.isOpen = !this.isOpen;
            this.isNotify = false;
        },
        changePassword() {
            console.log("changepassword");
        },
        signout() {
            console.log("signout");
        },
        toggleNotify() {
            this.isNotify = !this.isNotify;
            this.isOpen = false;
        }
    }
}
</script>
<style lang="scss" scoped>
.cc-navbar{
    position: relative;
    display: flex;
    align-items: center;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 60px;
    box-shadow: 0 2px 4px rgba(0,0,0,.175);
    z-index: 10;
    .block-left{
        position: absolute;
        left: 0;
        display: flex;
        align-items: center;
        .app-store{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border-radius: 50px;
            margin-left: 35px;
            margin-right: 12px;
            cursor: pointer;
            &:hover{
                background-color: #f5f5f5;
            }
        }
        .logo{
            width: 34px;
            height: 34px;
            cursor: pointer;
        }
    }
    .block-right{
        position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        .logo{
            width: 34px;
            height: 34px;
            cursor: pointer;
        }
        .ico-notify{
            display: flex;
            align-items: center;
            justify-content: center;
            width: 34px;
            height: 34px;
            border-radius: 50px;
            cursor: pointer;
            &:hover{
                background-color: #f5f5f5;
            }
        }
    }
    .item-navbar{
        display: flex;
        align-items: center;
        padding: 0 24px;
        border-radius: 50px;
        height: 34px;
        &:hover{
            color: #fff;
            background-color: #5884fd;
        }
    }
    .active{
        color: #fff;
        background-color: #5884fd;
    }
    .profile {
        position: relative;
        .detail-profile {
            position: absolute;
            width: 300px;
            background-color: #ffffff;
            right: 10px;
            -webkit-box-shadow: 2px 2px 2px 0px rgba(201,201,201,1);
            -moz-box-shadow: 2px 2px 2px 0px rgba(201,201,201,1);
            box-shadow: 2px 2px 2px 0px rgba(201,201,201,1);
        }
    }
    .ico-notify {
        .number-noitify {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background-color: #ee0033;
            color: #ffffff;
            position: absolute;
            top: 7px;
            right: -5px;
            text-align: center;
        }
        .avatar-employee {
            min-width: 30px;
            height: 30px;
            background-color: #5884fd;
            border-radius: 50%;
            margin-right: 10px;
        }
        .notify-detail 
        {
            position: absolute;
            width: 300px;
            background-color: #ffffff;
            top: 50px;
            right: 10px;
            z-index: 99;
            -webkit-box-shadow: 2px 2px 2px 0px rgba(201,201,201,1);
            -moz-box-shadow: 2px 2px 2px 0px rgba(201,201,201,1);
            box-shadow: 2px 2px 2px 0px rgba(201,201,201,1);
        }
    }
    
}
</style>