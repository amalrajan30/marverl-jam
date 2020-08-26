const fetch = require("node-fetch")
const crypto = require("crypto")

class MarvelAPI {
  constructor() {
    this.baseUrl = `http://gateway.marvel.com/v1/public`
    this.privateKey = "c49989ba4aa3aba360af32dc5a4e145713b8fa98"
    this.publicKey = "6a3c799c272f7d0e17c9c36ec5f34ce2"
  }

  async makeRequest(params) {
    const timeStamp = new Date().getTime()
    const hash = crypto
      .createHash("md5")
      .update(`${timeStamp}${this.privateKey}${this.publicKey}`)
      .digest("hex")
    const rawData = await fetch(
      `${this.baseUrl}/${params}?apikey=${this.publicKey}&hash=${hash}&ts=${timeStamp}`
    )
    const resData = await rawData.json()
    // if (rawData.staus !== 200) {
    //   throw new Error(resData)
    // }
    return resData
  }

  async getAllCharecters() {
    try {
      const response = await this.makeRequest("characters")
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
    const response = await this.makeRequest(`characters/${id}`)
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
