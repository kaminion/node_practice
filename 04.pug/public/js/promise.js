// function init(){
// 	getDays((d)=>{
// 		console.log(d.getDay());
// 	});
// }

// function getDays(fn){
// 	var d = new Date();
// 	fn(d);
// // 객체 생성 후 전달받은 콜백 메서드 사용
// }

// 여기까지가 콜백 원리

// promise model
async function init(){
	// then 절안에 있는 콜백메서드가 호출하는 함수의 resolve로 들어감
	// then은 처리가 된 이후에 실행 할 콜백메서드라고 보면 됨, promise 객체에 접근하기위함
	// var date = getDays().then(({d, a})=>{
	// 	console.log(d.getDay());
	// 	console.log(a);
	// });

	// resolve에서 전달한 값을 사용함
	// Promise 객체만 async await 사용가능 (then절로 인한 콜백메서드 X)

	let a = await getDays();
	console.log(a);
}

function getDays(){
	var d = new Date();
	let a = "10";
	// 일 처리 끝나고 알아서 콜백
	// resolve 성공, reject 실패
	return new Promise(function(resolve, reject){
		// 콜백함수 실행
		resolve({a, d});
		// 리졸브 실행 후 리턴해줌, await써도 resolve에 있는걸 넘겨준다. resolve로 넘겨주는 값이 최종 리턴문이라고 보면 됨
	});

}

init();

