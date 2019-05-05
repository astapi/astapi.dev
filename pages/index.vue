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
import { Component, Vue } from 'vue-property-decorator'
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
  },

  async asyncData(context: any) {
    // storeに入っていたらそれを返す
    const storeArticleList = context.store.getters['articles/getList']
    if (storeArticleList.length !== 0) {
      return { list: storeArticleList }
    }

    const firestore = context.app.$firestore
    const q = await firestore.collection('articles').get()
    const list = q.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        articleTitle: data.articleTitle,
        contentHtml: data.contentHtml,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Article
    })

    // 取得した記事一覧をstoreに入れて使い回す
    context.store.commit('articles/setList', list)
    return { list }
  }
})
export default class Index extends Vue {
  list: Article[] = []

  mounted(): void {}
}
</script>
