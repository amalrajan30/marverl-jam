const {gql} = require('apollo-server-lambda')

const typedef = gql`
	type Character {
		id: ID!
		name: String
		discription: String
		urls: [Url]
		thumbnail: Image
	}

	type Url {
		type: String
		url: String
	}

	type Comic {
		id: ID!
		title: String
		discription: String
		images: [Image]
		thumbnail: Image
		url: [Url]
	}

	type Series {
		id: ID!
		title: String
		discription: String
		thumbnail: Image
		url: [Url]
	}

	type Story {
		id: ID!
		title: String
		discription: String
	}

	type Event {
		id: ID!
		title: String
		discription: String
		url: [Url]
		thumbnail: Image
	}

	type Image {
		path: String,
		extension: String
	}

	type Query {
		characters(name: String): [Character]
		character(id: ID!): Character
		comics: [Comic]
		series: [Series]
		stories: [Story]
		events: [Event]
	}
`

module.exports = typedef;