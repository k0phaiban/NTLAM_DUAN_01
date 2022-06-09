<template>
  <div class="app">
    <router-view v-if="isGetUser"></router-view>
  </div>
</template>

<script>
import UserAPI from '@/api/Components/UserAPI.js' ;
export default {
  name: 'App',
  data(){
    return{
      isGetUser: true
    }
  },
  async created(){
    this.$router.push("/home");
    // var token = this.$store.getters.token;
    // if(localStorage.getItem('token') != null && localStorage.getItem('token') != "undefined"){
    //   token = localStorage.getItem('token');
    //   this.$store.dispatch('common/setToken', token);
    // }
    // if(token == null || token == "undefined"){
    //   this.isGetUser = true;
    //   this.$router.push("/login");
    // }
    // else{
    //   await this.GetUserInfo();
    // }
  },
  methods: {
    async GetUserInfo(){
      var res = await UserAPI.GetUserInfo();
      if(res.data && res.data.Success){
        var listRole = res.data.Data.ListRole;
        if(listRole){
          this.$store.dispatch('common/setListRole',listRole);
        }
        this.isGetUser= true;
      }
    }
  }
}
</script>

<style lang="scss">
body{
  margin: 0px;
}
.app{
  padding: 0px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: #f5f5f5;
}
</style>
