express-session을 npm i로 설치하여야함 (cookie-parser도 마찬가지)
npm audit fix 해주는게 좋음

execute 메서드 사용시 getConnection 필요없이 바로 SQL 문 사용가능 (prepared state ment)

세션은 메모리상 저장 / 파일저장 / DB저장이 있다 
DB에 저장하면 웹서버가 여러개 일 경우 유지가능

session-file-store

보통은 Passport를 많이 씀(express-session 대신.. Oauth2 로그인 처리 할 경우 편함)