const {ApolloServer} = require('apollo-server-lambda')

const typeDefs = require('./schema')
const resolvers = require('./resolver')
const MarvelAPI = require('./datasource')


const server = new ApolloServer({
	typeDefs,
	resolvers,
	dataSources: () => ({
		marvelAPI: new MarvelAPI()
	}),
	playground: true,
	introspection: true
})
exports.handler = server.createHandler()