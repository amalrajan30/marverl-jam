const resolvers = require("../resolver")

describe("query characters", () => {
  const mockContext = {
    dataSources: {
      marvelAPI: { getAllCharecters: jest.fn() },
    },
  }

  const { getAllCharecters } = mockContext.dataSources.marvelAPI

  it("should lookup getAllCharecters", async () => {
    getAllCharecters.mockResolvedValueOnce([{ id: 234, name: "Spider-man" }])

		const res = await resolvers.Query.characters(null, {}, mockContext)
    expect(res).toEqual([{ id: 234, name: "Spider-man" }])
  })
})

describe("query character", () => {
	const mockContext = {
    dataSources: {
      marvelAPI: { getCharacter: jest.fn() },
    },
  }

	const { getCharacter } = mockContext.dataSources.marvelAPI
	
	it("should lookup getCharacter", async () => {
		getCharacter.mockResolvedValueOnce([{id: 999}])

		const res = await resolvers.Query.character(null, {id: 999}, mockContext)
		expect(res).toEqual([{id: 999}])
		expect(getCharacter).toBeCalledWith(999)
	})
})
