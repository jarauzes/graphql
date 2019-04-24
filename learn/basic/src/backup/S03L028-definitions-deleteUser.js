// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        Posts(query: String): [Post!]!
        Comments(query: String): [Comment!]!
        Updates: [Update!]!
    }

    type Mutation {
        
        createUser(data: CreateUserInput!): User!
        deleteUser(id: ID!): User!

        createPost(data: CreatePostInput!): Post!
        createComment(data: CreateCommentInput!): Comment!
    }

    input CreateUserInput {
        name: String!
        email: String!
        age: Int
    }
    
    input CreatePostInput {
        title: String!
        body: String!
        published: Boolean!
        author: ID!
    }

    input CreateCommentInput {
        text: String!
        author: ID!
        post: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User! 
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }

    type Update {
        id: ID!
        text: String!
    }
`;

export { typeDefs }