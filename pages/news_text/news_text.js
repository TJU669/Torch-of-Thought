Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 新闻列表数据
    newsList: [],
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
   * 获取新闻列表
   */
  getNewsList(){
    let that=this;
    wx.request({
      url: 'https://news.cctv.com/2019/07/gaiban/cmsdatainterface/page/world_2.jsonp?cb=t&cb=world',
      success(res){
        // console.log(res)
        
        var dataPreJson = res.data.replace(/world\(/, '');
        dataPreJson = dataPreJson.replace(/}\)/,'}');
        
        var data = JSON.parse(dataPreJson);
        that.setData({
          newsList: data.data.list
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


  news_text2video(){
    wx.navigateTo({
      url: '../news_video/news_video',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsList();
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