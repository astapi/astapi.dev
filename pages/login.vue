<template>
  <section class="section">
    <div class="container">
      <div class="field">
        <label class="label">Email</label>
        <div class="control">
          <input
            v-model="form.email"
            class="input"
            type="email"
            placeholder="Email input"
          />
        </div>
      </div>
      <div class="field">
        <label class="label">Password</label>
        <div class="control">
          <input
            v-model="form.password"
            class="input"
            type="password"
            placeholder="Password"
          />
        </div>
      </div>
      <div class="field">
        <button @click="login()">ログイン</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.field {
  min-width: 400px;
  max-width: 400px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/auth'
import Cookies from 'js-cookie'

@Component
export default class Login extends Vue {
  form: any = {
    email: '',
    password: ''
  }

  mounted(): void {}

  login(): void {
    const email = this.form.email
    const password = this.form.password
    try {
      this.$firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        // .then((credential: firebase.auth.UserCredential) => {
        .then(() => {
          console.log('login!')
          // this.$store.commit('user/setUser', credential)
          // 一時的にログイン状態は booleanで表す
          this.$store.commit('user/setUser', true)

          // SSR 認証用の cookie をセットする
          this.$firebase
            .auth()
            .currentUser!.getIdToken(true)
            .then(idToken => {
              Cookies.set('__session', idToken, { expires: 7 })
            })
          this.$router.push('/admin')
        })
        .catch(error => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(`${errorCode} : ${errorMessage}`)
        })
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
