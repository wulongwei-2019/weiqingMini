var page = 1;
var showLine = 11;
var rdSessionKey;
var fal = true;
Page({

  /** * 页面的初始数据*/
  data: {
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {   
    var httpurl;
    var that = this;
    wx.getStorage({
      key: 'rdSessionKey',
      success: function (ress) {
        rdSessionKey = ress.data;
        console.log(rdSessionKey + '====success');
        httpurl = 'https://m.jiahexueyuan.com/queryExpertMini.do';

        console.log(httpurl);

        wx.request({
          url: httpurl,
          data: {
            pageNo: page,
            showLine: showLine,
            rdSessionKey: rdSessionKey,
          },
          header: {
            'content-type': 'application/json' // 默认值
          },

          success: function (res) {
           
           // console.log(rdSessionKey +"==rdSessionKey");
            if (res.data.list.length > 0) {
              var list = res.data.list;
              for (var i = 0; i < res.data.list.length; i++) {
                if(res.data.list[i].yn_follow == 0) {
                  list[i].yn_follow = '立即关注';
                  list[i].backgroundColor = '#FF7433';      
                }
                else {
                  list[i].yn_follow = '已关注';
                  list[i].backgroundColor = '#c9c9c9';
                }
              }
            //console.log("ssss")
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
      url: 'https://m.jiahexueyuan.com/queryExpertMini.do?type=0',
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
        console.log(page +"====page");
        if (res.data.list.length > 0) {
          var list = res.data.list;
          for (var i = 0; i < res.data.list.length; i++) {
            if (res.data.list[i].yn_follow == 0) {
              list[i].yn_follow = '立即关注';
              list[i].backgroundColor = '#FF7433';
            }
            else {
              list[i].yn_follow = '已关注';
              list[i].backgroundColor = '#c9c9c9';
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

  /*** 生命周期函数--监听页面显示*/
  onShow: function () {
    this.onLoad();
  },



/*获取是否已关注 */
  gz: function (e) {
    
    var that = this
    var id = e.currentTarget.dataset.eid;
    console.log(id)
    var work = e.currentTarget.dataset.ynfollow;
    var data_list = that.data.recordList;
    console.log(work + '哈哈哈哈哈哈');
    if (work != "立即关注") {
      work = 1;
    } else {
      work = 0;
    }
    wx.request({
      url: "https://m.jiahexueyuan.com/accountfollowMini.do",
      data: {
        expertid: id,
        work: work,
        rdSessionKey: rdSessionKey
      },
      header: {
        'content-type': 'application/json' // 默认值
      },

      success: function (res) {
        console.log(rdSessionKey + "==rdSessionKey");
        console.log(res.data);
        if (res.data == 1) {
         
          console.log("success");

          for (var i = 0; i < data_list.length;i++){
            if (id == data_list[i].expertid){
             if(work==1){
              data_list[i].yn_follow = '立即关注';
              data_list[i].backgroundColor = '#FF7433';
              data_list[i].follow_num = data_list[i].follow_num-1;
             }else{
               data_list[i].yn_follow = '已关注';
               data_list[i].backgroundColor = '#c9c9c9';
               data_list[i].follow_num = data_list[i].follow_num + 1;
             }
            }
          }
          
          that.setData({
            recordList: data_list,

          })

        } else {
          console.log("error");
        }

      }
    })
  },
  
  /*列表跳转 */
  navs: function (option) {
   
    var that = this
    var id = option.currentTarget.dataset.id;
     console.log(id);
    // var ynfollows = option.currentTarget.dataset.ynfollows;
    // var nickname = option.currentTarget.dataset.nickname;
    // var pic = option.currentTarget.dataset.pic;
    // var follownum = option.currentTarget.dataset.follownum;
    // var msg = option.currentTarget.dataset.msg;
    wx.navigateTo({
      url: 'jh-dsCenter?id=' + id ,
      // url: 'jh-dsCenter?id=' + ids + '&nickname=' + nickname + '&ynfollows=' + ynfollows + '&pic=' + pic + '&follownum=' + follownum + '&msg=' + msg,
    })

  },


})