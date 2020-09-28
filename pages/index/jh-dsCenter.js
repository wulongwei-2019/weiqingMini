var page = 1;
var showLine = 10;
var rdSessionKey;
var fal = true;
var eid = 0;
Page({

  /** * 页面的初始数据 */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
  },
  /** * 生命周期函数--监听页面加载 */
  onLoad: function (options) {
    var that = this
    /**  * 获取系统信息 */
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
    var id = options.id;
    console.log(id)
    that.setData({
      id:options.id
    })
    
    wx.getStorage({
      key: 'rdSessionKey',
      success: function (ress) {
        eid = id;
        rdSessionKey = ress.data;
        wx.request({
          url: 'https://m.jiahexueyuan.com/queryExpertidExpertMini.do',
          data: {
            expertid: eid,
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            // console.log(res + "==res");
            //获取专家关注信息
            if (res.data.pic.substring(0, 4) != 'http') {
              res.data.pic = "http://r1.jiahexueyuan.com/" + res.data.pic;
            }
            if (res.data.msg.substring(0, 4) != 'http') {
              res.data.msg = "http://r1.jiahexueyuan.com/" + res.data.msg;
            }
            var work = res.data.yn_follow;
            console.log(work)
            if (work == 0) {
              that.setData({
                yn_follow: '立即关注'
              })
            }
            else{
              that.setData({
                yn_follow:'已关注',
                backgroundColor: '#c9c9c9',
              })
            }
            that.setData({
              pic: res.data.pic,
              nick_name: res.data.nick_name,
              follow_num: res.data.follow_num,
              msg: res.data.msg,
            })
          }
        })
      }, fail: function () {
        console.log('rdSessionKey=====error');
      }
    })

    /*获取专家课程列表 */
    wx.getStorage({
      key: 'rdSessionKey',
      success: function (ress) {
        rdSessionKey = ress.data;
        eid = id;
        wx.request({
          url: 'https://m.jiahexueyuan.com/queryExpertidCoursesSeriesMini.do',
          data: {
            expertid: eid,
            pageNo:1,
            showLine: showLine,
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
           // console.log(res + "==res");
          
            that.setData({
              kcList: res.data.list,
            })
          }
        })
      }, fail: function () {
        console.log('rdSessionKey=====error');
      }
    })
   
  },
  /*获取是否已关注 */
  gz: function (e) {
    var that = this;
    console.log(eid)
    var work = that.data.yn_follow;
    var num = that.data.follow_num;
    num = parseInt(num);
    if (work != "立即关注") {
      work = 1;
    } else {
      work = 0;
    }
    wx.request({
      url: "https://m.jiahexueyuan.com/accountfollowMini.do",
      data: {
        expertid: eid,
        work: work,
        rdSessionKey: rdSessionKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {
        //console.log(res.data);
        if (res.data == 1) {
          console.log("success");
          if (work == 1) {
            that.setData({
              yn_follow: '立即关注',
              backgroundColor: '#FF7433',
              follow_num: num -1
            })
          } else {
            that.setData({
              yn_follow: '已关注',
              backgroundColor: '#c9c9c9',
              follow_num:num + 1
            })
          }
          
        } else {
         console.log("error");
        }

      }
    })
  },

  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } 
    else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
 
  /** 
   * 页面上拉触底事件的处理函数 
   */
  onReachBottom:function(){
    var that = this;
    var curtab = that.data.currentTab;
    //console.log("a======" + ress.data);
    // 显示加载图标  
    if (curtab == 1) {
      wx.showLoading({
        title: '玩命加载中',
      })
      //console.log("rdSessionKey=====" + rdSessionKey);
      // 页数+1  
      page = page + 1;
      wx.request({
        url: 'https://m.jiahexueyuan.com/queryExpertidCoursesSeriesMini.do',
        //  method: "POST",
        data: {
          expertid: eid,
          pageNo: page,
          showLine: showLine,
          rdSessionKey: rdSessionKey,
        },

        // 请求头部  
        header: {
          'content-type': 'application/text'
        },

        success: function (ress) {
          //console.log(that.data.currentTab +'currentTab')
          // 回调函数  
          var kc_lists = that.data.kcList;
          for (var i = 0; i < ress.data.list.length; i++) {
            if (ress.data.list[i].play_number == null) {
              ress.data.list[i].play_number = 0;
            }
            kc_lists.push(ress.data.list[i]);
          }
          // 设置数据  
          that.setData({
            kcList: kc_lists
          })
          // 隐藏加载框  
          wx.hideLoading();
        }


      })

    }
    
    
  },

  
})