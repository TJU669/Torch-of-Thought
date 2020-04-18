Page({

  /**
   * 页面的初始数据
   */
  data: {
    videoList: [],
    tabs: [
      {
        id: 0,
        name: "科普",
        isActive: false
      },
      {
        id: 1,
        name: "要闻",
        isActive: true
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
  getVideoList(){
    let that=this;
    wx.request({
      url: 'https://s.video.qq.com/get_playsource?id=mzc00200h1b5kde&plat=2&type=4&data_type=2&video_type=23&range=1-100&plname=qq&otype=json&num_mod_cnt=20&callback=_jsonp_2_bed6&_t=1587220263328',
     
      success(res){
        //去除外面的前缀，并在末尾加'###'，为了下一步去除末尾的多余字符
        var dataPreJson = res.data.replace(/_jsonp_2_bed6\(/, '') + "###";
        dataPreJson = dataPreJson.replace(/\)###/, '');
        //json形式
        var data = JSON.parse(dataPreJson);
        that.setData({
         videoList: data.PlaylistItem.videoPlayList
        })
      }
    })
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
    if (index === 0) {
      wx.reLaunch({
        url: "../popSci/popSci",
      })
    }
    else if (index === 1) {
      console.log("无需跳转");
    }
    else if (index === 2) {
      wx.reLaunch({
        url: "../patriotism/patriotism",
      })
    }
  },

  news_video2text(){
    wx.navigateTo({
      url: '../news_text/news_text',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getVideoList()
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