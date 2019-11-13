module.exports = Behavior({
  methods: {
    
  },
  // 监听所在页面的声明周期、
  pageLifetimes: {
    // page里面onshow方法
    show() {
      console.log('behavior show')
      
      const _this = this;
      //
      console.log('show')
      // session-key 有没有过期，token存不存在，有没有用户授权过

      // 1. 检查session-key
      wx.checkSession({
        success: function(res) {
          // getSetting()拿用户的授权
          wx.getSetting({
            success: function(res) {
              if (res.authSetting['scope.userInfo']) {
                // seesionkey没有过期，并且授权过
                if (wx.getStorageSync('token')) {
                  // seesionkey没有过期，并且授权过，还有token
                  // _this.setData({
                  //   isAuth: true
                  // });
                  // 子传父
                  _this.triggerEvent('setlogin', {
                    isAuth: true
                  });
                } else {
                  // seesionkey没有过期，并且授权过，但是没有token
                  _this.getToken();
                }
              } else {
                // seesionkey没有过期，没有授权过
                // 显示授权页面
                // _this.setData({
                //   isAuth: false
                // })
                _this.triggerEvent('setlogin', {
                  isAuth: false
                });
              }
            }
          })
        },
        fail: function(res) {
          // session-key过期
          // 1.如果没有授权过
          wx.getSetting({
            success: function(res) {
              console.log(res)
              if (res.authSetting['scope.userInfo']) {
                // 授权
                // wx.login => code =>后端返回token
                _this.getToken();
              } else {
                // 没有授权,显示授权页面给用户
                // _this.setData({
                //   isAuth: false
                // })
                _this.triggerEvent('setlogin', {
                  isAuth: false
                });
              }
            }
          })
        }
      })
    },
    hide() {
      this.triggerEvent('setlogin', {
        isAuth: null
      });
    }
  }
})