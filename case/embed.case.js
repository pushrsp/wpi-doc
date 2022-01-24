/**
 * @wpiDefineKey hello
 * @wpiDefineValue {string} test 테스트
 * @wpiDefineValue {int} hi 테스트
 * @wpiDefineValue {string} bye 테스트
 */

/**
 * @wpiDefineKey bye
 * @wpiDefineValue {string} ollah 바이
 */

/**
 * @wpiRoute api/or [post]
 * @wpiDescription 'or' 테스트입니다.
 * @wpiBody {hello | bye} bye or
 */

/**
 * @wpiRoute api/embed [post]
 * @wpiDescription 임베드 테스트입니다.
 * @wpiBody {hello} hello 임베딩
 */
