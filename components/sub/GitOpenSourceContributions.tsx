import React, { useState, useEffect } from 'react';
import { GET_OPEN_SOURCE_CONTRIBUTIONS } from '../../constants/gitQueries';

interface Contribution {
  pullRequest?: {
    url: string;
    title: string;
  };
  issue?: {
    url: string;
    title: string;
  };
  repository: {
    name: string;
  };
  createdAt: string;
  author: {
    login: string;
  };
}

const OpenSourceContributions: React.FC = () => {
  const [contributions, setContributions] = useState<Contribution[]>([]);

  const fetchContributions = async () => {
    try {
      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer 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`,
        },
        body: JSON.stringify({ query: GET_OPEN_SOURCE_CONTRIBUTIONS }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const { data } = await response.json();

      const pullRequestContributions =
        data.user.contributionsCollection.pullRequestContributionsByRepository;
      const issueContributions =
        data.user.contributionsCollection.issueContributionsByRepository;

      // Combine pull request and issue contributions
      const allContributions: Contribution[] = [
        ...pullRequestContributions,
        ...issueContributions,
      ];

      setContributions(allContributions);
    } catch (error) {
      console.error('Error fetching contributions:', error);
    }
  };

  useEffect(() => {
    fetchContributions();
  }, []);

  return (
    <div className="git-board p-6 ml-3">
      <h1 className="font-bold text-xl mb-4 ml-3">Open Source Contributions</h1>
      <div className="contribution-container flex flex-wrap gap-3 overflow-y-scroll max-h-[35vh]">
        {contributions.length === 0 && (
          <div className="contribution bg-gray-100 p-4 rounded-lg shadow-md w-[20vw] h-[20vh] button-primary">
            <p className="text-gray-400">No contributions found</p>
          </div>
        )}
        {contributions.map((contribution, index) => (
          <a
            key={index}
            href={
              contribution.pullRequest
                ? contribution.pullRequest.url
                : contribution.issue!.url
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="contribution bg-gray-100 p-4 rounded-lg shadow-md w-[20vw] h-[20vh] button-primary">
              <h2 className="repo-name text-blue-500 font-bold">
                {contribution.repository.name}
              </h2>
              {contribution.pullRequest && (
                <p className="contribution-type text-gray-400">Pull Request</p>
              )}
              {contribution.issue && (
                <p className="contribution-type text-gray-400">Issue</p>
              )}
              <p className="contribution-title text-gray-700">
                {contribution.pullRequest
                  ? contribution.pullRequest.title
                  : contribution.issue!.title}
              </p>
              <p className="contribution-created-at text-gray-700">
                Created At: {new Date(contribution.createdAt).toLocaleString()}
              </p>
              <p className="contribution-author text-gray-700">
                Author: {contribution.author.login}
              </p>
              <a
                href={
                  contribution.pullRequest
                    ? contribution.pullRequest.url
                    : contribution.issue!.url
                }
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Contribution
              </a>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default OpenSourceContributions;
