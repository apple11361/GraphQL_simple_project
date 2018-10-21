const { buildSchema } = require("graphql");

exports.schema = buildSchema(`
    type User {
        id: ID!,
        name: String,
        posts: [Post],
    },
    type Post {
        id: ID!,
        title: String,
        content: String,
        author: User!
    },
    type Query {
        user(id: ID!): User,
        users: [User],
        posts: [Post],
    },
    type Mutation {
        addUser(name: String!): User,
        renameUser(id: ID, name: String): User,
        removeUser(id: ID): ID,
    },
`);

/**** the queries ****/
const queries = {
    users: () => Object.keys(usersById).map(id => new GraphQLUser(usersById[id])),
    posts: () => Object.keys(postsById).map(id => new GraphQLPost(postsById[id])),
    user: ({id}) => usersById[id] ? new GraphQLUser(usersById[id]) : null,
}

/**** the mutations ****/
const mutations = {
    addUser: ({name}) => {
        usersById[nextUserId] = {
            id: nextUserId,
            name: name,
        };
        nextUserId++;

        return new GraphQLUser(usersById[nextUserId-1]);
    },
    renameUser: ({id, name}) => {
        usersById[id].name = name;

        return new GraphQLUser(usersById[id]);
    },
    removeUser: ({id}) => {
        delete usersById[id];

        return id;
    },
}

exports.rootValue = {
    ...queries,
    ...mutations,
};

/**** the return struct ****/
class GraphQLUser {
    constructor({id, name}) {
        this.id = id;
        this.name = name;
    }

    posts() {   //return the array of posts
        return Object.keys(postsById).map(id => new GraphQLPost(postsById[id]))
        .filter(post => post.authorId==this.id);
    }
}

class GraphQLPost {
    constructor({id, title, content, authorId}) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }

    author() {
        return new GraphQLUser(usersById[this.authorId]);
    }
}

/***** the data that should be return *****/
var nextUserId = 4;
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
        id:3,
        name: "babe ruth",
    },
};

const postsById = {
    1: {
        id: 1,
        title: "title1",
        content: "content1",
        authorId: 3,
    },
    2: {
        id: 2,
        content: "content2",
        authorId: 1,
    },
    3: {
        id: 3,
        title: "title3",
        authorId: 2,
    },
    4: {
        id: 4,
        title: "title4",
        authorId: 1,
    },
};

