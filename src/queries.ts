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