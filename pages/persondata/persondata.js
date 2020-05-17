// pages/persondata/persondata.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total_num:0,
    wrong_num:0,
    correct_num:0,
    rate:0,
    score:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var total_num, wrong_num, correct_num,rate, score;
    total_num = app.globalData.totalid.length;
    wrong_num = app.globalData.wrongid.length;
    correct_num = total_num - wrong_num;
    rate = correct_num/total_num;
    score = app.globalData.score;
    rate = '\n\n'+String(rate);
    this.setData({
    total_num: total_num,
    wrong_num: wrong_num,
    correct_num: correct_num,
    rate:rate,
    score:score,
    })
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