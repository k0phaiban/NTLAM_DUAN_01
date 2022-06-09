<template>
    <div class="cc-pie">
        <DxPieChart
            id="pie"
            :data-source="dataSource"
            palette="Bright"
            :title="title"
            @point-click="pointClickHandler($event)"
            @legend-click="legendClickHandler($event)"
        >
            <DxSeries
                argument-field="country"
                :value-field="valueField"
            >
            <DxLabel :visible="true">
                <DxConnector
                :visible="true"
                :width="1"
                />
            </DxLabel>
            </DxSeries>
            <DxExport :enabled="true"/>
        </DxPieChart>
    </div>
</template>

<script>

import DxPieChart, {
  DxSeries,
  DxLabel,
  DxConnector,
  DxExport
} from 'devextreme-vue/pie-chart';

export default {
  components: {
    DxPieChart,
    DxSeries,
    DxLabel,
    DxConnector,
    DxExport
  },
  props: {
        type: {
            Type: String,
            default: "spline"
        },
        typeField: {
            Type: String,
            default: "year"
        },
        dataSource: {
            Type: Array,
            default: []
        },
        width: {
            type: Number,
            default: 500
        },
        height: {
            type: Number,
            default: 300
        },
        title: {
            type: String,
            default: "Biểu đồ"
        },
        valueField: {
            type: String,
            default: "Value"
        },
        displayField: {
            type: String,
            default: "Name"
        }
    },
  data() {
    return {
    };
  },
  methods: {
    pointClickHandler(e) {
      this.toggleVisibility(e.target);
    },
    legendClickHandler(e) {
      let arg = e.target,
        item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

      this.toggleVisibility(item);
    },
    toggleVisibility(item) {
      item.isVisible() ? item.hide() : item.show();
    }
  }
};
</script>

<style lang="scss"> 
.cc-pie{
    width: 100%;
    height: 100%;
    .dxc-title{
        text{
            font-size: 20px !important;
        }
    }
}
</style>
