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
        users: [User],
        posts: [Post],
    },
`);

exports.rootValue = {
    users: () => Object.keys(usersById).map(id => new GraphQLUser(usersById[id])),
    posts: () => Object.keys(postsById).map(id => new GraphQLPost(postsById[id])),
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

    /*posts() {     //easier to understand the js code
        var ret;
        var allPosts;
        
        allPosts = Object.keys(postsById).map(id => {
            return new GraphQLPost(postsById[id]);
        });

        ret = allPosts.filter(post => {
            return post.authorId == this.id;
        });

        return ret;
    }*/
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

