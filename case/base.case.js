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
