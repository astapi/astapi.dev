<template>
  <div class="card article">
    <div class="card-content">
      <div class="media">
        <div class="media-content has-text-centered">
          <slot name="ogImage"></slot>
          <p class="article-title">
            {{ article.articleTitle }}
          </p>
          <div class="tags level-item">
            <span
              v-for="tag in article.tags"
              :key="tag"
              class="tag is-rounded"
              >{{ tag }}</span
            >
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

<style lang="scss" scoped>
.article-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
}
.tag {
  background-color: rgb(0, 187, 255);
  color: white;
}
</style>


<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { format } from 'date-fns'
import { Article } from '@/store/articles'

@Component({
  filters: {
    formatDate(date): string {
      return format(date, 'yyyy/MM/dd hh:mm:ss')
    }
  }
})
export default class ArticleCommon extends Vue {
  @Prop() readonly article!: Article

  mounted(): void {}
}
</script>
