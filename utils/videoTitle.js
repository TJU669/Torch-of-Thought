
var title;

const videoTitle = {
  getVideoes(vid) {
    var that = this;
    var platforms = [4100201, 11]
    for (const platform in platforms) {
      var videoUrl = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=' + platform + '&defnpayver=1&vid=' + vid;
      return new Promise(function (resolve) {
        wx.request({
          url: videoUrl,
          success: function (res) {
            //去除外面的'QZOutputJson='，并在末尾加'qwe'，为了下一步去除末尾的分号
            var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
            //去除分号
            var dataJson1 = dataJson.replace(/;qwe/, '');
            var data = JSON.parse(dataJson1);

            title = data['vl']['vi'][0]['ti']; //视频标题
            // console.log(title)
            resolve(title)
          }
        })
      })
    }
  },
};
module.exports = videoTitle