// Type definitions (SCHEMA)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        Posts(query: String): [Post!]!
        Comments(query: String): [Comment!]!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User! 
    }

    type Comment {
        id: ID!
        message: String!
        author: User!
        posts: [Post!]!
    }
`;

export { typeDefs }