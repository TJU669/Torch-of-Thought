var app = getApp();
var videoObj;
var part_urls = {};
var videoPage;
var pageArr = new Array()
import qqVideo from "../../utils/qqVideo.js"
import videoTitle from "../../utils/videoTitle.js"

Page({

  data:{
    alreadyFavored: false,
    alreadyLiked: false,
  },

  //点赞
  addtolike:function(e){
    let that = this;
    
    var likemvid = app.globalData.likemvid;

    //点赞
    var lIndex = likemvid.indexOf(videoObj.vid);
    if(lIndex==-1){  //当前vid
      likemvid.push(videoObj.vid); //加入到点赞列表
      app.globalData.likemvid = likemvid;  //赋值到全局变量

      that.setData({
        alreadyLiked:true
      })
    }

    //取消点赞
    else{
      likemvid.splice(lIndex,1); //从点赞列表里删除
      app.globalData.likemvid = likemvid;  //赋值到全局变量
      that.setData({
        alreadyLiked:false
      })
    }
    
  },

  //add to my collection
  addtofavor:function(e){
    let that = this;
    
    var favormvid = app.globalData.favormvid;

    //收藏
    var fIndex = favormvid.indexOf(videoObj.vid);
    if(fIndex==-1){  //收藏集里没有当前vid
      favormvid.push(videoObj.vid); //加入到收藏集
      app.globalData.favormvid = favormvid;  //赋值到全局变量

      app.globalData.favormv.push(videoObj);
      wx.showModal({
        title: '已收藏~',
        content: '已将视频到收藏夹',
        showCancel: false,
        cancelText: '取消',
        confirmText: "确定",//默认是“确定”
      });

      that.setData({
        alreadyFavored:true
      })
    }

    //取消收藏
    else{
      favormvid.splice(fIndex,1); //从收藏集里删除
      app.globalData.favormvid = favormvid;  //赋值到全局变量

      app.globalData.favormv.splice(fIndex,1);


      wx.showModal({
        title: '已取消收藏',
        content: '已将视频从收藏夹移除',
        showCancel: false,
        cancelText: '取消',
        confirmText: "确定",//默认是“确定”
      });

      that.setData({
        alreadyFavored:false
      })
    }
    
  },
  onLoad: function (options) {
    
    if (options.vid != undefined) {
      this.setData({
        file_id: options.vid
      });
    } else {
      wx.showToast({
        title: '未传入视频id',
      })
    }

    //判断是否点赞
    var likemvid = app.globalData.likemvid;
    if(likemvid.indexOf(options.vid)==-1){  //没有当前vid
      this.setData({
        alreadyLiked:false,
      })
    }
    else{
      this.setData({
        alreadyLiked:true,
      })
    }

    //判断是否收藏
    var favormvid = app.globalData.favormvid;
    if(favormvid.indexOf(options.vid)==-1){  //收藏集里没有当前vid
      this.setData({
        alreadyFavored:false,
      })
    }
    else{
      this.setData({
        alreadyFavored:true,
      })
    }

    //加载视频
    videoPage = 1;
    pageArr = new Array();
    part_urls = {};
    var that = this;
    const vid = options.vid;
    console.log(vid);
    //调用"../../utils/qqVideo.js"中getVideos方法来解析html我猜
    qqVideo.getVideoes(vid).then(function (response) {
      for (var i = 1; i < response.length + 1; i++) {
        var indexStr = 'index' + (i)
        pageArr.push(i);
        part_urls[indexStr] = response[i - 1];
      }
      // console.log(response)
      that.setData({
        videUrl: response[0],
      });
    });
    

    //获取视频标题
    videoTitle.getVideoes(vid).then(function (response){
      // console.log(response)
      that.setData({
        videTitle: response,
      });
    });

    //视频对象
    options.videUrl = that.data.videUrl;
    videoObj = options
    
    
    //判断是否已经被记录
    var historymvid = app.globalData.historymvid;
    var hIndex = historymvid.indexOf(videoObj.vid)
    if(hIndex==-1){
      historymvid.push(videoObj.vid)
      app.globalData.historymv.push(videoObj)
    }
    else{//如果已经被记录，删除原来的重新添加
      historymvid.splice(hIndex,1); //删除
      app.globalData.historymvid = historymvid;  //赋值到全局变量
      app.globalData.historymv.splice(hIndex,1);

      //重新添加
      historymvid.push(videoObj.vid)
      app.globalData.historymv.push(videoObj)
    }
    console.log(historymvid)

  },

  // 因为视频超过10分钟之后，会分段，所以当视频为多段的时候，
  // 自动播放下一段视频
  playEnd: function () {
    if (videoPage >= parseInt(pageArr.length)) {
      // part_urls = {};
      videoPage = 1;
      this.videoContext.exitFullScreen
    } else {
      videoPage++;
      var index = 'index' + videoPage;
      this.setData({
        videUrl: ''
      });
      this.setData({
        videUrl: part_urls[index]
      });
    }
  },
  onReady: function () {
    // 页面渲染完成
    this.videoContext = wx.createVideoContext('myVideo')
  },
  onShow: function () {
    // 页面显示
    // console.log(this.data)
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})