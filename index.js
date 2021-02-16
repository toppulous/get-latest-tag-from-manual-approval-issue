const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  const issue_number = core.getInput('issue-number');
  const token = core.getInput('github-token');
  const keyword = core.getInput('keyword');

  core.info(`Getting latest tag off of ${issue_number}`);

  const octokit = new github.GitHub(token);

  const {data: comments } = await octokit.issues.listComments(
    {
      owner: github.context.repo.owner,
      repo: github.context.repo.repo,
      issue_number: issue_number,
      per_page: 100,
    }
  );
  processed_comments = comments.map(comment => {
    console.log('Comment')
    console.log(comment)
    return {
      user_login: comment.user.login,
      body: comment.body,
      created_at: comment.created_at,
    }
  }).filter(comment => comment.user_login.includes('github-actions'))
  .filter(comment => comment.body.startsWith(keyword))
  .sort((a,b) => new Date(b.created_at) - new Date(a.created_at));

  core.info('processed comments');
  console.log(processed_comments);

  comment = processed_comments[0]; // newest comment
  comment_tag_raw = comment.body.split('\n')[1];
  tag = comment_tag_raw.split('tag:')[1].trim();
  core.setOutput('tag', tag);
}

core.info('Starting...');
run();
