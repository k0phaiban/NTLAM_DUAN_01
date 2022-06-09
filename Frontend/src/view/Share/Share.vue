<template>
    <div>
        <sidebar :listOption="listSetting" :type="1"></sidebar>
        <div class="body-content">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import sidebar from "../../layout/sidebar/index";
export default {
    components: {
        sidebar
    },
    data(){
        return{
            listSetting: [
                {
                    ID: 1,
                    Name: "Không thời hạn",
                    Active: true,
                    Router: "/share/indefinite",
                    // Icon: "icon-delete"
                    Icon:""
                },
                {
                    ID: 2,
                    Name: "Có thời hạn",
                    Active: false,
                    Router: "/share/time",
                    Icon: ""
                },
                {
                    ID: 3,
                    Name: "Nhận chia sẻ",
                    Active: false,
                    Router: "/share/receive",
                    Icon: ""
                }
            ]
        }
    },
    async created(){
        let itemActive = localStorage.getItem("sidebarActive");
        if(itemActive != "undefined" && itemActive != null) {
            for(let i = 0; i < this.listSetting.length; i++) {
                if(this.listSetting[i].Router == itemActive) {
                    this.listSetting[i].Active = true;
                }   else {
                    this.listSetting[i].Active = false;
                }            
            }
        } else {
            this.listSetting[0].Active = true;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>