<template>
  <div>
    <GrobalHeader></GrobalHeader>

    <section class="section">
      <div class="container">
        <section class="articles">
          <div class="column is-8 is-offset-2">
            <ArticleList :article-list="list"></ArticleList>
          </div>
        </section>
      </div>
    </section>
  </div>
</template>

<style>
.section .card {
  margin-bottom: 50px;
}
</style>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import 'firebase/firestore'
import { format } from 'date-fns'
import { Article } from '@/store/articles'

@Component({
  components: {
    GrobalHeader: () => import('@/components/GlobalHeader.vue'),
    ArticleList: () => import('@/components/ArticleList.vue')
  },

  filters: {
    formatDate(date): string {
      return format(date, 'YYYY/MM/DD hh:mm:ss')
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
