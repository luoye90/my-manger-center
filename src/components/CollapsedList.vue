<template>
  <div>
    <title-bar name="年度概览"></title-bar>
    <ul class="collapse ulList">
      <li class="ulList-title">
        <div class="weui-flex__item" :class="{'align-center':!showCompany}">
          <span>年度</span>
          <span v-if="showCompany">任职公司</span>
          <span v-else>五险一金</span>
          <span>年收入(¥)</span>
        </div>
      </li>
      <li :class="{'js-show':collapseShow.includes(item['年度'])}" v-for="(item,index) in listData" :key="index">
        <div class="weui-flex js-category" @click="showCollapse(item)">
          <div class="weui-flex__item" :class="{'align-center':!showCompany}">
            <span>{{item['年度']}}年</span>
            <img src="../assets/images/弘驰智能.jpg" width="35px" alt="" v-if="showCompany&&item['单位'].includes('东莞弘驰智能有限公司')">
            <img src="../assets/images/中软国际.jpg" width="50px" alt="" v-if="showCompany&&item['单位'].includes('深圳中软国际软件有限公司')">
            <img src="../assets/images/赛意信息.png" width="40px" alt="" v-if="showCompany&&item['单位'].includes('广州赛意信息科技有限公司')">
            <span class="collapse-deduct" v-if="!showCompany">{{(item['总计'] - item['实发工资']).toFixed(0)}}</span>
            <span class="collapse-total">{{item['总计']}}</span>
          </div>
          <i class="icon" :class="[collapseShow.includes(item['年度'])?'icon-35':'icon-74']"></i>
        </div>
        <div class="page-category js-categoryInner">
          <div class="weui-cells page-category-content">
            <div class="category-content">
              <p>
                <span>补助:</span> 
                <span>{{item['补助']}}</span>
              </p>
              <p>
                <span>个人社保:</span> 
                <span>{{item['个人社保']}}</span>
              </p>
              <p>
                <span>个人公积金:</span> 
                <span>{{item['个人公积金']}}</span>
              </p>
              <p>
                <span>个人所得税:</span> 
                <span>{{item['个人所得税']}}</span>
              </p>
              <p v-if="item['补充医疗']">
                <span>补充医疗:</span> 
                <span>{{item['补充医疗']}}</span>
              </p>
              <p>
                <span>实发工资:</span> 
                <span>{{item['实发工资']}}</span>
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import titleBar from '@/components/TitleBar'
export default {
  name: 'collapsedList',
  props: ['listData','showCompany'],
  data(){
    return{
      collapseShow: '',
    }
  },
  computed: {
  },
  components: {
    titleBar
  },
  methods: {
    showCollapse(item){
      this.collapseShow.includes(item['年度']) ? 
      this.collapseShow = this.collapseShow.replace(item['年度'],'') :
      this.collapseShow += item['年度']
    },
  }
}
</script>

<style lang="less">
  .ulList{
    margin-bottom: -10px;
    background: #fff;
    .ulList-title{
      margin-bottom: -5px;
      span{
        display: inline-block;
        text-align: center;
        color: #999!important;
        font-size: 12px;
        &:first-child{
          float: left;
          margin-top: 5px; 
          margin-left: 20px;
          margin-right: 35px;
        }
        &:last-child{
          float: right;
          margin-top: 5px; 
          margin-right: 36px!important;
        }
      }
    }
    li{
      margin: 0;
      .weui-flex__item{
        text-align: left;
        &.align-center{
          text-align: center;
        }
        span:first-child{
          float: left;
        }
        span:last-child{
          color: red;
        }
        img{
          vertical-align: middle;
          margin-left: 10px;
        }
        .collapse-deduct{
          color: red;
          display: inline-block;
          width: 50px;
          text-align: right;
        }
        .collapse-total{
          float: right;
          margin-right: 10px;
          display: inline-block;
          width: 60px;
        }
      }
      .category-content{
        padding: 0 15px;
        p{
          display: inline-block;
          width: 50%;
          span:first-child{
            color: #999;
            display: inline-block; 
            width: 50%;
            text-align: right;
            font-size: 12px;
          } 
          span:last-child{
            color: #343434;
            padding-left: 8px;
            font-size: 14px;
          }
        }
        p:nth-child(odd){
          float: left;
        }
        p:nth-child(even){
          float: right;
        }
      }
    }
  }
</style>