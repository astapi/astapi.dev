import Vue from 'vue'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/functions';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const functions = firebase.app().functions('asia-northeast1');
if (process.env.FIREBASE_LOG_LEVEL) {
  firebase.firestore.setLogLevel(process.env.FIREBASE_LOG_LEVEL as firebase.firestore.LogLevel);
}
console.log('ここっていつ通るの？')
export { firebase, functions };

// declare module 'vue/types/vue' {
//   interface Vue {
//     $functions: firebase.functions.Functions
//   }
// }
// export default () => {
//   Vue.prototype.$functions = functions
// }
//
