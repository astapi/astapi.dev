import * as firebase from 'firebase/app';
import 'firebase/firestore';
// TODO 使うときになったら使用する場所でimportする
// import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/functions';

//const functions = firebase.app().functions('asia-northeast1');
//if (process.env.FIREBASE_LOG_LEVEL) {
//  firebase.firestore.setLogLevel(process.env.FIREBASE_LOG_LEVEL as firebase.firestore.LogLevel);
//}
// export { firebase, functions };
const config = {
  apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
  authDomain: process.env.NUXT_ENV_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NUXT_ENV_FIREBASE_DATABASE_URL,
  projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NUXT_ENV_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NUXT_ENV_FIREBASE_MESSAGE_SENDER_ID,
};

export default (_1, inject) => {
  if (!firebase.apps.length) {
    console.log('initialize firebase')
    firebase.initializeApp(config);
  }
  inject('firebase', firebase)
  inject('firestore', firebase.firestore())
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App
    $firestore: firebase.firestore.Firestore
  }
}