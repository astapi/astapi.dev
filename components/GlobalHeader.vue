<template>
  <section class="flex justify-center p-5 text-xl font-semibold bg-white">
    <nuxt-link to="/">
      <h1 class="text-3xl">あすたぴ.dev</h1>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class GlobalHeader extends Vue {}
</script>
