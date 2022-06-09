<template>
    <div class="cc-char">
        <DxChart
            id="chart"
            :data-source="dataSource"
            palette="Violet"
            :title="title"
            >
            <DxCommonSeriesSettings
                :type="type"
                :argument-field="typeField"
            />
            <DxCommonAxisSettings>
                <DxGrid :visible="false"/>
            </DxCommonAxisSettings>
            <DxSeries
                v-for="item in listHeaders"
                :key="item.value"
                :value-field="item.value"
                :name="item.name"
            />
            <DxMargin :bottom="20"/>
            <DxArgumentAxis
                :allow-decimals="false"
                :axis-division-factor="60"
            >
                <DxLabel>
                <DxFormat type="decimal"/>
                </DxLabel>
            </DxArgumentAxis>
            <DxLegend
                vertical-alignment="bottom"
                horizontal-alignment="center"
                item-text-position="bottom"
            />
            <DxExport :enabled="true"/>
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
  DxCommonAxisSettings,
  DxGrid,
  DxExport,
  DxLegend,
  DxMargin,
  DxTooltip,
  DxLabel,
  DxFormat,
} from 'devextreme-vue/chart';
export default {
    name: 'ccChar',
    components: {
        DxChart,
        DxSeries,
        DxArgumentAxis,
        DxCommonSeriesSettings,
        DxCommonAxisSettings,
        DxGrid,
        DxExport,
        DxLegend,
        DxMargin,
        DxTooltip,
        DxLabel,
        DxFormat,
        
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
        listHeaders: {
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
        }
    },
    data(){
        return{
        }
    },
    methods: {
    },
    
    mounted(){
        
    }
}
</script>
<style lang="scss">
@import '@/styles/var-color.scss';
.cc-char{
    width: 100%;
    height: 100%;
    .dxc-title{
        text{
            font-size: 20px !important;
        }
    }
}
</style>
