var express = require('express');
var router = express.Router();
var videos = require("../models/videos");
var users = require("../models/users");
var formidable = require("formidable");
var fs = require("fs");
/**
 * 根据视频ID获取视频
 * GET方式传入视频id 若视频不存在则返回 NotExist
 * 否则返回视频信息的JSON串
 */
router.get('/getVideoById', function (req,res) {
    var videoId = req.query.videoId;
    var video = {};
    videos.findOne({_id:videoId}, function (err,doc) {
        if(err) console.log(err);
        if(!doc){
            res.send("NotExist");
        }
        else{
            video.title = doc.name;
            video.description = doc.description;
            video.category = doc.category;
            video.file = doc.file;
            video.date = doc.date;
            video.image = doc.image;
            video.comments = doc.comments;
            res.send(JSON.stringify({video:video}));
        }

    });
});
/**
* 获取所有视频
*/
router.get('/getVideos',function(req,res){
    var allVideos = [];
    videos.find({},function(err,docs){
        if(err) console.log(err);
        console.log(docs);
        for(var i in docs){
            allVideos.push(docs[i]);
        }
        res.send(JSON.stringify({videos:allVideos}));
        //res.send("aaa");
    });
})


/**
 * 添加评论接口
 * POST方式传入videoId,rate,comment
 * 若添加成功 返回"success" 否则 返回 "error"
 */
router.post('/addComment', function (req,res) {
    var videoId = req.body.videoId;
    var rate = req.body.rate;
    var comment = req.body.comment;
    var author = req.body.author;
    console.log("videoid:"+videoId);
    videos.update({_id:videoId},{"$push":{comments:{
        rating:rate,
        comment:comment,
        author:author,
        date:new Date()
    }}}, function (err,docs) {
        if(err)
            res.send("error");
        else{
            res.send("success");
        }
    });
});

/**
 * 获取视频评论接口
 * get方式传入videoId
 * 若获取成功 则返回对应数据的JSON  否则返回 error
 */
router.get('/getComments', function (req,res) {
    var videoId = req.query.videoId;
    var comments = [];
    videos.findOne({_id:videoId}, function (err, doc) {
        if(err || !doc){
            console.log(err);
            res.send("error");
        }
        for(var i in doc.comments){
            comments.push({
                rating:doc.comments[i].rating,
                comment:doc.comments[i].comment,
                author:doc.comments[i].author,
                date:doc.comments[i].date
            });
        }
        res.send(JSON.stringify({comments:comments}));

    });
});

router.post('/addVideo',function(req,res){
    var video = {};
    var form = new formidable.IncomingForm();
    form.encoding = "UTF-8" ;
    form.uploadDir = 'public/videos/';
    form.keepExtensions = true;
    form.maxFieldsSize = 2 * 1024 *1024;
    form.parse(req,function(err,fields,files){
        if(err){
            console.log(err);
            return;
        }
        console.log("fields:" + fields);
        var videoextName = "mp4";
        var videophotoextName= "";
        switch(files.videophoto.type){
                case 'image/pjpeg':
                videophotoextName = 'jpg';
                break;
            case 'image/jpeg':
                videophotoextName = 'jpg';
                break;
            case 'image/png':
                videophotoextName = 'png';
                break;
            case 'image/x-png':
                videophotoextName = 'png';
                break;
        }
        var timeNow = new Date().getTime();
        var videoFileName = timeNow + "." + videoextName;
        var videoPhotoName = timeNow + "." + videophotoextName;
        fs.renameSync(files.videofile.path,form.uploadDir + videoFileName);
        fs.renameSync(files.videophoto.path,form.uploadDir+videoPhotoName);
        video.name = fields.name;
        video.description = fields.description;
        video.category = fields.category;
        video.file = videoFileName;
        video.image = videoPhotoName;
        var newVideo = new videos(video);
        newVideo.save(function(err,doc){
            if(err) console.log(err);
            res.redirect("/");
        });
    });
    
});



module.exports = router;
