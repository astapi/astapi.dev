<template>
  <div>logout</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/auth'

@Component
export default class Logout extends Vue {
  mounted(): void {
    this.$firebase.auth().signOut()
    this.$router.push('/')
  }
}
</script>
