<template>
  <div>logout</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'
import 'firebase/auth'

@Component
export default class Logout extends Vue {
  mounted(): void {
    firebase.auth().signOut()
    this.$router.push('/')
  }
}
</script>
