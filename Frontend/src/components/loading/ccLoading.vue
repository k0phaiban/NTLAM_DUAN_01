<template>
    <div>
        <div class="opacity"></div>
            <div class="loader" 
                :style="[
                    {'width': isNaN(width) ? width : width + 'px'},
                    {'height': isNaN(width) ? width : width + 'px'},
                    {'border-top-color': bdTopColor},
                    {'border-right-color': bdTopColor},
                    {'top': top},
                    {'left': left}
                ]"
            ></div>
    </div>
</template>
<script>
export default {
    props: {
        width: {
            type: [String,Number],
            default: 25
        },
        bdTopColor: {
            type: String,
            default: "#3498db"
        },
        top: {
            type: [String,Number],
            default: "calc(50% - 12px)"
        },
        left: {
            type: [String,Number],
            default: "calc(50% - 12px)"
        },
    }
}
</script>
<style lang="scss" scoped>
.loading{
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.opacity{
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ffffff;
    opacity: 0.4;
}
.loader {
    position: absolute !important;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  border: 2px solid transparent;
  border-radius: 50%;
  border-top: 2px solid #3498db;
  border-right: 2px solid #3498db;
  -webkit-animation: spin 1s linear infinite; /* Safari */
  animation: spin 1s linear infinite;
}
/* Safari */
@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>