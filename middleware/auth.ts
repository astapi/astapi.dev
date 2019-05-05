export default function (context) {
  console.log('auth middleware')
  const user = context.store.state.authUser
  const reg = new RegExp('^/admin')
  // admin から始まるパスの場合は state に user がいないとリダイレクト
  if (context.route.path.match(reg)) {
    if (!user) {
      console.log('未ログイン状態なので / へリダイレクトします')
      context.redirect('/')
      return
    }
  }
}