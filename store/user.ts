interface State {
  authUser: boolean
}

export const state = (): State => ({
  authUser: false
})

export const mutations = {
  setUser(state, user) {
    state.authUser = user
  }
}

export const actions = {}