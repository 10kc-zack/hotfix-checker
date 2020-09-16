const core = require('@actions/core');
const github = require('@actions/github');

const HOTFIX_REGEXP = /^hotfix\/.+/;

try {
  console.log('STARTING');
  const headRef = github.context.payload.pull_request.head.ref;
  const isHeadAHotfix = headRef.match(HOTFIX_REGEXP);
  if (!isHeadAHotfix) {
    console.log('The head of this PR is not a hotfix. No action necessary!');
    return;
  }
  const baseRef = github.context.payload.pull_request.base.ref;
  const pp = (obj, spaces = 2) => console.log(JSON.stringify(obj, null, spaces)); // TODO: remove
  pp(github.context.payload)
  if (baseRef !== 'master') {
    core.setFailed('Invalid base for hotfix PR. Base must equal `master`.');
    return;
  } else {
    console.log('Check passed!');
    return;
  }
} catch (error) {
  core.setFailed(error.message);
}
