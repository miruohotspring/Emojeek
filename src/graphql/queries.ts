/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        type
        id
        title
        content
        owner
        createdAt
        updatedAt
        reactions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getPost = /* GraphQL */ `
  query GetPost($id: ID!) {
    getPost(id: $id) {
      type
      id
      title
      content
      owner
      createdAt
      updatedAt
      reactions {
        items {
          id
          postId
          emoji
          owner
        }
        nextToken
      }
    }
  }
`;


export const listPostsSortedByCreatedAt = /* GraphQL */ `
  query ListPostsSortedByCreatedAt(
    $type: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsSortedByCreatedAt(
      type: $type
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        title
        content
        owner
        createdAt
        updatedAt
        reactions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listPostsBySpecificOwner = /* GraphQL */ `
  query ListPostsBySpecificOwner(
    $owner: String
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostsBySpecificOwner(
      owner: $owner
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        type
        id
        title
        content
        owner
        createdAt
        updatedAt
        reactions {
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getReaction = /* GraphQL */ `
  query GetReaction($id: ID!) {
    getReaction(id: $id) {
      id
      postId
      emoji
      post {
        type
        id
        title
        content
        owner
        createdAt
        updatedAt
        reactions {
          nextToken
        }
      }
      owner
    }
  }
`;
export const listReactions = /* GraphQL */ `
  query ListReactions(
    $filter: ModelReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReactions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        postId
        emoji
        post {
          type
          id
          title
          content
          owner
          createdAt
          updatedAt
        }
        owner
      }
      nextToken
    }
  }
`;
export const listReactionOnSpecificPost = /* GraphQL */ `
  query ListReactionOnSpecificPost(
    $postId: ID
    $emoji: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReactionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReactionOnSpecificPost(
      postId: $postId
      emoji: $emoji
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postId
        emoji
        post {
          type
          id
          title
          content
          owner
          createdAt
          updatedAt
        }
        owner
      }
      nextToken
    }
  }
`;

export const myquery = `
    query MyQuery {
    listPostsSortedByCreatedAt(type: "post", limit: 20, sortDirection: DESC) {
      items {
        type
        id
        title
        content
        owner
        createdAt
        updatedAt
        reactions {
          nextToken
        }
      }
    }
    }
`;

export const myquery2 = `
query MyQuery {
  listReactionOnSpecificPost(postId: "$postId") {
    items {
      emoji
      id
      owner
    }
  }
}
`
