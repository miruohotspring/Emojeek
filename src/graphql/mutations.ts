/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreatePost(
    $input: CreatePostInput!
    $condition: ModelPostConditionInput
  ) {
    createPost(input: $input, condition: $condition) {
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
export const updatePost = /* GraphQL */ `
  mutation UpdatePost(
    $input: UpdatePostInput!
    $condition: ModelPostConditionInput
  ) {
    updatePost(input: $input, condition: $condition) {
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
export const deletePost = /* GraphQL */ `
  mutation DeletePost(
    $input: DeletePostInput!
    $condition: ModelPostConditionInput
  ) {
    deletePost(input: $input, condition: $condition) {
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
export const createReaction = /* GraphQL */ `
  mutation CreateReaction(
    $input: CreateReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    createReaction(input: $input, condition: $condition) {
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
export const deleteReaction = /* GraphQL */ `
  mutation DeleteReaction(
    $input: DeleteReactionInput!
    $condition: ModelReactionConditionInput
  ) {
    deleteReaction(input: $input, condition: $condition) {
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
