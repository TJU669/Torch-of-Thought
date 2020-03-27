// pages/outer/video.js
Page({

   /**
 * 页面的初始数据
 */
 data: {
  videos:[
    {
      title:"习近平出席二十国集团领导人应对新冠肺炎特别峰会并发表重要讲话",
      author:"央视新闻",
      date:"2020-03-27",
      vid:"r0940glzde8"
    },
    {
      title: "一个不经意的小动作却可能传染疾病，防范疫情还需少摸脸",
      author: "人民医学",
      date: "2020-03-25",
      vid: "w09400lzd0i"
    },
    {
      title:"“无症状感染者”为何不是确诊病例？专家解读",
      author: "央视新闻",
      date: "2020-03-24",
      vid:"k09392nt23l"
    },
    {
      title:"“新冠”无症状感染者为何不算入确诊病例？如何分辨",
      author: "新京报动新闻",
      date: "2020-03-23",
      vid:"a0938yjbq1v"
    },
    {
      title:"群体免疫到底有多不靠谱",
      author: "小央新闻",
      date: "2020-03-19",
      vid:"c09360p4cq6"
    },
    {
      title:"全纪录：新冠病毒进入人体的21天",
      author: "果壳",
      date: "2020-03-06",
      vid:"t30776rs5hj"
    },
    {
      title: "电影式科普病毒如何入侵人体",
      author: "人民日报",
      date: "2020-03-05",
      vid: "x3077ip4tbr"
    },
    {
      title:"世界卫生组织公布新冠肺炎与季节性流感四大不同",
      author: "人民医学",
      date: "2020-03-05",
      vid:"l3077fkjku6"
    },
    {
      title: "什么是新冠肺炎社区传播？了解后就明白为啥要管控小区了",
      author: "人民医学",
      date: "2020-03-03",
      vid: "w30759ov9d5"
    },
    {
      title:"【外出防护】如何安全出行？记住这 5 点！",
      author: "丁香医生",
      date: "2020-03-02",
      vid:"h30758tmli6"
    },
    {
      title:"为什么现在不能开学？这个计算机模拟视频告诉你",
      author: "央视新闻",
      date: "2020-03-01",
      vid:"g30746si679"
    },
    {
      title:"中国-世卫组织联合考察报告：新冠病毒是一种动物源性病毒",
      author: "新华网客户端新闻",
      date: "2020-02-29",
      vid:"w3074w3dcbv"
    },
    {
      title:"人类很少关心野生动物的命运，直到病毒把我们连在一起",
      author: "果壳",
      date: "2020-02-26",
      vid:"b3072dnikgb"
    },
    {
      title:"什么是全球流行病？病毒在多个有地理隔离的群落间传播",
      author: "梨视频",
      date: "2020-02-25",
      vid:"m30711ryd75"
    },
    {
      title:"「新冠病毒」农村防护指南",
      author: "丁香医生",
      date: "2020-02-24",
      vid:"d3071jp8xhn"
    },
    {
      title:"武汉疾控专家全程示范：家庭如何预防性消毒",
      author: "匿名用户",
      date: "2020-02-21",
      vid:"v3065flrcwa"
    },
    {
      title:"科学分析：你什么时候能买到口罩？",
      author: "视知",
      date: "2020-02-20",
      vid:"p3069nufswy"
    },
    {
      title:"啥是新冠肺炎“零号病人”? 找到零号病人到底有多重要？",
      author: "新京报动新闻",
      date: "2020-02-17",
      vid:"x3067mkdft3"
    },
    {
      title:"《你每天接触了多少细菌？》",
      author: "场库",
      date: "2020-02-17",
      vid:"d3067156p2i"
    },
    {
      title:"成功救治1名新型肺炎患者的ECMO为何方神圣？ ",
      author: "果壳",
      date: "2020-02-14",
      vid:"k3065cvtmhn"
    },
    {
      title:"150秒漫画科普：传染病防治法怎样保护每个人？",
      author: "匿名用户",
      date: "2020-02-13",
      vid:"t3065i74599"
    },
    {
      title:"普通口罩怎样重复使用才安全？首席消毒专家这样做",
      author: "小央视频",
      date: "2020-02-13",
      vid:"l3065nttne7"
    },
    {
      title:"免疫系统是如何杀死病毒的？",
      author: "视知",
      date: "2020-02-11",
      vid:"m3064hfxo8f"
    },
    {
      title:"关于新冠肺炎的一切",
      author: "回形针PaperClip",
      date: "2020-02-02",
      vid:"y3059qtik2o"
    },
    {
      title:"“新冠”药物问世还要多久？动画详解新药、老药、疫苗研用过程",
      author: "新京报动新闻",
      date: "2020-02-01",
      vid:"e3069oc9cdq"
    },
    {
      title:"",
      author: "",
      date: "",
      vid:""
    },
    {
      title:"",
      author: "",
      date: "",
      vid:""
    },

  ]
  },
   
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function () {

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