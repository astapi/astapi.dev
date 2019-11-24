<template>
  <section>
    <ArticleDetail :article="article"></ArticleDetail>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/firestore'
import { format, formatISO } from 'date-fns'
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
    if (data.status === 'draft') {
      context.error({ statusCode: 404, message: 'Not Found' })
      return;
    }
    const article = {
      id: doc.id,
      articleTitle: data.articleTitle,
      tags: data.tags,
      contentHtml: data.contentHtml,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate(),
      publishedAt: data.publishedAt.toDate(),
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
        { hid: 'og:image', property: 'og:image', content: this.article.ogImageUrl },
        { hid: 'twitter:title', property: 'twitter:title', content: `${this.article.articleTitle} | あすたぴ.dev` },
        { hid: 'twitter:description', property: 'twitter:description', content: 'あすたぴ.dev', },
        { hid: 'twitter:image', property: 'twitter:image', content: this.article.ogImageUrl },
        { hid: 'description', name: 'description', content: 'あすたぴ.dev', },
      ],
      __dangerouslyDisableSanitizers: ['script'],
      script: [
        {
          innerHTML: `{
            "@context": "http://schema.org",
            "@type": "Article",
            "datePublished": "${this.datePublished}"
            "dateModified": "${this.dateModified}"
          }`,
          type: 'application/ld+json',
        },
      ],
    }
  }

  get datePublished() {
    return formatISO(this.article.publishedAt)
  }
  get dateModified() {
    return formatISO(this.article.updatedAt)
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