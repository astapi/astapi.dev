<template>
  <section
    class="flex justify-center mt-3 p-3 text-gray-500 bg-white"
  >
    <nuxt-link to="/">
      <h1>Copyright © astapi</h1>
    </nuxt-link>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class GlobalFooter extends Vue {}
</script>
