const { buildSchema } = require("graphql");

exports.schema = buildSchema(`
    type User {
        id: ID!,
        name: String,
    },
    type Post {
        id: ID!,
        title: String,
        content: String,
    },
    type Query {
        users: [User],
        posts: [Post],
    },
`);

exports.rootValue = {
    users: () => Object.keys(usersById).map(id => usersById[id]),
    posts: () => Object.keys(postsById).map(id => postsById[id])
};

/***** the data that should be return *****/
const usersById = {
    1: {
        id: 1,
        name: "derrick",
    },
    2: {
        id: 2,
        name: "verlander",
    },
    3: {
        name: "babe ruth",
    },
};

const postsById = {
    1: {
        id: 1,
        title: "title1",
        content: "content1",
    },
    2: {
        id: 2,
        content: "content2",
    },
    3: {
        id: 3,
        title: "title3",
    },
};

