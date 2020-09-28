
Page({
  data: {
    index: 0,
    multiIndex: [0, 0, 0],
    date: '2001-01-01',
    region: ['北京市', '北京市', '东城区'],
    customItem: '全部',
  },
  /** * 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    
  },

  formSubmit: function (e) {
    // if (e.detail.value.mobile.length == 0) {
    //   wx.showToast({
    //     title: '手机号不得为空!',
    //     icon: 'none',
    //     duration: 1500
    //   })

    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)
    // } 
    //var myreg = /^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/; //手机正则
    if (e.detail.value.mobile.length != 11) {
      wx.showToast({
        title: '请输入11位手机号码!',
        icon: 'none',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
   // var isOk = 1;
    
    if (e.detail.value.name.length == 0 || e.detail.value.name.length > 12){
      wx.showToast({
        title: '请填写正确的昵称，且不能超过12个字符!',
        icon: 'none',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    //  else if (parseInt(isOk) == 1) {
    //   wx.showToast({
    //     title: '昵称已被占用',
    //     icon: 'none',
    //   })
    //   setTimeout(function () {
    //     wx.hideToast()
    //   }, 2000)
    // }
    else if (e.detail.value.wchat.length > 32){
      wx.showToast({
        title: '微信号的长度错误!',
        icon: 'none',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    else if (e.detail.value.address.length > 124) {
      wx.showToast({
        title: '详细地址过长!',
        icon: 'none',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }

    
  
    
    



  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})