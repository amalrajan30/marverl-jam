module.exports = {
  Query: {
    characters: async (parent, args, {dataSources}) => {
      return await dataSources.marvelAPI.getAllCharecters()
    },
  },
}
