var express = require('express');
var router = express.Router();
var users = require("../models/users");



/**
 * 用户登录接口  post方式传入username和password 并保存到session中
 * 登陆成功返回success  邮箱或者密码错误返回 error 用户不存在返回 notexsit
 */
router.post('/login', function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
    console.log(email + password);
  var obj = {email:email};
  users.findOne({email:email}, function (err,doc) {
    if(err) console.log(err);
    if(doc){
      if(doc.password === password){
        req.session.user = obj;
        res.send("success");
      }
      else{
        res.send("error");
      }
    }
    else{
      res.send("notExsit");
    }
  });
});


/**
 * 用户注册接口 POST 方式传入username password 及 email
 * 返回  若邮箱已存在 返回 exists 注册失败 返回 error 注册成功 返回 success
 */
router.post('/register', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  var newUser = new users({username:username,password:password,email:email});
  users.findOne({email:email}, function (err,doc) {
    if(err) console.log(err);
    if(doc){
      res.send("exist");
    }
    else{
      newUser.save(function (err,doc) {
        if(err) res.send("error");
        else{
          res.send("success");
        }
      });
    }
  });
});


/**
 * 获取用户session
 */
router.get('/getUserSession', function (req,res) {
      if(req.session.user){
        res.send(JSON.stringify(req.session.user));
      }else{
        res.send(null);
      }}
);

/**
 * 用户退出登录
 */
router.get('/logout', function (req, res) {
  req.session.user = null;
  res.redirect('/');
});
module.exports = router;
