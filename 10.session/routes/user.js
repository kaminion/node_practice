var path = require("path");
var express = require('express');
var crypto = require("crypto");
var router = express.Router();

var { connect } = require(path.join(__dirname, '../modules/mysql-connect'));

router.get(['/', '/login'], (req, res) => {
  const values = {
    title : "로그인"
  };
  
  res.render("login", values);
})

router.get('/join', (req, res, next) => {
  const values = {
    title : "회원가입"
  };

  res.render("join", values);
});

router.post("/save", async (req, res, next) => {
  let {userid, userpw, username, createdAt = new Date(), grade=1} = req.body;
  let sql = "INSERT INTO user SET userid=?, userpw=?, username=?, grade=?, createdAt=?";
  userpw = crypto.createHash('sha512').update(userpw + process.env.salt).digest('base64');
  let value = [userid, userpw, username, grade, createdAt];
  try{
  let result = await connect.execute(sql, value);
  }catch(err){
    next(err);
  }
  //res.json(result);
  res.redirect("/user");
});

router.post("/loginModule", async (req, res, next) => {
    let {userid, userpw} = req.body;
    userpw = crypto.createHash('sha512').update(userpw + process.env.salt).digest('base64');
  
    let sql = 'SELECT userid, grade FROM user WHERE userid=? AND userpw=? ';
    let value = [userid, userpw];
    let result = await connect.execute(sql, value);
    
    req.session.userid = result[0][0].userid;
    req.session.grade  = result[0][0].grade;
//    res.json(result);
    res.redirect("/");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
      res.redirect("/");
  });

});

module.exports = router;
