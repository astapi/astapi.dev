workflow "Deploy" {
  on = "push"
  resolves = ["deploy to heroku"]
}

action "branch filter" {
  uses = "actions/bin/filter@25b7b846d5027eac3315b50a8055ea675e2abd89"
  args = "master"
}

action "deploy to heroku" {
  uses = "srt32/git-actions@v0.0.3"
  needs = ["branch filter"]
  secrets = ["HEROKU_API_KEY"]
  env = {
    HEROKU_APP = "astapi-dev-blog"
  }
  args = "git push https://heroku:$HEROKU_API_KEY@git.heroku.com/$HEROKU_APP.git master"
}
