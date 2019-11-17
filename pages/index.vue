<template>
  <section class="mt-3">
    <section class="articles px-1">
      <ArticleList :article-list="list"></ArticleList>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import 'firebase/firestore'
import { format } from 'date-fns'
import { Article } from '@/store/articles'

@Component({
  components: {
    ArticleList: () => import('@/components/ArticleList.vue')
  },

  filters: {
    formatDate(date): string {
      return format(date, 'yyyy/MM/dd hh:mm:ss')
    }
  }
})
export default class Index extends Vue {
  list: Article[] = []

  mounted(): void {}

  async asyncData(context: any) {
    // storeに入っていたらそれを返す
    const storeArticleList = context.store.getters['articles/getList']
    if (storeArticleList.length !== 0) {
      return { list: storeArticleList }
    }

    const firestore = context.app.$firestore
    const q = await firestore
      .collection('articles')
      .where('status', '==', 'published')
      .orderBy('publishedAt', 'desc')
      .get()
    const list = q.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        articleTitle: data.articleTitle,
        ogImageUrl: data.ogImageUrl,
        ogImagePath: data.ogImagePath,
        contentHtml: data.contentHtml,
        tags: data.tags,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Article
    })

    // 取得した記事一覧をstoreに入れて使い回す
    context.store.commit('articles/setList', list)
    return { list }
  }
}
</script>
