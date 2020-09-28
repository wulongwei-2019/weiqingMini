var eid = 0;  
var page = 1;
var showLine = 10;
var rdSessionKey;
var fal = true;
var coursesWork = -1;
var expertid = 0;
var uid = 0;
var idone=0;

Page({
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    collectTip:'',
    buytip:''
  },
  onLoad: function (options) {
    if (isNaN(eid) || eid == null) {
      wx.navigateTo({
        url: '../index/index',
      })
    } 

    var that = this;
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
      id: options.id,
      play_number: options.playnumber,
    })

    /*获取专家课程列表 */
    wx.getStorage({
      key: 'rdSessionKey',
      success: function (ress) {
        rdSessionKey = ress.data;
        eid = id;
        
        wx.request({
          url: 'https://m.jiahexueyuan.com/queryIdCoursesSeriesMini.do',
          data: {
            id: eid,
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            expertid = res.data.e.expertid;
            var avatar = res.data.e.pic;
            var play_number = 0;
            if(avatar.substring(0,4)!='http'){
              avatar = 'https://m.jiahexueyuan.com/'+avatar;
            }
            console.log(res + "==res");


            /*判断专家是否关注 */
            // var work = res.data.e.yn_follow;
            // if (work == 0) {
            //   that.setData({
            //     yn_follow: "立即关注",
            //   })
            // }
            // else{
            //   that.setData({
            //     backgroundColor: '#c9c9c9',
            //     yn_follow : "已关注",
            //   })
            // }
            var work = res.data.e.yn_follow;
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
            /**购买 */
            if (res.data.yn_vip == 1) {
              that.setData({
                buytip: '立即观看(已购买)'
              })
            } else if (res.data.yn_view == 0) {
              that.setData({
                buytip: '购买专栏'
              })
            } else {
              that.setData({
                buytip: '立即观看'
              })
            }



            /**判断收藏 */
            var collected = res.data.yn_collect;
            if (res.data.yn_collect == 0) {
              that.setData({
                collectTip: '收藏',
                bgcolor: '#fff'
              })
            }
            else {
              that.setData({
                collectTip: '已收藏',
                bgcolor: '#eee'
              })
            }

            var msg = res.data.msg;
            msg = msg.split("\"");
            if (msg.length>0){
              msg = msg[1];
            }else{
              msg = "https://m.jiahexueyuan.com/img/def.png";
            }
            /**课程目录 */
            var play_number = 0;
            if (res.data.c.length > 0) {
              var length = res.data.c.length + 1;
              var list = res.data.c;
              
              for (var i = 0; i < res.data.c.length; i++) {
                // play_number = parseInt(play_number) + parseInt(res.data.c[i].play_number);
                length = length-1;
                var picc = "https://m.jiahexueyuan.com/img/k_img/content_r" + length + ".jpg";
                list[i].kpic = picc;
                
                // if (res.data.play_number == 513) {
                //   play_number = '0';
                // }
                if (res.data.c[i].money == 0) {
                  list[i].color = '#83C12E',
                  list[i].free = '免费';

                } else {
                  list[i].color = 'red',
                  list[i].free = '会员/团员免费';
                }

                var cid = res.data.c[i].id;
                var cidone = res.data.c[0].id;
                //console.log(cid+'========'+i);

                // var index = cid
              }
              idone = cidone;
              //console.log(idone);
              console.log(cid + '========cid');
              that.setData({
                pic:res.data.pic,
                name:res.data.name,
                simple_msg: res.data.simple_msg,
                money: res.data.money,
                num: res.data.c.length,
                kList: list,
                
              })
            }
            if (res.data.c.length < showLine) {
              fal = false;
            }

            that.setData({
              simple_msg: res.data.simple_msg,
              num: res.data.c.length,
              epic: avatar,
              nick_name: res.data.e.nick_name,
              follow_num: res.data.e.follow_num,
              msg: msg
            })
          }
        })
      }, fail: function () {
        console.log('rdSessionKey=====error');
      }
    })



  },

  bought :function(){

    var type = -1;
    if(coursesWork == 0) {
      type = 3;
    } else if (coursesWork == 1) {
      type = 1;
    }
    wx.request({
      url: "https://m.jiahexueyuan.com/insertGoodsOrderMini.do",
      data: {
        id: eid,
        type: type,
        rdSessionKey: rdSessionKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);

        if (res.data != null && res.data.id != 0) {
          if (res.data.state == 1) {
            wx.showToast({
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

  /*获取是否已关注 */
  gz: function (e) {
    
    var that = this
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
  /*列表跳转 */
  navs: function (option) {
    var that = this
    wx.navigateTo({
      url: '../index/jh-dsCenter?id=' + expertid,
    })

  },
  /**获取是否收藏 */
  collect:function(a){
    var that = this;
    var collect = that.data.collectTip;
    console.log(eid)
    if (collect != "收藏") {
      collect = 1;
    } else {
      collect = 0;
    }
    console.log(collect)
    if (collect == 0){
      
      wx.request({
        url: "https://m.jiahexueyuan.com/insertCoursesCollectMini.do",
        data: {
          cid: eid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success:function (res) {
          console.log(res)
          that.setData({
            collectTip: '已收藏',
            bgcolor: '#eee'
          })
        }
      })

    }   
    else{
      wx.request({
        url: "https://m.jiahexueyuan.com/deleteCoursesCollectMini.do",
        data: {
          cid: eid,
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log(res)
          that.setData({
            collectTip: '收藏',
            bgcolor: '#fff'
          })

        }
      })

    }
    

  },
  /**点击学习 */
  djxx:function(){
    var that = this;
    //console.log(idone)
    wx.navigateTo({
      url: 'video?id=' + idone,
    })
  },

  /**购买点击 */
  buyBtns:function(){
    var that = this;
    var buytext = that.data.buytip;
    if (buytext =='立即观看'){
      wx.navigateTo({
        url: 'video?id=' + idone,
      })
    }
    if (buytext == '立即观看(已购买)'){
      wx.navigateTo({
        url: 'video?id=' + idone,
      })
    }
    if (buytext == '购买专栏'){
      that.bought();
    }
    
   // window.location.href = "/k/kcDetail.html?id=" + id;


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
  
  /*** 生命周期函数--监听页面显示 */
  // onShow: function (res) {
  //   var that=this;
  //   var work = that.data.yn_follow;
  //   console.log(work)
    //   var collect = that.data.collectTip;
    // console.log(eid)
    // if (collect != "收藏") {
    //   collect = 1;
    // } else {
    //   collect = 0;
    // }
    // console.log(collect)
    // if (collect == 0){
      
    //   wx.request({
    //     url: "https://m.jiahexueyuan.com/insertCoursesCollectMini.do",
    //     data: {
    //       cid: eid,
    //     },
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success:function (res) {
    //       console.log(res)
    //       that.setData({
    //         collectTip: '已收藏',
    //         bgcolor: '#eee'
    //       })
    //     }
    //   })

    // }   
    // else{
    //   wx.request({
    //     url: "https://m.jiahexueyuan.com/deleteCoursesCollectMini.do",
    //     data: {
    //       cid: eid,
    //     },
    //     header: {
    //       'content-type': 'application/json' // 默认值
    //     },
    //     success: function (res) {
    //       console.log(res)
    //       that.setData({
    //         collectTip: '收藏',
    //         bgcolor: '#fff'
    //       })

    //     }
    //   })

    // }


 // },
  


})