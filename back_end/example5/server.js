//Express
const express = require("express");

//GraphQL
const graphqlHTTP = require("express-graphql");
const {schema, rootValue} = require("./schema.js");

//CORS
const cors = require('cors');

const app = express();

app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: rootValue,
    graphiql: true
}));

app.use('/getList', cors(), (req, res) => {
    var list = ['list1', 'list2', 'list3'];
    res.json(list);
});

const port = 2996;
app.listen(port);
console.log("Server is listening on " + port + "...");
