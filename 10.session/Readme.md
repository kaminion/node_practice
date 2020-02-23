express-session을 npm i로 설치하여야함 (cookie-parser도 마찬가지)
npm audit fix 해주는게 좋음

세션은 메모리상 저장 / 파일저장 / DB저장이 있다 
DB에 저장하면 웹서버가 여러개 일 경우 유지가능

session-file-store
