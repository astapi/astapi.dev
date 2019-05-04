<template>
  <div>
    <no-ssr>
      <el-button @click="save">保存やで</el-button>
      <ArticleEditor
        :editor.sync="editor"
        :article-title.sync="articleTitle"
        article-content=""
        :editable="true"
      ></ArticleEditor>
    </no-ssr>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import firebase from 'firebase/app'
import 'firebase/firestore'
import auth from '@/plugins/auth'

@Component({
  components: {
    ArticleEditor: () => import('@/components/ArticleEditor.vue')
  },
  async asyncData() {}
})
export default class ArticleNew extends Vue {
  editor: any = null
  articleTitle: string = ''

  async mounted(): Promise<void> {
    const user = await auth()
    if (!user) this.$router.push('/')
  }

  async save(): Promise<void> {
    if (this.articleTitle === '') {
      alert('タイトルが空です')
      return
    }
    const contentHtml = this.editor.getHTML()
    const contentJson = this.editor.getJSON()
    await firebase
      .firestore()
      .collection('articles')
      .add({
        contentHtml,
        contentJson,
        articleTitle: this.articleTitle,
        status: 'draft',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    alert('保存したで')
  }
}
</script>
