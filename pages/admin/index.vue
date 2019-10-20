<template>
  <section>
    <nuxt-link to="/admin/article/new" class="border shadow p-1 bg-white"
      >新規作成</nuxt-link
    >
    <table class="mt-4">
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
      return format(date, 'yyyy/MM/dd hh:mm:ss')
    }
  }
})
export default class AdminIndex extends Vue {
  list: Article[] = []

  async mounted(): Promise<void> {
    const q = await this.$firestore.collection('articles').orderBy('createdAt', 'desc').get()
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
