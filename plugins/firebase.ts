import Vue from 'vue'
import firebase from 'firebase/app';
import 'firebase/firestore';
// TODO 使うときになったら使用する場所でimportする
// import 'firebase/auth';
// import 'firebase/storage';
// import 'firebase/functions';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
};

if (!firebase.apps.length) {
  console.log('initialize firebase')
  console.log(config)
  firebase.initializeApp(config);
}
//const functions = firebase.app().functions('asia-northeast1');
//if (process.env.FIREBASE_LOG_LEVEL) {
//  firebase.firestore.setLogLevel(process.env.FIREBASE_LOG_LEVEL as firebase.firestore.LogLevel);
//}
// export { firebase, functions };

export default (_1, inject) => {
  inject('firebase', firebase)
  inject('firestore', firebase.firestore())
}

declare module 'vue/types/vue' {
  interface Vue {
    $firebase: firebase.app.App
    $firestore: firebase.firestore.Firestore
  }
}