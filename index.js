const express = require ('express');
const schema = require('./schema');

const graphqlHTTP = require('express-graphql');

const app = express();

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.get('/', function(req, resp) {
    resp.send('express is working')
});

app.listen(4000, function () {
    console.log('listening on port 4000');
});

