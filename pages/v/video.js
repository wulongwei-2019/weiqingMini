var rdSessionKey;
var coursesWork = -1;
var expertid = 0;
var id=0;
var bid=0;
Page({
  onReady: function (e) {
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.autoplay = true
    innerAudioContext.src = ''
    innerAudioContext.onPlay(() => {
      console.log('开始播放')
    })
    innerAudioContext.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  data: {
    vhid: true,
    ahid: true,
    bbhid:true,
    mhid: true,
    current: {
      poster: '',
      name: '',
      author: '',
      src: '',
      
    },
    audioAction: {
      method: 'play'
    }
  }, 
  audioTimeUpdated: function (e) {
    this.duration = e.detail.duration;
  },
  timeSliderChanged: function (e) {
    if (!this.duration)
      return;
    var time = this.duration * e.detail.value / 100;

    this.setData({
      audioAction: {
        method: 'setCurrentTime',
        data: time
      }
    });
  },
  /*** 生命周期函数--监听页面加载*/
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    // if (isNaN(id) || id == null) {
    //   window.location.href = "/index.html";
    // } else {
    //   var yn_login = islogin();
    //   queryIdCourses();
    // }
    wx.getStorage({
      key: 'rdSessionKey',
      success: function (ress) {
        rdSessionKey = ress.data;
        console.log(id)
        wx.request({
         url: 'https://m.jiahexueyuan.com/queryIdCoursesMini.do',
          data: {
            id: id,
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            bid=id;
            expertid = res.data.exp.expertid;
            var epic = res.data.exp.pic;
            var enick_name = res.data.exp.nick_name;
            if (epic.substring(0, 4) != 'http') {
              epic = 'https://m.jiahexueyuan.com/' + epic;
            }
            var work = res.data.exp.yn_follow;
            console.log(work)
            if (work == 0) {
              that.setData({
                yn_follow: '立即关注'
              })
            }
            else {
              that.setData({
                yn_follow: '已关注',
                backgroundColor: '#c9c9c9',
              })
            }

            console.log(res);
            console.log(res.data.cs.work)
            if (res.data.cs.work == 0) {//FM
              coursesWork = 4;
            } else {//视频
              coursesWork = 2;
            }
            if (res.data.cs.true_path != "" && res.data.cs.true_path != null && res.data.cs.true_path != "null") {
              res.data.cs.true_path = res.data.cs.true_path;
              if (res.data.cs.work == 0) {//FM
                coursesWork = 4;
                //console.log(res.data.cs.true_path)
                that.setData({
                  ahid: !that.data.ahid,
                  true_path: res.data.cs.true_path,
                  pic: res.data.cs.pic,
                  nick_name: res.data.exp.nick_name,
                  
                })                                 
              }
              else{
                coursesWork = 2;
                //console.log(res.data.cs.true_path)
                that.setData({
                  vhid: !that.data.vhid,
                  true_path: res.data.cs.true_path,
                  pic: res.data.cs.pic,
                  
                })
              }
            }
            else{
              that.setData({
                mhid: !that.data.mhid,
              })

            }
       

            that.setData({
              name: res.data.cs.name,
              msg: res.data.cs.msg,
              money: res.data.cs.money,
              play_number: res.data.cs.play_number,
              comment_num: res.data.comment_num,
              epic: epic,
              enick_name: enick_name,
              follow_num: res.data.exp.follow_num,
            })
            /**课程目录 */
            var length = res.data.cs_list.length + 1;
            var list = res.data.cs_list;
            console.log(list)
            for (var i = 0; i < list.length; i++) {
              length = length - 1;
              var picc = "https://m.jiahexueyuan.com/img/k_img/content_r" + length + ".jpg";
              list[i].kpic = picc;
              if (res.data.cs.id == list[i].id) {
                list[i].colors='#ff7433'
              }
              else{
                if (res.data.cs_list[i].money == 0) {
                  list[i].color = '#83C12E',
                    list[i].free = '免费';

                } else {
                  list[i].color = 'red',
                    list[i].free = '会员/团员免费';
                }

              }
            }
            that.setData({
              kList: list,
            })
            if (res.data.yn_view != 1 && res.data.cs.yn_view != 1) {
             // $("#purchase").show();
              that.setData({
                bbhid: !that.data.bbhid,
              })
              
            }  
          }
        })
      }, fail: function () {
        console.log('rdSessionKey=====error');
      }
    })

  },
  /*获取是否已关注 */
  gz: function (e) {
    var that = this
    var work = that.data.yn_follow;
    console.log(work)
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
        expertid: expertid,
        work: work,
        rdSessionKey: rdSessionKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        console.log("success");
        if (work == 1) {
          that.setData({
            yn_follow: '立即关注',
            backgroundColor: '#FF7433',
            follow_num: num - 1
          })
        } else {
          that.setData({
            yn_follow: '已关注',
            backgroundColor: '#c9c9c9',
            follow_num: num + 1
          })
        }
      }
    })
  },
  /*点击购买 */
  buybtn: function (e) {
    var that = this
    console.log(bid)
    wx.request({
      url: "https://m.jiahexueyuan.com/insertGoodsOrderMini.do",
      data: {
        id: bid,
        type: coursesWork,
        rdSessionKey: rdSessionKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        console.log("success");
        if (res.data != null && res.data.id != 0) {
          if (res.data.state == 1) {
            wx.showToast({
              // icon: 'none',
              title: '商品已经购买',
            })
          } else {
            wx.navigateTo({
              url: '../index/jh-payment?ordernumber=' + res.data.ordernumber,
            })
            
          }
        } else {
          wx.showToast({
             icon: 'none',
            title: '未登录或者已经购买',
          })
        }
      }
    })
  },
  /*列表跳转 */
  navs: function (option) {
    var that = this
    wx.navigateTo({
      url: '../index/jh-dsCenter?id=' + expertid,
    })

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