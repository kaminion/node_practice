# 프로미스 패턴

promise 객체를 리턴 하는 순간 await사용가능,
사용하는 함수에서는 async를 붙여줘야함.

비동기실행을 동기식으로 바꿈
callback보다 가독성 증가


~~~js
// mysql-2 promise pattern
app.get("/sqltest", (req, res) => {
	
	// promise pattern 비동기를 동기식으로 thread를 다룬다고 생각하면 편함
	// resolve와 reject를 가짐 - promise객체
	const connect = pool.getConnection().then(resolve, reject =>{
		
	});// 여기서 또 변경됨
	console.log(connect);

});
~~~
문서의
utiles 
객체 참조 
util.promisify(original)

Custom promisified functions
util.promisify.custom 