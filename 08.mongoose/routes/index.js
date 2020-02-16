const express = require('express');
const router = express.Router();
const { alert } = require('../modules/utils');

const User = require("../schemas/user");

/* GET home page. */
router.get('/', async function(req, res, next) {
  
  const result = await User.find();
  
  res.render("index.pug", {result});
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

// update
// const result = User.update({조건절}, {}) ex 조건절 _id:req.params.id

router.get("/user/delete/:id", async (req, res, next) => {

  const result = await User.remove({
    _id : req.params.id
  });

  if(result.ok === 1) res.redirect("/");
  else res.send(alert("삭제에 실패했습니다.", "/"));

  res.json(result);
});

module.exports = router;
