import gql from "graphql-tag";

export const ADD_STAR = gql`
  mutation AddStar($repositoryId: ID!) {
    addStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;

export const REMOVE_STAR = gql`
  mutation RemoveStar($repositoryId: ID!) {
    removeStar(input: { starrableId: $repositoryId }) {
      starrable {
        id
        viewerHasStarred
      }
    }
  }
`;
export const WATCH_REPOSITORY = gql`
  mutation($id: ID!, $viewerSubscription: SubscriptionState!) {
    updateSubscription(
      input: { state: $viewerSubscription, subscribableId: $id }
    ) {
      subscribable {
        id
        viewerSubscription
      }
    }
  }
`;

export const REPO_VAL = gql`
  query($LoginUser: String!, $repositoryName: String!) {
    user(login: $LoginUser) {
      name
      login

      iconImage: avatarUrl(size: 20)
      repository(name: $repositoryName) {
        object(expression: "master:") {
          ... on Tree {
            entries {
              name
              type
              mode
            }
          }
        }
        name
        id
        viewerHasStarred
        viewerSubscription
        description
        descriptionHTML
        resourcePath
        forkCount
        watchers(first: 10) {
          totalCount
        }
        stargazers {
          totalCount
        }
      }
    }
  }
`;
export const PROFILE_QUERY = gql`
  query($LoginUser: String!) {
    user(login: $LoginUser) {
      name
      login
      iconImage: avatarUrl(size: 20)
      profileImage: avatarUrl(size: 260)
      bio
      company
      email
      location
      organizations(first: 100) {
        nodes {
          name
          avatarUrl
        }
      }
      followers(first: 100) {
        totalCount
      }
      following(first: 8) {
        totalCount
      }
      repositories(first: 100) {
        edges {
          node {
            id
            description
            name
            url
            primaryLanguage {
              name
            }
            labels(first: 1) {
              edges {
                node {
                  id
                  name
                  description
                }
              }
            }
            languages(first: 1) {
              edges {
                node {
                  id
                  name
                  color
                }
              }
            }
            stargazers(first: 10) {
              edges {
                node {
                  id
                  name
                }
              }
              totalCount
            }

            forkCount
            watchers(first: 10) {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export const HEAD_QUERY = gql`
  query($LoginUser: String!) {
    user(login: $LoginUser) {
      name
      login
      iconImage: avatarUrl(size: 20)
    }
  }
`;

export const GET_README = gql`
  query($LoginUser: String!, $repositoryName: String!) {
    repositoryOwner(login: $LoginUser) {
      repository(name: $repositoryName) {
        id
        descriptionHTML
        object(expression: "master:README.md") {
          id
          ... on Blob {
            text
          }
        }
      }
    }
  }
`;