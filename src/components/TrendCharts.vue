<template>
  <div>
    <title-bar :name="chartMode==='income'?'收入趋势':'负债趋势'"></title-bar>
    <div class="chart-content">
      <p class="chart-period"></p>
      <canvas id="trendChart" width="360" height="280"></canvas> 
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import F2 from '@antv/f2';
import _ from 'lodash'
import titleBar from '@/components/TitleBar'
export default {
  name: 'trendCharts',
  props: ['chartData','chartMode','paddingTop','itemWidth'],
  data() {
    return {
    } 
  },
  created(){
  },
  mounted(){ 
  },
  watch:{
    chartData(val){
      this.$nextTick(()=>{
        this.initTrendCharts()
      })
    }
  },
  computed: {
  },
  components: { 
    titleBar   
  },
  methods: {
    initTrendCharts(){
      let paddingTop = this.paddingTop||85
      let itemWidth = this.itemWidth||150
      let legendClickable = false
      const chart = new F2.Chart({ 
          id: 'trendChart',
          padding: [paddingTop, 'auto', 'auto', 'auto'],
          pixelRatio: window.devicePixelRatio // 指定分辨率
      });
      chart.source(this.chartData, {
        date: {
          range: [ 0, 1 ],
          type: 'timeCat',
          mask: 'YYYY-MM'
        },
      });
      chart.tooltip({
        alwaysShow: true,
        showCrosshairs: true,
        custom: true, // 自定义 tooltip 内容框
        onChange: obj => {
          const legend = chart.get('legendController').legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items
          const map = {};
          legendItems.forEach(function(item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.forEach(function(item) {
            const name = item.name;
            const value = parseFloat(item.value).toFixed(0);
            if(value==0){
              delete map[name]
            }else if (map[name]) {
              map[name].value = value;
            }
          });
          document.querySelector('.chart-period').innerHTML = `${obj.items[0].title} 明细`
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      // 设置图例居中显示
      chart.legend({
        align: 'center',
        offsetY: 5,
        offsetX: -20,
        clickable: legendClickable,
        itemMarginBottom: 10,
        itemWidth: itemWidth // 图例项按照实际宽度渲染
      });
      chart.legend('总计', false)
      chart.axis('date', {
        label: function label(text, index, total) {
          const textCfg = {};
          if (index === 0) {
            textCfg.textAlign = 'left';
          } else if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.area()
        .position('date*value')
        .color('name');
      chart.line()
        .position('date*value')
        .color('name');
      chart.render();
    }
  }
}
</script>

<style lang="less">
  .chart-content{
    text-align: center;
    background: #fff;
    .chart-period{
      min-height: 1px;
      margin-bottom: -16px;
    }
  }
</style>