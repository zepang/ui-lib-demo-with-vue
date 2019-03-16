cd docs/.vuepress/dist

git init
git add .
git commit -m 'deploy'
git push -f git@github.com:zepang/lai-ui.git master:gh-pages
