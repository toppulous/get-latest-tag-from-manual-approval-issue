const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const issue_number = core.getInput('issue-number');
  const token = core.getInput('github-token');

  core.info(`Getting latest tag off of ${issue_number}`);

  const octokit = new github.GitHub(token);
  const { data: comments } = await octokit.issues.listComments({
    owner: github.context.repo.owner,
    repo: github.context.repo.repo,
    issue_number: issue_number,
  });

  core.info('Got comments');
  console.log(comments);

  core.setOutput('tag', 'tag'); // TODO
}

core.info('Starting...');
run();
