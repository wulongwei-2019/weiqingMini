var page = 1;
var showLine = 10;
var rdSessionKey;
var fal = true;

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
    work:[],
  },
  
  onLoad: function(){
    var httpurl;
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
                        url: 'https://m.jiahexueyuan.com/miniLogin.do',
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
    }),
    wx.getStorage({
        key: 'rdSessionKey',
        success: function (ress) {
          rdSessionKey = ress.data;
          console.log(rdSessionKey + '====success');
          httpurl = 'https://m.jiahexueyuan.com/queryCoursesSeriesMini.do';
         
          console.log(httpurl);

          wx.request({
            url: httpurl,
            data: {
              pageNo: page,
              showLine: showLine,
              rdSessionKey: rdSessionKey,
              recommend:1,
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            
            success: function (res) {
            
              if (res.data.list.length > 0){
                var list = res.data.list;
                for (var i = 0; i < res.data.list.length; i++) {
                  if (res.data.list[i].play_number==null){
                    list[i].play_number = '0';
                    }
                  if (res.data.list[i].work == 0) {
                    list[i].work='FM';

                  }else{
                    list[i].work = '视频';
                  }

                  if (res.data.list[i].money == 0) {
                    list[i].color = '#83C12E',
                    list[i].free = '免费';

                  } else {
                    list[i].color = 'red',
                    list[i].free = '会员/团员免费';
                  }
                  //console.log(res.data.list[i].work)
                } 
                that.setData({
                  recordList: list,
                      
                })
              }
              if (res.data.list.length < showLine) {
                fal = false;
              }
            }
          })
        }, fail: function () {
          console.log('rdSessionKey=====error');
        }
      })
    //   ,
   
    // queryTransfer11();

    // function queryTransfer11() {//查询用户是否是会员或团员
    //   $.ajax({
    //     url: "http://192.168.1.93:8080//queryTransferMini.do",
    //     type: "post",
    //     async: false,
    //     dataType: "text",
    //     success: function (data) {
    //       if (data > 0) {
    //         tt_url = "/r/selfCenter.html";
    //       } else {
    //         tt_url = "/r/intro.html";
    //       }
    //       queryBanner();
    //     }
    //   });
    // }






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
      url: 'https://m.jiahexueyuan.com/queryCoursesSeriesMini.do?type=0',
      method: "GET",
      data: {
        pageNo: page,
        showLine: showLine,
        rdSessionKey: rdSessionKey,
        recommend:1,

      },
      // 请求头部  
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        if (res.data.list.length > 0) {
          var list = res.data.list;
          for (var i = 0; i < res.data.list.length; i++) {

            if (res.data.list[i].work == 0) {
              list[i].work = 'FM';

            } else {
              list[i].work = '视频';
            }

            if (res.data.list[i].money == 0) {
              list[i].color = '#1AAD19',
                list[i].free = '免费';

            } else {
              list[i].color = 'red',
                list[i].free = '会员/团员免费';
            }
          }
        }
        if (res.data.list.length < showLine) {
          fal = false;
        }

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

  /*列表跳转 */
  navs: function (option) {
    console.log(option);
    var that = this
    var ids = option.currentTarget.dataset.id;
    // var pic = option.currentTarget.dataset.pic;
    // var name = option.currentTarget.dataset.name;
    // var money = option.currentTarget.dataset.money;
    var playnumber = option.currentTarget.dataset.playnumber;
    // var expertid = option.currentTarget.dataset.expertid;
    wx.navigateTo({
      url: '../v/index?id=' + ids + '&playnumber=' + playnumber,
      // url: '../v/index?id=' + ids + '&pic=' + pic + '&name=' + name + '&money=' + money + '&playnumber=' + playnumber + '&expertid=' + expertid,
    })

  },






})


