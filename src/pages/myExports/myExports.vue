<template>
<view class="container">

    <view class="headBox">
        <view class="oneBox div_float">
            <view class="l">总收入（元）</view>
            <view class="r" @tap="toExportDeposit">提现
                <text class="lineBox arrow_w"></text>
            </view>
        </view>
        <view class="twoBox" v-if="allMoney">{{allMoney}}</view>
        <view class="twoBox" v-else>0</view>
        <view class="threeBox">累计提现(元)：{{withdrawTotal}}</view>
    </view>

    <!-- 选择时间段 -->
    <view class="selTimeBox div_float">
        <view class="l_box">
            <view class="one" @tap="changeType">{{selTypeText}}
                <text class="lineBox downIcon"></text>
            </view>
            <view class="two" :hidden="hideSelType">
                <view class="one" @click.stop="changeType">{{selTypeText}}
                    <text class="lineBox downIcon"></text>
                </view>
                <view class="other" @click.stop="selTypeFun" :data-s-text="(selTypeText == '全部' ? '时间段':'全部')">{{selTypeText == '全部' ? "时间段":"全部"}}</view>
            </view>
        </view>
        <view class="r_box" v-if="hideselTime" @tap="screenTime">
            <view class="lineBox">{{startTime}}</view>
            <view class="lineBox2">-</view>
            <view class="lineBox">{{endTime}}</view>
        </view>
    </view>

    <!-- 列表 -->
    <view class="contentBox" v-if="noneData">
        <block v-for="(item, idx) in records" :key="idx">
            <view class="c_list">
                <view class="c_l">
                    <view class="c_sub_l lineBox">
                        <view class="til" v-if="item.status == 0">待审核</view>
                        <view class="til" v-if="item.status == 1">审核通过</view>
                        <view class="til" v-if="item.status == 2">审核未过</view>
                        <view class="time">{{item.applicantDate}}</view>
                    </view>
                </view>
                <view class="c_r">-
                    <text>¥{{item.money}}0</text>
                </view>
            </view>
        </block>
    </view>
    <!-- 没数据 -->
    <view class="contentBox" v-else>
        <view class="flex center column noneData">
            <image src="../../images/noneData.png" class="img"></image>
            <view class="noneDataTxt">没有数据了~</view>
        </view>
    </view>

     <!-- 分页 -->
        <view class="placeholder2" v-if="show">
            <view v-if="completeType">
                <image src="../../images/Success.png" class="successIcon"></image>
                <text class="loadingText">加载完毕!</text>
            </view>
            <view v-else>
                <image src="../../images/loadmore.gif" class="successIcon"></image>
                <text class="loadingText">加载中...</text>
            </view>
        </view>

    <!-- 选择开始日期 -->
    <view class="pickerLayer fixedView" :hidden="startHidePicker">
        <!-- 旧版 -->
        <!-- <view class="dataPicker {{animate1}}" style="animation-duration:0.5s;">
            <view class="p_head">
                <view class="l" bindtap="selTimeFun">取消</view>
                <view>选择开始时间</view>
                <view class="r" bindtap="startConfirmTime">确定</view>
            </view>
            <picker-view mask-class="pickerMask" indicator-style bindchange="startTimeChange">
                <picker-view-column>
                    <view wx:for="{{yearArr}}" wx:for-index="idx" wx:key="{{idx}}" data-year="{{item}}" class="p_list">
                        <view>{{item}}</view>
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view wx:for="{{12}}" wx:for-index="idx" wx:key="{{idx}}" data-month="{{item+1}}" class="p_list">
                        <view>{{item+1}}</view>
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view wx:for="{{31}}" wx:for-index="idx" wx:key="{{idx}}" data-day="{{item+1}}" class="p_list">
                        <view>{{item+1}}</view>
                    </view>
                </picker-view-column>
            </picker-view>
        </view> -->
        <!-- 新版 -->
        <view :class="'dataPicker ' + animate1" style="animation-duration:0.5s;">
            <van-datetime-picker title="开始时间" confirm-button-text="确定" type="date" :value="currentDateStart" @confirm="onInputStart" @cancel="offBox" :min-date="minDate + ' '"></van-datetime-picker>
        </view>
    </view>

    <!-- 选择结束时间 -->
    <view class="pickerLayer fixedView" :hidden="endHidePicker">
        <!-- 旧版 -->
        <!-- <view class="dataPicker {{animate2}}" style="animation-duration:0.5s;">
            <view class="p_head">
                <view class="l" bindtap="selTimeFun">取消</view>
                <view>选择结束时间</view>
                <view class="r" bindtap="endConfirmTime">确定</view>
            </view>
            <picker-view mask-class="pickerMask" indicator-style bindchange="endTimeChange">
                <picker-view-column>
                    <view wx:for="{{yearArr}}" wx:for-index="idx" wx:key="{{idx}}" data-year="{{item}}" class="p_list">
                        <view>{{item}}</view>
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view wx:for="{{12}}" wx:for-index="idx" wx:key="{{idx}}" data-month="{{item+1}}" class="p_list">
                        <view>{{item+1}}</view>
                    </view>
                </picker-view-column>
                <picker-view-column>
                    <view wx:for="{{31}}" wx:for-index="idx" wx:key="{{idx}}" data-day="{{item+1}}" class="p_list">
                        <view>{{item+1}}</view>
                    </view>
                </picker-view-column>
            </picker-view>
        </view> -->
        <!-- 新版 -->
        <view :class="'dataPicker ' + animate2" style="animation-duration:0.5s;">
            <van-datetime-picker title="结束时间" confirm-button-text="确定" type="date" :value="currentDateEnd" @confirm="onInputEnd" @cancel="offBox" :min-date="minDateEnd + ' '"></van-datetime-picker>
        </view>
    </view>
</view>
</template>

<script>
// 引入request
const Http = require("../../utils/httpRequest.js");
import vanDatetimePicker from "../../dist/datetime-picker/index";

export default {
  data() {
    return {
      total: 0,
      //总数据
      animate1: 'animated slideInUp',
      //Animate动画（开始）
      animate2: 'animated slideInUp',
      //Animate动画（结束）
      allMoney: '',
      //总收入
      withdrawTotal: '',
      //累计提现
      records: [],
      //提现记录
      hideSelType: true,
      //隐藏选择类型弹框
      selTypeText: '全部',
      //选择类型
      hideselTime: false,
      //选择时间 （true显示，false隐藏）
      startHidePicker: true,
      //隐藏开始时间选项框  （true隐藏，false显示）
      endHidePicker: true,
      //隐藏结束时间选项框  （true隐藏，false显示）
      startTime: '2019/1/1',
      //开始时间
      endTime: '2019/1/1',
      //结束时间
      startSignTime: '2019/1/1',
      //临时记录开始时间
      endSignTime: '2019/1/1',
      //临时记录结束时间
      timeType: 1,
      //时间段 1：开始时间 2：结束时间
      yearArr: [],
      //年份
      totalPage: 0,
      //总数据页面
      currentPage: 1,
      //当前页
      show: false,
      //是否显示loading状态
      completeType: false,
      //记载是否完成
      noneData: false,
      //没有数据
      // vant组件时间戳
      currentDateStart: new Date().getTime(),
      currentDateEnd: new Date().getTime(),
      minDate: new Date(2017, 12, 1).getTime(),
      startYear: '',
      //年
      startMonth: '',
      //月
      startDay: '',
      //日
      endYear: '',
      //年
      endMonth: '',
      //月
      endDay: '',
      //日
      minDateEnd: new Date(2017, 12, 1).getTime() //开始时间结束时为结束时间可选的最小值
      ,
      currentDate: ""
    };
  },

  components: {
    vanDatetimePicker
  },
  props: {},
  //  页面上拉触底事件的处理函数
  onReachBottom: function () {
    // Do something when page reach bottom.
    if (this.currentPage < this.totalPage) {
      this.currentPage = this.currentPage + 1;
      this.getProfit();
    } else {
      this.setData({
        completeType: true
      });
    }
  },
  onShow: function () {
    // this.addYear()
    this.setData({
      records: [],
      currentPage: 1
    });
    this.getProfit(); //我的提现数据
  },
  methods: {
    //vant 确认开始时间
    onInputStart(event) {
      let date = event.detail;
      let year = new Date(date).getFullYear();
      let month = new Date(date).getMonth();
      let day = new Date(date).getDate();
      let endTime = new Date(year, month, day).getTime();
      this.setData({
        animate1: 'animated slideOutDown',
        currentDateStart: event.detail,
        startYear: new Date(event.detail).getFullYear(),
        startMonth: new Date(event.detail).getMonth() + 1,
        startDay: new Date(event.detail).getDate(),
        minDateEnd: endTime
      });
      setTimeout(() => {
        this.setData({
          animate2: 'animated slideInUp',
          startHidePicker: true,
          endHidePicker: false,
          animate1: 'animated slideInUp',
          startTime: `${this.startYear}/${this.startMonth}/${this.startDay}`
        });
      }, 650);
    },

    // vant 确认结束时间
    onInputEnd(event) {
      this.setData({
        animate2: 'animated slideOutDown',
        currentDate: event.detail,
        endYear: new Date(event.detail).getFullYear(),
        endMonth: new Date(event.detail).getMonth() + 1,
        endDay: new Date(event.detail).getDate(),
        records: [],
        currentPage: 1
      });
      setTimeout(() => {
        this.setData({
          animate2: 'animated slideInUp',
          endHidePicker: true,
          endTime: `${this.endYear}/${this.endMonth}/${this.endDay}`
        });
        this.getProfit(this.startTime + ' 00:00', this.endTime + ' 23:59');
      }, 650);
    },

    // vant 时间选项box
    offBox() {
      this.setData({
        startHidePicker: true,
        endHidePicker: true
      });
    },

    // 筛选器上的年份（旧版）
    addYear() {
      for (let i = 2019; i <= 2080; i++) {
        this.setData({
          yearArr: this.yearArr.concat(i)
        });
      }
    },

    // 跳转提现
    toExportDeposit() {
      wx: wx.navigateTo({
        url: '../../pages/exportDeposit/exportDeposit'
      });
    },

    // 获取我的提现信息
    getProfit(start, end) {
      this.setData({
        show: false
      });

      if (start === undefined) {
        start = '';
      }

      if (end === undefined) {
        end = '';
      }

      Http.$get(`issuer/withdrawRecord`, {
        start: start,
        end: end,
        pageNo: this.currentPage,
        pageSize: 9
      }).then(res => {
        if (res.code === 0) {
          // console.log(res)
          res.data.records.forEach(item => {
            item.applicantDate = item.applicantDate.split(' ')[0];
            item.applicantDate = item.applicantDate.replace(/-/g, '/');
          });
          this.setData({
            allMoney: res.data.earning,
            withdrawTotal: res.data.withdrawTotal,
            records: this.records.concat(res.data.records),
            total: res.data.total,
            totalPage: res.data.totalPage
          });
        } else {
          console.log('失败：', res.msg);
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
          });
        } // 判断是否有数据


        if (this.total == 0) {
          this.setData({
            noneData: false
          });
        } else {
          this.setData({
            noneData: true
          });
        } // 判断是否该隐藏loading状态栏


        if (this.total > 6) {
          this.setData({
            show: true
          });
        }
      });
    },

    //切换类型
    changeType() {
      let sign = true;

      if (this.hideSelType) {
        sign = false;
      }

      this.setData({
        hideSelType: sign
      });
    },

    //选择类型
    selTypeFun(ele) {
      this.setData({
        selTypeText: ele.currentTarget.dataset.sText
      });

      if (this.selTypeText == '时间段') {
        this.setData({
          hideselTime: true
        });
      } else {
        this.setData({
          hideselTime: false,
          records: [],
          currentPage: 1
        });
        this.getProfit(); //我的提现数据
      }

      this.changeType();
    },

    //监控开始时间（旧版）
    startTimeChange(ele) {
      let selArr = ele.detail.value; //设置时间

      this.setData({
        startSignTime: this.yearArr[selArr[0]] + '/' + (selArr[1] + 1) + '/' + (selArr[2] + 1)
      });
      console.log(this.startSignTime);
    },

    //监控结束时间（旧版）
    endTimeChange(ele) {
      let selArr = ele.detail.value; //设置时间

      this.setData({
        endSignTime: this.yearArr[selArr[0]] + '/' + (selArr[1] + 1) + '/' + (selArr[2] + 1)
      });
      console.log(this.endSignTime);
    },

    // 点击筛选时间按钮
    screenTime() {
      this.setData({
        startHidePicker: false
      });
    },

    // 确定开始选择的时间（旧版）
    startConfirmTime() {
      this.setData({
        animate1: 'animated slideOutDown'
      });
      setTimeout(() => {
        this.setData({
          animate2: 'animated slideInUp',
          startTime: this.startSignTime,
          startHidePicker: true,
          endHidePicker: false,
          animate1: 'animated slideInUp'
        });
      }, 650);
    },

    // 确定结束选择的时间（旧版）
    endConfirmTime() {
      //判断选择开始的年份是否小于或等于结束的年份
      if (this.startSignTime.split('/')[0] <= this.endSignTime.split('/')[0]) {
        // 如果年份相等到第一条，不等跑第二条
        if (this.startSignTime.split('/')[0] === this.endSignTime.split('/')[0]) {
          // 在相同年份时，判断开始的月份是否小于或等于结束的月份
          if (this.startSignTime.split('/')[1] <= this.endSignTime.split('/')[1]) {
            // 如果月份相等到第一条，不等跑第二条
            if (this.startSignTime.split('/')[1] === this.endSignTime.split('/')[1]) {
              // 判断开始的天数是否小于结束的天数
              if (this.startSignTime.split('/')[2] < this.endSignTime.split('/')[2]) {
                this.getProfit(this.startSignTime, this.endSignTime);
                setTimeout(() => {
                  this.setData({
                    endTime: this.endSignTime,
                    endHidePicker: true
                  });
                }, 200);
              } else if (this.startSignTime.split('-')[2] === this.endSignTime.split('/')[2]) {
                wx.showToast({
                  title: '您选的开始时间和结束重复了，请重新选择！',
                  icon: 'none',
                  duration: 3000
                });
              } else {
                wx.showToast({
                  title: '您选的时间有误请重新选择！',
                  icon: 'none',
                  duration: 3000
                });
              }
            } else {
              this.getProfit(this.startSignTime, this.endSignTime);
              setTimeout(() => {
                this.setData({
                  endTime: this.endSignTime,
                  endHidePicker: true
                });
              }, 200);
            }
          } else {
            wx.showToast({
              title: '您选的时间有误请重新选择！',
              icon: 'none',
              duration: 3000
            });
          }
        } else {
          this.getProfit(this.startSignTime + ' 00:00', this.endSignTime + ' 23:59');
          setTimeout(() => {
            this.setData({
              endTime: this.endSignTime,
              endHidePicker: true
            });
          }, 200);
        }
      } else {
        wx.showToast({
          title: '您选的时间有误请重新选择！',
          icon: 'none',
          duration: 3000
        });
      }
    },

    // 取消选择时间（旧版）
    selTimeFun() {
      this.setData({
        startHidePicker: true,
        endHidePicker: true
      });
    },

    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split('.');
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }

          data = data[key2];
        });
      });
    }
  }
};
</script>
<style>
@import "./myExports.css";
</style>