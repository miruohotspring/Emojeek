export const listPostsSortedByCreatedAt = `
    query MyQuery {
    listPostsSortedByCreatedAt(type: "post", limit: 40, sortDirection: DESC) {
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
  listReactionOnSpecificPost(postId: "$postId") {
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
  listPostsBySpecificOwner(owner: "$user", sortDirection: DESC, limit: 500) {
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
  listPostsBySpecificOwner(owner: "$user", sortDirection: DESC, limit: 40) {
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