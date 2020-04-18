var WxParse = require('../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
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
   * 新闻详情页面
   */
  getNewsInfo(news_src) {
    news_src = news_src.replace(/http/, 'https')
    // console.log(news_src)
    let that = this;
    wx.request({
      url: news_src,
      success(res) {
        var article = res.data;

        var title_begin = article.indexOf("<title>");
        title_begin = title_begin + 7;
        var title_end = article.indexOf("</title>");
        var title = article.substring(title_begin, title_end);
        // console.log(title);

        var begin = article.indexOf("<!--repaste.body.begin-->");
        var end = article.indexOf("<!--repaste.body.end-->");
        begin = begin + 25;
        article = article.substring(begin, end);
        // console.log(article);

        var article = "<h1>" + title + "</h1>" + article;
        WxParse.wxParse('article', 'html', article, that, 5)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getNewsInfo(options.src)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})