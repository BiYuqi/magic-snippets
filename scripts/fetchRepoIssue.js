const fetch = require('node-fetch')
const COS_ENV = process.argv.slice(2)
const [GITHUB_SNIPPET] = COS_ENV

const GITHUB_ISSUE_API = ({owner, repo, token}) => {
  return `https://api.github.com/repos/${owner}/${repo}/issues${generateQuery({owner, token})}`
}

const generateQuery = ({owner, token}) => {
  return `?creator=${owner}&per_page=1000&access_token=${token}`
}

const REDIRECT_URL = ({owner, repo}) => {
  return `https://github.com/${owner}/${repo}/issues`;
}

const CONFIG = {
  owner: 'BiYuqi',
  repo: 'snippets',
  token: GITHUB_SNIPPET
}
console.log(CONFIG)

module.exports = () => {
  console.log(GITHUB_ISSUE_API(CONFIG))
  return new Promise((resolve, reject) => {
    fetch(GITHUB_ISSUE_API(CONFIG))
      .then(res => res.json())
      .then(json => {
        resolve(json)
      })
      .catch(e => {
        reject(e)
      })
  })
}
