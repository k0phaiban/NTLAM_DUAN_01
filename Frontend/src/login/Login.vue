<template>
    <div>
        <div class="page-login">
            <div class="box-login">
                <div class="title-login">
                    <img src="../assets/icon/sidebar/logo-2.png" width="100" height="100" alt="">
                    <div style="margin-top: 20px">
                        QUẢN LÝ TÀI LIỆU
                    </div>
                </div>
                <form action="">
                    <div class="line-input">
                        <label for="" class="label-input">Tên đăng nhập</label>
                        <cc-input v-model="username" :placeholderInput="placeholderUsername" />
                    </div>
                    <div class="line-input">
                        <label for="" class="label-input">Mật khẩu</label>
                        <cc-input :mode="mode1" v-model="password" :placeholderInput="placeholderPassword" :iconTails="icon1" @clickIcon="clickIcon()" />
                    </div>
                    <div class="line-tool">
                        <div class="item-tool">Quên mật khẩu</div>
                        <div class="item-tool">Đăng ký</div>
                    </div>
                    <div class="line-submit">
                        <button class="btn-common-primary" @click="login">Đăng nhập</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import UserAPI from '@/api/Components/UserAPI.js' ;
export default {
    components: {  },
    data() {
        return {
            placeholderUsername:"Tài khoản",
            placeholderPassword: "Mật khẩu",
            username: null,
            password: null,
            mode1: 'password',
            icon1: 'icon-eye-hide',
            typeInput1 : false
        }
    },
    methods: {
        login(){
            var param = {
                Username: this.username,
                Password: this.password
            };
            var me = this;
            // UserAPI.Login(param).then(res => {
            //     if(res.data){
            //         localStorage.setItem('token', res.data.Token);
            //         me.$store.dispatch("common/setToken", res.data.Token);
            //         me.$router.push("/home");
            //     }
            // });
            me.$router.push("/home");
        },
        clickIcon() {
            this.typeInput1 = !this.typeInput1;
            if(this.typeInput1) {
                this.mode1 = 'text';
                this.icon1 = 'icon-eye-show';
            } else {
                this.mode1 = 'password';
                this.icon1 = 'icon-eye-hide'
            }
        }
    },
}
</script>
<style lang="scss" scoped>
.page-login {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    // background-color: #ffffff;
    background-image: url('../assets/image/banner1.jpg');
    background-size: cover;
}
    .box-login {
        display: flex;
        flex-direction: column;
        width: 450px;
        background-color: #ffffff;
        border-radius: 10px;
        padding: 25px;
    }
        .title-login {
            width: 100%;
            text-align: center;
            font-weight: 700;
            font-size: 3rem/* 48px */;
            line-height: 1;
            color: #2962FF;
            margin-bottom: 2rem;
        }
        .line-input {
            display: flex;
            margin-top: 1.25rem/* 20px */;
            margin-bottom: 1.25rem/* 20px */;
            flex-direction: column;
        }
        .line-tool {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin-top: 0.5rem/* 8px */;
            margin-bottom: 0.5rem/* 8px */;
        }
            .label-input {
                margin-bottom: 10px;
            } 
            .item-tool {
                text-decoration: underline;
                font-style: italic;
                cursor: pointer;
            }
        .line-submit {
            display: flex;
            margin-top: 2.5rem/* 40px */;
            margin-bottom: 2.5rem/* 40px */;
            justify-content: center;
        }
        .btn-common-primary {
            position: relative;
            height: 36px;
            padding: 0 16px;
            display: flex;
            align-items: center;
            justify-content: center; 
            border-radius: 4px;
            font-size: 14px;
            font-weight: 500;
            outline: none;
            min-width: 80px;
            width: 100%;
            cursor: pointer;
            color: #ffffff;
            background-color: #2962FF;
            border: none;
            &:hover{
                background-color: #2979FF;
            }
            &:active{
                background-color: #304FFE;
            }
        }
</style>