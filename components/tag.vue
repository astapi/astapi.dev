<template>
  <div class="tag">{{ text }}</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Tag extends Vue {
  @Prop() readonly text!: string
}
</script>

<style lang="sass" scoped>
.tag {
}
</style>
