<template>
  <view class="container skeleton">
    <!-- 内容 -->
    <scroll-view class="contentView" @scrolltolower="lower" scroll-y>
      <block v-for="(item, idx) in allMovie" :key="idx">
        <view class="movieList" :data-s-id="item.id" @tap="toDetail">
          <view class="imgView skeleton-rect">
            <image mode="aspectFit" :src="item.coverBill"></image>
            <view class="atten">{{ item.score }}</view>
          </view>
          <view class="movieMsg">
            <view class="m_til eli_one skeleton-rect">{{ item.name }}</view>
            <view class="type skeleton-rect"
              >{{ item.startDate }}开播
              <text class="play">
                播放 <text class="playRed">{{ item.tickets }}</text
                >场</text
              >
            </view>
            <view class="type skeleton-rect"
              >收入分成 <text class="playRed">{{ item.earning }}</text> 元</view
            >
            <view class="type skeleton-rect"
              >总出票 <text class="playRed"> 88 </text> 张</view
            >
            <view class="type skeleton-rect"
              >本月出票 <text class="playRed"> 88 </text> 张</view
            >
            <view class="type skeleton-rect"><text>￥5.00</text></view>
            <view class="issBtn">发布</view>
            <view class="toCheck">查看发布场次 ></view>
          </view>
        </view>
      </block>
      <view class="placeholder" v-if="show">
        <view v-if="completeType">
          <image
            src="../../static/images/success.png"
            class="successIcon"
          ></image>
          <text class="loadingText">加载完毕!</text>
        </view>
        <view v-else>
          <image
            src="../../static/images/loadmore.gif"
            class="successIcon"
          ></image>
          <text class="loadingText">加载中...</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
// 引入request

const Http = require("../../utils/httpRequest.js");
export default {
  data() {
    return {
      // skeletonData: skeletonData,
      currentPage: 1,
      //当前页码
      totalPage: 0,
      //总数据页面
      total: 0,
      //数据总条数
      show: false,
      //是否显示loading状态
      completeType: false,
      //记载是否完成
      menuIdx: 0,
      //菜单选中下标
      classes: [],
      //左边分类信息item
      menuList: [],
      //右边列表信息
      currentId: "",
      //当前左边的id
      toDetailId: "", //跳转详情id
      allMoney: "",
      expect: "",
      reality: "",
      allMovie: "",
      noneData: false
    };
  },

  props: {},
  onLoad: function() {},
  onShow: function() {
    let _this = this;
    if (wx.getStorageSync("sessionId")) {
      wx.navigateTo({
        url: "../../pages/myVideos/myVideos"
      });
      _this.setData({
        allMovie: [],
        //重置数据
        currentPage: 1 //重置当前页面数
      });
      _this.getMyMovie(); // 进来获取我的影片
    } else {
      wx.navigateTo({
        url: "../../pages/empower/empower"
      });
    }
  },
  methods: {
    // 进来获取我的影片
    getMyMovie() {
      let now_date = new Date();
      let now_time = new Date(
        now_date.getFullYear() +
          "-" +
          (now_date.getMonth() + 1) +
          "-" +
          now_date.getDate()
      ).getTime(); // console.log(now_date)

      Http.$get(`issuer/myFilms`, {
        pageNo: this.currentPage,
        pageSize: 6
      }).then(res => {
        if (res.code === 0) {
          res.data.films.forEach(item => {
            if (item.startDate) item.startDate = item.startDate.split(" ")[0];
            item.start = item.start.slice(0, 5);
            item.end = item.end.slice(0, 5);
            console.log();

            if (this.dateFormat(item.startDate) >= now_time) {
              item.isShow = true;
            }
          });
          this.setData({
            allMoney: res.data.earning,
            expect: res.data.expectEarning,
            reality: res.data.realityEarning,
            allMovie: this.allMovie.concat(res.data.films),
            total: res.data.total,
            totalPage: res.data.totalPage
          });
        } else {
          console.log("失败", res.msg);
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
        } // console.log(res)
        // 判断是否有数据

        if (this.total == 0) {
          this.setData({
            noneData: false
          });
        } else {
          this.setData({
            noneData: true
          });
        } // 判断是否该隐藏loading状态栏

        if (this.total < 4) {
          this.setData({
            show: false
          });
        } else {
          this.setData({
            show: true
          });
        }
      });
    },

    //  页面上拉触底事件的处理函数
    lower: function() {
      console.log("触底了");

      if (this.currentPage < this.totalPage) {
        this.currentPage = this.currentPage + 1;
        this.getMyMovie();
      } else {
        this.setData({
          completeType: true
        });
      }
    },

    // 跳转详情页
    toDetail(ele) {
      this.toDetailId = ele.currentTarget.dataset.sId;
      wx.navigateTo({
        url: "../../pages/movieIntro/movieIntro?id=" + this.toDetailId
      });
    },
    dateFormat(date) {
      let formatTime = new Date(date).getTime();
      return formatTime;
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
.container {
  display: flex;
  min-height: 100%;
}

.menu {
  width: 168rpx;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding-top: 60rpx;
  border: 2rpx solid #f2f2f2;
}
.menu .m_list {
  font-size: 32rpx;
  color: #333333;
  height: 60rpx;
  line-height: 60rpx;
  text-align: center;
  margin-bottom: 60rpx;
}
.menu .sel {
  font-weight: bold;
}

.contentView {
  width: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
}

.movieList {
  padding: 0 20rpx;
  box-sizing: border-box;
  margin-top: initial;
  margin-bottom: 30rpx;
  display: flex;
  flex-direction: row;
}
.movieMsg {
  flex: 1;
  margin-left: 30rpx;
  font-weight: 500;
  color: #666;
  font-size: 28rpx;
  letter-spacing: 2rpx;
  position: relative;
}

.movieList .imgView {
  position: relative;
  width: 218rpx;
  height: 308rpx;
}
.imgView image {
  width: 100%;
  height: 100%;
}

.imgView .atten {
  width: 45rpx;
  height: 30rpx;
  line-height: 30rpx;
  text-align: center;
  background: rgba(255, 128, 52, 1);
  border-radius: 10rpx;
  font-size: 18rpx;
  color: #fff;
  position: absolute;
  top: 0;
  right: 0;
}
.movieMsg .m_til {
  font-size: 36rpx;
  font-weight: 500;
  color: #333;
}
.type {
  height: 27rpx;
  margin-top: 26rpx;
}
.play {
  margin-left: 15rpx;
}
.playRed {
  color: red;
}

.issBtn {
  width: 120rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 30rpx;
  text-align: center;
  background: #46a3ff;
  color: #fff;
  position: absolute;
  right: 0;
  top: 136rpx;
}
.toCheck {
  text-align: center;
  color: #46a3ff;
  position: absolute;
  right: 0;
  bottom: 0;
}
.placeholder {
  height: 100rpx;
  line-height: 100rpx;
  background-color: #f4f4f4;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.loadingText {
  padding: 0 10rpx;
  color: #acacac;
}
.placeholder {
  height: 100rpx;
  background-color: #f4f4f4;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.successIcon {
  vertical-align: middle;
  width: 52rpx;
  height: 52rpx;
}
</style>
