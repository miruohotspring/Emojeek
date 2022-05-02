/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreatePostInput = {
  type: string,
  id?: string | null,
  title: string,
  content: string,
  owner?: string | null,
  createdAt?: string | null,
};

export type ModelPostConditionInput = {
  type?: ModelStringInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostConditionInput | null > | null,
  or?: Array< ModelPostConditionInput | null > | null,
  not?: ModelPostConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Post = {
  __typename: "Post",
  type: string,
  id?: string | null,
  title: string,
  content: string,
  owner?: string | null,
  createdAt?: string | null,
  updatedAt: string,
  reactions?: ModelReactionConnection | null,
};

export type ModelReactionConnection = {
  __typename: "ModelReactionConnection",
  items:  Array<Reaction | null >,
  nextToken?: string | null,
};

export type Reaction = {
  __typename: "Reaction",
  id?: string | null,
  postId: string,
  emoji: string,
  post?: Post | null,
  owner?: string | null,
};

export type UpdatePostInput = {
  type?: string | null,
  id: string,
  title?: string | null,
  content?: string | null,
  owner?: string | null,
  createdAt?: string | null,
};

export type DeletePostInput = {
  id: string,
};

export type CreateReactionInput = {
  id?: string | null,
  postId: string,
  emoji: string,
};

export type ModelReactionConditionInput = {
  postId?: ModelIDInput | null,
  emoji?: ModelStringInput | null,
  and?: Array< ModelReactionConditionInput | null > | null,
  or?: Array< ModelReactionConditionInput | null > | null,
  not?: ModelReactionConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type DeleteReactionInput = {
  id: string,
};

export type ModelPostFilterInput = {
  type?: ModelStringInput | null,
  id?: ModelIDInput | null,
  title?: ModelStringInput | null,
  content?: ModelStringInput | null,
  owner?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  and?: Array< ModelPostFilterInput | null > | null,
  or?: Array< ModelPostFilterInput | null > | null,
  not?: ModelPostFilterInput | null,
};

export type ModelPostConnection = {
  __typename: "ModelPostConnection",
  items:  Array<Post | null >,
  nextToken?: string | null,
};

export type ModelStringKeyConditionInput = {
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export enum ModelSortDirection {
  ASC = "ASC",
  DESC = "DESC",
}


export type ModelReactionFilterInput = {
  id?: ModelIDInput | null,
  postId?: ModelIDInput | null,
  emoji?: ModelStringInput | null,
  and?: Array< ModelReactionFilterInput | null > | null,
  or?: Array< ModelReactionFilterInput | null > | null,
  not?: ModelReactionFilterInput | null,
};

export type CreatePostMutationVariables = {
  input: CreatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type CreatePostMutation = {
  createPost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    title: string,
    content: string,
    owner?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    reactions?:  {
      __typename: "ModelReactionConnection",
      items:  Array< {
        __typename: "Reaction",
        id?: string | null,
        postId: string,
        emoji: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type UpdatePostMutationVariables = {
  input: UpdatePostInput,
  condition?: ModelPostConditionInput | null,
};

export type UpdatePostMutation = {
  updatePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    title: string,
    content: string,
    owner?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    reactions?:  {
      __typename: "ModelReactionConnection",
      items:  Array< {
        __typename: "Reaction",
        id?: string | null,
        postId: string,
        emoji: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type DeletePostMutationVariables = {
  input: DeletePostInput,
  condition?: ModelPostConditionInput | null,
};

export type DeletePostMutation = {
  deletePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    title: string,
    content: string,
    owner?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    reactions?:  {
      __typename: "ModelReactionConnection",
      items:  Array< {
        __typename: "Reaction",
        id?: string | null,
        postId: string,
        emoji: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type CreateReactionMutationVariables = {
  input: CreateReactionInput,
  condition?: ModelReactionConditionInput | null,
};

export type CreateReactionMutation = {
  createReaction?:  {
    __typename: "Reaction",
    id?: string | null,
    postId: string,
    emoji: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type DeleteReactionMutationVariables = {
  input: DeleteReactionInput,
  condition?: ModelReactionConditionInput | null,
};

export type DeleteReactionMutation = {
  deleteReaction?:  {
    __typename: "Reaction",
    id?: string | null,
    postId: string,
    emoji: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type GetPostQueryVariables = {
  id: string,
};

export type GetPostQuery = {
  getPost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    title: string,
    content: string,
    owner?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    reactions?:  {
      __typename: "ModelReactionConnection",
      items:  Array< {
        __typename: "Reaction",
        id?: string | null,
        postId: string,
        emoji: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type ListPostsQueryVariables = {
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsQuery = {
  listPosts?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPostsSortedByCreatedAtQueryVariables = {
  type?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsSortedByCreatedAtQuery = {
  listPostsSortedByCreatedAt?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListPostsBySpecificOwnerQueryVariables = {
  owner?: string | null,
  createdAt?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelPostFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListPostsBySpecificOwnerQuery = {
  listPostsBySpecificOwner?:  {
    __typename: "ModelPostConnection",
    items:  Array< {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetReactionQueryVariables = {
  id: string,
};

export type GetReactionQuery = {
  getReaction?:  {
    __typename: "Reaction",
    id?: string | null,
    postId: string,
    emoji: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type ListReactionsQueryVariables = {
  filter?: ModelReactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReactionsQuery = {
  listReactions?:  {
    __typename: "ModelReactionConnection",
    items:  Array< {
      __typename: "Reaction",
      id?: string | null,
      postId: string,
      emoji: string,
      post?:  {
        __typename: "Post",
        type: string,
        id?: string | null,
        title: string,
        content: string,
        owner?: string | null,
        createdAt?: string | null,
        updatedAt: string,
      } | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListReactionOnSpecificPostQueryVariables = {
  postId?: string | null,
  emoji?: ModelStringKeyConditionInput | null,
  sortDirection?: ModelSortDirection | null,
  filter?: ModelReactionFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListReactionOnSpecificPostQuery = {
  listReactionOnSpecificPost?:  {
    __typename: "ModelReactionConnection",
    items:  Array< {
      __typename: "Reaction",
      id?: string | null,
      postId: string,
      emoji: string,
      post?:  {
        __typename: "Post",
        type: string,
        id?: string | null,
        title: string,
        content: string,
        owner?: string | null,
        createdAt?: string | null,
        updatedAt: string,
      } | null,
      owner?: string | null,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreatePostSubscription = {
  onCreatePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    title: string,
    content: string,
    owner?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    reactions?:  {
      __typename: "ModelReactionConnection",
      items:  Array< {
        __typename: "Reaction",
        id?: string | null,
        postId: string,
        emoji: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnUpdatePostSubscription = {
  onUpdatePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    title: string,
    content: string,
    owner?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    reactions?:  {
      __typename: "ModelReactionConnection",
      items:  Array< {
        __typename: "Reaction",
        id?: string | null,
        postId: string,
        emoji: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnDeletePostSubscription = {
  onDeletePost?:  {
    __typename: "Post",
    type: string,
    id?: string | null,
    title: string,
    content: string,
    owner?: string | null,
    createdAt?: string | null,
    updatedAt: string,
    reactions?:  {
      __typename: "ModelReactionConnection",
      items:  Array< {
        __typename: "Reaction",
        id?: string | null,
        postId: string,
        emoji: string,
        owner?: string | null,
      } | null >,
      nextToken?: string | null,
    } | null,
  } | null,
};

export type OnCreateReactionSubscription = {
  onCreateReaction?:  {
    __typename: "Reaction",
    id?: string | null,
    postId: string,
    emoji: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};

export type OnDeleteReactionSubscription = {
  onDeleteReaction?:  {
    __typename: "Reaction",
    id?: string | null,
    postId: string,
    emoji: string,
    post?:  {
      __typename: "Post",
      type: string,
      id?: string | null,
      title: string,
      content: string,
      owner?: string | null,
      createdAt?: string | null,
      updatedAt: string,
      reactions?:  {
        __typename: "ModelReactionConnection",
        nextToken?: string | null,
      } | null,
    } | null,
    owner?: string | null,
  } | null,
};
