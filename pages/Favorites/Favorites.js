// pages/Favorites/Favorites.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questionNum: [],
    questionList: [], 
    wrongid: [],
    amount: 0,
    btnName: ''
  },

  /**
   * 获取题目列表
   */
  getQuesList(){
    var quesData = require('../../question.js');
    var quesList = quesData.quesList;
    var wrongid = quesData.wrongid;
    var amount = 0;
    var btnName = '取消收藏';
    
    var arr = [];
    //去重复
    for (var i = 0; i < wrongid.length; i++) {
      // console.log("错题本")
      // console.log(wrongid[i]);
      var num = wrongid[i];
      if (arr.indexOf(num) == -1){
        arr.push(num);
      }
      else{
        //不重复显示
      }
    }
    
    amount = arr.length;
    // console.log(amount);

    var question = [];
    for (var j = 0; j < wrongid.length; j++){
      question.push(quesList[arr[j]-1]);
    }

    this.setData({
      questionList: question,
      amount: amount,
      btnName: btnName,
    })
  },
// 处理取消收藏
Uncollect: function (e) {
  console.log(e.currentTarget.dataset.id);
  var btnName = '收藏';
  this.setData({
    btnName: btnName,
  })
},
onCollectionTap: function(event) {
  // 获取当前点击下标
  var index = event.currentTarget.dataset.id;
  console.log(index);
  // data中获取列表
  var message = this.data.questionList;
  for (let i in message) { //遍历列表数据
    if (i == index) { //根据下标找到目标
      var collectStatus = false
      if (message[i].collected == 0) { //如果是没点赞+1
        collectStatus = true;
      } else {
        collectStatus = false;
      }
      var btnName = collectStatus ? '取消收藏' : '收藏';
      console.log(btnName);
      wx.showToast({
        title: collectStatus ? '收藏' : '取消收藏',
      })
    }
  }
  this.setData({
    btnName: btnName
  })
},
  
  /**
   * 处理点击选项
   */
  handleClick: function(e){
    // 输出用户选择的选项（ABCD-1234）
    // console.log(e.currentTarget.dataset.ans);
    // 输出这道题的id（题库里的编号）
    console.log(e.currentTarget.dataset.id);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getQuesList();
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