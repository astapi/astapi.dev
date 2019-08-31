<template>
  <div>
    <ArticleCommon
      v-for="article in articleList"
      :key="article.id"
      :article="article"
    >
      <div class="content article-body" style="display: flex; justify-content: center;">
        <nuxt-link :to="`article/${article.id}`">
          <a class="button is-info is-outlined">もっと見る</a>
        </nuxt-link>
      </div>
    </ArticleCommon>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Article } from '@/store/articles'

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
