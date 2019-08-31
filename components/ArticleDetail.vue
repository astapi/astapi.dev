<template>
  <ArticleCommon :article="article">
    <!-- eslint-disable-next-line -->
    <div class="content article-body" v-html="article.contentHtml"></div>
  </ArticleCommon>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Article } from '@/store/articles'

@Component({
  components: {
    ArticleCommon: () => import('@/components/ArticleCommon.vue')
  }
})
export default class ArticleDetail extends Vue {
  @Prop() readonly article!: Article

  mounted(): void {}
}
</script>
<style lang="scss" scoped>
.content {
  /deep/ p {
    img {
      display: block;
      margin: 0 auto;
    }
  }
}
</style>