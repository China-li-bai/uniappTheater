<template>
  <view id="details">
    <view class="movie-detail">
      <view class="img"
        ><image mode="aspectFill" :src="detailValue.coverBill"></image
      ></view>
      <view class="text">
        <view class="tit">{{ detailValue.name }}</view>
        <view class="rate height27">
          <uni-rate
            disabled="true"
            size="20"
            active-color="#FF8034"
            is-fill="false"
            max="5"
            value=" detailValue.score"
          ></uni-rate
          ><text>{{ detailValue.score }} </text>
        </view>
        <view class="langTime height27">{{ detailValue.filmAttr }}</view>
        <view class="types height27"
          >{{ detailValue.country }} /{{ detailValue.classify }}</view
        >
        <view class="types height27">下架时间：{{ time }}</view>
        <view class="price height27">￥ {{ detailValue.price }}</view>
      </view>
    </view>
    <view class="profile">
      <view class="title">简介</view>
      <view class="profile-text">
        {{ detailValue.intro }}
      </view>
    </view>
    <view class="actor">
      <view class="title">演职人员</view>
      <scroll-view scroll-x="true" style="height:380upx;">
        <view class="actor-scroll">
          <block v-for="(item, index) in detailValue.actors" :key="index">
            <view class="actor-item">
              <image mode="aspectFill" :src="item.portrait"></image>
              <view class="actor-name">{{ item.name }}</view>
              <view class="actor-name font24"></view>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
    <view class="still">
      <view class="title">剧照</view>
      <scroll-view scroll-x="true" class="still-scroll" style="height:251;">
        <view class="still-wiper">
          <block v-for="(item, index) in 5" :key="index">
            <view class="still-item">
              <image mode="aspectFill"></image>
            </view>
          </block>
        </view>
      </scroll-view>
    </view>
    <!-- 按钮 -->
    <view class="btn" @click="toIssue()">发布影片</view>
  </view>
</template>

<script>
import UniRate from "../../components/uni-rate/uni-rate";
const Http = require("../../utils/httpRequest.js");
export default {
  onLoad: function(option) {
    //option为object类型，会序列化上个页面传递的参数
    console.log(option.id); //打印出上个页面传递的参数。
    this.setData({
      id: option.id
    });
    this.getDetail(option.id);
  },

  components: {
    UniRate
  },
  data() {
    return {
      showIdx: 1,
      //显示下标
      id: "",
      //影片id
      detailValue: "",
      //详情数据
      time: "", //时间
      score: ""
    };
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
          console.log(String(res.data.score / 2));
          let strScore = String(res.data.score / 2);
          this.setData({
            detailValue: res.data,
            time: res.data.date.split(" ")[0],
            score: 6
          });
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

<style lang="less">
#details {
  padding: 0 30upx;
  font-size: 28upx;
  color: #333;

  .height27 {
    height: 28upx;
    line-height: 28upx;
    margin-top: 30upx;
    color: #666666;
  }
  .movie-detail {
    width: 100%;
    height: 415upx;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
  }
  .img {
    width: 250upx;
    height: 355upx;
    margin: 30upx 30upx 30upx 0;
    border-radius: 10upx;
    overflow: hidden;
    background: #2c405a;
  }
  .img image {
    width: 100%;
    height: 100%;
  }
  .text {
    flex: 1;
    height: 415upx;
    padding-top: 45upx;
    box-sizing: border-box;
  }
  .tit {
    font-size: 36upx;
    font-weight: 500;
    height: 35upx;
    line-height: 35upx;
  }
  .rate {
    display: flex;
    align-items: center;
  }
  /* 简介 */
  .profile {
    width: 100%;
    min-height: 160upx;
  }
  .title {
    height: 40upx;
    line-height: 40upx;
    font-size: 36upx;
    font-weight: 500;
  }
  .profile-text {
    margin: 23upx 0;
    font-weight: 500;
  }
  .price {
    color: red;
  }
  /* 演职 */
  .actor-scroll {
    margin-top: 20upx;
    display: flex;
    flex-direction: row;
  }
  .actor-item {
    width: 175upx;
    margin-right: 15upx;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #b3b1b1;
  }
  .actor-item image {
    width: 174upx;
    height: 252upx;
    border-radius: 10px;
    overflow: hidden;
    background: pink;
  }
  .actor-name {
    height: 36upx;
    line-height: 36upx;
    margin-top: 12upx;
  }
  .font24 {
    font-size: 24upx;
    color: #666666;
  }
  /* 剧照 */
  .still-scroll {
    margin-top: 20upx;
    margin-bottom: 115upx;
    background: #333;
  }
  .still-wiper {
    display: flex;
    flex-direction: row;
  }
  .still-item {
    height: 252upx;
    width: 420upx;
    background: #666666;
    margin-right: 15upx;
  }
  .btn {
    width: 100%;
    height: 90upx;
    line-height: 90upx;
    font-size: 36upx;
    font-weight: 500;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    background: #46a3ff;
    color: #fff;
  }
}
</style>
