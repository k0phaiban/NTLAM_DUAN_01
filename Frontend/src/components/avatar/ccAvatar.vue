<template>
    <div>
        <img v-if="src" class="avatar" 
            :style="[{'width': isNaN(width) ? width : width + 'px'},
            {'height': isNaN(height) ? height : height + 'px'}]"
             :src="src"/>
        <div v-else class="avatar" 
            :style="[{'width': isNaN(width) ? width : width + 'px'},
            {'height': isNaN(height) ? height : height + 'px'},
            {'background-color': color},
            {'font-size': fontSize}]"
        >
            {{name}}
        </div>
    </div>
</template>
<script>
export default {
    props: {
        employee : {
            type: Object,
            default: null
        },
        width: {
            type: [String,Number],
            default: '30px'
        },
        height: {
            type: [String,Number],
            default: '30px'
        },
        fontSize: {
            type: [String,Number],
            default: '16px'
        }
    },
    data() {
        return{
            src: null,
            name: null,
            color: null
        }
    },
    watch: {
        employee: {
            handler(val){
                if(val){
                    if(val.Avatar){
                        this.src = val.Avatar;
                    }
                    else{
                        this.name = this.formatName(val.EmployeeName);
                        this.color = '#'+(Math.random()*0xFFFFFF<<0).toString(16);
                    }
                }
            },
            immediate: true
        },
    },
    methods: {
        formatName(name){
            var chars = name.split(" ");
            if(chars && chars.length > 2){
                return chars[0][0] + chars[chars.length-1][0];
            }
            else if(chars && chars.length == 1){
                return chars[0][0];
            }
            return "";
        }
    }
}
</script>
<style lang="scss" scoped>
.avatar{
    border-radius: 50px;
    display: flex;
    align-items: center;
    text-align: center;
    font-weight: 700;
    color: #ffffff;
    justify-content: center;
}
</style>