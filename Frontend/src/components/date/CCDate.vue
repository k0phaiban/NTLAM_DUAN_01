<template>
    <div class="date-picker">
        <datepicker
            ref="dp1"
            v-model="valueX"
            :language="vi"
            :format="customFormatter"
            :placeholder="placeholder"
            @change.native="changeValue"></datepicker>
        <div class="icon-calender icon-date" ></div>
    </div>
</template>
<script>
import Datepicker from 'vuejs-datepicker';
import moment from 'moment'
import {vi} from 'vuejs-datepicker/dist/locale'
export default {
    props: {
        value: {
            type: Date,
            default: new Date()
        },
        placeholder: {
            type: String,
            default: "Chọn ngày"
        }
    },
    components: {
        Datepicker
    },
    data(){
        return{
            vi: vi,
            valueX: new Date()
        }
    },
    watch: {
        value:{
            handler(val){
                this.valueX = val;
            },
            immediate: true
        },
        valueX(val){
            this.$emit('input',val);
        }
    },
    methods: {
        customFormatter(date) {
            return moment(date).format('DD/MM/YYYY');
        },
    }
}
</script>
<style lang="scss">
.date-picker{
    position: relative;
    width: 100%;
    .icon-date{
        position: absolute;
        right: 8px;
        top: 6px;
    }
    .vdp-datepicker{
        input{
            width: 100%;
            height: 36px;
            border-radius: 4px;
            border: 1px solid #ddd;
            outline: none;
            padding: 0px 8px;
            &:focus{
                border: 1px solid #337ab7;
            }
        }
    }
    .vdp-datepicker__calendar{
        border-radius: 4px;
        border: none !important;
        box-shadow: 0 0 10px rgba(0,0,0,.175);
        .cell.day{
            border-radius: 50%;
            width: 40px;
            height: 40px;
        }
        .cell.day.selected{
            color: #ffffff;
        }
    }
}

</style>