<template>
  <section class="section">
    <div class="container">
      <nuxt-link to="/admin/article/new" class="button if-info"
        >新規作成</nuxt-link
      >
      <table
        class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
      >
        <thead>
          <tr>
            <th>id</th>
            <th>タイトル</th>
            <th>作成日時</th>
            <th>更新日時</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="article of list" :key="article.id">
            <th>{{ article.id }}</th>
            <th>
              <nuxt-link :to="`/admin/article/${article.id}`">{{
                article.articleTitle
              }}</nuxt-link>
            </th>
            <th>{{ article.createdAt | formatDate }}</th>
            <th>{{ article.updatedAt | formatDate }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/firestore'
import { format } from 'date-fns'
import { Article } from '@/store/articles'

@Component({
  filters: {
    formatDate(date): string {
      return format(date, 'YYYY/MM/DD hh:mm:ss')
    }
  }
})
export default class Index extends Vue {
  list: Article[] = []

  async mounted(): Promise<void> {
    const q = await this.$firestore.collection('articles').get()
    this.list = q.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        articleTitle: data.articleTitle,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Article
    })
  }
}
</script>
