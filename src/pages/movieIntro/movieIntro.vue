<template>
  <view class="container">
    <!-- 电影信息 -->
    <view class="seaCnBox">
      <view class="movieList div_float">
        <view class="imgView">
          <image :src="detailValue.coverBill"></image>
          <view class="atten">{{ detailValue.count }}人想看</view>
        </view>
        <view class="movieMsg">
          <view class="m_til eli_one">{{ detailValue.name }}</view>
          <view class="stratView div_float">
            <view class="flex alignCenter">
              <view class="l lineBox">
                <van-rate
                  readonly
                  color="#FF6900"
                  :value="detailValue.score / 2"
                  :size="14"
                  allow-half
                ></van-rate>
              </view>
              <view class="r lineBox">{{ detailValue.score }}</view>
            </view>
          </view>
          <view class="flex">
            <view class="type eli_one" style="max-width:260rpx;">{{
              detailValue.filmAttr
            }}</view>
            <view class="type">/{{ detailValue.len }}分钟</view>
          </view>
          <view class="type">{{
            detailValue.country + "/" + detailValue.classify
          }}</view>
          <view class="type">下架时间：</view>
          <view class="type">{{ time }}</view>
          <view class="price">￥{{ detailValue.price }}</view>
        </view>
      </view>
    </view>

    <!-- 影片简介 -->
    <view class="introCnBox">
      <view class="tilBox">
        <view
          :class="'lineBox ' + (showIdx == 1 ? 'sel' : '')"
          data-s-idx="1"
          @tap="changeIntro"
          >影片简介</view
        >
        <block v-if="detailValue.showVideo">
          <view
            :class="'lineBox ' + (showIdx == 2 ? 'sel' : '')"
            data-s-idx="2"
            @tap="changeIntro"
            >预告片</view
          >
        </block>
      </view>

      <view class="contBox">
        <!-- 简介 -->
        <view class="c_one" :hidden="showIdx != 1">
          <view class="c_til div_float">
            <view class="l">简介：</view>
            <view class="r">
              {{ detailValue.intro }}
            </view>
          </view>
          <!-- 演员表 -->
          <view class="personBox div_float">
            <view class="l">导演：</view>
            <view class="r characterImg">
              <block v-for="(item, idx) in detailValue.directors" :key="idx">
                <!-- <image src="../../images/headImg.png" /> -->
                <image :src="item.portrait"></image>
                <view class="Actos">
                  <span class="eli_one actorName">{{ item.name }}</span>
                </view>
              </block>
            </view>
          </view>
          <!-- 演员表 -->
          <view class="personBox div_float">
            <view class="l">演员：</view>
            <view class="r characterImg">
              <block v-for="(item, idx) in detailValue.actors" :key="idx">
                <!-- <image src="../../images/headImg.png" /> -->
                <image :src="item.portrait"></image>
                <view class="Actos">
                  <span class="eli_one">{{ item.name }}</span>
                </view>
              </block>
            </view>
          </view>
        </view>
        <view :hidden="!detailValue.showVideo">
          <view class="c_two" :hidden="showIdx != 2">
            <view class="videoBox">
              <video :src="detailValue.trailer" controls></video>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 发布按钮 -->
    <view class="issBtn" @tap="toIssue">发布影片</view>
  </view>
</template>

<script>
//index.js
//获取应用实例
// 引入request
const Http = require("../../utils/httpRequest.js"); // const skeletonData = require('./skeletonData');.
// import vanRate from "../../dist/rate/index";

export default {
  data() {
    return {
      //   skeletonData: skeletonData,
      showIdx: 1,
      //显示下标
      id: "",
      //影片id
      detailValue: "",
      //详情数据
      time: "" //时间
    };
  },

  components: {
    vanRate
  },
  props: {},
  onLoad: function(id) {
    this.setData({
      id: id.id
    });
    this.getDetail(id.id);
  },
  methods: {
    //切换显示
    changeIntro(ele) {
      this.setData({
        showIdx: ele.currentTarget.dataset.sIdx
      });
    },

    //   获取详情页的数据
    getDetail(id) {
      Http.$get("films/getDetail?id=" + id).then(res => {
        // console.log(res)
        if (res.code === 0) {
          res.data.date = res.data.date.replace(/-/g, "/");
          this.setData({
            detailValue: res.data,
            time: res.data.date.split(" ")[0]
          });
          getApp().globalData.page.closeSkeleton(this);
        } else {
          console.log("失败", res.msg);
          wx.showToast({
            title: res.msg,
            icon: "none",
            duration: 3000
          });
        }
      });
    },

    // 跳转发布
    toIssue() {
      // 判断是否登录
      if (wx.getStorageSync("sessionId")) {
        wx.navigateTo({
          // url: '../../pages/movieIssue/movieIssue?id=' + this.data.id + '&value=' + JSON.stringify(this.data.detailValue)
          url: "../../pages/movieIssue/movieIssue?id=" + this.id
        });
      } else {
        wx: wx.navigateTo({
          url: "../../pages/empower/empower"
        });
      }
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
  padding: 0.1rpx 0;
  min-height: 99.5%;
  background-color: white;
}

.introCnBox {
  margin-top: 70rpx;
  text-align: center;
  font-size: 0;
}

.introCnBox .tilBox {
  height: 60rpx;
  line-height: 60rpx;
}

.introCnBox .tilBox view {
  line-height: 40rpx;
  font-size: 28rpx;
  color: #333;
  margin: 0 80rpx;
  vertical-align: bottom;
}

.introCnBox .tilBox .sel {
  font-weight: bold;
  font-size: 32rpx;
  border-bottom: 6rpx solid #46a3ff;
  border-radius: 5rpx;
  line-height: 57rpx;
}

.contBox {
  margin-top: 34rpx;
  padding-bottom: 100rpx;
}

.c_one {
  padding: 0 53rpx;
}

.c_one .c_til .l {
  float: left;
  font-size: 30rpx;
  color: #333;
}

.c_one .c_til .r {
  float: left;
  width: 540rpx;
  margin-left: 10rpx;
  font-size: 26rpx;
  color: #333;
  text-align: left;
  line-height: 40rpx;
}

.personBox {
  margin-top: 30rpx;
}

.personBox .l {
  float: left;
  height: 102rpx;
  line-height: 102rpx;
  font-size: 28rpx;
  color: #333;
  padding-top: 0.1rpx;
}

.personBox .r {
  margin-left: 40rpx;
  float: left;
  width: 520rpx;
  text-align: left;
  height: 150rpx;
}

.personBox .r image {
  width: 102rpx;
  height: 102rpx;
  margin-right: 50rpx;
  border-radius: 100%;
  margin-bottom: 10rpx;
}

.c_two {
  margin-top: 60rpx;
}

.videoBox,
.videoBox video {
  width: 750rpx;
  height: 375rpx;
}

.issBtn {
  width: 750rpx;
  height: 80rpx;
  line-height: 80rpx;
  color: white;
  font-size: 32rpx;
  font-weight: bold;
  position: fixed;
  bottom: 0;
  z-index: 3;
  background-color: #46a3ff;
  text-align: center;
  letter-spacing: 2rpx;
}

.characterImg {
  overflow-x: auto;
  white-space: nowrap;
}

.movieMsg .type {
  margin-top: 20rpx;
  height: 36rpx;
  line-height: 30rpx;
}

.movieMsg .stratView {
  margin-top: 20rpx;
}
.movieMsg .price {
  margin-top: 30rpx;
}

.Actos {
  position: relative;
  display: inline-block;
}

.Actos span {
  position: absolute;
  left: -152rpx;
  font-size: 22rpx;
  max-width: 116rpx;
  width: 102rpx;
  text-align: center;
}
</style>
