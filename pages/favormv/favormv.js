var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorList: [],
    currentList: [],
    currentPage: 1,
  },

  /** 
   * 获取视频列表
  */
  getfavorList() {
    let that = this;
    var favorList = app.globalData.favormv;
    
    that.setData({
      favorList: favorList,
      currentList: favorList.slice(0,10)
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getfavorList();
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
    console.log("触底了")
    wx.showLoading({
      title: '加载中',

    });
    setTimeout(()=>{
      wx.hideLoading()
    }, 1000)
    //睡眠1秒，等待加载
    for (var t = Date.now(); Date.now() - t <= 100;);
    //获取当前页索引和视频列表
    var pageIndex = this.data.currentPage;
    var cl = [];
    cl = this.data.currentList;

    //加载下一页的数据
    pageIndex +=1;
    var pageSize = 10;
    var start = (pageIndex - 1) * pageSize;
    var end = start + pageSize;

    //和之前的数据连在一起
    cl = cl.concat(this.data.favorList.slice(start, end));

    //设置
    this.setData({
      currentList: cl,
      currentPage: pageIndex
    })
    console.log(cl)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})