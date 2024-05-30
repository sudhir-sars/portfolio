// constants/gitQueries.ts

export const GET_LATEST_ACTIVE_REPOS = `
query {
  user(login: "sudhir-sars") {
    repositories(first: 4, orderBy: { field: PUSHED_AT, direction: DESC }) {
      nodes {
        name
        url
        description
      }
    }
  }
}
`;

export const GET_LATEST_COMMITS = `
{
  user(login: "sudhir-sars") {
    repositories(first: 4, orderBy: { field: PUSHED_AT, direction: DESC }) {
      nodes {
        name
        refs(first: 1, refPrefix: "refs/heads/") {
          nodes {
            target {
              ... on Commit {
                history(first: 10) {
                  edges {
                    node {
                      message
                      committedDate
                      author {
                        name
                        email
                      }
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;

export const GET_OPEN_SOURCE_CONTRIBUTIONS = `
  query {
    user(login: "sudhir-sars") {
      contributionsCollection {
        pullRequestContributionsByRepository(maxRepositories: 100) {
          repository {
            name
            url
            owner {
              login
            }
          }
          contributions(first: 100) {
            nodes {
              pullRequest {
                title
                url
                createdAt
                author {
                  login
                }
              }
            }
          }
        }
        issueContributionsByRepository(maxRepositories: 100) {
          repository {
            name
            url
            owner {
              login
            }
          }
          contributions(first: 100) {
            nodes {
              issue {
                title
                url
                createdAt
                author {
                  login
                }
              }
            }
          }
        }
      }
    }
  }
`;
