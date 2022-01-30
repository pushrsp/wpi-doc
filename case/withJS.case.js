/**
 * @wpiRoute api/test [post]
 * @wpiDescription 테스트입니다.
 * @wpiBody {string} username 아이디
 * @wpiBody {string} password 비밀번호
 * @wpiBody {string} nickname 닉네임
 * @wpiSuccess {string} message 메세지
 * @wpiSuccess {int} statusCode 상태코드
 * @wpiSuccess {object} data 데이터
 * @wpiFail {string} message 메세지
 * @wpiFail {int} statusCode 상태코드
 * @wpiFail {string} error 에러
 */

/**
 * @wpiRoute api/embed [post]
 * @wpiDescription 임베드 테스트입니다.
 * @wpiBody {hello} hello 임베딩
 */

// 테스트 주석
function Test() {
  console.log("This should not appear on batcher group");
}

/*
멀티라인 주석
 */

/**
 * @param {string} jsDoc 테스트
 */

/**
 * 안녕하세요
 * 이 주석은 적재되면 안되는 주석입니다.
 */
