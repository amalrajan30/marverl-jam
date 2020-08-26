const fetch = require("node-fetch")
const crypto = require("crypto")

class MarvelAPI {
  constructor() {
    this.baseUrl = `http://gateway.marvel.com/v1/public`
    this.privateKey = "c49989ba4aa3aba360af32dc5a4e145713b8fa98"
    this.publicKey = "6a3c799c272f7d0e17c9c36ec5f34ce2"
  }

  async makeRequest({ path, param }) {
    const timeStamp = new Date().getTime()
    const hash = crypto
      .createHash("md5")
      .update(`${timeStamp}${this.privateKey}${this.publicKey}`)
      .digest("hex")

    const url = param
      ? `${this.baseUrl}/${path}?${param.name}=${param.value}&apikey=${this.publicKey}&hash=${hash}&ts=${timeStamp}`
      : `${this.baseUrl}/${path}?apikey=${this.publicKey}&hash=${hash}&ts=${timeStamp}`
		const rawData = await fetch(url)
    if (!rawData) {
      return null
		}
		const resData = await rawData.json()
    return resData
  }

  async getAllCharecters(searchTerm, skip) {
    try {
      const response = await this.makeRequest({
        path: "characters",
        param: searchTerm
          ? { name: "nameStartsWith", value: searchTerm }
					: null,
				skip: skip ? skip : 0
      })
      const { data } = response
      const result = data.results.map(item => ({
        id: item.id,
        name: item.name,
        discription: item.description,
        thumbnail: item.thumbnail,
        urls: item.urls,
      }))
      return result
    } catch (error) {
      throw error
    }
  }

  async getCharacter(id) {
    const response = await this.makeRequest({
      path: `characters/${id}`,
      param: null,
    })
    const { data } = response
    const result = data.results.map(item => ({
      id: item.id || 0,
      name: item.name,
      discription: item.description,
      thumbnail: item.thumbnail,
      urls: item.urls,
    }))
    return result[0]
  }
}

module.exports = MarvelAPI
