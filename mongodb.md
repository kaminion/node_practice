일반 RDB와 동일
use 데이터베이스

db.createUser({
user: "root",
pwd: "0000",
roles: ["dbAdminAnyDatabase"]
})


https://docs.mongodb.com/manual/reference/method/db.createUser/