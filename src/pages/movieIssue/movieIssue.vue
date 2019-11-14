<template>
  <view class="container">
    <!-- 电影信息 -->
    <view class="seaCnBox">
      <view class="movieList div_float">
        <view class="imgView">
          <image :src="value.coverBill"></image>
          <view class="atten">{{ value.count }}人想看</view>
        </view>
        <view class="movieMsg">
          <view class="m_til eli_one">{{ value.name }}</view>
          <view class="stratView div_float">
            <view class="flex alignCenter">
              <view class="l lineBox">
                <van-rate
                  readonly
                  color="#FF6900"
                  :value="value.score / 2"
                  :size="14"
                  allow-half
                ></van-rate>
              </view>
              <view class="r lineBox">{{ value.score }}</view>
            </view>
          </view>
          <view class="flex">
            <view class="type eli_one" style="max-width:260rpx;">{{
              value.filmAttr
            }}</view>
            <view class="type">丨{{ value.len }}分钟</view>
          </view>
          <view class="type">{{ value.country }}</view>
          <view class="type">上架时间：</view>
          <view class="type">{{ value.date }}</view>
          <view class="price">￥{{ value.price }}</view>
        </view>
      </view>
    </view>
    <!-- 发布日期 -->
    <view class="issDateBox">
      <view class="isTil">发布日期：</view>
      <scroll-view class="dateView" scroll-x>
        <block v-for="(item, idx) in allDay" :key="idx">
          <view
            :class="'d_list ' + (selTimeIdx == idx ? 'sel' : '')"
            :data-s-idx="idx"
            :data-items="item.dateRows"
            :data-sceneDate="item.date"
            @tap="selDayFun"
            >{{ item.date }}</view
          >
        </block>
      </scroll-view>
      <view class="addTime" @tap="startPullPicker">添加播放场次</view>
      <view class="timeView">
        <block v-for="(item, idx) in currentScene" :key="idx">
          <view class="t_list">
            <text
              class="lineBox delIcon"
              :data-s-idx="idx"
              @tap="delMovieTime"
              :data-currentDate="currentDate"
              :data-start="item.start"
              :data-end="item.end"
              :data-id="item.id"
            ></text>
            <text style="padding-right:20rpx;">{{ currentDate }}</text>
            <text>{{ item.start }}-{{ item.end }}</text>
          </view>
        </block>
      </view>
    </view>

    <!-- 生成分享页 -->
    <view
      :class="share ? 'createShare' : 'createShare2'"
      @tap="toMyMovieAddress"
      >生成我的电影分享页</view
    >

    <!-- 选择日期 -->
    <view class="pickerLayer fixedView" :hidden="!startShowPicker">
      <view :class="'dataPicker ' + animate1" style="animation-duration:0.5s;">
        <view class="p_head div_float">
          <view class="l" @tap="startPullPicker">取消</view>
          <view class="m">开始时间({{ currentDate }})</view>
          <view class="r" @tap="confirmTimeStart">确定</view>
        </view>
        <picker-view
          mask-class="pickerMask"
          indicator-style
          @change="startHourChange"
          :value="pickerArea"
        >
          <picker-view-column>
            <view v-for="(item, idx) in 24" :key="idx" class="p_list">
              <view v-if="item < 10">0{{ item }}</view>
              <view v-else>{{ item }}</view>
            </view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="(item, idx) in secons" :key="idx" class="p_list">
              <view>{{ item }}</view>
            </view>
          </picker-view-column>
        </picker-view>
      </view>
    </view>
  </view>
</template>

<script>
//index.js
//获取应用实例
const moment = require("../../utils/moment.min.js");
var weekday = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六"
];
var belongDay = ["今天", "明天", "后天"]; // 引入request
// 引入request
const Http = require("../../utils/httpRequest.js"); // const skeletonData = require('./skeletonData')
// import vanRate from "../../dist/rate/index";

export default {
  data() {
    return {
      // skeletonData: skeletonData,
      animate1: "animated slideInUp",
      //Animate动画（开始）
      ele: "",
      //删除场次的传参
      startHour: "",
      //开始时钟（判断）
      startMinute: "",
      //开始分钟（判断）
      currentDate: "",
      //当前电影日期
      currentScene: [],
      //当前电影场次
      allDay: [],
      //电影排场
      id: "",
      //电影id
      selTime: "",
      //添加时间
      selTimeIdx: 0,
      //选中日期
      startShowPicker: false,
      //显示（开始）选择时间
      startHourText: "00",
      //选中(开始)场次小时
      startMinuteText: "00",
      //选中（开始）场次分钟
      value: [],
      //电影详情
      share: false,
      //判断该电影是否在这几天内有排场---有》true----没有》false
      pickerArea: [0, 0],
      //时间选择滚动的位置
      secons: ["00", 10, 20, 30, 40, 50] //picker过滤时间显示
    };
  },

  components: {
    vanRate
  },
  props: {},
  onLoad: function(e) {
    let hmArr = this.getHM();
    let minutes = hmArr[1];

    if (hmArr[1] % 10 == 0) {
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
    } else {
      let num = Math.ceil(minutes / 10) * 10;
      minutes = num === 60 ? "00" : num;
    }

    this.setData({
      id: e.id,
      pickerArea: this.getHM(),
      startHourText: hmArr[0] < 10 ? "0" + hmArr[0] : hmArr[0],
      startMinuteText: minutes
    });
    this.getScene();
  },
  methods: {
    // 进来获取电影排场
    getScene() {
      Http.$get(`issuer/webMasterOneFilmScenes`, {
        filmId: this.id
      }).then(res => {
        if (res.code === 0) {
          // 字符串截取时间
          res.data.date = res.data.date.split(" ")[0].replace(/-/g, "/");
          res.data.scheduling.forEach(item => {
            item.dateRows.forEach(ele => {
              ele.start = ele.start.slice(0, 5);
              ele.end = ele.end.slice(0, 5);
            });
          });
          let status = false;
          res.data.scheduling.forEach((item, index) => {
            if (moment().isSame(item.date, "day")) {
              console.log("ok");
              item.dateRows.forEach(row => {
                if (new Date().getHours() < row.start.split(":")[0]) {
                  status = true;
                  return;
                } else {
                  if (new Date().getHours() == row.start.split(":")[0]) {
                    if (new Date().getMinutes() <= row.start.split(":")[1]) {
                      status = true;
                      return;
                    }
                  }
                }
              });
            } else if (
              moment().isBefore(item.date, "day") &&
              item.dateRows.length
            ) {
              status = true;
            }
          }); // 判断是7天内是否有场次
          // let h = 0 //h=0-->7天内没有数据，h=1-->7天内有数据
          // for (let i = 0; res.data.scheduling.length > i; i++) {
          //   if (res.data.scheduling[i].dateRows.length === 0) {
          //     h = 0
          //   } else {
          //     h = 1
          //   }
          //   if (h === 1) {
          //     break //7天其中有一天数据就终结for循环
          //   }
          // }
          // // 判断h变量是否有数据，然后判断赋值给share变量
          // if (h === 1) {
          //   this.setData({
          //     share: true
          //   })
          // } else {
          //   this.setData({
          //     share: false
          //   })
          // }
          // res.data.scheduling.forEach((item,index)=>{
          //   if(index <= 2){
          //     item.date =  this.timeFormat(item.date)
          //   }
          // })

          this.setData({
            share: status,
            value: res.data,
            allDay: res.data.scheduling,
            currentScene: res.data.scheduling[this.selTimeIdx].dateRows,
            currentDate: res.data.scheduling[this.selTimeIdx].date
          });
          getApp().globalData.page.closeSkeleton(this);
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
        }
      });
    },

    //选择日期
    selDayFun(ele) {
      // let pickerArea = this.getHM()
      // console.log(pickerArea)
      this.setData({
        // pickerArea: pickerArea,
        selTimeIdx: ele.currentTarget.dataset.sIdx,
        currentScene: ele.currentTarget.dataset.items,
        currentDate: ele.currentTarget.dataset.scenedate
      });
    },

    //删除播放场次
    delMovieTime(ele) {
      let that = this;

      if (ele.currentTarget.dataset.currentdate == that.allDay[0].date) {
        //当天
        // 获取现在本地的小时
        let h = new Date().getHours(); // 获取现在本地的分钟

        let m = new Date().getMinutes();
        let startTime = ele.currentTarget.dataset.start.split(":");

        if (h > startTime[0]) {
          that.showToast("不能删除小于当前时间的场次");
          return;
        } else if (h == startTime[0] && m >= startTime[1]) {
          that.showToast("不能删除小于当前时间的场次");
          return;
        }

        console.log(h);
        console.log(m);
        console.log(startTime);
      }

      this.setData({
        ele: ele
      });
      wx.showModal({
        title: "温馨提示",
        content: "您是否要删除该场电影？",

        success(res) {
          if (res.confirm) {
            that.deleteScene();
          } else if (res.cancel) {
            that.showToast("已取消");
          }
        }
      });
    },

    showToast(title, time = 3000) {
      wx.showToast({
        title: title,
        icon: "none",
        duration: time
      });
    },

    //取消拉下（开始选择）时间选择框
    startPullPicker() {
      let signShow = this.startShowPicker;
      let sign = true;

      if (signShow) {
        sign = false;
      }

      this.setData({
        startShowPicker: sign
      });
    },

    //(开始)选择小时+分钟
    startHourChange(ele) {
      let time = this.secons;
      let timeIndex = ele.detail.value[1];
      this.setData({
        startHourText:
          ele.detail.value[0] < 10
            ? "0" + ele.detail.value[0]
            : ele.detail.value[0],
        startMinuteText: time[timeIndex],
        startHour: ele.detail.value[0],
        startMinute: ele.detail.value[1]
      });
      console.log(this.startHourText, ":", this.startMinuteText);
    },

    //确定(开始选择)时间
    confirmTimeStart() {
      // 获取现在本地的小时
      let h = new Date().getHours(); // 获取现在本地的分钟

      let m = new Date().getMinutes(); //避免重复添加场次代码
      //避免重复添加场次代码
      //当前日期 相等时进入添加播放场次

      if (new Date().getDate() == this.currentDate.split("-")[2]) {
        // 判断现在的时间是否小于选择的时间，yes----跑第一条，no-----第二条
        if (h < this.startHourText) {
          this.setData({
            animate1: "animated slideOutDown"
          });
          console.log(this.startHourText);
          this.addScene();
          setTimeout(res => {
            this.setData({
              animate1: "animated slideInUp"
            });
            this.startPullPicker();
          }, 650);
        } else {
          // 判断现在的时间是否于等于选择的时间，yes----跑第一条，no-----第二条
          if (m <= this.startMinuteText && h <= this.startHourText) {
            this.setData({
              animate1: "animated slideOutDown"
            });
            this.addScene();
            setTimeout(res => {
              this.setData({
                animate1: "animated slideInUp"
              });
              this.startPullPicker();
            }, 650);
          } else {
            wx.showToast({
              title: "无法添加已过去的时间！",
              icon: "none",
              duration: 3000
            });
          }
        }
      } else {
        this.setData({
          animate1: "animated slideOutDown"
        });
        this.addScene();
        setTimeout(res => {
          this.setData({
            animate1: "animated slideInUp"
          });
          this.startPullPicker();
        }, 650);
      }
    },

    // 添加场次
    addScene() {
      Http.$post(
        `issuer/issue`,
        {
          add: `[{'id': '${this.id}','start': '${this.currentDate} ${this.startHourText}:${this.startMinuteText}'}]`
        },
        "",
        "application/x-www-form-urlencoded"
      ).then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: "添加成功",
            icon: "success",
            duration: 3000
          });
          setTimeout(res => {
            this.getScene();
          }, 500);
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
        }
      });
    },

    // 删除场次
    deleteScene() {
      // console.log(this.data.ele)
      // console.log(this.data.ele.currentTarget.dataset.currentdate, this.data.ele.currentTarget.dataset.start, this.data.ele.currentTarget.dataset.end)
      Http.$post(
        `issuer/issue`,
        {
          sceneId: this.ele.currentTarget.dataset.id
        },
        "",
        "application/x-www-form-urlencoded"
      ).then(res => {
        console.log("删除", res);

        if (res.code === 0) {
          let sIdx = this.ele.currentTarget.dataset.sIdx;
          let initList = this.currentScene;
          let signArr = [];

          for (let x in initList) {
            if (x != sIdx) {
              signArr.push(initList[x]);
            }
          }

          this.getScene();
          this.setData({
            currentScene: signArr
          });
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
        }
      });
    },

    //跳转分享页
    toMyMovieAddress() {
      const that = this;

      if (this.share) {
        // 调用分享之前更新一下数据模板
        Http.$get(`films/filmDetail`).then(res => {
          if (res.code === 0) {
            console.log("更新成功", res);
            Http.$get(
              `airTheaterH5/data/${wx.getStorageSync("sessionId")}.json`,
              "",
              "",
              true
            ).then(res => {
              let currentIdIndex = "";

              for (var i = 0; i < res.length; i++) {
                if (res[i].id == that.id) {
                  currentIdIndex = i;
                  break;
                }
              }

              wx.navigateTo({
                url: "../../pages/share/share?currentIdIndex=" + currentIdIndex
              });
            });
          } else {
            wx.showToast({
              title: res.msg,
              icon: "none",
              duration: 3000
            });
          }
        });
      } else {
        wx.showToast({
          title: "您需要添加电影排场才能发布分享！",
          icon: "none",
          duration: 3000
        });
      }
    },

    // 时间转换
    timeFormat(time) {
      let date = new Date(time);
      let now_date = new Date(); // console.log(date.getDay())

      if (date.getDate() < now_date.getDate()) {
        return;
      }

      let belongIndex = date.getDate() - now_date.getDate();
      console.log(belongDay[belongIndex]);
      console.log(weekday[date.getDay()]);
      let formatDate =
        belongDay[belongIndex] + "(" + weekday[date.getDay()] + ")";
      return formatDate;
    },

    // 获取小时，分钟
    getHM() {
      // 获取现在本地的小时
      let date = new Date();
      let h = date.getHours(); // 获取现在本地的分钟

      let m = date.getMinutes();
      return [h, m];
    },

    setData: function(obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function(key) {
        keys = key.split(".");
        val = obj[key];
        data = that.$data;
        keys.forEach(function(key2, index) {
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
@import "./movieIssue.css";
</style>
