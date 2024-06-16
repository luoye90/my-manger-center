<template>
  <div>
    <div class="weui-form">
      <div class="weui-form-li iblock">
        <input class="weui-form-checkbox" type="radio" id='r1' name="mode" :value="true" v-model="isFree">
        <label for="r1" >
          <i class="weui-icon-radio"></i>
          <div class="weui-form-text"><p>计息债务</p></div>
        </label>
      </div>
      <div class="weui-form-li iblock">
        <input class="weui-form-checkbox" type="radio" id='r2' name="mode" :value="false" v-model="isFree">
        <label for="r2" >
          <i class="weui-icon-radio"></i>
          <div class="weui-form-text"><p>信用卡/私债</p></div>
        </label>
      </div>
    </div>
    <pie-charts :chartData="pieChartData" chartMode="debts" :period="period"></pie-charts>
    <trend-charts :chartData="trendChartData" chartMode="debts" :paddingTop="$route.query.isChange?97:135" :itemWidth="103"></trend-charts>
    <collapsed-table :listData="debtsData" chartMode="debts"></collapsed-table>
    <div class="loading2" data-text="加载中..." v-show="isLoading"></div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import api from '@/common/api'
import pieCharts from '@/components/PieCharts'
import trendCharts from '@/components/TrendCharts'
import collapsedList from '@/components/CollapsedList'
import collapsedTable from '@/components/CollapsedTable'
export default {
  name: 'debts',
  data() {
    return {
      debtsData: [],
      period: '',
      isFree: this.$route.query.isFree||false
    }
  },
  components:{
    trendCharts,
    pieCharts,
    collapsedList,
    collapsedTable
  },
  created(){
    this.setLoadingStatus(true)
    api.getDebtsData().then(res=>{
      this.setLoadingStatus(false)
      if(res){ 
        let temp = this.isFree ? res.data.debts : res.data.loans
        this.debtsData = temp.map((item,index)=>{
          item['总计'] = 0;
          for(var key in item){
            item[key]=='-'?item[key]=temp[index+1][key]:'';
            if(typeof(item[key])==='number'&&key!='总计'){
              item['总计'] = parseFloat((item['总计']+item[key]).toFixed(2))
            }
          }
          return item
        })
        this.period = this.debtsData[this.debtsData.length-1]['月份'] + ',' + this.debtsData[0]['月份']
      }
    })
  },
  mounted(){
  },
  watch: {
    isFree(val){
      let query = val ? {isFree:true} : {}
      this.$router.push({path: '/Home/Debts',query: query})
    }
  },
  computed: {
    ...mapState(['isLoading']),
    pieChartData(){
      let temp = [];
      for(var key in this.debtsData[0]){
        if(typeof(this.debtsData[0][key])=="number"&&key!='总计'&&this.debtsData[0][key]>0){
          temp.push({a: '1',name: key,money: this.debtsData[0][key]});
        }
      }
      let map = {}, total = 0;
      temp.forEach(item=>{
        map[item.name] = '¥ ' + item.money;
        total += item.money;
      });
      return  {data: temp,map: map,total: total}
    },
    trendChartData(){
      let temp = []
      this.debtsData.forEach(item=>{
        for(var key in item){
          if(typeof(item[key])=="number"){
            temp.push({value: item[key],name: key,date: item['月份']})
          }
        }
      })
      return temp
    },
    collapseData(){
      let temp = [];
      this.debtsData.forEach(item=>{
      })
      return temp
    }
  },
  methods: {
    ...mapMutations([
      'setLoadingStatus'
    ])
  }
}
</script>

<style lang="less">
  
</style>