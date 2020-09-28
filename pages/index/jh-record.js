var page = 1;
var showLine = 10;
var rdSessionKey;
Page({

/*** 页面的初始数据 */
  data: {
    
  },
  
  /*** 生命周期函数--监听页面加载 */
  
  onLoad: function (options) {
   
    var httpurl;
    var that = this;
    wx.getStorage({
      key:'rdSessionKey',
      success: function (ress) {
       
        rdSessionKey = ress.data;
        console.log(rdSessionKey+'====success');
        httpurl = 'https://m.jiahexueyuan.com/queryAccountWatchHistoryMini.do?pageNo=1&showLine=' + showLine+'&rdSessionKey=' + rdSessionKey;
        console.log(httpurl);

        wx.request({
          url: httpurl,
          data: {
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res);
            that.setData({
              recordList: res.data.list,

            })
          }
        })
      },fail:function() {
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
    // 显示顶部刷新图标  
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://m.jiahexueyuan.com/queryAccountWatchHistoryMini.do?pageNo=1&showLine=' + showLine + '&rdSessionKey=' + rdSessionKey,
      method: "GET",
      header: {
        'content-type':'application/text'
      },
      success: function (res) {
        that.setData({
          recordList: res.data.list
        });
        
      
        //console.log(that.data.moment);
        // 隐藏导航栏加载框  
        wx.hideNavigationBarLoading();
        // 停止下拉动作  
        wx.stopPullDownRefresh();
      }
    }) 
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标  
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1  
    page = page + 1;
    wx.request({
      url: 'https://m.jiahexueyuan.com/queryAccountWatchHistoryMini.do?pageNo=1&showLine=' + showLine + '&rdSessionKey='  + rdSessionKey,
      method: "GET",
      // 请求头部  
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 回调函数  
        var moment_list = that.data.recordList;
        
        for (var i = 0; i < res.data.list.length; i++) {
          
          moment_list.push(res.data.list[i]);
        }
       
        // 设置数据  
        that.setData({
          recordList: moment_list
        })
        
        // 隐藏加载框  
        wx.hideLoading();
      }
    })  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})




