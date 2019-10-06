<template>
  <div class="lg:max-w-xl lg:mx-auto">
    <div
      v-for="article in articleList"
      :key="article.id"
      class="p-5 mt-3 bg-white shadow mx-auto"
    >
      <nuxt-link :to="`article/${article.id}`">
        <div v-if="article.ogImagePath">
          <img
            style="width: 384px; height: 216px;"
            class="mx-auto"
            :src="article.ogImagePath"
          />
        </div>

        <h2 id="article-title" class="text-base">{{ article.articleTitle }}</h2>
        <span class="flex justify-end text-gray-500">{{ article.createdAt | formatDate }}</span>
      </nuxt-link>
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
      return format(date, 'yyyy/MM/dd')
    }
  }
})
export default class Index extends Vue {
  @Prop() readonly articleList!: Article[]

  mounted(): void {}
}
</script>
