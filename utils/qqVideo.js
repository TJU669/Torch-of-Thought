
var count = 0;

// 用来装视频列表
var videoSrcArr = new Array();

const qqVideo = {
  getVideoes(vid) {
    count = 0;
    videoSrcArr = new Array();
    var that = this;
    var platforms = [4100201, 11]
    for (const platform in platforms) {
      var videoUrl = 'https://vv.video.qq.com/getinfo?otype=json&appver=3.2.19.333&platform=' + platform + '&defnpayver=1&vid=' + vid;
      var host;
      return new Promise(function (resolve) {
        wx.request({
          url: videoUrl,
          success: function (res) {
            //去除外面的'QZOutputJson='，并在末尾加'qwe'，为了下一步去除末尾的分号
            var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
            //去除分号
            var dataJson1 = dataJson.replace(/;qwe/, '');
            var data = JSON.parse(dataJson1);
            // console.log(data)
            //如果无法外部播放
            if (data.msg == 'cannot play outside') {
              wx.showToast({
                title: 'cannot play outside',
                icon: 'none',
                duration: 2000
              })
              return nil;
            }
            //如果vid状态错误
            if (data.msg == 'vid status wrong') {
              wx.showToast({
                title: 'vid status wrong',
                icon: 'none',
                duration: 2000
              })
              return nil;
            }
            var fn_pre = data.vl.vi[0].lnk  //前缀，测试得到的是vid
            host = data['vl']['vi'][0]['ul']['ui'][0]['url']  //一个不完整的url
            var streams = data['fl']['fi']  //视频流，对应几种清晰度
            var seg_cnt = data['vl']['vi'][0]['cl']['fc']  //片段数-1
            var filename = data['vl']['vi'][0]['fn'];  // .mp4字符串
            var fc_cnt = seg_cnt
            var video_type
            var magic_str
            if (parseInt(seg_cnt) == 0) {
              seg_cnt = 1  //片段数
            } 
            else {
              //这里之前没加括号！！！！！坑死了
              [fn_pre, magic_str, video_type] = filename.split('.')
              //t055751ewyv  10712   1
            }
            var part_urls = new Array()
            var total_size = 0
            var part_format_id
            for (var i = 1; i < (seg_cnt + 1); i++) {
              if (fc_cnt == 0) {
                var part_format_ids = data['vl']['vi'][0]['cl']['keyid'].split('.')  //{vid, streamId}
                part_format_id = part_format_ids[part_format_ids.length - 1]  //streamId
              } else {
                part_format_id = data['vl']['vi'][0]['cl']['ci'][i - 1]['keyid'].split('.')[1]
                // console.log(filename)
                // console.log(fn_pre)
                // console.log(magic_str)
                // console.log(i.toString())
                // console.log(video_type)
                filename = [fn_pre, magic_str, i.toString(), video_type].join('.')
                console.log(filename)
              }
              
              requestVideoUrls(part_format_id, vid, filename, host, seg_cnt).then(function (response) {
                resolve(response);
              });
            }
          }
        })
      })
    }
  },
  // 解析视频真正的地址
};

//参数分别为 streamId, vid, .mp4字符串, 请求url, 流序号, 
function requestVideoUrls(part_format_id, vid, fileName, host, videoCount) {
  var keyApi = "https://vv.video.qq.com/getkey?otype=json&platform=11&format=" + part_format_id + "&vid=" + vid + "&filename=" + fileName + "&appver=3.2.19.333"
  console.log(keyApi)
  return new Promise(function (resolve) {
    wx.request({
      url: keyApi,
      success: function (res) {
        var dataJson = res.data.replace(/QZOutputJson=/, '') + "qwe";
        var dataJson1 = dataJson.replace(/;qwe/, '');
        var data = JSON.parse(dataJson1);
        if (data.key != undefined) {
          var vkey = data['key']  //key
          var url = host + fileName + '?vkey=' + vkey;
          var vidoeSrc = String(url)
          videoSrcArr.push(vidoeSrc);
        }
        count++;
        // 判断视频是否全部获取，获取全部视频再返回
        if (count == videoCount) {
          resolve(videoSrcArr);
          console.log(videoSrcArr);
        }

      }
    })
  })
}
module.exports = qqVideo