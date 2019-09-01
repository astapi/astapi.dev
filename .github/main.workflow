workflow "Deploy to Heroku" {
  on = "push"
}

workflow "New workflow" {
  on = "push"
  resolves = ["GitHub Action for Heroku"]
}

action "GitHub Action for Heroku" {
  uses = "srt32/git-actions@v0.0.3"
  secrets = ["HEROKU_API_KEY"]
  env = {
    HEROKU_APP = "astapi-dev-blog"
  }
  args = "git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP.git master"
}
