<template>
  <section class="hero is-light">
    <div class="hero-body">
      <div class="container has-text-centered">
        <nuxt-link to="/">
          <h1 class="title">
            あすたぴ.dev
          </h1>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class GlobalHeader extends Vue {}
</script>
