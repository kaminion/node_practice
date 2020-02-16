### 사용자 추가


~~~js
// use admin
db.createUser({
    user:"root",
    pwd:"0000",
    roles:["dbAdminAnyDatabase"]
})  

// use node

db.createUser({
    user:"node",
    pwd:"0000",
    roles:["readWrite", "userAdmin"]
})
// 롤에 관련한 상항은 https://docs.mongodb.com/manual/reference/built-in-roles/
~~~


### 서버 인증 작동시 
~~~shell

mongod --port 15000 --dbpath C:\mongodb\node --auth
// auth부분 추가,

~~~

* Killer 모듈은 mongoose이다. npmjs.com 참조 *
