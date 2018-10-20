const { buildSchema } = require("graphql");

exports.schema = buildSchema(`
    type Query {
        hello: String,
    },
`);

exports.rootValue = {
    /*hello: function() {
        return "Hello world!"
    },*/
    /*hello: () => {return "Hello world!"},*/
    hello: () => "Hello world!",
};

