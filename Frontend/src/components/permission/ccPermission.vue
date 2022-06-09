<template>
    <div>

    </div>
</template>
<script>
export default {
    methods: {
        checkPermission(subCode, action, me){
            debugger
            var listRole = me.$store.getters.listRole;
            if(listRole){
                var item = listRole.find(x => x.SubCode == subCode && x.Action == action);
                return item.Value;
            }
            return false;
        }
    }
}
</script>
<style lang="scss" scoped>

</style>