<template>
  <div class="cc-organization-unit">
    <DxDropDownBox
        :value="value"
        :show-clear-button="true"
        :data-source="treeDataSource"
        value-expr="organizationUnitID"
        display-expr="organizationUnitName"
        placeholder="Chọn đơn vị"
        @value-changed="syncTreeViewSelection($event)"
    >
        <template #content="{ }">
        <DxTreeView
            :ref="treeViewRefName"
            :data-source="treeDataSource"
            :select-by-click="true"
            data-structure="plain"
            key-expr="organizationUnitID"
            parent-id-expr="parentID"
            :selection-mode="mode"
            display-expr="organizationUnitName"
            @content-ready="$event.component.selectItem(value)"
            @item-selection-changed="treeView_itemSelectionChanged($event)"
        />
        </template>
    </DxDropDownBox>
  </div>
</template>
<script>
import DxDropDownBox from 'devextreme-vue/drop-down-box';
import DxTreeView from 'devextreme-vue/tree-view';
/* import OrganizationUnitAPI from "@/api/OrganizationUnitAPI.js"; */
import 'whatwg-fetch';

export default {
  components: {
    DxDropDownBox,
    DxTreeView,
  },
  props: {
      value: {
        
      },
      mode: {
          Type: String,
          default: "single"
      }
  },
  data() {
    return {
      treeDataSource: null,
      treeViewRefName: 'tree-view'
    };
  },
  async created() {
      await this.getAll();
  },
  methods: {
    syncTreeViewSelection() {
      if (!this.$refs[this.textBoxRefName]) return;
      if (!this.value) {
        this.$refs[this.textBoxRefName].instance.unselectAll();
      } else {
        this.$refs[this.textBoxRefName].instance.selectItem(this.value);
      }
    },
    treeView_itemSelectionChanged(e) {
      this.value = e.component.getSelectedNodeKeys();
      this.$emit("input", this.value);
      var listChild = this.treeDataSource.filter(x => x.parentID = this.value[0]);
      var number = listChild ? listChild.length : 1;
      var numberZero = 3 - number.toString().length;
      var ccCode = "";
      while(numberZero > 0){
        ccCode = ccCode + "0";
        numberZero = numberZero - 1;
      }
      ccCode = ccCode + number.toString();
      this.$emit("childCode",ccCode);
    },
    async getAll(){
        var res = await OrganizationUnitAPI.GetAll();
        if(res.data && res.data.success){
            this.treeDataSource = res.data.data;
        }
    }
  }
};
</script>
<style lang="scss">
.cc-organization-unit{
    width: 100%;
}
.dx-treeview-item-without-checkbox.dx-state-focused > .dx-treeview-item {
    background-color: #e3f0ff;
    color: #0075FF;
    border-radius: 4px;
}
.dx-treeview-item-without-checkbox.dx-state-selected > .dx-treeview-item {
    background-color: #e3f0ff;
    color: #0075FF;
    border-radius: 4px;
}
.dx-treeview-item{
    border-radius: 4px;
    min-height: 36px;
}
.dx-popup-wrapper > .dx-overlay-content{
    border: none;
     box-shadow: 0 2px 4px rgba(0,0,0,.175);
}
.dx-popup-content{
    padding: 8px;
}
</style>
