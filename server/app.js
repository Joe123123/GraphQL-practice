const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://dbUser:pw1234@gql-practice-dn1q9.mongodb.net/test"
);
mongoose.connection.once("open", () => {
  console.log("db connected");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listning on port 4000");
});
