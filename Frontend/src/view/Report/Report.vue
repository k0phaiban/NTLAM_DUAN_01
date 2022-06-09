<template>
    <div class="cc-dashboard">
        <!-- <div class="flex dashboard-header">
            <div class="flex tab-menu">
                <div :class="['item',{'active': active}]" @click="active = !active">Tổng quan</div>
                <div :class="['item',{'active': !active}]" @click="active = !active">Nhắc việc</div>
            </div>
        </div> -->
        <div v-if="active">
            <div class="flex">
                <div class="char-dashboard m-r-16 m-b-16">
                    <cc-char :dataSource="dataSource" :listHeaders="listHeaders" title="Biểu đồ biến động số lượng đơn hàng theo tháng"></cc-char>
                </div>
                <div class="char-dashboard m-b-16">
                    <cc-bar-char ></cc-bar-char>
                </div>
            </div>
            <div class="flex">
                <div class="char-dashboard m-r-16 m-b-24">
                    <cc-pie-char :dataSource="areas" valueField="area" displayField="country" title="Biểu đồ phân bổ loại thuốc bán trong tháng"></cc-pie-char>
                </div>
                <div class="char-dashboard m-b-24">
                    <cc-line-char></cc-line-char>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  components: {  },
    data(){
        return{
            active: true,

            areas:[{
                country: 'Thuốc giảm đau',
                area: 12
                }, {
                country: 'Thuốc hạ sốt',
                area: 7
                }, {
                country: 'Thuốc đau đầu',
                area: 7
                }, {
                country: 'Thuốc cảm cúm',
                area: 7
                }, {
                country: 'Thực phẩm chức năng',
                area: 6
                }, {
                country: 'Thuốc bổ',
                area: 5
                }, {
                country: 'Thuốc ổn định đường huyết',
                area: 2
                }, {
                country: 'Thuốc chống viêm',
                area: 55
            }],

            dataSource:[
            {
                year: 1997,
                smp: 1000,
            },
            {
                year: 1998,
                smp: 1800,
            },
            {
                year: 1999,
                smp: 1600,
            },
            {
                year: 2000,
                smp: 3000,
            },
            {
                year: 2002,
                smp: 2300,
            },
        ],
        listHeaders :[
            { value: 'smp', name: 'Số lượng nhân viên' },
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.cc-dashboard{
    width: 100%;
    height: 100%;
    .char-dashboard{
        width: 50%;
        background-color: #ffffff;
        border-radius: 8px;
        padding: 16px;
    }
    .dashboard-header{
        height: 36px;
        position: relative;
        margin-bottom: 16px;
        .tab-menu{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            border-radius: 5px;
            background-color: #e5e5e5;
            height: 36px;
            .item{
                height: 36px;
                display: flex;
                align-items: center;
                width: 90px;
                justify-content: center;
                cursor: pointer;
            }
            .active{
                background-color: #ffffff;
                color: #0477ffb8;
                border-radius: 5px;
            }
        }
    }
}
</style>