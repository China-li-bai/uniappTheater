<template>
<view class="container">
    <!-- 搜索框 -->
    <search-com @search-method="searchFun" :seaText="searchValue"></search-com>

    <view class="seaCnBox">
        <block v-for="(item, idx) in dataValue" :key="idx">
            <view class="movieList div_float" :data-s-id="item.id" @tap="toDetail">
                <view class="imgView">

                    <!-- ../../images/movie2.png -->
                    <image :src="item.coverBill"></image>
                    <view class="atten">{{item.count}}人想看</view>
                </view>
                <view class="movieMsg">
                    <view class="m_til eli_one">{{item.name}}</view>
                    <view class="stratView div_float">
                        <view class="flex alignCenter">
                            <view id="score" class="l lineBox">
                                <van-rate readonly color="#FF6900" :value="item.star" :size="14" allow-half></van-rate>
                            </view>
                            <view class="r lineBox">{{item.score}}</view>
                        </view>
                    </view>
                    <view class="flex">
                        <view class="type eli_one" style="max-width:260rpx;margin-top:18rpx;">{{item.filmAttr}}</view>
                        <view class="type" style="margin-top:18rpx;">/{{item.len}}分钟</view>
                    </view>
                    <view class="type">{{item.country}}</view>
                    <view class="type">上架时间：{{item.time}}</view>
                    <view class="price">￥{{item.price}}</view>
                    <view class="issBtn">发布</view>
                </view>
            </view>
        </block>
    </view>
    <!-- 没数据 -->
    <view class="contentBox" v-if="dataValue.length == 0">
        <view class="flex center column noneData">
            <image src="../../images/noneData.png" class="img"></image>
            <view class="noneDataTxt">暂无数据~</view>
        </view>
    </view>
    <!-- 分页 -->
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


</view>
</template>

<script>
// 引入request
const Http = require("../../utils/httpRequest.js");
import searchCom from "../../components/searchCom/searchCom";
import vanRate from "../../dist/rate/index";
import vanLoading from "../../dist/loading/index";

export default {
  data() {
    return {
      show: false,
      //是否显示loading状态
      completeType: false,
      //记载是否完成
      bSelIdx: 0,
      //指示面板下标
      searchValue: '',
      //搜索值
      totalPage: 0,
      //总数据页面
      total: 0,
      //数据总条数
      dataValue: [],
      //电影列表
      toDetailId: '',
      //跳详情id
      currentPage: 1 //当前页面数
      ,
      loading: false
    };
  },

  components: {
    searchCom,
    vanRate,
    vanLoading
  },
  props: {},
  onLoad: function (e) {
    this.searchValue = JSON.parse(e.value).detail;
    this.setData({
      searchValue: JSON.parse(e.value).detail
    });
    this.getSearchData();
  },
  //  页面上拉触底事件的处理函数
  onReachBottom: function () {
    // Do something when page reach bottom.
    if (this.currentPage < this.totalPage) {
      this.currentPage = this.currentPage + 1;
      this.getSearchData();
    } else {
      this.setData({
        completeType: true
      });
    }
  },
  methods: {
    // 跳转详情页
    toDetail(id) {
      this.toDetailId = id.currentTarget.dataset.sId;
      wx.navigateTo({
        url: '../../pages/movieIntro/movieIntro?id=' + this.toDetailId
      });
    },

    //搜索
    searchFun(ele) {
      this.setData({
        total: 0,
        totalPage: 0,
        dataValue: [],
        currentPage: 1
      });
      this.searchValue = ele.detail;
      this.getSearchData();
    },

    // 发请求获取搜索数据
    getSearchData() {
      Http.$get('issuer/search', {
        key: this.searchValue,
        pageNo: this.currentPage,
        pageSize: 6
      }).then(res => {
        // console.log(res)
        if (res.code === 0) {
          res.data.rows.forEach(item => {
            item.time = item.date.split(' ')[0];
            item.star = item.score / 2;
          });
          this.setData({
            total: res.data.total,
            totalPage: res.data.totalPage,
            dataValue: this.dataValue.concat(res.data.rows)
          });
          this.setData({
            loading: true
          });
        } else {
          console.log('失败', res.msg);
          wx.showToast({
            title: res.msg,
            icon: 'none',
            duration: 3000
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

    //轮播图改变
    bannerChange(ele) {
      this.setData({
        bSelIdx: ele.detail.current
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
@import "./searchResult.css";
</style>