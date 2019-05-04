<template>
  <div>
    <no-ssr>
      <el-button @click="save">保存やで</el-button>
      <ArticleEditor
        :editor.sync="editor"
        :article-title.sync="articleTitle"
        :article-content="articleContent"
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

interface Article {
  id: string
  articleTitle: string
  contentHtml: string
  contentJson: string
}

@Component({
  components: {
    ArticleEditor: () => import('@/components/ArticleEditor.vue')
  },
  async asyncData() {}
})
export default class ArticleEdit extends Vue {
  editor: any = null
  articleTitle: string = ''
  articleContent: string = ''
  articleId: string = ''

  async mounted(): Promise<void> {
    const user = await auth()
    if (!user) this.$router.push('/')

    this.articleId = this.$route.params.id
    console.log(this.articleId)
    const doc = await firebase
      .firestore()
      .collection('articles')
      .doc(this.articleId)
      .get()
    const data = doc.data() as Article
    this.articleTitle = data.articleTitle
    this.articleContent = data.contentHtml
    this.editor.setContent(this.articleContent)
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
      .doc(this.articleId)
      .update({
        contentHtml,
        contentJson,
        articleTitle: this.articleTitle,
        status: 'draft',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    alert('保存したで')
  }
}
</script>
