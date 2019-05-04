<template>
  <el-form ref="form" :model="form" label-width="120px">
    <el-form-item label="email">
      <el-input v-model="form.email"></el-input>
    </el-form-item>
    <el-form-item label="password">
      <el-input v-model="form.password" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login()">ログイン</el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'

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
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((credential: firebase.auth.UserCredential) => {
        this.$store.commit('SET_USER', credential)
        this.$router.push('/admin')
      })
      .catch(error => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(`${errorCode} : ${errorMessage}`)
      })
  }
}
</script>
