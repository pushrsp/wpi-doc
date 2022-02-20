# How to install
1. ```git clone https://github.com/pushrsp/wpi-doc```
2. ```npm install```
3. ```npm link```

# API

## @wpiRoute
```@wpiRoute api [method]```

## Example
```@wpiRoute api/test [post]```
<hr/>

## @wpiDescription
```@wpiDescription description```

## Example
```@wpiDescription 테스트입니다.```
<hr/>

## @wpiBody
```@wpiBody {type} key explain```

## Example
```@wpiBody {string} username 아이디```
<hr/>

## @wpiSuccess
```@wpiSuccess {type} key explain```

## Example
```@wpiSuccess {int} statusCode 상태코드```
<hr/>

## @wpiFail
```@wpiFail {type} key explain```

## Example
```@wpiFail {string} error 에러 메세지```
<hr/>

## @wpiDefineKey
```@wpiDefineKey key```

## Example
```@wpiDefineKey address```
<hr/>

## @wpiDefineValue
```@wpiDefineValue {type} key explain```

## Example
```@wpiDefineValue {string} code 코드```
<hr/>

## @wpiParam
```@wpiParam {type} key explain```

## Example
```@wpiParam {string} id 유저 UID```
<hr />

## @wpiQuery
```@wpiQuery {type} key explain```

## Example
```@wpiQuery {string} size 페이지 사이즈```
<hr />

# 예시
## 기본
```
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
```

output: 

```
[
  {
    "route": "api/test",
    "method": "POST",
    "description": "테스트입니다.",
    "body": [
      {
        "key": "username",
        "type": "string",
        "explain": "아이디",
        "collapse": {}
      },
      {
        "key": "password",
        "type": "string",
        "explain": "비밀번호",
        "collapse": {}
      },
      {
        "key": "nickname",
        "type": "string",
        "explain": "닉네임",
        "collapse": {}
      }
    ],
    "success": [
      {
        "type": "string",
        "key": "message",
        "explain": "메세지",
        "collapse": {}
      },
      {
        "type": "int",
        "key": "statusCode",
        "explain": "상태코드",
        "collapse": {}
      },
      {
        "type": "object",
        "key": "data",
        "explain": "데이터",
        "collapse": {}
      }
    ],
    "fail": [
      {
        "type": "string",
        "key": "message",
        "explain": "메세지",
        "collapse": {}
      },
      {
        "type": "int",
        "key": "statusCode",
        "explain": "상태코드",
        "collapse": {}
      },
      {
        "type": "string",
        "key": "error",
        "explain": "에러",
        "collapse": {}
      }
    ]
  }
]
```
<hr/>

## 임베딩
```
/**
 * @wpiDefineKey hi
 * @wpiDefineValue {string} abc 하이
 */

/**
 * @wpiRoute api/embed [post]
 * @wpiDescription 임베딩 테스트입니다.
 * @wpiBody {hi} hi 임베딩
 */
```
output:
```
[
    {
    "route": "api/embed",
    "method": "POST",
    "description": "임베딩 테스트입니다.",
    "body": [
      {
        "key": "hi",
        "type": "hi",
        "explain": "임베딩",
        "collapse": {
          "hi": [
            {
              "key": "abc",
              "type": "string",
              "explain": "하이",
              "collapse": {}
            }
          ]
        }
      }
    ]
  }
]
```
<hr/>

## 임베딩 with 'or'
```
/**
 * @wpiDefineKey bye
 * @wpiDefineValue {string} ollah 바이
 */

/**
 * @wpiDefineKey hi
 * @wpiDefineValue {string} abc 하이
 */

/**
 * @wpiRoute api/or [post]
 * @wpiDescription 'or' 테스트입니다.
 * @wpiBody {hi|bye} hi 임베딩
 */
```
output:
```
[
    {
    "route": "api/or",
    "method": "POST",
    "description": "'or' 테스트입니다.",
    "body": [
      {
        "key": "hi",
        "type": "hi|bye",
        "explain": "임베딩",
        "collapse": {
          "hi": [
            {
              "key": "abc",
              "type": "string",
              "explain": "하이",
              "collapse": {}
            }
          ],
          "bye": [
            {
              "key": "ollah",
              "type": "string",
              "explain": "바이",
              "collapse": {}
            }
          ]
        }
      }
    ]
  }
]
```