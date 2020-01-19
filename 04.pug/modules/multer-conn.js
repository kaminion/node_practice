const multer = require('multer');
const path = require('path'); // node basic object
const fs = require('fs'); // node.js 기본객체


//console.log(__dirname)


// 먼저 선언되야함, 표현식은 일반 function 함수 선언식처럼 미리 data영역에 선언되지않는다
const destination = (req, file, cb) =>
{
	cb(null, getPath());
}

const filename = (req, file, cb) =>
{
	// 파일 네임, 객체로 돌려주었기때문에 new Name 사용가능, 그리고 file.originalname 확장자 포함이름인듯
	// 여기 네임이 req.file.filename 이 됨
	cb(null, getFile(file.originalname).newName);
}

// Extention Check
const fileFilter = (req, file, cb) =>
{

	// 정규표현식
	let regEx = new RegExp(".jpe?g || .psd");
	let ext = path.extname(file.originalname).toLowerCase();
	
	// 배열로 배열 indexOf >-1 조건체크도 됨

	if(!regEx.test(ext))
	{
		req.fileUploadChk = false;
		// reject
		console.log("reject" + regEx.exec(ext));
		cb(null, false);
	}else
	{
		req.fileUploadChk = true;
		// success
		console.log("success" + regEx.exec(ext));
		cb(null, true);
	}

}

// 키와 value(변수) 이름이 같으면 :로 굳이 표현해주지않아도된다.
const storage = multer.diskStorage({ destination, filename });
const upload = multer({storage, fileFilter});

function getPath()
{
	// 경로 변경, 절대좌표와 상대좌표 연산
	let newPath = path.join(__dirname, "../uploads/" + makePath());
	// fs.exists(dir, ()=>{}), 비동기 
	// 아래껀 동기 (await), 폴더 만들어줌
	if(!fs.existsSync(newPath))
	{
		fs.mkdirSync(newPath);
	}
	return newPath;
}

function makePath()
{
	let d = new Date();
	let year = d.getFullYear();
	let month = d.getMonth();

	// 2자리 뺌
	return String(year).substr(2) + zp(month + 1);
}

function zp(d)
{
	return d < 10 ?  "0" + d : d; 
}

function getFile(oriFile)
{
	// 확장자 
	let ext = path.extname(oriFile); //.jpg
	let name = path.basename(oriFile, ext);
	let f1 = makePath();
	let f2 = Date.now(); // timestamp, 정적 메서드
	let f3 = Math.floor(Math.random() * 90) + 10; // 0 ~ 89 -> 10 ~ 99

	return {
		newName: f1 + "-" + f2 + "-" + f3 + ext,
		newExt: ext,
		nexFile: f1 + "-" + f2 + "-" + f3 
	};
}

module.exports = 
{
	storage : upload
};