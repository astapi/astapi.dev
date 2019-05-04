<template>
  <div>
    <ArticleCommon
      v-for="article in articleList"
      :key="article.id"
      :article="article"
    >
      <div class="content article-body">
        <nuxt-link :to="`article/${article.id}`">
          <a class="button is-text">もっと見る</a>
        </nuxt-link>
      </div>
    </ArticleCommon>
  </div>
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
export default class Index extends Vue {
  @Prop() readonly articleList!: Article[]

  mounted(): void {}
}
</script>
