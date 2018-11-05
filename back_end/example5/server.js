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

const port = 2996;
app.listen(port);
console.log("Server is listening on " + port + "...");
