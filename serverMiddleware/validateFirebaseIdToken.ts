
import cookieParser from 'cookie-parser'

module.exports = (req, res, next) => {
  console.log('servermiddleware')
  getIdTokenFromRequest(req, res).then(idToken => {
    if (idToken) {
      // 一旦 cookie があれば ログイン済とする
      req.user = true
      next()
    } else {
      next()
    }
  })
}

// 
// import admin from 'firebase-admin'
// const serviceAccount = require('@/serverMiddleware/serviceAccountKey.json')
// const adminApp = admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount),
//     databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
// });
// 
// // see: https://github.com/davidroyer/nuxt-ssr-firebase-auth/blob/master/serverMiddleware/validateFirebaseIdToken.js
// export default function (req, res, next) {
//   console.log('ほげえええええええええええええええ')
//   getIdTokenFromRequest(req, res).then(idToken => {
//     if (idToken) {
//     } else {
//       next()
//     }
//   })
// }
// 
const getIdTokenFromRequest = (req, res) => {
  return new Promise(function(resolve) {
    const parser = cookieParser()
    parser(req, res, () => {
      if (req.cookies && req.cookies.__session) {
        console.log('Found "__session" cookie');
        // Read the ID Token from cookie.
        resolve(req.cookies.__session);
      } else {
        resolve();
      }
    })
  })
}
// 
// const addDecodedIdTokenToRequest = (idToken, req) => {
//   return adminApp.auth().verifyIdToken(idToken).then(decodedIdToken => {
//     console.log('ID Token correctly decoded', decodedIdToken);
//     req.user = decodedIdToken;
//   }).catch(error => {
//     console.error('Error while verifying Firebase ID token:', error);
//   });
// }
// 