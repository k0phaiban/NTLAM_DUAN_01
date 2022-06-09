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
                        <cc-input :placeholderInput="placeholderUsername" />
                    </div>
                    <div class="line-input">
                        <label for="" class="label-input">Mật khẩu</label>
                        <cc-input :mode="mode1" :placeholderInput="placeholderPassword" :iconTails="icon1" @clickIcon="clickIcon(0)" />
                    </div>
                    <div class="line-input">
                        <label for="" class="label-input">Nhập lại mật khẩu</label>
                        <cc-input :mode="mode2" :placeholderInput="placeholderPassword" :iconTails="icon2" @clickIcon="clickIcon(1)" />
                    </div>
                    <div class="line-tool">
                        <div class="item-tool">Quên mật khẩu</div>
                        <div class="item-tool">Đăng nhập</div>
                    </div>
                    <div class="line-submit">
                        <button class="btn-common-primary">Đăng ký</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import ccInput from '../components/input/ccInput.vue'
export default {
    components: { ccInput },
    data() {
        return {
            placeholderUsername:"Tài khoản",
            placeholderPassword: "Mật khẩu",
            placeholderRePassword: "Nhập lại mật khẩu",
            typeInput1 : false,
            typeInput2: false,
            mode1: 'password',
            mode2: 'password',
            icon1: 'icon-eye-hide',
            icon2: 'icon-eye-hide'
        }
    },
    methods: {
        clickIcon(val) {
            switch(val) {
                case 0: 
                    this.typeInput1 = !this.typeInput1;
                    if(this.typeInput1) {
                        this.mode1 = 'text';
                        this.icon1 = 'icon-eye-show';
                    } else {
                        this.mode1 = 'password';
                        this.icon1 = 'icon-eye-hide';
                    }
                break;
                case 1: 
                     this.typeInput2 = !this.typeInput2;
                    if(this.typeInput2) {
                        this.mode2 = 'text';
                        this.icon2 = 'icon-eye-show';
                    } else {
                        this.mode2 = 'password';
                        this.icon2 = 'icon-eye-hide';
                    }
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