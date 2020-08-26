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
