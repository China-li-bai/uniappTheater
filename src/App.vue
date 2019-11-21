<script>
//app.js
import api from "./apis/api";
import request from "./utils/request";

const page = require("./core/page.js");
const reg = require("./utils/reg.js");
const Http = require("./utils/httpRequest.js");

export default {
  onLaunch: function() {
    // // 展示本地存储能力
    console.log(1);

    var logs = wx.getStorageSync("logs") || [];
    logs.unshift(Date.now());
    wx.setStorageSync("logs", logs); // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })
    // 获取用户信息

    wx.getSetting({
      success: res => {
        if (res.authSetting["scope.userInfo"]) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          console.log("授权ok");
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo; // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况

              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res);
              }
            }
          });
        }
      }
    });
  },
  globalData: {
    userInfo: null,
    api: new api(),
    page: page,
    reg: reg
  },
  methods: {}
};
</script>

<style>
/* 引入animate动画库 */
@import "./css/animate.css";

page {
  width: 100%;
  height: 100%;
  background-color: #fafafa;
  font-family: "微软雅黑";
}
input {
  border-radius: 0rem;
}
.divHide {
  display: none !important;
}
.div_float:after {
  clear: both;
  content: "";
  width: 0;
  height: 0;
  visibility: hidden;
  display: block;
}
.lineBox {
  display: inline-block;
}
page {
  font-family: "PingFang SC", Helvetica, "STHeiti STXihei", "Microsoft YaHei",
    Tohoma, Arial, sans-serif;
}

.demo-margin-left {
  margin-left: 10px;
}

.demo-margin-right {
  margin-right: 10px;
}

.demo-margin-bottom {
  display: block;
  margin-bottom: 15px;
}

/*文字限制超出一行后变省略号*/

.eli_one {
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box !important;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: pre-line;
}
/*文字限制超出两行行后变省略号*/

.eli_two {
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  white-space: pre-line;
}
/*文字限制超出两行行后变省略号*/

.eli_four {
  overflow: hidden;
  text-overflow: ellipsis;
  display: box;
  display: -webkit-box !important;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  white-space: pre-line;
}
/*固定页面*/

.fixedView {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

/* 搜索icon 蓝色 */
.seaIcon {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAkFBMVEUAAACCuvKCuvKCtP+CuvKCuvKCuvKDuvODuvKCuvKCu/KBu/SCuvKCuvKDuvKEu+yCuvKCuvOCuvKDu/GCuvGBuPOCuvKCuvKCu/KBuvOCu/KCuvOEuPODuvKCu/KDuvKCuvKCuvKCuvKDuvKCuvOCuvOBuvKCuvKCu/OBvfWCuvOCuvKCu/KCuvKCuvKCuvLY6m4qAAAAL3RSTlMA/fkGl7LMfTPc2S3xgjsNxrlgNSUe7da+j3FoE9LBm3jkr21UQIhbRRj036ZLqkYZdPsAAAI3SURBVEjHpZXXYuMgEEURqlZ1Ubctl8jdXv7/7zYzLJsoqIBznwbEYTQFIH26XSrbzymjuW9XlxtRVeoWrKsiSlXA04L1qTxNgd6cDWnujYGJZYiFYbNz62Xt7ppQTBlWMkgGPuPy3e8evP+x+8EA2VK+wI6lT/GRoWjbS64NKSQ5CcZHH8m3XZMhrflPyWyLPmcBGVYwQ7/tz2nc0tmQMW0c/LFuRImPZELGlSA76yyzcAp9jvvFf7a+pw8CpQNxyoEZq68JTPxgbuVCzInQlQ/VhG6uYlTCyFNEAwiuFOcTyCNRFfZkyu0I7JUyuoLlEbehpgVRVwGFRCuDXfYa6B6ADKylRpJQHgBLsKpPIyc6yj+JCgy4xhodEou5AAPacqdDYsc/wIBrywVDK08hGNAdtRb6AXkCg+dLR1gT832vv4zV187wTnSirV3XRtS1QvcaMkPRTRdx5rRO3QWsG9PMU8RPjjh/vjqJnbvlpgu7xMrkVfylOOsLVRJPmpGJgU6iTvgEd0aOYmW23fBK/nCqyOVOu9cy9RTIWHqdKtjrkU2SaY6XsBzBdjP1RvJn2Oxud4fJIlPoo/znopcB04fxEv2BNY0p3xogupc+SGtsmaUMAx5rSWuAfd0ZqrzqsynkGUM+n74+mnG9TiZZ80zZP1HneXbr/fnpwFQ54RcdL1ivEgWWrI6GTB6m40XdaqdLG06slCtU8oqeziO/hwfnGLWbnjzrXN4yS8nb7Iy8p+jgxH8BTM95uL59sC8AAAAASUVORK5CYII=");
  background-size: 100% 100%;
}

/*空心 星星*/
.ng_star {
  background-image: url("data:image/png;base64,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");
  background-size: 100% 100%;
}

/*半心 星星*/
.com_star {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAFL0lEQVRYR82Ya2xUVRDHf9OWJhSCMRoNwaB+AEIRKu6uVTQEMYT4wBBjREzoBxONUqKJiEkBu6dFEHwlPoCIkvDQAClSIYhCILzEUnYvj4UCCiIpRQKGiKCkCLtjzt1u0263vbvdJXA+3b3nnPn/ztzZmblXuA5DzbA7oLBSTHhKrs1Lrg1ae2p8+0FKEHlBgqFVudTIObAa3+sgn8Qh9TQUFIupv5gr6JwC6+zSO7kabQIKGPAIHNsFyKdiQm/cnMDGHwGGunCvLIdFk+xVFPRBMc7eXEDnzMNqAm+BftAKFQzB+jng1IISYsi9D8vzNdFsoXMCrLN9fbkqjW4oJIYFtuPLMvjjCAhTJBief3MAG18DSHE7mATwoU3w7Qzr5b8p1MEywzmTDXTWHtag/22EeR0gEsB2oqYCDm+2VyvFhCfeMOCUoZAcEvb3xXOwcCI02+ymY8U4m7oLnZWH1fiPAoNSirf1sF2w4yvY+oW9Og69h4rZ1twd6G4Da1WgAtU5nYomA9uFy8vhxB6bm2eJCVVeV2A1gftBy4BRKAMRenUpmAr4ZBiWvpbYdgL4GaSOvNhOYk6DGGJeh0jpYTWjCuDS08BzqIxAuAvo4WUsZZZI3mShbWg07m8/Y7OIUOceQNhF0ZXdMi3yb/J2F7ilu3oReAooAW63zy0jwOTFqTzcds1fTXAqAqcOxuHPHU+2cA044D4Fe5D8HjtkZt1p0aD/MMLgrOBSbfYCTt7TfAmaDkFTBBoPwO8thafdOl0iWh0IENM6ID+n0JkCJ4vHrsHZY7B5Ppyoj5f3njqmJSQCz4KuzjoM2opmC2xtrXgTft0ZT4WF0REyfd+frXGqVb6pqHyYMy9nC7y6Ahrc6thEgYyQmaFT9ke7P5Ya/zLA7QmzHtkAf1cFB9bbMDhPvj4mlc7BBE+HTKAmUAf60A0DXvcu7Ftr5S+Tp6Ol0qlvy5ICmDzw/QZyT1bQ3fHw+vfAWWNl/0Niz0hw78aUeTj5ppri3tCrEfTWbkNnCnzwR1jzjpWLIVImwdA3qbQ7LQ46q3QA0WhDxhUuoZIJsM25yybHd4pOlqCzsDNHdVnNtCrwOKq2FczL2NPpAtsKZ1tPd2i1GCfYlZZn+VXjfwlYfN2AN34Mu1dY1y4UE2pxc+dqnsDuuY3fNiFFGUGn6+FFZXDmiH2IATF7wl4a6QLbt93MwiJd4KWvwknHxu5oCTpbswaOZ4yiS16GOsynC7xyKvyyw5aw8RIMuwk4yxgOjATd7mWo28C1lRD5wQKXSTC83EvHMyS0yl+O8rmXoW4Dfz8Pwm7fVS4mtMBLxxvY+D8DMv9smm5IbJkPPy0B1QqpcubmAngdMM7LUIf5iu1QmEZisbAWGpkrJlThpZOOh+1HvOFehlLOD3gUSp6EIWM63x6qgQ3v2+S5QIxT7qWTBrCvCaSfl6E28wqcB/etuqd7v98Q6D8cfOPhtrvbm4psgFq3uH0tJuzZ2qYB7LcprXcawP8AtfTInyYz6s/qXN8tNIsFeBkY1rrffje+bywMeyJ+6+g2WDXNXq0VEx7vpZMOsH177ex9T0EjkFctJuT2hamGVvtKiYkFn9B6+L6DoX8JDBqZaHy2igmPzgpYTXEhFF1JYeQCyAq4Ol3M/gteIol5NaV9kOhE1PW6L2mfIybs97LVdbdW/YCPWF6ivsdA9iDMlGBoi5dhr3mN27bgtlXrA3pMjDPQa59He+mfhPIRyGKIzRLjXPYymOm8W/qlaALKuHRi+H95589Sgp8PxAAAAABJRU5ErkJggg==");
  background-size: 100% 100%;
}

/*实心 星星*/
.gd_star {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAoCAYAAACFFRgXAAAEDElEQVRYR82ZX2hbVRjAf1/aBZbW7UFExoZQGYKV7SG5aVk7GdZ/T8pAdA5xIDgG20RBBKejOcn806EgDN3UTlDm/O/DHmT+Aec2XVdzb2VT92LRBzsUREFZ57o195ObRq1Jk3OTe4s9kJd85/y+3z05OefLiTAPTZ9Z3cFkcrcYd3vceIkbGPDUOHuABxC5W3LFt+PMEbuwFrLr8PUIIKBnob1bzOgfcUnHKqymuxNNnUbo+ldQ9ogpPrhAhZ3ngW1VciXQHjHeWBzSsc2w5rM3ovrJzFKoakqR67rWyF3vlqJKxyKsu/sv4/zUqf8uhSo1Ybvk3BcWhrBxXgS2NJRRfiep18rj3k9RpCPPsBrnJuDjOZdCrdlbYtyN/5tweSn8OfUNcFV4Cb1VjBc8YEst0gyryQ6D3t9k5nHoXCXmswtNjit3b1lYTeYWkA9bY8guMcXBeRXWJzPLmGYtKn1A8EoD7a0krYz5HjgBMkLCP47vfSsG38abc4bVkACnG6EfZW1F8GobLFI82EWEkfIDCF+Qmjopj5yerGaWhSvVVbYi2IfSj7A0kkD0wdPAqfKnEDxI26JjsnPkrKhxXgLuAxZFzzHfBH1V1PSugNIIsGK+00XiB8f7Yr15ZkkUMqsoyfEFsAzqPdM4yVKfPPbVL/986dSkByBxGEhGmon4B0/QLn2ys/hjzT6s+exmVF+OP2eLROVX2vQGGfS+/ptQs62pyT4N+miLKeIcdp6EDsigNzobWiusCPnMAZB74szeJOsi4t8uubGP5tyHq99U052EjsOgA00miqO7j8gmyRUPzgWrW0voUz2Xc9E/CayMwyI0Q3Sr5Lx99fo3LH7UpFdC4gRwReiEkTpqQYyXa4SwVmtayPTiy6dAKpKLdbDsE1PcautmFS4fLMbxKtWZjRchnsiK+dK1AcIK/wxcaYNFiosOSM4LLmAaNqvwzI6RCn4dWPvakllM1kvOPWRjWCV0V08XJT8otue3CZsk5x6wJbELF9LX4yeO2UDR47JNTHGvjWMXzjsbUd6wgSLHVXdI3huycUIIZx5G5VkbKHpchsQUd9g4dmHjPAc8ZANFj+teMV71RWINNozwe8AdTQidAz4H1gGLmxj3uhj3Xlv/MMJBPdFrAwGjiLyCTr4p5sw5Hcos5YIEApuB1SHGHxLjrrf1CyGcmQBZXgf0G3CQhA7PLrKr+1aO90B8A9BZh3VEjGutDhsXP+/c2caZH4JDY/aFiQJHEdmPdrzfzJWTmt4lSCnYdQL5TJW4J8Z1Is2wPrFmOdOXJiqQ4Hh+Dfz9YsbGbWBbXAvpDH4iEA9uM5eAfifGu8Y2zlJe9jjg50GHWcYHssW7ZAM2Gy//LyKpDSi3hVnDfwENqklSoZiL9AAAAABJRU5ErkJggg==");
  background-size: 100% 100%;
}

/*删除 */
.delIcon {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAgVBMVEUAAABGo/9Go/9Go/9Go/9Go/9Go/9Fo/9IoP9Gov9Go/9Go/9Fo/9GpP9Go/9Go/9GpP9Fo/9Hpv9Eov9Fo/9Go/9Fo/9Go/9GpP9Go/9GpP9GpP9Hov9Go/9Hpf9Fp/9HpP9Go/9Go/9Go/9Fo/9Fov9Fov9Eof9Go/////9RqP/gYTnAAAAAKHRSTlMAb/zJ9tn5gRYL64xZKPLenyEcBy3zpJF8YNFqaEw0Eri3trWTdlU8zeoPNAAAATZJREFUSMet1NlyhCAQQNEGBHdndNxmzZ508v8fGDKhtCxRu1O5Lz6dEhoKmBVl6bNOjEn0Y3esYLMHoXCSEtEqiNIGZwXd8q8OokBvQX/wi1zhYrr2iWuBKwXZXBwlridmAm0sc5W43WRtZYGEgnoUB4Wk9DhrgcRCcEUFlZjSkRTJ7d1NbOhEVm4njPo7URyiwRYhq9ySdx45D/NizezFfj+JfSEqSzSPJJYUPCItQR7B+E+k4S9sh6wSS554RFnS8Y8y4xHBv5Y12E4csYOf3jgkvJMooAvp3otXOmnht4r8G5mDq6eSdHxgT8RxxTCUk5ZmbgOgXoELTBKkI6EbJ2Zlq/sxF/B00yuz+gBvcWj8QKYxLFXujQe0OaxVhXoKdmEJm+XnvUokIiaqFTXQi2P4x74B+m4WZr/GE2MAAAAASUVORK5CYII=");
  background-size: 100% 100%;
}

/* 右箭头 （灰）*/
.arrow_r {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAiCAMAAABodAmPAAAAS1BMVEUAAACJiYmJiYmJiYmJiYmJiYmMjIyMjIyKioqLi4uJiYmJiYmJiYmKioqIiIiJiYmJiYmKioqJiYmJiYmIiIiJiYmIiIiMjIyJiYkwZ2ZgAAAAGHRSTlMAqOLvv28bDwYs+NPRikHlVlM9jZCPOioiCkVOAAAAeklEQVQoz62SSQ7DMAzEYjv75iTd+P+X9m42CApERx4EajRVyEelSYy74JqgER0iLKLtBKEvaVdD3ZW0DzC3WvGAOIg2kFbRbWTcRI9T4ZeF5/+EJwsvkH8Kx2voe52MlZy2/+IPOrrdeqlsxRPi50a9fK53XcUQ32Jf7ZwJStjGlRcAAAAASUVORK5CYII=");
  background-size: 100% 100%;
}

/* 右箭头 （白）*/
.arrow_w {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAaCAYAAAC+aNwHAAABBklEQVQ4jZXUvy5EQRQH4EG3/iT7ABoP4B0oJCJqvSgURKERncQWEr1IiE69NJtIVCIK0RGtShQaT/ApWFnHrN1zkinuzPy+c+/k3lvQQAcvWELJjIIdv2slCyz6W1sZoGC7gqxngIK1CrKZAQqWK8h+BihYqCAHGaBgroK0MkDBLD4CcpoBCmbwFpDzDFAwjdeAnGSAgiYeA3KJkdR7j7OAHI6WXL2H66lM93bofovGsOHrEG5nDvEqhDu969nOF3FPv+DY9zP21nFtbz/gPoSP+t1lbfJumM41YBwPIbw34Ix+gEk8h/DuoHAXaOIphP/9C0VgPoQ3hg13gQnc+PruVzNhlE8lqxd2zMUz6gAAAABJRU5ErkJggg==");
  background-size: 100% 100%;
}
/* june设置样式集合star */
.flex {
  display: flex;
}
.column {
  flex-direction: column;
}
.center {
  justify-content: center;
  align-items: center;
}
.alignCenter {
  align-items: center;
}
.between {
  justify-content: space-between;
}
/* june设置样式集合end */

/* 没数据 */

.noneData {
  margin-top: 150rpx;
}

.noneData .img {
  width: 512rpx;
  height: 256rpx;
}

.noneData .noneDataTxt {
  color: #acacac;
}
</style>
