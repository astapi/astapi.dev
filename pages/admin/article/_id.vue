<template>
  <div>
    <no-ssr>
      <a class="button is-info" @click="showTagModal = true">タグを追加や！</a>
      <a class="button is-info" @click="save">保存やで</a>
      <a class="button is-info" @click="publish">公開するぞ！</a>

      <div v-for="tag in articleTags" :key="tag">{{ tag }}</div>

      <div style="display:flex; justify-content: center; padding:5px;">
        <ArticleEditor
          :editor.sync="editor"
          :article-title.sync="articleTitle"
          :article-content="articleContent"
          :editable="true"
          style="width:47%;"
        ></ArticleEditor>

        <div style="width:47%;">
          <textarea
            v-model="articleContent"
            class="htmlarea"
            rows="20"
          ></textarea>
          <a class="button is-info" @click="hanei">反映</a>
        </div>
      </div>

      <CommonDialog v-if="showTagModal" @close="showTagModal = false">
        <template v-slot:header>
          <input v-model="addTagName" type="text" />
          <button class="button is-info" @click="addTag">追加します</button>
        </template>
      </CommonDialog>
    </no-ssr>
  </div>
</template>

<style lang="scss" scoped>
.htmlarea {
  font-size: 18px;
  width: 100%;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CommonDialog from '@/components/commonDialog.vue'
import firebase from 'firebase/app'
import { updateExpression } from '@babel/types';

interface Article {
  id: string
  articleTitle: string
  contentHtml: string
  contentJson: string
  tags: string[]
}

@Component({
  components: {
    ArticleEditor: () => import('@/components/ArticleEditor.vue'),
    CommonDialog
  },
  async asyncData() {}
})
export default class ArticleEdit extends Vue {
  editor: any = null
  articleTitle: string = ''
  articleContent: string = ''
  articleId: string = ''
  articleTags: string[] = []
  showTagModal: boolean = false
  addTagName: string = ''

  async mounted(): Promise<void> {
    await this.init()
  }

  async init() {
    this.articleId = this.$route.params.id
    const doc = await this.$firestore
      .collection('articles')
      .doc(this.articleId)
      .get()
    const data = doc.data() as Article
    this.articleTitle = data.articleTitle
    this.articleContent = data.contentHtml
    this.articleTags = data.tags
    this.editor.setContent(this.articleContent)
  }

  async save(): Promise<void> {
    if (this.articleTitle === '') {
      alert('タイトルが空です')
      return
    }
    const contentHtml = this.editor.getHTML()
    const contentJson = this.editor.getJSON()
    // html中の最初のimgタグのsrcをogpとして扱う
    const match = contentHtml.match(/<img src=["'](.+?)["']>/)

    const updateParams: any = {
      contentHtml,
      contentJson,
      articleTitle: this.articleTitle,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }
    if (match) {
      const imgPath = match[1]
      console.log(imgPath)
      updateParams.ogImagePath = imgPath;
    }
    await this.$firestore
      .collection('articles')
      .doc(this.articleId)
      .update(updateParams)
    alert('保存したで')
    this.init()
  }

  async publish() {
    await this.$firestore
      .collection('articles')
      .doc(this.articleId)
      .update({
        status: 'published',
        publishedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
  }

  hanei() {
    this.editor.setContent(this.articleContent)
  }

  async addTag() {
    if (this.addTagName === '') return
    await this.$firestore
      .collection('articles')
      .doc(this.articleId)
      .update({
        tags: firebase.firestore.FieldValue.arrayUnion(this.addTagName),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      })
    this.showTagModal = false
  }
}
</script>
