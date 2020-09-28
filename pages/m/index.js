var rdSessionKey;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hvip:true,
    imgUrl:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this;
    wx.getStorage({
      key: 'rdSessionKey',
      success: function (ress) {
        rdSessionKey = ress.data;
        console.log(rdSessionKey + '====success');
        wx.request({
          url: 'https://m.jiahexueyuan.com/queryMineMini.do',
          data: {    
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },

          success: function (res) {
            var avatar=res.data.pic;
            if (avatar.substring(0, 4) != 'http') {
              avatar = 'https://m.jiahexueyuan.com/' + avatar;
            }
            if (res.data.uid != 0) {
              if (res.data.mname != "普通用户" && res.data.mname != "未登录") {
                that.setData({
                  hvip:!that.data.hvip,
                })
              }

              that.setData({
                  pic:avatar,
                  nick_name: res.data.nick_name,
                  mname: res.data.mname,
                  coursesCollect: res.data.coursesCollect,
                  accountFollow: res.data.accountFollow,
                  yn_news_info: res.data.yn_news_info
              })
            }
          }
        })
      }, fail: function () {
        console.log('rdSessionKey=====error');
      }
    })
    
  },
  setPhotoInfo:function(){
    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imgUrl: tempFilePaths
        })
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