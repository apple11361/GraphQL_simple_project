//Express
const express = require("express");

//GraphQL
const graphqlHTTP = require("express-graphql");
const {schema, rootValue} = require("./schema.js");

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}));

app.listen("2996");
