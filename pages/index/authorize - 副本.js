
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function (res) {
              console(res.userInfo)
            }
          })
        }else{
          
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo);
    if (e.detail.userInfo==null){
      //console.log("点击了拒绝");
      wx.switchTab({
        url: 'index'
      })
    }else{
      //console.log("点击了同意");
      wx.login({
        success: function (res) {

          var that = this
          console.log('aaaa=========');
          if (typeof success == "function") {
            this.data.getUserInfoSuccess = success
          }
          var code = res.code;
          // console.log('code=========' + code);
          wx.getUserInfo({

            success: function (ress) {
              // console.log('in= success========');
              // console.log(ress);
              wx.switchTab({
                url: '../m/index'
              })
            },
            fail: function (res) {
              // console.log("jhgvjhbhjkjknb");
              // wx.switchTab({
              //   url: 'index'
              // })
              that.setData({
                getUserInfoFail: true
              })
            }
          })
        }
      })
    }
    
  },
 
  // onLoad: function () {
  //   console.log('vcccc=========');
  //   wx.login({
  //     success: function (res) {

  //       var that = this
  //       console.log('aaaa=========');
  //       if (typeof success == "function") {
  //         this.data.getUserInfoSuccess = success
  //       }
  //       var code = res.code;
  //       console.log('code=========' + code);
  //       wx.getUserInfo({

  //         success: function (ress) {
  //           console.log('in= success========');
  //           console.log(ress);
  //           wx.redirectTo({
  //             url: 'index/index'
  //           })
  //         },
  //         fail: function (res) {
  //           console.log("jhgvjhbhjkjknb");
  //           wx.redirectTo({
  //             url: 'index'
  //           })
  //           that.setData({
  //             getUserInfoFail: true
  //           })
  //         }
  //       })
  //     }
  //   })
  // }


  //   login: function () {

  //     var that = this
  //     console.log('aaaa=========');
  //     if (typeof success == "function") {
  //       this.data.getUserInfoSuccess = success
  //     }
  //     wx.login({
  //       success: function (res) {
  //         var code = res.code;
  //         console.log('code========='+code);
  //         wx.getUserInfo({
            
  //           success: function (ress) {
  //             console.log('in= success========');
  //             console.log(ress);
  //             wx.redirectTo({
  //               url: 'index'
  //             })
  //           },
  //           fail: function (res) {
  //             console.log("jhgvjhbhjkjknb");
  //             that.setData({
  //               getUserInfoFail: true
  //             })
  //           }
  //         })
  //       }
  //     })
  // }




})


