var page = 1;
var showLine = 10;
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
          url: 'https://m.jiahexueyuan.com/queryAccountFollowMini.do',
          data: {
            pageNo: 1,
            showLine: showLine,
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },

          success: function (res) {
            var length = res.data.list.length;          
            if (length == 0) {
              if (res == 0) {
                wx.showToast({
                  icon: 'none',
                  title: '暂无关注',
                })
              }
              console.log('rdSessionKey=====error');
            }
            else{
              if (length != res.data.showLine) {
                console.log('rdSessionKey=====error');
              }
              for (var i = 0; i < length; i++) {
                var date = res.data.list[i].add_datetime;
                var times = date.substring(0, 10);
                if (res.data.list[i].ePic.substring(0, 4) != 'http') {
                  res.data.list[i].ePic = "http://r1.jiahexueyuan.com/" + res.data.list[i].ePic;
                }
              }
            }
            that.setData({
              recordList: res.data.list,
              time: times
            })


          }
        })
      }, fail: function () {
        console.log('rdSessionKey=====error');
      }
    })
  },
  /*列表跳转 */
  navs: function (option) {
    var that = this
    var id = option.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '../index/jh-dsCenter?id=' + id,
    })
  },
  /*获取是否已关注 */
  gz: function (e) {
    var that = this
    var id = e.currentTarget.dataset.eid;
    console.log(id)
    var data_list = that.data.recordList;
    
    wx.request({
      url: "https://m.jiahexueyuan.com/deleteAccountFollowMini.do",
      data: {
        eid: id,
        rdSessionKey: rdSessionKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {
        console.log(rdSessionKey + "==rdSessionKey");
        console.log(res.data);
        if (res.data == 1) {
          wx.showToast({
            icon: 'none',
            title: '取消关注成功',
          })
          that.onLoad();
        } else {
          wx.showToast({
            icon: 'none',
            title: '取消关注失败',
          })
        }

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
      url: 'https://m.jiahexueyuan.com/queryAccountFollowMini.do',
      data: {
        pageNo: page,
        showLine: showLine,
        rdSessionKey: rdSessionKey,
      },
      method: "GET",
      // 请求头部  
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        console.log(page + "====page");

        // 回调函数  
        var moment_list = that.data.recordList;
        for (var i = 0; i < res.data.list.length; i++) {

          moment_list.push(res.data.list[i]);
        }
        console.log(moment_list);
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