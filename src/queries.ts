export const listPostsSortedByCreatedAt = `
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

export const listReactionOnSpecificPost = `
query MyQuery {
  listReactionOnSpecificPost(postId: "$postId", limit: 1000) {
    items {
      emoji
      id
      owner
    }
  }
}
`

export const listReactionOnSpecificOwner = `
query MyQuery {
  listPostsBySpecificOwner(owner: "$user", sortDirection: DESC, limit: 100) {
    items {
      reactions {
        items {
          emoji
        }
      }
    }
  }
}
`

export const listPostsBySpecificOwner = `
query MyQuery {
  listPostsBySpecificOwner(owner: "$user", sortDirection: DESC, limit: 20) {
    items {
      id
      title
      owner
      content
      createdAt
      reactions {
        items {
          emoji
          owner
        }
      }
    }
  }
}
`