module.exports = {
  Query: {
    characters: async (parent, {name}, {dataSources}) => {
      return await dataSources.marvelAPI.getAllCharecters(name)
		},
		character: async (parent, {id}, {dataSources}) => {
			return await dataSources.marvelAPI.getCharacter(id)
		}
  },
}
