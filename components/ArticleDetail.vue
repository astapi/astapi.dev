<template>
  <ArticleCommon :article="article">
    <div class="content article-body" v-html="article.contentHtml"></div>
  </ArticleCommon>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

interface Article {
  id: string
  articleTitle: string
  contentHtml: string
  contentJson: string
  createdAt: Date
  updatedAt: Date
}

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
