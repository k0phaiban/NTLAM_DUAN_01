<template>
  <div id="chart-demo" class="cc-line">
    <DxChart
      id="chart"
      :data-source="dataSource"
      palette="Violet"
    >
      <DxCommonSeriesSettings
        :type="type"
        argument-field="month"
      />
      <DxSeries
        v-for="energy in energySources"
        :key="energy.value"
        :value-field="energy.value"
        :name="energy.name"
      />
      <DxMargin :bottom="20"/>
      <DxArgumentAxis
        :value-margins-enabled="false"
        discrete-axis-division-mode="crossLabels"
      >
        <DxGrid :visible="true"/>
      </DxArgumentAxis>
      <DxLegend
        vertical-alignment="bottom"
        horizontal-alignment="center"
        item-text-position="bottom"
      />
      <DxExport :enabled="true"/>
      <DxTitle text="Biểu đồ biến động xuất nhập kho theo đơn giá">
        <DxSubtitle text="Biến động theo tháng"/>
      </DxTitle>
      <DxTooltip :enabled="true"/>
    </DxChart>
  </div>
</template>
<script>
import {
  DxChart,
  DxSeries,
  DxArgumentAxis,
  DxCommonSeriesSettings,
  DxExport,
  DxGrid,
  DxMargin,
  DxLegend,
  DxTitle,
  DxSubtitle,
  DxTooltip
} from 'devextreme-vue/chart';

export default {

  components: {
    DxChart,
    DxSeries,
    DxArgumentAxis,
    DxCommonSeriesSettings,
    DxExport,
    DxGrid,
    DxMargin,
    DxLegend,
    DxTitle,
    DxSubtitle,
    DxTooltip
  },

  data() {
    return {
      types: ['line', 'stackedline', 'fullstackedline'],
      type: 'line',
      energySources :[
        { value: 'hydro', name: 'Nhập kho' },
        { value: 'oil', name: 'Xuất kho' },
        ],
        dataSource : [{
  hydro: 59,
  oil: 93,
  month: "Tháng 1"
}, {
  hydro: 74,
  oil: 30,
  month: "Tháng 2"
}, {
  hydro: 40,
  oil: 12,
  month: "Tháng 3"
}, {
  hydro: 22,
  oil: 24,
  month: "Tháng 4"
}, {
  hydro: 19,
  oil: 11,
  month: "Tháng 5"
}, {
  hydro: 6,
  oil: 12,
  month: "Tháng 6"
}, {
  hydro: 6.1,
  oil: 12,
  month: "Tháng 7"
}, {
  hydro: 6,
  oil: 12,
  month: "Tháng 8"
}, {
  hydro: 6,
  oil: 12,
  month: "Tháng 9"
}, {
  hydro: 6,
  oil: 12,
  month: "Tháng 10"
}, {
  hydro: 6,
  oil: 12,
  month: "Tháng 11"
}, {
  hydro: 6,
  oil: 12,
  month: "Tháng 12"
}]

    };
  }
};
</script>
<style>
.options {
    padding: 20px;
    background-color: rgba(191, 191, 191, 0.15);
    margin-top: 20px;
}

.option {
    margin-top: 10px;
}

.caption {
    font-size: 18px;
    font-weight: 500;
}

.option > span {
    margin-right: 14px;
}

.option > .dx-widget {
    display: inline-block;
    vertical-align: middle;
}
</style>
