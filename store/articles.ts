import { GetterTree, ActionContext, ActionTree, MutationTree } from 'vuex'
export interface RootState {}

export interface Article {
  id: string
  articleTitle: string
  ogImagePath: string
  contentHtml: string
  createdAt: Date
  updatedAt: Date
}

interface State {
  articleList: Article[]
}

export const state = (): State => ({
  articleList: []
})

export const mutations = {
  setList(state, list) {
    state.articleList = list
  }
}

export const actions = {}

export const getters: GetterTree<State, RootState> = {
  getList: state => {
    return state.articleList
  },
  
  getArticle: state => {
    return (articleId: string) => {
      return state.articleList.find((article: Article) => {
        return article.id === articleId
      })
    }
  }
}