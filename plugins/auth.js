import 'firebase/auth'

function auth(context) {
  return new Promise((resolve, reject) => {
    const firebase = context.app.$firebase
    firebase.auth().onAuthStateChanged(user => {
      resolve(user || false)
    })
  })
}
export default auth
