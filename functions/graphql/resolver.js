module.exports = {
  Query: {
    characters: async (parent, args, {dataSources}) => {
      return await dataSources.marvelAPI.getAllCharecters()
		},
		character: async (parent, {id}, {dataSources}) => {
			return await dataSources.marvelAPI.getCharacter(id)
		}
  },
}
