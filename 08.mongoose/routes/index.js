const express = require('express');
const router = express.Router();
const { alert } = require('../modules/utils');

const User = require("../schemas/user");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.pug');
});

router.get("/sample", (req, res, next) => {
  const user = new User({
    name: "홍길동",
    age: 25,

  });

  //console.log(user.save()); //promise 모델이므로 user.save().then() 혹은 async await 사용가능
  user.save().then((result) => {
    res.json(result);
    console.log(result);
  }).catch((err) => {
    next(err);
  }); // 몽구스에서 commit 하는것 
  
});

router.post("/user/save", async (req, res, next) => {
  const {name, age} = req.body;

  // 조건절 우선
  const oldUser = await User.find({
    name
  });
  if(oldUser.length)
  {
    // 백팃 유용(`) 엔터쳐서 쓸 때도 사용가능
    res.send(alert("존재하는 아이디 입니다.", "/"));
  }else{

    const user = new User({
      name, 
      age,
    })
  
    user.save().then((result) => {
  
      res.redirect("/");
  
    }).catch((err) => {
      next(err);
    })
  }


});

module.exports = router;
