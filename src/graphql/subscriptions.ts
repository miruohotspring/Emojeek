/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreatePost = /* GraphQL */ `
  subscription OnCreatePost {
    onCreatePost {
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
export const onUpdatePost = /* GraphQL */ `
  subscription OnUpdatePost {
    onUpdatePost {
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
export const onDeletePost = /* GraphQL */ `
  subscription OnDeletePost {
    onDeletePost {
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
export const onCreateReaction = /* GraphQL */ `
  subscription OnCreateReaction {
    onCreateReaction {
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
export const onDeleteReaction = /* GraphQL */ `
  subscription OnDeleteReaction {
    onDeleteReaction {
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
