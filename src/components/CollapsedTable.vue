<template>
  <div class="collapsedTable">
    <title-bar :name="chartMode==='income'?'收入明细':'负债明细'"></title-bar>
    <div class="table-box">
      <table class="thead-box" v-show="theadFixed">
        <thead>
          <tr>
            <th style="background:#e3e7f3;">月份</th>
            <th style="background: #f3bab0;">{{chartMode==='income'?'收入(¥)':'负债(¥)'}}</th>
            <th style="background: #6c9;">较上月(¥)</th>
          </tr>
        </thead>
      </table>
      <table>
        <thead>
          <tr>
            <th style="background:#e3e7f3;">月份</th>
            <th style="background: #f3bab0;">{{chartMode==='income'?'收入(¥)':'负债(¥)'}}</th>
            <th style="background: #6c9;" :style="{'width':chartMode==='income'?'33.3%':'40%'}">较上月(¥)</th>
          </tr>
        </thead>
        <tbody v-for="(item,index) in tableData" :key="index">
          <tr @click="itemClick(item)">
            <td>
              <i class="icon icon-8" :class="[item.isOpen?'icon-open':'icon-closed']"></i>
            <span>{{item['月份']}}</span>
            </td>
            <td>
              <span class="text-red">{{item['总计'].toFixed(0)}}</span>
            </td>
            <td>
              <span>{{item['较上月']}}</span>
              <i class="icon icon-59" :class="{'icon-up':item['较上月']>0,'icon-down':item['较上月']<0,'icon-hidden':item['较上月']==0}"></i>
            </td>
          </tr>
          <tr v-show="item.isOpen&&(typeof(value)=='number'&&value>0||(key=='单位'&&showCompany))" v-for="(value,key) in item" :key=key class="tr-open">
            <td>{{key}}:</td>
            <td class="text-nowrap">
              <span>{{value}}</span>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import {mapState,mapMutations,mapActions} from 'vuex'
import titleBar from '@/components/TitleBar'
export default {
  name: 'collapsedTable',
  props: ['listData','chartMode','showCompany'],
  data(){
    return{
      tableData: ''
    }
  },
  computed: {
    ...mapState(['scrollTop']),
    theadFixed(){
      let tableBox = document.querySelector('.table-box'),offsetTop = 0;
      if(tableBox){
        offsetTop = tableBox.offsetTop
      }
      return offsetTop < this.scrollTop
    }
  },
  components: {
    titleBar
  },
  created(){
  },
  mounted(){
  },
  watch:{
    listData(val){
      this.tableData = JSON.parse(JSON.stringify(val));
      this.tableData.forEach((item,index)=>{
        this.$set(item,'isOpen',false)
        item['较上月'] = 0;
        if(index<this.tableData.length-1){
          item['较上月'] = parseFloat((item['总计'] - this.tableData[index+1]['总计']).toFixed(0))
          item['较上月'] > 0 ? item['较上月'] = `+${item['较上月']}` : ''
        }
      })
    }
  },
  methods: {
    itemClick(item){
      item.isOpen = !item.isOpen
    }
  }
}
</script>

<style lang="less">
  .collapsedTable{
    .table-box{
      background: #fff;
      padding: 0 10px 15px 10px;
      table{
        &.thead-box{
          position:fixed;
          width:94.5%;
          top:0px;
          z-index:1;
          max-width:394px;
        }
        thead{
          tr{
            th{
              border: none;
              font-size: 15px;
              line-height: 1;
              &:first-child{
                width: 33.33%;
              }
              text-align: center;
            }
          }
        }
        tbody{
          tr{
            background: #f8f8f8;
            td{
              border-width: 0;
              border-bottom-width: 1px;
              .icon-open,.icon-closed{
                color: #4169e2;
                transform: rotateZ(180deg);
                margin-right: 8px;
                vertical-align: bottom;
                font-size: 14px;
                transition: all .3s;
              }
              .icon-closed{
                transform: rotateZ(90deg);
              }
              .icon-up,.icon-down,.icon-hidden{
                float: right;
                transform: rotateZ(90deg);
                color: red;
                margin: 0 5px 0 5px;
              }
              .icon-down{
                transform: rotateZ(270deg);
                color: green;
              }
              .icon-hidden{
                visibility: hidden;
              }
              &:last-child{
                text-align: right;
              }
              &:nth-child(2){
                text-align: right;
                padding-right: 30px;
              }
            }
          }
          tr.tr-open{
            td{
              background: #fff;
              text-align: left;
              font-size: 14px;
              line-height: 14px;
              color: #737373;
              &:first-child{
                text-align: right;
              }
              &.text-nowrap{
                position: relative;
                span{
                  white-space: nowrap;
                  position: absolute;
                  line-height: 0;
                }
              }
            }
          }
        }
      }
      .text-red{
        color: red;
      }
    }
  }
</style>