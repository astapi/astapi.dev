export const state = () => ({
  authUser: null
})

export const mutations = {
  SET_USER(state, user) {
    state.authUser = user
  }
}

export const actions = {
  // context は ActioncContext<S, R>
  // TODO: 型をちゃんと付けるようにしたい
  nuxtServerInit (context: any, nuxtContext: any) {
    // serverMiddleware でチェックした user を見て store に入れる
    // middleware で store の user を見てログイン判定している
    console.log('nuxtServerInitだよ')
    const user = nuxtContext.req.user
    console.log('user:', user)
    if (user) {
      context.commit('SET_USER', user)
    }
  }
}