var app = getApp();
var flag = true;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    questionNum: [1,2,3,4,5,6,7,8],
    questionList: [], 
    currentAnswerList:[],
    
  },

  /**
   * 获取题目列表
   */
  getQuesList(){
    var quesData = require('../../question.js');
    var quesList = quesData.quesList;
    var totalid = app.globalData.totalid;
    
    var min = 1;
    var max = 65;
    var arr = [];
    var capacity = 8 < max ? 8 : max;
    var threshold =0;  //重新出题的阈值

    for (var i = 0; i < capacity; i++) {
      if(arr.length==capacity || totalid.length==max){//如果达到容量 或者 题库里没题了，break
        break;
      }
      //从题库中抽题
      var num = Math.floor(Math.random() * (max - min + 1)) + min;
      num = parseInt(num, 10);
      if (arr.indexOf(num) == -1 && totalid.indexOf(num)==-1){
          arr.push(num);
      }
      //如果没达到容量，从头开始抽
      if(i==capacity-1 && arr.length<capacity && threshold<5){
        i =0;
        threshold++;
      }
    }
    console.log(arr.length)
    if(arr.length==0){
      wx.showModal({
        title: '您已答完所有的题！',
        content: '如果需要清除记录请重新进入小程序',
        showCancel: false,
        cancelText: '取消',
        confirmText: "了解",//默认是“确定”
      });  
    }
    else{
      var question = [];
      for (var j = 0; j < arr.length; j++){
        question.push(quesList[arr[j]-1]);
      }
    }
    this.setData({
      questionList: question
    })
  },

  /**
   * 处理点击选项
   * comment below added by: yupeng
   * 1. 检查答题是否选对，错误自动添加到错题集
   * 2. 添加收藏题目功能，此处可能需要在question.wxml中实现
   * 3. 错题集和收藏功能都可以根据题目id和用户id，添加到一个js文件中（与题目库question.js类似）
   */
  handleClick:function(e){
    console.log(e.currentTarget.dataset);
    // 输出用户选择的选项（ABCD-1234）
    // console.log(e.currentTarget.dataset.ans);
    // 输出这道题的id（题库里的编号）
    console.log(e.currentTarget.dataset.id);
    // 测试答错时的反馈
    // console.log(e.currentTarget.dataset.answer);  //正确选项

    var score = app.globalData.score;
    var totalid = app.globalData.totalid;

    //如果是个新题目，添加到已做过的题目
    if(totalid.indexOf(e.currentTarget.dataset.id)==-1){
      totalid.push(e.currentTarget.dataset.id); //加入到全局
      getApp().globalData.totalid = totalid;  //赋值到全局变量

      //错误的情况并添加到错题集
      if(e.currentTarget.dataset.ans != e.currentTarget.dataset.answer){
        var wrongid = app.globalData.wrongid;
        if(wrongid.indexOf(e.currentTarget.dataset.id)==-1){  //错题集里没有当前题号
          wrongid.push(e.currentTarget.dataset.id); //加入到错题集
          getApp().globalData.wrongid = wrongid;  //赋值到全局变量
          flag = false;
        }
      }
      //答对的情况
      else{
        score +=1;
        if(e.currentTarget.dataset.quesnum==8 && flag==true){
          score+=5;
        }
        getApp().globalData.score = score;
      }
    }

    //答题反馈
    if (e.currentTarget.dataset.ans == e.currentTarget.dataset.answer){
      console.log("答对了~");
      // 弹框显示答对了信息
      wx.showModal({
        title: '答对了~',
        content: '恭喜你，答对了',
        showCancel: false,
        cancelText: '取消',
        confirmText: "确定",//默认是“确定”
      });  
    }
    else{
      console.log("答错了！");
      // 弹框显示答错了信息
      wx.showModal({
        title: '答错了！',
        content: '对不起，答错了',
        showCancel: false,
        cancelText: '取消',
        confirmText: "确定",//默认是“确定”
      });
    }
  },

  //add to my collection
  addtofavor:function(e){
    let that = this;
    var currentAnswers;
    console.log(e.currentTarget.dataset);
    // 输出这道题的id（题库里的编号）
    console.log(e.currentTarget.dataset.id);

    var favorid = app.globalData.favorid;
    if(favorid.indexOf(e.currentTarget.dataset.id)==-1){  //收藏集里没有当前题号
      favorid.push(e.currentTarget.dataset.id); //加入到收藏集
      getApp().globalData.favorid = favorid;  //赋值到全局变量
    }
    console.log(getApp().globalData.favorid)
    wx.showModal({
      title: '已收藏~',
      content: '已将该题目添加到收藏夹',
      showCancel: false,
      cancelText: '取消',
      confirmText: "确定",//默认是“确定”
    });
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