<template>
  <div>
    <GlobalHeader></GlobalHeader>
    <section class="section">
      <div class="container">
        <section class="articles">
          <div class="column is-8 is-offset-2">
            <ArticleDetail :article="article"></ArticleDetail>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/firestore'
import { format } from 'date-fns'

interface Article {
  id: string
  articleTitle: string
  contentHtml: string
  createdAt: Date
  updatedAt: Date
}

@Component({
  components: {
    GlobalHeader: () => import('@/components/GlobalHeader.vue'),
    ArticleDetail: () => import('@/components/ArticleDetail.vue')
  },

  filters: {
    formatDate(date): string {
      return format(date, 'YYYY/MM/DD hh:mm:ss')
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
      contentHtml: data.contentHtml,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    }
    return { article }
  }
})
export default class Index extends Vue {
  article: Article = {
    id: '1',
    articleTitle: '',
    contentHtml: '',
    createdAt: new Date(),
    updatedAt: new Date()
  }

  mounted(): void {}
}
</script>

<style></style>
