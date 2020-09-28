var page = 1;
var showLine = 1000;
var rdSessionKey;
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getStorage({
      key: 'rdSessionKey',
      success: function (ress) {
        rdSessionKey = ress.data;
        console.log(rdSessionKey + '====success');    
        wx.request({
          url: 'https://m.jiahexueyuan.com/queryUidCoursesCollectMini.do',
          data: {
            pageNo: page,
            showLine: showLine,
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },

          success: function (res) {
            if (res.data.list.length > 0) {
              var list = res.data.list;
              for (var i = 0; i < res.data.list.length; i++) {
                if (res.data.list[i].play_number == null || res.data.list[i].play_number == "" || res.data.list[i].play_number == "null") {
                  res.data.list[i].play_number = 0;
                }
                that.setData({
                  recordList: list,
                })
              }
            }
            else {
              wx.showToast({
                icon: 'none',
                title: '暂无收藏',
              })
            }
          }
        })
      }, fail: function () {
        console.log('rdSessionKey=====error');
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})