import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos.
    
    {props.repos.map((repo)=>{ 
      return <li>Repo: <a href={repo.repo_url}>{repo.repo_name}</a> | Owner: {repo.repo_owner} | Star Count: {repo.repo_star_count}</li>
    })}

  </div>
)

export default RepoList;