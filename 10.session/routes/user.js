var path = require("path");
var express = require('express');
var router = express.Router();

var { connect } = require(path.join(__dirname, '../modules/mysql-connect'));

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', (req, res) => {
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

router.post("/save", async (req, res) => {
  let {userid, userpw, username, createdAt = new Date(), grade=1} = req.body;
  let sql = "INSERT INTO user SET userid=?, userpw=?, username=?, grade=?, createdAt=?";
  let value = [userid, userpw, username, grade, createdAt];
  let result = await connect.execute(sql, value);
  //res.json(result);
  res.redirect("/");
});

module.exports = router;
