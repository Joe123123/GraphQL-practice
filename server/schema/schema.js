const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
const books = [
  { name: "book111", id: "1", genre: "Fantasy", authorId: "1" },
  { name: "book22", id: "2", genre: "Fantasy", authorId: "2" },
  { name: "book3333", id: "3", genre: "Sci-Fi", authorId: "3" },
  { name: "book44", id: "4", genre: "Fantasy", authorId: "2" },
  { name: "book55", id: "5", genre: "Fantasy", authorId: "3" },
  { name: "book66", id: "6", genre: "Sci-Fi", authorId: "3" },
];

const authors = [
  { name: "author111", id: "1", age: 11 },
  { name: "author22", id: "2", age: 22 },
  { name: "author3333", id: "3", age: 33 },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        // code to get data from db / other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
