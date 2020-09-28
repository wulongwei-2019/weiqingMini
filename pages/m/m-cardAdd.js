// pages/m/m-cardAdd.js
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     array: ['中国建设银行', '中国工商银行', '中国农业银行', '中国银行'],
//     objectArray: [
//       {
//         id: 0,
//         name: '中国建设银行'
//       },
//       {
//         id: 1,
//         name: '中国工商银行'
//       },
//       {
//         id: 2,
//         name: '中国农业银行'
//       },
//       {
//         id: 3,
//         name: '中国银行'
//       }
//     ],
//     bindPickerChange: function (e) {
//       console.log('picker发送选择改变，携带值为', e.detail.value)
//       this.setData({
//         index: e.detail.value
//       })
//     },
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
  
//   },

//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {
  
//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {
  
//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {
  
//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
  
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {
  
//   }
// })


Page({
  data: {
    array: ['中国建设银行', '中国建设银行', '中国邮政银行', '中国银行'],
    objectArray: [
      {
        id: 0,
        name: '中国建设银行'
      },
      {
        id: 1,
        name: '中国建设银行'
      },
      {
        id: 2,
        name: '中国邮政银行'
      },
      {
        id: 3,
        name: '中国银行'
      }
    ],
    index: 0,
   
    
   
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  
 
})