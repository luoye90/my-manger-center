<template>
  <div>
    <title-bar name="总览" :period="periodData" :hrdisable="true"></title-bar>
    <div class="chart-content">
      <canvas id="pieChart" width="360" :height="chartData.data.length*26<180?180:chartData.data.length*26"></canvas> 
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import F2 from '@antv/f2'
import titleBar from '@/components/TitleBar'
export default {
  name: 'pieCharts',
  props: ['chartData','chartMode','period'],
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
        this.initPieCharts()
      })
    }
  },
  computed: {
    periodData(){
      if(this.period){
        let temp = (this.period).split(',')
        return {
          start:{
            year: temp[0].split('-')[0],
            month: temp[0].split('-')[1]
          },
          end:{
            year: temp[1].split('-')[0],
            month: temp[1].split('-')[1]
          }
        }
      }else{
        return false
      }
    }
  },
  components: {
    titleBar
  },
  methods: {
    initPieCharts(){
      const chart = new F2.Chart({
        id: 'pieChart',
        pixelRatio: window.devicePixelRatio,
        padding: [ 20, 'auto' ]
      });
      chart.source(this.chartData.data.length ? this.chartData.data : [{"a":"1","name":"总计","money":1}]);
      chart.tooltip(false);
      chart.legend(this.chartData.data.length ? {
        position: 'right',
        clickable: false,
        itemMarginBottom: 10,
        itemFormatter:  (val) => {
          return val + '    ' + this.chartData.map[val];
        }
      }:false);
      chart.coord('polar', {
        transposed: true,
        innerRadius: 0.7,
        radius: 0.85
      });
      chart.axis(false);
      chart.interval()
        .position('a*money')
        .color('name', ['#2FC25B','#F04864','#13C2C2','#FACC14','#1890FF','#8543E0', '#3436C7', '#223273' ])
        .adjust('stack');

      chart.guide().html({
        position: [ '50%', '45%' ],
        html: `<div style="width: 250px;height: 40px;text-align: center;">
            <div style="font-size: 14px">总计</div>
            <div style="font-size: 18px">¥${this.chartData.total.toFixed(0)}</div>
          </div>`
      });
      chart.render();
    },
  }
}
</script>

<style lang="less">
  .chart-content{
    text-align: center;
    background: #fff;
  }
</style>