<template>
  <div>
    <el-table :data="list">
      <el-table-column label="タイトル">
        <template slot-scope="scope">
          <nuxt-link :to="`/admin/article/${scope.row.id}`">{{
            scope.row.articleTitle
          }}</nuxt-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import 'firebase/firestore'

interface Article {
  id: string
  articleTitle: string
  contentHtml: string
  contentJson: string
}

@Component
export default class Index extends Vue {
  list: Article[] = []

  async mounted(): Promise<void> {
    const q = await this.$firestore.collection('articles').get()
    this.list = q.docs.map(doc => {
      const data = doc.data()
      return {
        id: doc.id,
        articleTitle: data.articleTitle
      } as Article
    })
  }
}
</script>
