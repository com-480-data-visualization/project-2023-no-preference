# Github pages deploy branch
The `gh-pages` branch is the automated deploy branch, do not modify it manually!

## Modify the website
To modify the website hosted on GH Pages, you need to get the sources from the `website` branch and modify the sources locally, then use the Node `gh-pages` module to push your modifications on the deploy branch.
You can find a tutorial here: https://www.freecodecamp.org/news/deploy-a-react-app-to-github-pages/

### Check that your system is ready
```
npm -v
yarn -v
node -v
```
```
git clone git@github.com:com-480-data-visualization/project-2023-no-preference.git
cd project-2023-no-preference
git switch website
```

### Start local website
From the `website` branch root:
```
yarn start
```
It will open the local website in your browser

### Push modifications
Push your changes to the `website` branch:
```
git commit -am "description of my modifications"
git push
```
and then only execute the `gh-pages` deploy script:
```
npm run deploy
```
once this command is done, you don't need to do anything else, your changes made from the `website` branch will be automagically compiled and pushed to the `gh-pages` branch.
It is crucial to push your source modifications on the `website` branch, otherwise other contributors cannot get your work.

