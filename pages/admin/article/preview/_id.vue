<template>
  <section>
    <ArticleDetail :article="article"></ArticleDetail>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/firestore'
import { format } from 'date-fns'
import { Article } from '@/store/articles'

@Component({
  components: {
    ArticleDetail: () => import('@/components/ArticleDetail.vue')
  },

  filters: {
    formatDate(date): string {
      return format(date, 'yyyy/MM/dd hh:mm:ss')
    }
  },

  async asyncData(context: any) {
    // storeに入っていたらそれを返す
    const storeArticle = context.store.getters['articles/getArticle'](
      context.params.id
    )
    if (storeArticle) {
      return { article: storeArticle }
    }

    const firestore = context.app.$firestore
    const doc = await firestore
      .collection('articles')
      .doc(context.params.id)
      .get()
    if (!doc.exists) {
      context.error({ statusCode: 404, message: 'Not Found' })
      return
    }
    const data = doc.data()!
    const article = {
      id: doc.id,
      articleTitle: data.articleTitle,
      tags: data.tags,
      contentHtml: data.contentHtml,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    }
    return { article }
  }
})
export default class Index extends Vue {
  head() {
    return {
      title: `${this.article.articleTitle} | あすたぴ.dev`,
      meta: [
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: `${this.article.articleTitle} | あすたぴ.dev` },
        { hid: 'og:url', property: 'og:url', content: this.$route.fullPath },
        { hid: 'twitter:title', property: 'twitter:title', content: `${this.article.articleTitle} | あすたぴ.dev` },
      ]
    }
  }
  article: Article = {
    id: '1',
    articleTitle: '',
    ogImagePath: '',
    ogImageUrl: '',
    contentHtml: '',
    createdAt: new Date(),
    updatedAt: new Date(),
    publishedAt: new Date(),
  }
}
</script>