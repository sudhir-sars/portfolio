import React, { useState, useEffect } from 'react';
import { GET_LATEST_COMMITS } from '../../constants/gitQueries';

const GitCommits = () => {
  const [commits, setCommits] = useState<any[]>([]);

  const fetchCommits = async () => {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${process.env.NEXT_PUBLIC_GITHUB_API}`,
        },
        body: JSON.stringify({ query: GET_LATEST_COMMITS }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const { data } = await response.json();

      const allCommits = data.user.repositories.nodes.reduce(
        (acc: any[], repo: any) => {
          // Skip the repository named "project-O-365"
          if (repo.name === 'project-O-365') {
            return acc;
          }

          const repoCommits =
            repo.refs.nodes[0]?.target?.history?.edges.map((commit: any) => ({
              repoName: repo.name,
              message: commit.node.message,
              committedDate: commit.node.committedDate,
              author: commit.node.author,
              url: commit.node.url,
            })) || [];
          return [...acc, ...repoCommits];
        },
        []
      );

      setCommits(allCommits);
    } catch (error: any) {
      console.error('Error fetching commits:', error);
    }
  };

  useEffect(() => {
    fetchCommits();
  }, []);

  return (
    <div className="p-6   ">
      <div className="font-bold text-xl mb-4 ml-6">Latest Commits</div>
      <div className="max-h-[80vh] overflow-y-scroll ">
        <div className="px-3">
          {commits.map((commit: any) => (
            <div
              key={commit.url}
              className="repo bg-gray-100 p-4 rounded-lg shadow-md mb-4 button-primary"
            >
              <h3 className="repo-name">
                <strong>Repository:</strong> {commit.repoName}
              </h3>
              <p>
                <strong>Message:</strong> {commit.message}
              </p>
              <p>
                <strong>Date:</strong>{' '}
                {new Date(commit.committedDate).toLocaleString()}
              </p>
              <p>
                <strong>Author:</strong> {commit.author.name}{' '}
              </p>
              <a
                href={commit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                {' '}
                View Commit
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitCommits;
