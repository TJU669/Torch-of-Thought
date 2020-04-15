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
    // 用来装视频列表
    var destUrl = 'https://s.video.qq.com/get_playsource?id=mzc002007lhxy9e&plat=2&type=4&data_type=2&video_type=23&range=1-100&plname=qq&otype=json&num_mod_cnt=20&callback=_jsonp_2_97dd&_t=1586576910256';
    var videoList = [];
    // return new Promise(function (resolve) {
    wx.request({
      url: destUrl,
      success: function (res) {
        //去除外面的前缀，并在末尾加'###'，为了下一步去除末尾的多余字符
        var dataPreJson = res.data.replace(/_jsonp_2_97dd\(/, '') + "###";
        dataPreJson = dataPreJson.replace(/\)###/, '');
        //json形式
        var data = JSON.parse(dataPreJson);
        videoList = data.PlaylistItem.videoPlayList;

      }
    })

    sleep(100);
    destUrl = 'https://s.video.qq.com/get_playsource?id=mzc002007lhxy9e&plat=2&type=4&data_type=2&video_type=23&range=101-197&plname=qq&otype=json&num_mod_cnt=20&callback=_jsonp_3_d9fd&_t=1586586149872';
    wx.request({
      url: destUrl,
      success: function (res) {
        //去除外面的前缀，并在末尾加'###'，为了下一步去除末尾的多余字符
        var dataPreJson = res.data.replace(/_jsonp_3_d9fd\(/, '') + "###";
        dataPreJson = dataPreJson.replace(/\)###/, '');
        //json形式
        var data = JSON.parse(dataPreJson);
        var videoList2 = [];
        videoList2 = data.PlaylistItem.videoPlayList;
        // console.log(videoList)
        //第二页数据合并到第一页中
        videoList = videoList.concat(videoList2)
        console.log(videoList)
        that.setData({
          videoList: videoList
        })

      }
    })
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
      console.log("跳转到要闻页");
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