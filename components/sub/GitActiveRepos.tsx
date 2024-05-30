"use client"
import React, { useState, useEffect } from 'react';
import { GET_LATEST_ACTIVE_REPOS } from '../../constants/gitQueries';

const GitActiveRepos = () => {
  const [repos, setRepos] = useState([]);

  const fetchRepos = async () => {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_API}`,
        },
        body: JSON.stringify({ query: GET_LATEST_ACTIVE_REPOS }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const { data } = await response.json();

      const reposData = data.user.repositories.nodes.map(repo => ({
        name: repo.name,
        url: repo.url,
        description: repo.description,
      }));

      setRepos(reposData);
      console.log(reposData)
    } catch (error) {
      console.error('Error fetching repos:', error);
    }
  };

  useEffect(() => {
    fetchRepos();
  }, []);

  return (
    <div className="git-board p-6 pr-0">
      <h1 className="font-bold text-xl mb-4 ml-6">Active Repositories</h1>
      <div className="repo-container flex flex-wrap gap-3 overflow-y-scroll max-h-[35vh] mx-3">
        {repos.map(repo => (
              <a href={repo.url} target="_blank" >
          <div key={repo.url} className="repo bg-gray-100 p-4 rounded-lg shadow-md w-[20vw] h-[10vh] button-primary mr-0 pr-0 ">
            <h2 className="repo-name text-blue-500 font-bold ">
                {repo.name}
            </h2>
            <p className="repo-description  text-gray-400 overflow-y-hidden">{repo.description}</p>
          </div>
              </a>
        ))}
      </div>
    </div>
  );
};

export default GitActiveRepos;
