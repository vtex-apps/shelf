const { danger, message, warn, fail } = require('danger')
const { readFileSync } = require('fs')
const { basename } = require('path')

const BIG_PR_LIMIT = 800
const DANGER_IGNORE_FILES = ['dangerfile.js']

const {
  git,
  github: { pr, thisPR, requested_reviewers },
} = danger

const repoURL = pr.head.repo.html_url
const ref = pr.head.ref

const modifiedFiles = git.modified_files
const createdFiles = git.created_files
const deletedFiles = git.deleted_files

const existingFiles = modifiedFiles
  .concat(createdFiles)
  .filter(file => !DANGER_IGNORE_FILES.includes(file))
const allFiles = existingFiles.concat(deletedFiles)
const testFiles = existingFiles.filter(path => path.includes('test'))
const codeFiles = existingFiles.filter(file => file.match(/\.[tj]sx?$/i))

const formatFilename = file => `\`${file}\``
const formatFilenames = files => files.map(formatFilename).join(', ')
const linkToFile = (file, line) => {
  const lineId = line ? `#L${line}` : ''
  return `[${file}${lineId}](${repoURL}/blob/${ref}/${file}${lineId})`
}
const findTerm = (term, content) => {
  let index
  if (term instanceof RegExp) {
    const match = content.match(term)
    if (!match) return []
    index = match.index
    // replace the regexp with what matched
    term = match[0]
  } else {
    index = content.indexOf(term)
    if (index === -1) return []
  }
  const line = content.substring(0, index).split('\n').length
  return [term, line]
}
const findFirstTerm = (terms, content) => {
  for (let i = terms.length; i--; ) {
    const [term, line] = findTerm(terms[i], content)
    if (term) return [term, line]
  }
  return []
}
const findTermsOnFiles = (terms, files) =>
  files
    .map(file => {
      let [term, line] = findFirstTerm(terms, readFileSync(file).toString())
      if (line) return [file, term, line]
      return null
    })
    .filter(Boolean)

function showFileChanges() {
  const msg = [
    modifiedFiles.length &&
      `:art: **Changed Files**:\n${formatFilenames(modifiedFiles)}`,
    createdFiles.length &&
      `:sparkles: **Created Files**:\n${formatFilenames(createdFiles)}`,
    deletedFiles.length &&
      `:fire: **Deleted Files**:\n${formatFilenames(deletedFiles)}`,
  ]
    .filter(Boolean)
    .join('\n\n')
  message(msg)
}

function checkChangelog() {
  const hasChangelog =
    modifiedFiles.includes('CHANGELOG.md') ||
    createdFiles.includes('CHANGELOG.md')
  if (!hasChangelog) {
    fail(':pencil: Please add a changelog entry for your changes.')
  }
}

function checkDescription() {
  if (pr.body.length < 20) {
    fail(':pencil: Please add a description to your PR.')
  }
}

function checkWIP() {
  if (pr.title.match(/wip/i)) {
    warn(':construction: Pull request is currently a **Work In Progress**.')
  }
}

function checkAssigneeAndReviewers() {
  if (pr.assignee === null) {
    fail(
      ':bust_in_silhouette: Please assign someone to merge this PR, and optionally include people who should review.'
    )
  }

  if (!thisPR || !requested_reviewers) return

  const reviewers = [
    ...requested_reviewers.teams.map(
      requestedTeam => `@${thisPR.owner}/${requestedTeam}`
    ),
    ...requested_reviewers.users.map(requestedUser => `@${requestedUser}`),
  ]

  if (reviewers.length === 0) {
    warn(
      `:busts_in_silhouette: There are no reviewers assigned to this pull request!`
    )
  } else {
    message(
      `:heavy_check_mark: Assigned reviewers:\n-${reviewers.join('\n -')}`
    )
  }
}

function checkPRSize() {
  if (pr.additions + pr.deletions > BIG_PR_LIMIT) {
    warn(
      `:eyes: Pull Request size seems relatively large (**>${BIG_PR_LIMIT}** modifications). If Pull Request contains multiple changes, split each into separate PR will helps faster, easier review.`
    )
  }
}

function checkTestFiles() {
  const terms = ['it.only', 'describe.only', 'fdescribe', 'fit(']
  findTermsOnFiles(terms, testFiles).forEach(([file, term, line]) => {
    fail(
      `An \`${term}\` was left in this file ${linkToFile(file, line)}`,
      file,
      line
    )
  })
}

function checkConsoleLog() {
  const terms = ['console.log']
  findTermsOnFiles(terms, codeFiles).forEach(([file, term, line]) => {
    warn(
      `A wild \`${term}\` has appeared on this file: ${linkToFile(
        file,
        line
      )}. Is this supposed to be here?`,
      file,
      line
    )
  })
}

function checkLockFileUpdated() {
  const packageChanged = modifiedFiles.includes('package.json')
  const lockfileChanged = modifiedFiles.includes('yarn.lock')

  if (packageChanged && !lockfileChanged) {
    warn(
      'Changes were made to package.json, but not to yarn.lock - <em>Perhaps you need to run `yarn install`?</em>'
    )
  }
}

function checkMergeability() {
  if (!pr.mergeable) {
    fail(`“Branch is not rebased with \`${pr.base.ref}\`?`)
  }
}

function init() {
  showFileChanges()
  checkChangelog()
  checkDescription()
  checkWIP()
  checkAssigneeAndReviewers()
  checkPRSize()
  checkTestFiles()
  checkLockFileUpdated()
  checkConsoleLog()
  checkMergeability()
}

init()
