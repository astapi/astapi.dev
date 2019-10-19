<template>
  <section class="bg-white pt-5 px-4 w-sm md:max-w-4xl mx-auto lg:p-8">
    <div id="article" class="bg-white">
      <p id="article-title" class="text-xl font-medium">
        {{ article.articleTitle }}
      </p>
      <div id="tags" class="mt-3 flex">
        <div v-for="tag in article.tags" :key="tag" class="tag text-gray-700 shadow rounded-sm p-1">{{ tag }}</div>
      </div>
      <div id="publishedAt" class="text-gray-500 mt-3">{{
        article.createdAt | formatDate
      }}</div>

      <!-- eslint-disable-next-line -->
      <div v-highlightjs id="article-body" class="content my-3 leading-relaxed text-gray-900" v-html="article.contentHtml"></div>
    </div>
  </section>
</template>

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
export default class ArticleDetail extends Vue {
  @Prop() readonly article!: Article
}
</script>
<style lang="scss" scoped>
.content {
  /deep/ p {
    margin-bottom: 1.2rem;

    img {
      display: block;
      margin: 0 auto;
      @apply w-64;
    }

    a {
      @apply text-blue-400;
    }

    code {
      @apply bg-gray-200 text-red-400 p-1;
    }
  }

  /deep/ pre {
    margin-bottom: 1.2rem;
    overflow: scroll;
  }
}

.tag {
  margin-left: 5px;
}
.tag:first-child {
  margin-left: 2px;
}
</style>
<style src='highlight.js/styles/solarized-dark.css'></style>