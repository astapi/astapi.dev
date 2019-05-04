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
import firebase from 'firebase/app'
import 'firebase/firestore'
import auth from '@/plugins/auth'

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
    const user = await auth()
    if (!user) this.$router.push('/')

    const q = await firebase
      .firestore()
      .collection('articles')
      .get()
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
