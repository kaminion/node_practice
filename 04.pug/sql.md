# 오류 발생시 대처법

* MYSQL 8.0 이상 버전에서 발생되는 에러
('Client does not support authentication protocol requested by server; consider upgrading MySQL client')

~~~sql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'
~~~

StackOverflow : https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

mysql setString을 객체로 처리함
~~~js
let sql = "INSERT INTO BOARD SET title=?, writer=?, wdate=? ";
let sqlVals = ["제목입니다2", "관리자2", new Date()];
const connect = await pool.getConnection();
const result = await connect.query(sql, sqlVals);
connect.release();
~~~