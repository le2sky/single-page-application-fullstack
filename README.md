# Modern-web-development
 Develop a modern web using express for Node.js, Vue.js, and mongoDB.
<hr>

<img src="./structure.JPG" />

## config file setting.

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
     secretKey: 'inpust ur secretKey',
     issuer: 'homeless-leesky',
     subject: 'user-token',
     algorithm: 'input ur jwt algorithm', /
     expiresIn: 60 * 3, // default 토큰 만료 시간 (3분)
     expiresInRemember: 60 * 60 * 24 * 7, // 7일
     expiresInDiv: 3, 
   }
}
```

## run
