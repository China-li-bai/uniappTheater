<template>
  <view class="container skeleton">
    <!-- 内容 -->
    <scroll-view class="contentView" @scrolltolower="lower" scroll-y>
      <block v-for="(item, idx) in menuList" :key="idx">
        <view class="movieList div_float" :data-s-id="item.id" @tap="toDetail">
          <view class="imgView skeleton-rect">
            <image mode="aspectFit" :src="item.coverBill"></image>
            <view class="atten">{{ item.score }}</view>
          </view>
          <view class="movieMsg">
            <view class="m_til eli_one skeleton-rect">{{ item.name }}</view>
            <view class="type skeleton-rect"
              >{{ item.time }}开播
              <text class="play">
                播放 <text class="playRed"> 88 </text>场</text
              >
            </view>
            <view class="type skeleton-rect"
              >收入分成 <text class="playRed"> 88 </text> 元</view
            >
            <view class="type skeleton-rect"
              >总出票 <text class="playRed"> 88 </text> 张</view
            >
            <view class="type skeleton-rect"
              >本月出票 <text class="playRed"> 88 </text> 张</view
            >
            <view class="price skeleton-rect"
              ><text class="playRed">￥5.00</text></view
            >
            <view class="issBtn skeleton-rect">发布</view>
          </view>
        </view>
      </block>
      <view class="placeholder" v-if="show">
        <view v-if="completeType">
          <image src="../../images/Success.png" class="successIcon"></image>
          <text class="loadingText">加载完毕!</text>
        </view>
        <view v-else>
          <image src="../../images/loadmore.gif" class="successIcon"></image>
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
  onLoad: function() {
    // app.page.skeletonInitial(this);
    this.getclassify();
    this.getRigth();
    this.getMyMovie();
  },
  methods: {
    //进来发请求获取左边分类信息
    getclassify() {
      Http.$get("films/getClassify").then(res => {
        if (res.code === 0) {
          // console.log(res);
          this.setData({
            classes: res.data.classes,
            currentId: res.data.classes[0].id
          });
          this.getRigth();
          getApp().globalData.page.closeSkeleton(this);
        } else {
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
          console.log("失败", res.msg);
        }
      });
    },

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

    // 获取右边的数据列表
    getRigth() {
      this.setData({
        show: false
      });
      Http.$get(`films/getClassifyFilms`, {
        id: this.currentId,
        pageNo: this.currentPage,
        pageSize: 7
      }).then(res => {
        console.log(res);

        if (res.code === 0) {
          res.data.rows.forEach(item => {
            item.time = item.date.split(" ")[0];
            item.star = item.score / 2;
          });
          this.setData({
            total: res.data.total,
            totalPage: res.data.totalPage,
            menuList: this.menuList.concat(res.data.rows)
          });
        } else {
          console.log("失败", res.msg);
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
        } // 判断是否该隐藏loading状态栏

        if (this.total > 4) {
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
        this.getRigth();
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
}
.movieMsg {
  max-width: 420rpx;
  margin-left: 0rpx;
  padding: 17rpx 30rpx;
}

.movieList .imgView {
  position: relative;
  width: 225rpx;
  height: 330rpx;
}

.imgView .atten {
  width: 45rpx;
  height: 30rpx;
  line-height: 30rpx;
  padding: 0;
  margin: 0;
  text-align: center;
  background: rgba(255, 128, 52, 1);
  border-radius: 10rpx;
  font-size: 18rpx;
  color: #fff;
  top: 0;
  right: 0;
  left: auto;
}
.movieMsg .m_til {
  font-family: PingFang SC;
  font-weight: 500;
  color: #333;
}
.play {
  margin-left: 15rpx;
}
.playRed {
  color: red;
}
.movieMsg .issBtn {
  width: 120rpx;
  height: 60rpx;
  line-height: 60rpx;
  border-radius: 30px;
}
</style>
