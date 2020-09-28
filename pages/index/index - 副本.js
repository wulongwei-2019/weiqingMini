var page = 1;
var showLine = 10;
Page({
  data: {
    imgUrls: [
      'img/banner1.png',
      'img/banner2.jpg',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    beforeColor: "#eee",
    afterColor: "#FF7433",
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  
  onLoad: function(){
    var that = this;
    wx.login({
      success: function (res) {
      var wx_code ;
        if (res.code) {
          wx_code = res.code;
          
          wx.getSetting({
            success: function (setres) {
              if (setres.authSetting['scope.userInfo']) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                wx.getUserInfo({
                  success: function (userres) {
                    console.log(userres);
                    
                    //发起网络请求
                    wx.request({
                      url: 'http://192.168.1.93:8080/miniLogin.do',
                      data: {
                        code: wx_code,
                        encryptedData: userres.encryptedData,
                        iv: userres.iv
                      },
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      //method: 'POST',
                      success: function (result) {
                        console.log(result);
                        console.log(result.data.rdSessionKey +'=======rdSessionKey');
                        console.log(result.data.errno + '=======error');
                        wx.setStorage({
                          key: 'rdSessionKey',
                          data: result.data.rdSessionKey,
                        })
                       
                      },fail:function(){
                        console.log("error")
                      }
                    })
                  }
                })
              }
            }
          })
          
         
        } else {
          console.log('登录失败！' + res.errMsg)
        }
        
      }
    });
  },
  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  }





/* 数据加载更多 */
  // onLoad: function (options) {
  //   var that = this;
  //   wx.request({
  //     url: 'https://m.jiahexueyuan.com/testwx.do?pageNo=1&showLine=' + showLine + '&id=39',
  //     data: {
  //     },
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success: function (res) {
  //       that.setData({
  //         recordList: res.data.list,

  //       })
  //     }
  //   })
  // },
  // /**
  //  * 页面相关事件处理函数--监听用户下拉动作
  //  */
  // onPullDownRefresh: function () {
  //   // 显示顶部刷新图标  
  //   wx.showNavigationBarLoading();
  //   var that = this;
  //   wx.request({
  //     url: 'https://m.jiahexueyuan.com/testwx.do?pageNo=1&showLine=' + showLine + '&id=39',
  //     method: "GET",
  //     header: {
  //       'content-type': 'application/text'
  //     },
  //     success: function (res) {
  //       that.setData({
  //         recordList: res.data.list
  //       });


  //       //console.log(that.data.moment);
  //       // 隐藏导航栏加载框  
  //       wx.hideNavigationBarLoading();
  //       // 停止下拉动作  
  //       wx.stopPullDownRefresh();
  //     }
  //   })
  // },

  // /**
  //  * 页面上拉触底事件的处理函数
  //  */
  // onReachBottom: function () {
  //   var that = this;
  //   // 显示加载图标  
  //   wx.showLoading({
  //     title: '玩命加载中',
  //   })
  //   // 页数+1  
  //   page = page + 1;
  //   wx.request({
  //     url: 'https://m.jiahexueyuan.com/testwx.do?pageNo=' + page + '&showLine=' + showLine + '&id=39',
  //     method: "GET",
  //     // 请求头部  
  //     header: {
  //       'content-type': 'application/text'
  //     },
  //     success: function (res) {
  //       // 回调函数  
  //       var moment_list = that.data.recordList;

  //       for (var i = 0; i < res.data.list.length; i++) {

  //         moment_list.push(res.data.list[i]);
  //       }

  //       // 设置数据  
  //       that.setData({
  //         recordList: moment_list
  //       })

  //       // 隐藏加载框  
  //       wx.hideLoading();
  //     }
  //   })
  // },



})


