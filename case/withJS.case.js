/**
 * @wpiVersion 0.0.3
 * @wpiName 자바스크립트.
 * @wpiDescription 자바스크립트
 * @wpiRoute api/test [post]
 * @wpiBody {string} name 이름
 * @wpiBody {string} nickname 별명
 * @wpiBody {string} password 비밀번호
 * @wpiSuccess {string} message 메세지
 * @wpiSuccess {int} statusCode 상태코드
 * @wpiSuccess {object} data 데이터
 */

function Test() {
  console.log("This should not appear on batcher group");
}
