<template>
<div class="cc-bar">
  <DxChart
    id="chart"
    :data-source="dataSource"
    :title="title"
  >
    <DxSeries
      argument-field="day"
      value-field="oranges"
      name="Doanh thu(VNĐ)"
      type="bar"
      color="#ffaa66"
    />
    <DxLegend
                vertical-alignment="bottom"
                horizontal-alignment="center"
                item-text-position="bottom"
            />
  </DxChart>
</div>
</template>
<script>
import { DxChart, DxSeries, DxLegend } from 'devextreme-vue/chart';

export default {
  components: {
    DxChart,
    DxSeries,
    DxLegend
  },
  props: {
    title: {
      type: String,
      default: "Biểu đồ doanh thu phân bổ theo tháng"
    }
  },
  data() {
    return {
      dataSource: [{
  day: 'Tháng 1',
  oranges: 30000000
}, {
  day: 'Tháng 2',
  oranges: 20000000
}, {
  day: 'Tháng 3',
  oranges: 30000000
}, {
  day: 'Tháng 4',
  oranges: 40000000
}, {
  day: 'Tháng 5',
  oranges: 60000000
}, {
  day: 'Tháng 6',
  oranges: 110000000
}, {
  day: 'Tháng 7',
  oranges: 40000000
}, {
  day: 'Tháng 8',
  oranges: 40000000
}, {
  day: 'Tháng 9',
  oranges: 40000000
}, {
  day: 'Tháng 10',
  oranges: 40000000
}, {
  day: 'Tháng 11',
  oranges: 40000000
}, {
  day: 'Tháng 12',
  oranges: 40000000
}]
    };
  }
};
</script>
<style lang="scss">
.cc-bar{
    width: 100%;
    height: 100%;
    .dxc-title{
        text{
            font-size: 20px !important;
        }
    }
}
</style>
