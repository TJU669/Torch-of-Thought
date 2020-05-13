Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    tabs:[
      {
        id: 0,
        name: "科普",
        isActive: true
      },
      {
        id: 1,
        name: "要闻",
        isActive: false
      },
      {
        id: 2,
        name: "（爱国）",
        isActive: false
      }
    ],
  },

  /** 
   * 获取视频列表
  */
  getVideoList() {
    let that = this;
    
    var videoList = [];
    var videoList2 =[];
    var urls = ['https://s.video.qq.com/get_playsource?id=mzc002007lhxy9e&plat=2&type=4&data_type=2&video_type=23&range=1-99&plname=qq&otype=json&num_mod_cnt=20&callback=_jsonp_2_17af&_t=1589353018196', 'https://s.video.qq.com/get_playsource?id=mzc002007lhxy9e&plat=2&type=4&data_type=2&video_type=23&range=100-198&plname=qq&otype=json&num_mod_cnt=20&callback=_jsonp_3_d969&_t=1589353046986', 'https://s.video.qq.com/get_playsource?id=mzc002007lhxy9e&plat=2&type=4&data_type=2&video_type=23&range=199-203&plname=qq&otype=json&num_mod_cnt=20&callback=_jsonp_4_15db&_t=1589353082295'];
    
    for(var i =0; i<urls.length; i++){
      wx.request({
        url: urls[i],
        success: function (res) {
          
          var result = res.data;
          //去除外面的前缀，并在末尾加'###'，为了下一步去除末尾的多余字符
          var callbackIndex = result.indexOf('_jsonp_');
          var callback = result.substr(callbackIndex, 14);
          var dataPreJson = res.data.replace(callback, '') + "###";
          //去除末尾的右括号
          dataPreJson = dataPreJson.replace(/\)###/, '');
          // json形式
          var data = JSON.parse(dataPreJson);
          videoList2 = data.PlaylistItem.videoPlayList;
          videoList = videoList.concat(videoList2)
          
          that.setData({
            videoList: videoList
          })
          console.log(videoList)
        }
    })
      sleep(100);
    }

    //睡眠函数 单位毫秒
    function sleep(d) {
      for (var t = Date.now(); Date.now() - t <= d;);
    }
  },

  // 自定义事件 用来接收子组件传递的数据的
  handleItemChange(e) {
    // 接收传递过来的参数
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
    if(index===0){
      console.log("无需跳转")
    }
    else if(index===1){
      wx.reLaunch({
        url: "../news_text/news_text",
      });
    }
    else if(index===2){
      wx.reLaunch({
        url: "../patriotism/patriotism",
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoList();
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