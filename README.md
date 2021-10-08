# PWA1✨
 Develop a modern web using express for Node.js, Vue.js, and mongoDB.
 <br>
 2020.03.05 부로 프로젝트 종료 (유지보수 안함)
<hr>

<img src="./structure.JPG" />

## config file setting🐱‍🏍

**config/index.js**  

```javascript
 module.exports = {
    dbUrl: 'mongodb://localhost:27017/leesky' // input your config
    admin: {
     id : 'input admin id',
     pwd: 'input pwd',
     name: 'input name'
    },
    jwt: {
     secretKey: 'input ur secretKey',
     issuer: 'homeless-leesky',
     subject: 'user-token',
     algorithm: 'input ur jwt algorithm', /
     expiresIn: 60 * 3, // default 토큰 만료 시간 (3분)
     expiresInRemember: 60 * 60 * 24 * 7, // 7일
     expiresInDiv: 3, 
   }
}
```

## run🐱‍🐉

### for development💫 
` $ npm run dev ` --> backend api server start <br>
` $ npm run serve` --> front development server start

<hr>

### for production🐱‍👓

` $ npm run pr `

### 프로젝트하면서 배운점
    backend에 대한 지식
        - 토큰 인증, 암호화, RestfulApi 만들기(회원가입, 로그인, 관리) , http-error 처리, 라우팅, express 지식, 모듈화, 서버튜닝 기초, mongodb, mongoose... etc
    front에 대한 지식
        - vue에대한 이해도 -> vuex, vue router, axios, moment.js, 컴포넌트 프레임워크 (vuetify)


