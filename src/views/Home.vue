<template>
  <div class="body">
    <header class="banner">
      <img :src="[navData.active=='收入'?'images/收入.jpg':'images/负债.jpg']" alt="">
      <span :class="{'color-normal':navData.active=='收入'}" v-show="!isLoading">{{dateInfo.start}}</span>
      <span class="top-tips" v-show="!isLoading">{{dateInfo.text}}</span>
    </header>
    <nav class="weui-tab">
      <div class="weui-navbar">
        <div class="weui-navbar__item" :class="{'tab-blue': navData.active===item.nameCn}" 
        v-for="item in navData.list" :key="item.id" @click="navClick(item)">
          {{item.nameCn}}
        </div>
      </div>
    </nav>
    <router-view :key="$route.query.isFree"/>
    <footer>
      <span>{{devicesInfo}}</span>
    </footer>
  </div>
</template>
 
<script>
import {mapState,mapMutations,mapActions} from 'vuex'
export default {
  data(){
    return{
      navData: {
        active: '收入',
        list: [
          {nameCn: '收入',nameEn: 'InCome',id: 1},
          {nameCn: '负债',nameEn: 'Debts',id: 2}
        ]
      },
      devicesInfo:''
    }
  },
  components: {
  },
  created(){
    this.navData.active = this.$route.name==='InCome'?'收入':'负债';
    this.devicesInfo = navigator.userAgent.split(';').filter(item=>item.includes('Build'));
    this.devicesInfo = (this.devicesInfo.length&&this.devicesInfo[0].split(' ')[1])||'我是有底线的';
  },
  computed:{
    ...mapState(['isLoading']),
    dateInfo(){
      let start = '',year='',month='',day='';
      if(this.navData.active=='收入'){ 
        year = new Date().getFullYear() - 2018 - 1,
        month = new Date().getMonth() + 8,
        day = new Date().getDate() + 11;
        start = '20180419';
      }else if(this.navData.active=='负债'){
        year = new Date().getFullYear() - 2017 - 1,
        month = new Date().getMonth(),
        day = new Date().getDate() + 3,
        start = '20171227';
      }
      switch(month) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
          if(day>31){
            day = day -31;
            month++;
          }
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          if(day>30){
            day = day -30;
            month++;
          }
          break;
        case 2:
          if(day>29){
            day = day -29;
            month++;
          }
          break;
        default: 
          break;
      }
      if(month>11){
        month -= 12
        year++
      }

      return{
        year,month,day,start,
        text: this.navData.active=='收入' ? 
        `任职web前端${year}年${month}个月${day}天` : `Q宝事件${year}年${month}个月${day}天`
      }
    }
  },
  methods: {
    navClick(item){
      if(this.navData.active!=item.nameCn){
        this.navData.active = item.nameCn;
        this.$router.push({path:`/Home/${item.nameEn}`})
      }
    }
  }
}
</script>

<style lang="less">
  .body{
    background: #f7f7f7;
    max-width: 414px;
    display: inline-block;
    .banner{
      position: relative;
      line-height: 1;
      margin-bottom: -3px;
      img{
        width: 100%;
      }
      span{
        position: absolute;
        right: 0;
        bottom: 20px;
        color: #870209;
        font-style: italic;
        font-weight: bold;
        padding: 2px 10px;
        opacity: .5;
        &.color-normal{
          opacity: .2;
          color: #4169e2;
        }
        &.top-tips{
          right: 0;
          bottom: 5px;
          font-style: normal; 
          font-weight: normal;
          color: #fff;
          font-size: 12px;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          background-color: rgba(150, 103, 83,.6); 
        }
      }
    }
    nav{
      height: 54px!important;
      .weui-navbar{
        .weui-navbar__item{
          background: #fff!important;
          &.tab-blue{
            color: #4169e2!important;
            border-bottom-color: #4169e2!important;
          }
        }
      }
    }
    footer{
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
    }
  }
</style>
