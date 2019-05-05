<template>
  <div class="card article">
    <div class="card-content">
      <div class="media">
        <div class="media-content has-text-centered">
          <p class="title article-title">
            {{ article.articleTitle }}
          </p>
          <div class="tags has-addons level-item">
            <a href="https://twitter.com/astapi">
              <span class="tag is-rounded is-info">@astapi</span>
            </a>
            <span class="tag is-rounded">{{
              article.createdAt | formatDate
            }}</span>
          </div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { format } from 'date-fns'
import { Article } from '@/store/articles'

@Component({
  filters: {
    formatDate(date): string {
      return format(date, 'YYYY/MM/DD hh:mm:ss')
    }
  }
})
export default class ArticleCommon extends Vue {
  @Prop() readonly article!: Article

  mounted(): void {}
}
</script>
